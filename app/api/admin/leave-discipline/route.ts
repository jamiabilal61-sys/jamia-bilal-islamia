import { NextRequest, NextResponse } from "next/server";
import { activeAcademicSession, adminDb, isAuthorizedAdmin } from "@/lib/admin-db";

export const runtime = "nodejs";
const personTypes = ["طالب علم", "استاد"];
const recordTypes = ["رخصت", "نظم و ضبط"];
const leaveStatuses = ["زیر غور", "منظور", "مسترد", "واپس آگیا"];
const disciplineStatuses = ["زیر کارروائی", "تنبیہ", "حل شدہ", "معطل"];

export async function GET(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const db = adminDb();
    const [{ data: records, error }, { data: students }, { data: faculty }] = await Promise.all([
      db.from("leave_discipline_records").select("*").order("created_at", { ascending: false }),
      db.from("students").select("id,student_number,student_name,father_name,current_department,phone").eq("student_status", "فعال").order("student_name"),
      db.from("faculty_members").select("id,teacher_name,phone,specialization").eq("status", "فعال").order("teacher_name"),
    ]);
    if (error) throw error;
    return NextResponse.json({ success: true, records: records ?? [], students: students ?? [], faculty: faculty ?? [], session: activeAcademicSession() });
  } catch (error) {
    console.error("Leave/discipline GET error", error);
    return NextResponse.json({ success: false, message: "ریکارڈ حاصل نہیں ہوسکا۔ پہلے leave-discipline.sql چلائیں۔" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    if (!personTypes.includes(body.personType) || !recordTypes.includes(body.recordType) || !body.personId || !String(body.reason || "").trim()) {
      return NextResponse.json({ success: false, message: "شخص، ریکارڈ کی قسم اور وجہ لازمی ہیں۔" }, { status: 400 });
    }
    if (body.recordType === "رخصت" && (!body.startDate || !body.endDate || body.endDate < body.startDate)) {
      return NextResponse.json({ success: false, message: "رخصت کی درست ابتدائی اور آخری تاریخ درج کریں۔" }, { status: 400 });
    }
    const validStatuses = body.recordType === "رخصت" ? leaveStatuses : disciplineStatuses;
    const payload = {
      academic_session: body.academicSession || activeAcademicSession(), person_type: body.personType,
      person_id: body.personId, person_name: String(body.personName || "").trim(), person_number: String(body.personNumber || "").trim() || null,
      department: String(body.department || "").trim() || null, contact_number: String(body.contactNumber || "").trim() || null,
      record_type: body.recordType, start_date: body.recordType === "رخصت" ? body.startDate : null,
      end_date: body.recordType === "رخصت" ? body.endDate : null, return_date: body.returnDate || null,
      reason: String(body.reason).trim(), action_taken: String(body.actionTaken || "").trim() || null,
      guardian_notified: Boolean(body.guardianNotified), status: validStatuses.includes(body.status) ? body.status : validStatuses[0],
      updated_at: new Date().toISOString(),
    };
    const db = adminDb();
    const query = body.id ? db.from("leave_discipline_records").update(payload).eq("id", body.id) : db.from("leave_discipline_records").insert(payload);
    const { error } = await query;
    if (error) throw error;
    return NextResponse.json({ success: true, message: body.id ? "ریکارڈ تبدیل ہوگیا۔" : "نیا ریکارڈ محفوظ ہوگیا۔" });
  } catch (error) {
    console.error("Leave/discipline POST error", error);
    return NextResponse.json({ success: false, message: "ریکارڈ محفوظ نہیں ہوسکا۔" }, { status: 500 });
  }
}
