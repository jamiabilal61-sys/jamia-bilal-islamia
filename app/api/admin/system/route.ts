import { NextRequest, NextResponse } from "next/server";
import { adminDb, auditAdminAction, authorizedFor } from "@/lib/admin-db";

export const runtime = "nodejs";
const TABLES = ["students","student_sessions","student_attendance","student_fees","exams","exam_subjects","exam_results","faculty_members","teaching_requirements","timetable_periods","leave_discipline_records","hostel_rooms","hostel_allocations","hostel_gate_register","hostel_visits","hostel_mess_attendance","portal_accounts","portal_notices","library_books","library_copies","library_loans","employee_attendance","employee_payroll","student_documents","notification_templates","notification_queue","admin_users"] as const;

async function collectBackup() {
  const db = adminDb();
  const tables: Record<string, unknown[]> = {};
  const errors: string[] = [];
  for (const table of TABLES) {
    const { data, error } = await db.from(table).select("*");
    if (error) errors.push(table); else tables[table] = data ?? [];
  }
  return { format: "jamia-bilal-backup", version: 1, createdAt: new Date().toISOString(), tables, unavailableTables: errors };
}

export async function GET(request: NextRequest) {
  if (!(await authorizedFor(request, "settings"))) return NextResponse.json({ success: false }, { status: 403 });
  const mode = request.nextUrl.searchParams.get("mode");
  if (mode === "download") {
    const backup = await collectBackup();
    await auditAdminAction(request, "download", "backup", null, { tables: Object.keys(backup.tables).length });
    return new NextResponse(JSON.stringify(backup), { headers: { "content-type": "application/json; charset=utf-8", "content-disposition": `attachment; filename="jamia-bilal-backup-${new Date().toISOString().slice(0,10)}.json"`, "cache-control": "no-store" } });
  }
  const db = adminDb();
  const [{ data: logs }, { data: backups }] = await Promise.all([
    db.from("admin_audit_logs").select("id,username,action,module,record_id,details,created_at").order("created_at", { ascending: false }).limit(100),
    db.from("system_backup_history").select("id,backup_name,status,table_count,row_count,created_by,created_at").order("created_at", { ascending: false }).limit(20),
  ]);
  return NextResponse.json({ success: true, logs: logs ?? [], backups: backups ?? [], security: { sessionSecret: Boolean(process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET.length >= 32), supabase: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SECRET_KEY), productionHttps: process.env.NODE_ENV === "production", cookieProtection: true, roleProtection: true } });
}

export async function POST(request: NextRequest) {
  if (!(await authorizedFor(request, "settings"))) return NextResponse.json({ success: false }, { status: 403 });
  const backup = await collectBackup();
  const rowCount = Object.values(backup.tables).reduce((sum, rows) => sum + rows.length, 0);
  const name = `جامعہ-بلال-${new Date().toISOString().replaceAll(":", "-")}`;
  const { data, error } = await adminDb().from("system_backup_history").insert({ backup_name: name, status: "completed", table_count: Object.keys(backup.tables).length, row_count: rowCount, created_by: "admin", snapshot: backup }).select("id").single();
  if (error) return NextResponse.json({ success: false, message: "بیک اپ محفوظ نہیں ہوسکا۔ پہلے final-system-security.sql چلائیں۔" }, { status: 500 });
  await auditAdminAction(request, "create", "backup", data.id, { rows: rowCount });
  return NextResponse.json({ success: true, message: `${rowCount} ریکارڈز کا محفوظ بیک اپ بن گیا۔` });
}
