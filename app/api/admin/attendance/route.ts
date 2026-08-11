import { NextRequest, NextResponse } from "next/server";
import { activeAcademicSession, adminDb, isAuthorizedAdmin } from "@/lib/admin-db";

export const runtime = "nodejs";
const validStatuses = ["حاضر", "غیر حاضر", "رخصت", "تاخیر"];

export async function GET(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const date = request.nextUrl.searchParams.get("date") || new Date().toISOString().slice(0, 10);
    const client = adminDb();
    const [{ data: students, error: studentError }, { data: attendance, error: attendanceError }] = await Promise.all([
      client.from("students").select("id,student_number,student_name,father_name,current_department").eq("student_status", "فعال").order("student_name"),
      client.from("student_attendance").select("*").eq("attendance_date", date),
    ]);
    if (studentError) throw studentError;
    if (attendanceError) throw attendanceError;
    return NextResponse.json({ success: true, students: students ?? [], attendance: attendance ?? [], date, session: activeAcademicSession() });
  } catch (error) {
    console.error("Attendance GET error", error);
    return NextResponse.json({ success: false, message: "حاضری حاصل نہیں ہوسکی۔ پہلے finance-attendance.sql چلائیں۔" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.date || !Array.isArray(body.records) || body.records.some((x: { studentId?: string; status?: string }) => !x.studentId || !validStatuses.includes(x.status || ""))) {
      return NextResponse.json({ success: false, message: "حاضری کا ریکارڈ نامکمل ہے۔" }, { status: 400 });
    }
    const now = new Date().toISOString();
    const records = body.records.map((x: { studentId: string; status: string; remarks?: string }) => ({
      student_id: x.studentId,
      academic_session: body.academicSession || activeAcademicSession(),
      attendance_date: body.date,
      attendance_status: x.status,
      remarks: String(x.remarks || "").trim() || null,
      updated_at: now,
    }));
    const { error } = await adminDb().from("student_attendance").upsert(records, { onConflict: "student_id,attendance_date" });
    if (error) throw error;
    return NextResponse.json({ success: true, count: records.length });
  } catch (error) {
    console.error("Attendance POST error", error);
    return NextResponse.json({ success: false, message: "حاضری محفوظ نہیں ہوسکی۔" }, { status: 500 });
  }
}
