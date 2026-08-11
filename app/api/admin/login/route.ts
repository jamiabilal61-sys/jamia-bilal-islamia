import { NextResponse } from "next/server";
import { adminDb } from "@/lib/admin-db";
import { ADMIN_COOKIE, ADMIN_PERMISSIONS, createAdminSessionToken, hashAdminPassword } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  let account: { id: string; username: string; full_name: string; role: string; permissions: string[]; password_hash: string; password_salt: string; is_active: boolean } | null = null;
  try {
    const result = await adminDb().from("admin_users").select("*").eq("username", String(username).trim()).maybeSingle();
    if (!result.error) account = result.data;
  } catch { /* Environment super admin remains available during initial setup. */ }

  let valid = false;
  if (account?.is_active) valid = account.password_hash === await hashAdminPassword(password, account.password_salt);
  const envValid = Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) && username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
  if (!valid && !envValid) return NextResponse.json({ success: false, message: "صارف نام یا پاس ورڈ درست نہیں۔" }, { status: 401 });

  const session = account && valid
    ? { id: account.id, username: account.username, fullName: account.full_name, role: account.role, permissions: account.permissions as typeof ADMIN_PERMISSIONS[number][] }
    : { id: "environment-admin", username, fullName: "مرکزی مدیر", role: "super_admin", permissions: [...ADMIN_PERMISSIONS] };
  const token = await createAdminSessionToken(session);
  if (!token) return NextResponse.json({ success: false, message: "ADMIN_SESSION_SECRET نامکمل ہے۔" }, { status: 500 });
  if (account) await adminDb().from("admin_users").update({ last_login_at: new Date().toISOString() }).eq("id", account.id);
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 8 });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
