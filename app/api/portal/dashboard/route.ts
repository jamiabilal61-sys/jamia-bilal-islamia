import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin-db";
import { PORTAL_COOKIE, readPortalToken } from "@/lib/portal-auth";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const session = readPortalToken(request.cookies.get(PORTAL_COOKIE)?.value);
    if (!session) return NextResponse.json({ success: false }, { status: 401 });
    const db = adminDb(), studentId = session.studentId;
    const [student, sessions, fees, attendance, results, leaves, hostel, gate, notices] = await Promise.all([
      db.from("students").select("*").eq("id", studentId).single(),
      db.from("student_sessions").select("*").eq("student_id", studentId).order("created_at", { ascending: false }),
      db.from("student_fees").select("*").eq("student_id", studentId).order("fee_month", { ascending: false }).limit(24),
      db.from("student_attendance").select("*").eq("student_id", studentId).order("attendance_date", { ascending: false }).limit(120),
      db.from("exam_results").select("*,exams(exam_name,exam_date,status),exam_subjects(subject_name,total_marks,passing_marks)").eq("student_id", studentId).order("created_at", { ascending: false }),
      db.from("leave_discipline_records").select("*").eq("person_id", studentId).order("created_at", { ascending: false }).limit(50),
      db.from("hostel_allocations").select("*").eq("student_id", studentId).order("created_at", { ascending: false }).limit(5),
      db.from("hostel_gate_register").select("*").eq("student_id", studentId).order("movement_at", { ascending: false }).limit(30),
      db.from("portal_notices").select("*").or(`student_id.is.null,student_id.eq.${studentId}`).order("published_at", { ascending: false }).limit(30),
    ]);
    if (student.error) throw student.error;
    return NextResponse.json({ success: true, student: student.data, sessions: sessions.data ?? [], fees: fees.data ?? [], attendance: attendance.data ?? [], results: results.data ?? [], leaves: leaves.data ?? [], hostel: hostel.data ?? [], gate: gate.data ?? [], notices: notices.data ?? [] });
  } catch (error) { console.error("Portal dashboard", error); return NextResponse.json({ success: false, message: "ریکارڈ حاصل نہیں ہوسکا۔ تمام SQL فائلیں چلائیں۔" }, { status: 500 }); }
}
