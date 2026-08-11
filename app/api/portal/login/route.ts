import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin-db";
import { hashPortalPassword, makePortalToken, PORTAL_COOKIE } from "@/lib/portal-auth";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    if (!String(username || "").trim() || !String(password || ""))
      return NextResponse.json({ success: false, message: "صارف نام اور پاس ورڈ درج کریں۔" }, { status: 400 });
    const db = adminDb();
    const { data: account } = await db.from("portal_accounts").select("id,student_id,password_hash,status").eq("username", String(username).trim()).maybeSingle();
    if (!account || account.status !== "فعال" || account.password_hash !== hashPortalPassword(String(password)))
      return NextResponse.json({ success: false, message: "صارف نام یا پاس ورڈ درست نہیں۔" }, { status: 401 });
    await db.from("portal_accounts").update({ last_login_at: new Date().toISOString() }).eq("id", account.id);
    const response = NextResponse.json({ success: true });
    response.cookies.set(PORTAL_COOKIE, makePortalToken(account.id, account.student_id), { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 * 7, path: "/" });
    return response;
  } catch (error) {
    console.error("Portal login", error);
    return NextResponse.json({ success: false, message: "پورٹل لاگ اِن دستیاب نہیں۔ پہلے متعلقہ SQL اور ماحول کی کلیدیں مکمل کریں۔" }, { status: 500 });
  }
}
