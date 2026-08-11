import { NextRequest, NextResponse } from "next/server";
import { activeAcademicSession, adminDb, isAuthorizedAdmin } from "@/lib/admin-db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const session = request.nextUrl.searchParams.get("session") || activeAcademicSession();
    const db = adminDb();
    const [faculty, requirements, timetable] = await Promise.all([
      db.from("faculty_members").select("*").order("teacher_name"),
      db.from("teaching_requirements").select("*").eq("academic_session", session).order("department").order("class_name"),
      db.from("timetable_periods").select("*, faculty_members(teacher_name)").eq("academic_session", session).order("day_number").order("period_number"),
    ]);
    if (faculty.error) throw faculty.error;
    if (requirements.error) throw requirements.error;
    if (timetable.error) throw timetable.error;
    return NextResponse.json({ success: true, faculty: faculty.data ?? [], requirements: requirements.data ?? [], timetable: timetable.data ?? [], session });
  } catch (error) {
    console.error("Faculty GET error", error);
    return NextResponse.json({ success: false, message: "اساتذہ کا ریکارڈ حاصل نہیں ہوسکا۔ پہلے faculty-timetable.sql چلائیں۔" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    const db = adminDb();
    if (body.action === "teacher") {
      if (!body.teacherName?.trim()) return NextResponse.json({ success: false, message: "استاد کا نام ضروری ہے۔" }, { status: 400 });
      const row = {
        teacher_name: body.teacherName.trim(), father_name: String(body.fatherName || "").trim(), phone: String(body.phone || "").trim(),
        qualification: String(body.qualification || "").trim(), specialization: String(body.specialization || "").trim(),
        teachable_subjects: Array.isArray(body.subjects) ? body.subjects.map(String).map((x: string) => x.trim()).filter(Boolean) : [],
        available_days: Array.isArray(body.availableDays) ? body.availableDays.map(Number) : [1,2,3,4,5,6],
        max_periods_daily: Math.max(1, Number(body.maxDaily || 5)), max_periods_weekly: Math.max(1, Number(body.maxWeekly || 24)),
        employment_type: body.employmentType || "کل وقتی", status: body.status || "فعال", updated_at: new Date().toISOString(),
      };
      const query = body.id ? db.from("faculty_members").update(row).eq("id", body.id) : db.from("faculty_members").insert(row);
      const { error } = await query;
      if (error) throw error;
      return NextResponse.json({ success: true, message: "استاد کا ریکارڈ محفوظ ہوگیا۔" });
    }
    if (body.action === "requirement") {
      if (!body.academicSession || !body.department?.trim() || !body.className?.trim() || !body.subjectName?.trim()) return NextResponse.json({ success: false, message: "سیشن، شعبہ، جماعت اور مضمون ضروری ہیں۔" }, { status: 400 });
      const { error } = await db.from("teaching_requirements").upsert({
        academic_session: body.academicSession, department: body.department.trim(), class_name: body.className.trim(), subject_name: body.subjectName.trim(),
        weekly_periods: Math.max(1, Number(body.weeklyPeriods || 1)), preferred_teacher_id: body.preferredTeacherId || null, updated_at: new Date().toISOString(),
      }, { onConflict: "academic_session,department,class_name,subject_name" });
      if (error) throw error;
      return NextResponse.json({ success: true, message: "تدریسی ضرورت محفوظ ہوگئی۔" });
    }
    return NextResponse.json({ success: false, message: "درخواست درست نہیں۔" }, { status: 400 });
  } catch (error) {
    console.error("Faculty POST error", error);
    return NextResponse.json({ success: false, message: "ریکارڈ محفوظ نہیں ہوسکا۔" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    if (body.action !== "generate" || !body.academicSession) return NextResponse.json({ success: false }, { status: 400 });
    const db = adminDb();
    const [{ data: teachers, error: te }, { data: needs, error: ne }] = await Promise.all([
      db.from("faculty_members").select("*").eq("status", "فعال"),
      db.from("teaching_requirements").select("*").eq("academic_session", body.academicSession),
    ]);
    if (te) throw te; if (ne) throw ne;
    const days = [1,2,3,4,5,6], periodsPerDay = Math.max(1, Math.min(10, Number(body.periodsPerDay || 8)));
    const rows: Record<string, unknown>[] = [], conflicts: string[] = [], teacherWeekly = new Map<string, number>(), teacherDaily = new Map<string, number>(), classSlots = new Set<string>(), teacherSlots = new Set<string>();
    for (const need of needs ?? []) {
      const eligible = (teachers ?? []).filter((t) => (!need.preferred_teacher_id || t.id === need.preferred_teacher_id) && (!t.teachable_subjects?.length || t.teachable_subjects.includes(need.subject_name)));
      let made = 0;
      for (let n = 0; n < need.weekly_periods; n++) {
        let selected: { teacher: { id:string; teacher_name:string; max_periods_weekly:number; max_periods_daily:number; available_days?:number[] }; day: number; period: number } | null = null;
        for (const teacher of eligible.sort((a,b) => (teacherWeekly.get(a.id)||0)-(teacherWeekly.get(b.id)||0))) {
          if ((teacherWeekly.get(teacher.id)||0) >= teacher.max_periods_weekly) continue;
          for (const day of days) {
            if (!teacher.available_days?.includes(day) || (teacherDaily.get(`${teacher.id}-${day}`)||0) >= teacher.max_periods_daily) continue;
            for (let period = 1; period <= periodsPerDay; period++) {
              const classKey = `${need.department}-${need.class_name}-${day}-${period}`, teacherKey = `${teacher.id}-${day}-${period}`;
              if (!classSlots.has(classKey) && !teacherSlots.has(teacherKey)) { selected = { teacher, day, period }; break; }
            }
            if (selected) break;
          }
          if (selected) break;
        }
        if (!selected) break;
        const { teacher, day, period } = selected;
        classSlots.add(`${need.department}-${need.class_name}-${day}-${period}`); teacherSlots.add(`${teacher.id}-${day}-${period}`);
        teacherWeekly.set(teacher.id, (teacherWeekly.get(teacher.id)||0)+1); teacherDaily.set(`${teacher.id}-${day}`, (teacherDaily.get(`${teacher.id}-${day}`)||0)+1);
        rows.push({ academic_session: body.academicSession, department: need.department, class_name: need.class_name, subject_name: need.subject_name, teacher_id: teacher.id, day_number: day, period_number: period }); made++;
      }
      if (made < need.weekly_periods) conflicts.push(`${need.department} / ${need.class_name} / ${need.subject_name}: ${need.weekly_periods-made} پیریڈ تقسیم نہیں ہوسکے`);
    }
    const { error: del } = await db.from("timetable_periods").delete().eq("academic_session", body.academicSession); if (del) throw del;
    if (rows.length) { const { error } = await db.from("timetable_periods").insert(rows); if (error) throw error; }
    return NextResponse.json({ success: true, message: `${rows.length} پیریڈ تقسیم ہوگئے۔`, conflicts });
  } catch (error) {
    console.error("Timetable generation error", error);
    return NextResponse.json({ success: false, message: "ٹائم ٹیبل نہیں بن سکا۔" }, { status: 500 });
  }
}
