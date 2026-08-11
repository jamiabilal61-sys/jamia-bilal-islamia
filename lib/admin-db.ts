import { createClient } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { ADMIN_COOKIE, AdminPermission, hasPermission, readAdminSession } from "@/lib/admin-auth";

export function adminDb() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Supabase configuration نامکمل ہے۔");
  return createClient(url, key, { auth: { persistSession: false } });
}

export function isAuthorizedAdmin(request: NextRequest) {
  return readAdminSession(request.cookies.get(ADMIN_COOKIE)?.value).then(Boolean);
}

export async function authorizedFor(request: NextRequest, permission: AdminPermission) {
  return hasPermission(await readAdminSession(request.cookies.get(ADMIN_COOKIE)?.value), permission);
}

export function activeAcademicSession() {
  const now = new Date();
  const start = now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1;
  return `${start}-${start + 1}`;
}

export async function auditAdminAction(
  request: NextRequest,
  action: string,
  module: string,
  recordId?: string | null,
  details: Record<string, unknown> = {},
) {
  const session = await readAdminSession(request.cookies.get(ADMIN_COOKIE)?.value);
  if (!session) return;
  await adminDb().from("admin_audit_logs").insert({
    admin_user_id: session.id === "environment-admin" ? null : session.id,
    username: session.username,
    action,
    module,
    record_id: recordId ?? null,
    details: {
      ...details,
      ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
      user_agent: request.headers.get("user-agent")?.slice(0, 300) ?? null,
    },
  });
}
