import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const files = [
  "base-admissions.sql", "student-management.sql", "finance-attendance.sql",
  "examinations-results.sql", "faculty-timetable.sql", "leave-discipline.sql",
  "hostel-management.sql", "parent-student-portal.sql", "library-management.sql",
  "employee-payroll.sql", "student-documents.sql", "notifications-system.sql",
  "student-import.sql", "dashboard-role-access.sql", "final-system-security.sql",
];
const sections = await Promise.all(files.map(async file => `\n-- ============================================================\n-- ${file}\n-- ============================================================\n${await readFile(join(root, "supabase", file), "utf8")}\n`));
const header = `-- جامعہ بلال الاسلامیہ پورٹل: مکمل Database Setup\n-- نئی تنصیب پر یہ واحد فائل Supabase SQL Editor میں ایک مرتبہ چلائیں۔\n-- تیار شدہ: ${new Date().toISOString().slice(0,10)}\n`;
await writeFile(join(root, "supabase", "complete-setup.sql"), header + sections.join(""), "utf8");
console.log(`complete-setup.sql تیار: ${files.length} حصے`);
