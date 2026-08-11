export const ADMIN_COOKIE = "jamia_admin_session";

export const ADMIN_PERMISSIONS = [
  "dashboard", "admissions", "students", "attendance", "fees", "exams",
  "faculty", "discipline", "hostel", "portal_accounts", "library", "payroll",
  "documents", "notifications", "student_import", "news", "settings", "users",
] as const;

export type AdminPermission = (typeof ADMIN_PERMISSIONS)[number];
export type AdminSession = {
  id: string;
  username: string;
  fullName: string;
  role: string;
  permissions: AdminPermission[];
  exp: number;
};

const encoder = new TextEncoder();

async function sha256(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function encode(value: string) {
  return btoa(unescape(encodeURIComponent(value))).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function decode(value: string) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/") + "===".slice((value.length + 3) % 4);
  return decodeURIComponent(escape(atob(padded)));
}

export async function hashAdminPassword(password: string, salt: string) {
  return sha256(`jamia-bilal:${salt}:${password}`);
}

export async function createAdminSessionToken(session: Omit<AdminSession, "exp">) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return null;
  const payload = encode(JSON.stringify({ ...session, exp: Date.now() + 8 * 60 * 60 * 1000 }));
  return `${payload}.${await sha256(`${payload}:${secret}`)}`;
}

export async function readAdminSession(token?: string): Promise<AdminSession | null> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!token || !secret) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || signature !== await sha256(`${payload}:${secret}`)) return null;
  try {
    const session = JSON.parse(decode(payload)) as AdminSession;
    return session.exp > Date.now() ? session : null;
  } catch { return null; }
}

export async function isValidAdminToken(value?: string) {
  return Boolean(await readAdminSession(value));
}

export function hasPermission(session: AdminSession | null, permission?: AdminPermission) {
  return Boolean(session && (!permission || session.role === "super_admin" || session.permissions.includes(permission)));
}
