import { NextRequest, NextResponse } from "next/server";
import { activeAcademicSession, adminDb, isAuthorizedAdmin } from "@/lib/admin-db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const session = request.nextUrl.searchParams.get("session") || activeAcademicSession();
    const examId = request.nextUrl.searchParams.get("examId");
    const client = adminDb();
    const { data: exams, error } = await client.from("exams").select("*, exam_subjects(*)").eq("academic_session", session).order("created_at", { ascending: false });
    if (error) throw error;
    if (!examId) return NextResponse.json({ success: true, exams: exams ?? [], session });
    const exam = (exams ?? []).find((item) => item.id === examId);
    if (!exam) return NextResponse.json({ success: false, message: "امتحان نہیں ملا۔" }, { status: 404 });
    let studentsQuery = client.from("student_sessions").select("student_id,academic_session,department,class_name,roll_number,students!inner(id,student_number,student_name,father_name,student_status)").eq("academic_session", session).eq("department", exam.department).eq("students.student_status", "فعال");
    if (exam.class_name) studentsQuery = studentsQuery.eq("class_name", exam.class_name);
    const [{ data: sessions, error: studentsError }, { data: results, error: resultsError }] = await Promise.all([
      studentsQuery.order("roll_number"),
      client.from("exam_results").select("*").eq("exam_id", examId),
    ]);
    if (studentsError) throw studentsError;
    if (resultsError) throw resultsError;
    return NextResponse.json({ success: true, exams: exams ?? [], exam, students: sessions ?? [], results: results ?? [], session });
  } catch (error) {
    console.error("Exams GET error", error);
    return NextResponse.json({ success: false, message: "امتحانی ریکارڈ حاصل نہیں ہوسکا۔ پہلے examinations-results.sql چلائیں۔" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    const client = adminDb();
    if (body.action === "saveResults") {
      if (!body.examId || !Array.isArray(body.results)) return NextResponse.json({ success: false, message: "نتیجہ نامکمل ہے۔" }, { status: 400 });
      const rows = body.results.map((row: Record<string, unknown>) => ({
        exam_id: body.examId, subject_id: row.subjectId, student_id: row.studentId,
        obtained_marks: row.absent || row.marks === "" ? null : Number(row.marks),
        absent: Boolean(row.absent), remarks: String(row.remarks || "").trim() || null, updated_at: new Date().toISOString(),
      }));
      const { error } = await client.from("exam_results").upsert(rows, { onConflict: "exam_id,subject_id,student_id" });
      if (error) throw error;
      return NextResponse.json({ success: true, message: "تمام نمبر محفوظ ہوگئے۔" });
    }
    const subjects = Array.isArray(body.subjects) ? body.subjects.filter((x: { name?: string; total?: number }) => x.name?.trim() && Number(x.total) > 0) : [];
    if (!body.academicSession || !body.examName?.trim() || !body.department?.trim() || !subjects.length) return NextResponse.json({ success: false, message: "امتحان، شعبہ اور کم از کم ایک مضمون ضروری ہے۔" }, { status: 400 });
    const examRow = { academic_session: body.academicSession, exam_name: body.examName.trim(), department: body.department.trim(), class_name: String(body.className || "").trim(), exam_date: body.examDate || null, updated_at: new Date().toISOString() };
    const { data: exam, error: examError } = await client.from("exams").upsert(examRow, { onConflict: "academic_session,exam_name,department,class_name" }).select("*").single();
    if (examError) throw examError;
    const subjectRows = subjects.map((subject: { name: string; total: number; passing: number }, index: number) => ({ exam_id: exam.id, subject_name: subject.name.trim(), total_marks: Number(subject.total), passing_marks: Number(subject.passing), display_order: index }));
    const { error: subjectError } = await client.from("exam_subjects").upsert(subjectRows, { onConflict: "exam_id,subject_name" });
    if (subjectError) throw subjectError;
    return NextResponse.json({ success: true, exam });
  } catch (error) {
    console.error("Exams POST error", error);
    return NextResponse.json({ success: false, message: "امتحان یا نتیجہ محفوظ نہیں ہوسکا۔" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.examId || !["تیاری", "نتیجہ مکمل", "شائع شدہ"].includes(body.status)) return NextResponse.json({ success: false }, { status: 400 });
    const { error } = await adminDb().from("exams").update({ status: body.status, updated_at: new Date().toISOString() }).eq("id", body.examId);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ success: false, message: "حیثیت تبدیل نہیں ہوسکی۔" }, { status: 500 }); }
}
