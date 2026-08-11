import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const PORTAL_COOKIE = "jamia_portal_session";

function secret() {
  const value = process.env.PORTAL_SESSION_SECRET || process.env.ADMIN_SESSION_SECRET;
  if (!value) throw new Error("PORTAL_SESSION_SECRET موجود نہیں ہے۔");
  return value;
}

export function hashPortalPassword(password: string) {
  return createHash("sha256").update(`jamia-bilal:${secret()}:${password}`).digest("hex");
}

export function makePortalToken(accountId: string, studentId: string) {
  const payload = `${accountId}.${studentId}`;
  const signature = createHmac("sha256", secret()).update(payload).digest("hex");
  return `${payload}.${signature}`;
}

export function readPortalToken(token?: string) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const payload = `${parts[0]}.${parts[1]}`;
  const actual = Buffer.from(parts[2], "hex");
  const expected = Buffer.from(createHmac("sha256", secret()).update(payload).digest("hex"), "hex");
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return null;
  return { accountId: parts[0], studentId: parts[1] };
}
