import { NextRequest, NextResponse } from "next/server";
import { adminDb, isAuthorizedAdmin } from "@/lib/admin-db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const db = adminDb();
    const [{ data: templates, error: te }, { data: queue, error: qe }, { data: students, error: se }] = await Promise.all([
      db.from("notification_templates").select("*").order("created_at", { ascending: false }),
      db.from("notification_queue").select("*,students(student_number,student_name,father_name,phone)").order("created_at", { ascending: false }).limit(300),
      db.from("students").select("id,student_number,student_name,father_name,phone,current_department,student_status").eq("student_status", "فعال").order("student_name"),
    ]);
    if (te || qe || se) throw te || qe || se;
    return NextResponse.json({ success: true, templates: templates ?? [], queue: queue ?? [], students: students ?? [] });
  } catch (error) {
    console.error("Notifications GET error", error);
    return NextResponse.json({ success: false, message: "اطلاعات کا ریکارڈ حاصل نہیں ہوسکا۔ پہلے notifications-system.sql چلائیں۔" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    const db = adminDb();
    if (body.action === "template") {
      if (!String(body.title || "").trim() || !String(body.body || "").trim()) return NextResponse.json({ success: false, message: "عنوان اور متن ضروری ہیں۔" }, { status: 400 });
      const { data, error } = await db.from("notification_templates").insert({ title: String(body.title).trim(), category: String(body.category || "عمومی"), channel: String(body.channel || "whatsapp"), body: String(body.body).trim(), is_active: true }).select("*").single();
      if (error) throw error;
      return NextResponse.json({ success: true, template: data });
    }
    const studentIds: string[] = Array.isArray(body.studentIds) ? body.studentIds : [];
    if (!studentIds.length || !String(body.message || "").trim()) return NextResponse.json({ success: false, message: "کم از کم ایک طالب علم اور پیغام ضروری ہے۔" }, { status: 400 });
    const { data: students, error: se } = await db.from("students").select("id,student_name,father_name,student_number,phone").in("id", studentIds);
    if (se) throw se;
    const rows = (students ?? []).map((student) => ({
      student_id: student.id,
      recipient_name: student.father_name || student.student_name,
      recipient_phone: String(student.phone || "").replace(/[^0-9+]/g, ""),
      channel: String(body.channel || "whatsapp"),
      category: String(body.category || "عمومی"),
      message: String(body.message).replaceAll("{طالب علم}", student.student_name).replaceAll("{طالب علم نمبر}", student.student_number || ""),
      status: "pending_approval",
      scheduled_at: body.scheduledAt || new Date().toISOString(),
    }));
    if (rows.some((row) => !row.recipient_phone)) return NextResponse.json({ success: false, message: "منتخب طلبہ میں کسی کا موبائل نمبر درج نہیں ہے۔" }, { status: 400 });
    const { data, error } = await db.from("notification_queue").insert(rows).select("*");
    if (error) throw error;
    return NextResponse.json({ success: true, queued: data?.length ?? 0 });
  } catch (error) {
    console.error("Notifications POST error", error);
    return NextResponse.json({ success: false, message: "پیغام محفوظ نہیں ہوسکا۔" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.id || !["approved", "cancelled", "sent", "failed"].includes(body.status)) return NextResponse.json({ success: false, message: "درست کارروائی منتخب کریں۔" }, { status: 400 });
    const changes: Record<string, string | null> = { status: body.status, error_message: body.errorMessage || null };
    if (body.status === "approved") changes.approved_at = new Date().toISOString();
    if (body.status === "sent") changes.sent_at = new Date().toISOString();
    const { data, error } = await adminDb().from("notification_queue").update(changes).eq("id", body.id).select("*").single();
    if (error) throw error;
    return NextResponse.json({ success: true, item: data });
  } catch (error) {
    console.error("Notifications PATCH error", error);
    return NextResponse.json({ success: false, message: "حیثیت تبدیل نہیں ہوسکی۔" }, { status: 500 });
  }
}
