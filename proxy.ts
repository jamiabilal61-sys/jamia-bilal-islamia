import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, AdminPermission, hasPermission, readAdminSession } from "@/lib/admin-auth";
import { PORTAL_COOKIE, readPortalToken } from "@/lib/portal-auth";

const access: Array<[string, AdminPermission]> = [
  ["/admin/users", "users"], ["/api/admin/users", "users"],
  ["/admin/admissions", "admissions"], ["/api/admin/admissions", "admissions"],
  ["/admin/student-import", "student_import"], ["/api/admin/student-import", "student_import"],
  ["/admin/students", "students"], ["/api/admin/students", "students"],
  ["/admin/attendance", "attendance"], ["/api/admin/attendance", "attendance"],
  ["/admin/fees", "fees"], ["/api/admin/fees", "fees"],
  ["/admin/exams", "exams"], ["/api/admin/exams", "exams"],
  ["/admin/faculty", "faculty"], ["/api/admin/faculty", "faculty"],
  ["/admin/leave-discipline", "discipline"], ["/api/admin/leave-discipline", "discipline"],
  ["/admin/hostel", "hostel"], ["/api/admin/hostel", "hostel"],
  ["/admin/portal-accounts", "portal_accounts"], ["/api/admin/portal-accounts", "portal_accounts"],
  ["/admin/library", "library"], ["/api/admin/library", "library"],
  ["/admin/payroll", "payroll"], ["/api/admin/payroll", "payroll"],
  ["/admin/documents", "documents"], ["/api/admin/documents", "documents"],
  ["/admin/notifications", "notifications"], ["/api/admin/notifications", "notifications"],
  ["/admin/news", "news"], ["/api/admin/news", "news"],
  ["/admin/settings", "settings"], ["/api/admin/settings", "settings"],
  ["/admin/system", "settings"], ["/api/admin/system", "settings"],
];

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/portal")) {
    const isLogin = pathname === "/portal/login";
    const valid = Boolean(readPortalToken(request.cookies.get(PORTAL_COOKIE)?.value));
    if (isLogin) return valid ? NextResponse.redirect(new URL("/portal", request.url)) : NextResponse.next();
    return valid ? NextResponse.next() : NextResponse.redirect(new URL("/portal/login", request.url));
  }
  if (pathname === "/api/admin/login") return NextResponse.next();
  const session = await readAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);
  if (pathname === "/admin/login") return session ? NextResponse.redirect(new URL("/admin", request.url)) : NextResponse.next();
  if (!session) {
    if (pathname.startsWith("/api/")) return NextResponse.json({ success: false, message: "دوبارہ لاگ اِن کریں۔" }, { status: 401 });
    const loginUrl = new URL("/admin/login", request.url); loginUrl.searchParams.set("next", pathname); return NextResponse.redirect(loginUrl);
  }
  const required = access.find(([prefix]) => pathname.startsWith(prefix))?.[1];
  if (required && !hasPermission(session, required)) {
    if (pathname.startsWith("/api/")) return NextResponse.json({ success: false, message: "آپ کو اس کارروائی کی اجازت نہیں۔" }, { status: 403 });
    return NextResponse.redirect(new URL("/admin?access=denied", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/api/admin/:path*", "/portal/:path*"] };
