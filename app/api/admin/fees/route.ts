import { NextRequest, NextResponse } from "next/server";
import { activeAcademicSession, adminDb, auditAdminAction, isAuthorizedAdmin } from "@/lib/admin-db";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const session = request.nextUrl.searchParams.get("session") || activeAcademicSession();
    const client = adminDb();
    const [{ data: students, error: studentError }, { data: fees, error: feeError }] = await Promise.all([
      client.from("students").select("id,student_number,student_name,father_name,current_department,student_status").eq("student_status", "فعال").order("student_name"),
      client.from("student_fees").select("*").eq("academic_session", session).order("fee_month", { ascending: false }),
    ]);
    if (studentError) throw studentError;
    if (feeError) throw feeError;
    return NextResponse.json({ success: true, students: students ?? [], fees: fees ?? [], session });
  } catch (error) {
    console.error("Fees GET error", error);
    return NextResponse.json({ success: false, message: "فیس ریکارڈ حاصل نہیں ہوسکا۔ پہلے finance-attendance.sql چلائیں۔" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthorizedAdmin(request))) return NextResponse.json({ success: false }, { status: 401 });
  try {
    const body = await request.json();
    const due = Number(body.amountDue);
    const paid = Number(body.amountPaid);
    if (!body.studentId || !body.academicSession || !/^\d{4}-\d{2}$/.test(body.feeMonth) || due < 0 || paid < 0) {
      return NextResponse.json({ success: false, message: "طالب علم، مہینہ اور درست رقم ضروری ہے۔" }, { status: 400 });
    }
    const now = new Date();
    const receiptNumber = paid > 0 ? `JB-${now.getFullYear()}-${now.getTime().toString().slice(-8)}` : null;
    const record = {
      student_id: body.studentId,
      academic_session: String(body.academicSession),
      fee_month: String(body.feeMonth),
      fee_type: String(body.feeType || "ماہانہ فیس").trim(),
      amount_due: due,
      amount_paid: paid,
      payment_method: paid > 0 ? String(body.paymentMethod || "نقد") : null,
      paid_at: paid > 0 ? now.toISOString() : null,
      receipt_number: receiptNumber,
      notes: String(body.notes || "").trim() || null,
      updated_at: now.toISOString(),
    };
    const { data, error } = await adminDb().from("student_fees").upsert(record, { onConflict: "student_id,academic_session,fee_month,fee_type" }).select("*").single();
    if (error) throw error;
    await auditAdminAction(request, "upsert", "fees", data.id, { student_id: body.studentId, fee_month: body.feeMonth, amount_paid: paid });
    return NextResponse.json({ success: true, fee: data });
  } catch (error) {
    console.error("Fees POST error", error);
    return NextResponse.json({ success: false, message: "فیس ریکارڈ محفوظ نہیں ہوسکا۔" }, { status: 500 });
  }
}
