import { NextRequest, NextResponse } from "next/server";
import { activeAcademicSession, adminDb } from "@/lib/admin-db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const session = request.nextUrl.searchParams.get("session") || activeAcademicSession();
    const { data, error } = await adminDb()
      .from("timetable_periods")
      .select("id,department,class_name,subject_name,teacher_id,day_number,period_number,faculty_members(teacher_name)")
      .eq("academic_session", session)
      .order("day_number")
      .order("period_number");

    if (error) throw error;
    return NextResponse.json({ success: true, session, timetable: data ?? [] });
  } catch (error) {
    console.error("Public timetable error", error);
    return NextResponse.json(
      { success: false, message: "نظام الاوقات حاصل نہیں ہوسکا۔", timetable: [] },
      { status: 500 },
    );
  }
}
