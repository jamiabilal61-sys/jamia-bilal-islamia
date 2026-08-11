import { NextRequest, NextResponse } from "next/server";
import { adminDb, authorizedFor } from "@/lib/admin-db";

export async function GET(request: NextRequest) {
  if (!(await authorizedFor(request, "dashboard"))) return NextResponse.json({ success: false }, { status: 403 });
  try {
    const db = adminDb();
    const today = new Date().toISOString().slice(0, 10);
    const month = today.slice(0, 7);
    const [students, attendance, fees, exams, hostel, loans, payroll, notifications] = await Promise.all([
      db.from("students").select("id", { count: "exact", head: true }).eq("student_status", "فعال"),
      db.from("student_attendance").select("id", { count: "exact", head: true }).eq("attendance_date", today).eq("status", "حاضر"),
      db.from("student_fees").select("amount_due,amount_paid").gte("fee_month", `${month}-01`).lte("fee_month", `${month}-31`),
      db.from("exam_results").select("id", { count: "exact", head: true }),
      db.from("hostel_allocations").select("id", { count: "exact", head: true }).eq("status", "مقیم"),
      db.from("library_loans").select("id", { count: "exact", head: true }).eq("status", "جاری"),
      db.from("employee_payroll").select("net_salary,payment_status").eq("payroll_month", month),
      db.from("notification_queue").select("id", { count: "exact", head: true }).eq("status", "زیر منظوری"),
    ]);
    const feeRows = fees.data ?? []; const salaryRows = payroll.data ?? [];
    return NextResponse.json({ success: true, stats: {
      activeStudents: students.count ?? 0, presentToday: attendance.count ?? 0,
      monthlyDue: feeRows.reduce((n, r) => n + Number(r.amount_due || 0), 0),
      monthlyReceived: feeRows.reduce((n, r) => n + Number(r.amount_paid || 0), 0),
      results: exams.count ?? 0, hostelResidents: hostel.count ?? 0, activeLoans: loans.count ?? 0,
      pendingMessages: notifications.count ?? 0,
      payrollDue: salaryRows.filter(r => r.payment_status !== "ادا شدہ").reduce((n, r) => n + Number(r.net_salary || 0), 0),
    }});
  } catch (error) {
    console.error("Dashboard error", error);
    return NextResponse.json({ success: false, message: "ڈیش بورڈ ڈیٹا حاصل نہیں ہوسکا۔ متعلقہ SQL فائلیں چلائیں۔" }, { status: 500 });
  }
}
