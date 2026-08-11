import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, ADMIN_PERMISSIONS, hashAdminPassword, readAdminSession } from "@/lib/admin-auth";
import { adminDb, auditAdminAction, authorizedFor } from "@/lib/admin-db";

export async function GET(request: NextRequest) {
  if (!(await authorizedFor(request, "users"))) return NextResponse.json({ success: false }, { status: 403 });
  const { data, error } = await adminDb().from("admin_users").select("id,username,full_name,role,permissions,is_active,last_login_at,created_at").order("created_at");
  if (error) return NextResponse.json({ success: false, message: "صارفین حاصل نہیں ہوسکے۔ پہلے dashboard-role-access.sql چلائیں۔" }, { status: 500 });
  return NextResponse.json({ success: true, users: data, permissions: ADMIN_PERMISSIONS });
}

export async function POST(request: NextRequest) {
  if (!(await authorizedFor(request, "users"))) return NextResponse.json({ success: false }, { status: 403 });
  const body = await request.json();
  if (!body.username || !body.fullName || !body.password || String(body.password).length < 8) return NextResponse.json({ success: false, message: "نام، صارف نام اور کم از کم 8 حروف کا پاس ورڈ ضروری ہے۔" }, { status: 400 });
  const salt = crypto.randomUUID();
  const permissions = (Array.isArray(body.permissions) ? body.permissions : []).filter((p: string) => ADMIN_PERMISSIONS.includes(p as never));
  const { data, error } = await adminDb().from("admin_users").insert({ username: String(body.username).trim(), full_name: String(body.fullName).trim(), role: body.role || "custom", permissions, password_salt: salt, password_hash: await hashAdminPassword(body.password, salt) }).select("id,username,full_name,role,permissions,is_active").single();
  if (error) return NextResponse.json({ success: false, message: error.code === "23505" ? "یہ صارف نام پہلے سے موجود ہے۔" : "صارف محفوظ نہیں ہوسکا۔" }, { status: 400 });
  const session = await readAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);
  await adminDb().from("admin_audit_logs").insert({ admin_user_id: session?.id === "environment-admin" ? null : session?.id, username: session?.username ?? "unknown", action: "create", module: "users", record_id: data.id });
  return NextResponse.json({ success: true, user: data });
}

export async function PATCH(request: NextRequest) {
  if (!(await authorizedFor(request, "users"))) return NextResponse.json({ success: false }, { status: 403 });
  const body = await request.json();
  const changes: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.isActive === "boolean") changes.is_active = body.isActive;
  if (body.password) { const salt = crypto.randomUUID(); changes.password_salt = salt; changes.password_hash = await hashAdminPassword(body.password, salt); }
  const { error } = await adminDb().from("admin_users").update(changes).eq("id", body.id);
  if (error) return NextResponse.json({ success: false, message: "صارف اپڈیٹ نہیں ہوسکا۔" }, { status: 400 });
  await auditAdminAction(request, "update", "users", body.id, { password_changed: Boolean(body.password), active_changed: typeof body.isActive === "boolean" });
  return NextResponse.json({ success: true });
}
