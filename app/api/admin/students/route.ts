import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidAdminToken } from "@/lib/admin-auth";
import { auditAdminAction } from "@/lib/admin-db";

export const runtime = "nodejs";

function db() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Supabase configuration نامکمل ہے۔");
  return createClient(url, key, { auth: { persistSession: false } });
}

async function authorized(request: NextRequest) {
  return isValidAdminToken(request.cookies.get(ADMIN_COOKIE)?.value);
}

function currentSession() {
  const year = new Date().getFullYear();
  return `${year}-${year + 1}`;
}

export async function GET(request: NextRequest) {
  if (!(await authorized(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const { data, error } = await db().from("students").select("*, student_sessions(*)").order("created_at", { ascending: false });
    if (error) throw error;
    const client = db();
    const students = await Promise.all((data ?? []).map(async (student) => {
      if (!student.student_image_url) return student;
      const { data: signed } = await client.storage.from("admission-documents").createSignedUrl(student.student_image_url, 3600);
      return { ...student, student_image_signed_url: signed?.signedUrl ?? null };
    }));
    return NextResponse.json({ success: true, students, currentSession: currentSession() });
  } catch (error) {
    console.error("Students GET error", error);
    return NextResponse.json({ success: false, message: "طلبہ کا ریکارڈ حاصل نہیں ہوسکا۔ پہلے student-management.sql چلائیں۔" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await authorized(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.studentId || !body.academicSession || !body.department) return NextResponse.json({ success: false, message: "سیشن اور شعبہ ضروری ہیں۔" }, { status: 400 });
    const record = {
      student_id: body.studentId,
      academic_session: String(body.academicSession).trim(),
      department: String(body.department).trim(),
      class_name: String(body.className ?? "").trim() || null,
      roll_number: String(body.rollNumber ?? "").trim() || null,
      teacher_name: String(body.teacherName ?? "").trim() || null,
      hostel_status: String(body.hostelStatus ?? "غیر رہائشی"),
      room_number: String(body.roomNumber ?? "").trim() || null,
      session_status: String(body.sessionStatus ?? "جاری"),
      notes: String(body.notes ?? "").trim() || null,
      updated_at: new Date().toISOString(),
    };
    const { data, error } = await db().from("student_sessions").upsert(record, { onConflict: "student_id,academic_session" }).select("*").single();
    if (error) throw error;
    await db().from("students").update({ current_department: record.department, updated_at: new Date().toISOString() }).eq("id", body.studentId);
    await auditAdminAction(request, "upsert", "student_session", data.id, { student_id: body.studentId, academic_session: body.academicSession });
    return NextResponse.json({ success: true, session: data });
  } catch (error) {
    console.error("Student session POST error", error);
    return NextResponse.json({ success: false, message: "سالانہ ریکارڈ محفوظ نہیں ہوسکا۔" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await authorized(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    const allowed = ["فعال", "غیر فعال", "فارغ التحصیل", "اخراج"];
    if (!body.id || !allowed.includes(body.studentStatus)) return NextResponse.json({ success: false, message: "درست حیثیت منتخب کریں۔" }, { status: 400 });
    const { data, error } = await db().from("students").update({ student_status: body.studentStatus, updated_at: new Date().toISOString() }).eq("id", body.id).select("*").single();
    if (error) throw error;
    await auditAdminAction(request, "status_change", "students", body.id, { status: body.studentStatus });
    return NextResponse.json({ success: true, student: data });
  } catch (error) {
    console.error("Student PATCH error", error);
    return NextResponse.json({ success: false, message: "طالب علم کی حیثیت محفوظ نہیں ہوسکی۔" }, { status: 500 });
  }
}
