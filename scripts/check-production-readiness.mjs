import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const envFiles = [".env.production.local", ".env.local", ".env.production", ".env"];

for (const filename of envFiles) {
  const fullPath = path.join(root, filename);
  if (!fs.existsSync(fullPath)) continue;
  for (const line of fs.readFileSync(fullPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
  }
}

const required = [
  "SUPABASE_URL",
  "SUPABASE_SECRET_KEY",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
  "ADMIN_SESSION_SECRET",
  "PORTAL_SESSION_SECRET",
  "NEXT_PUBLIC_APP_URL",
];

const placeholders = ["your-", "replace-with", "example.com"];
const problems = [];

for (const name of required) {
  const value = process.env[name]?.trim();
  if (!value) problems.push(`${name}: موجود نہیں`);
  else if (placeholders.some((item) => value.includes(item))) problems.push(`${name}: نمونہ قدر تبدیل نہیں ہوئی`);
}

for (const name of ["ADMIN_SESSION_SECRET", "PORTAL_SESSION_SECRET", "ADMIN_PASSWORD"]) {
  const value = process.env[name] ?? "";
  if (value && value.length < 16) problems.push(`${name}: کم از کم 16 حروف رکھیں`);
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
if (appUrl && !appUrl.startsWith("https://")) problems.push("NEXT_PUBLIC_APP_URL: Production میں HTTPS ضروری ہے");
if (process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET === process.env.PORTAL_SESSION_SECRET) {
  problems.push("ADMIN_SESSION_SECRET اور PORTAL_SESSION_SECRET الگ رکھیں");
}

if (problems.length) {
  console.error("\nProduction readiness ناکام:\n- " + problems.join("\n- "));
  process.exit(1);
}

console.log("Production environment readiness کامیاب ہے۔");
