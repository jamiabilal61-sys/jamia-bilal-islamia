import { NextRequest, NextResponse } from "next/server";
import { adminDb, isAuthorizedAdmin } from "@/lib/admin-db";
import { hashPortalPassword } from "@/lib/portal-auth";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const db = adminDb();
    const [students, accounts, notices] = await Promise.all([
      db.from("students").select("id,student_name,student_number,father_name,current_department,phone").eq("student_status", "فعال").order("student_name"),
      db.from("portal_accounts").select("id,student_id,username,account_type,guardian_name,guardian_phone,status,last_login_at,created_at").order("created_at", { ascending: false }),
      db.from("portal_notices").select("*").order("published_at", { ascending: false }).limit(100),
    ]);
    const error = students.error || accounts.error || notices.error; if (error) throw error;
    return NextResponse.json({ success: true, students: students.data ?? [], accounts: accounts.data ?? [], notices: notices.data ?? [] });
  } catch (error) { console.error("Portal accounts GET", error); return NextResponse.json({ success: false, message: "ریکارڈ حاصل نہیں ہوسکا۔ parent-student-portal.sql چلائیں۔" }, { status: 500 }); }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json(), db = adminDb();
    if (body.action === "account") {
      if (!body.studentId || String(body.password || "").length < 6) return NextResponse.json({ success: false, message: "طالب علم اور کم از کم 6 حروف کا پاس ورڈ لازمی ہے۔" }, { status: 400 });
      const { data: student } = await db.from("students").select("student_number,father_name,phone").eq("id", body.studentId).single();
      if (!student) return NextResponse.json({ success: false, message: "طالب علم موجود نہیں۔" }, { status: 404 });
      const username = String(body.username || student.student_number).trim();
      const { error } = await db.from("portal_accounts").upsert({ student_id: body.studentId, username, password_hash: hashPortalPassword(String(body.password)), account_type: body.accountType || "والدین", guardian_name: String(body.guardianName || student.father_name || "").trim() || null, guardian_phone: String(body.guardianPhone || student.phone || "").trim() || null, status: body.status || "فعال", updated_at: new Date().toISOString() }, { onConflict: "student_id" });
      if (error) throw error; return NextResponse.json({ success: true, message: "پورٹل اکاؤنٹ محفوظ ہوگیا۔", username });
    }
    if (body.action === "status") {
      const { error } = await db.from("portal_accounts").update({ status: body.status, updated_at: new Date().toISOString() }).eq("id", body.id); if (error) throw error;
      return NextResponse.json({ success: true, message: "اکاؤنٹ کی حیثیت بدل گئی۔" });
    }
    if (body.action === "notice") {
      if (!String(body.title || "").trim() || !String(body.message || "").trim()) return NextResponse.json({ success: false, message: "عنوان اور پیغام لازمی ہیں۔" }, { status: 400 });
      const { error } = await db.from("portal_notices").insert({ student_id: body.studentId || null, title: String(body.title).trim(), message: String(body.message).trim(), notice_type: body.noticeType || "عمومی", expires_at: body.expiresAt || null }); if (error) throw error;
      return NextResponse.json({ success: true, message: "نوٹس جاری ہوگیا۔" });
    }
    return NextResponse.json({ success: false, message: "درخواست درست نہیں۔" }, { status: 400 });
  } catch (error) { console.error("Portal accounts POST", error); return NextResponse.json({ success: false, message: "ریکارڈ محفوظ نہیں ہوسکا۔ صارف نام منفرد رکھیں۔" }, { status: 500 }); }
}
