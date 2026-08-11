import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, isValidAdminToken } from "@/lib/admin-auth";
import { auditAdminAction } from "@/lib/admin-db";

export const runtime = "nodejs";

function supabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) throw new Error("Supabase configuration نامکمل ہے۔");
  return createClient(url, key, { auth: { persistSession: false } });
}

async function authorized(request: NextRequest) {
  return isValidAdminToken(request.cookies.get(ADMIN_COOKIE)?.value);
}

export async function GET(request: NextRequest) {
  if (!(await authorized(request))) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    const client = supabaseAdmin();
    const { data, error } = await client
      .from("admissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;

    const supabase = supabaseAdmin();
    const admissions = await Promise.all(
      (data ?? []).map(async (item) => {
        if (!item.student_image_url) return item;
        const { data: signed } = await supabase.storage
          .from("admission-documents")
          .createSignedUrl(item.student_image_url, 3600);
        return { ...item, student_image_signed_url: signed?.signedUrl ?? null };
      })
    );
    return NextResponse.json({ success: true, admissions });
  } catch (error) {
    console.error("Admin admissions GET error:", error);
    return NextResponse.json(
      { success: false, message: "داخلہ ریکارڈ حاصل نہیں ہوسکا۔" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  if (!(await authorized(request))) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  try {
    const { id, status, adminNotes } = await request.json();
    const allowed = ["زیر غور", "منظور", "مسترد"];
    if (!id || !allowed.includes(status)) {
      return NextResponse.json(
        { success: false, message: "درخواست کی معلومات درست نہیں۔" },
        { status: 400 }
      );
    }
    const client = supabaseAdmin();
    const { data, error } = await client
      .from("admissions")
      .update({ status, admin_notes: String(adminNotes ?? "").trim() || null })
      .eq("id", id)
      .select("*")
      .single();
    if (error) throw error;
    if (status === "منظور") {
      const studentNumber = data.admission_number || `JB-${String(data.id).slice(0, 8).toUpperCase()}`;
      const year = new Date().getFullYear();
      const { data: student, error: studentError } = await client.from("students").upsert({
        admission_id: data.id, student_number: studentNumber, student_name: data.student_name,
        father_name: data.father_name, phone: data.phone, email: data.email,
        date_of_birth: data.date_of_birth || null, gender: data.gender, address: data.address,
        student_image_url: data.student_image_url, current_department: data.department,
        student_status: "فعال", joined_at: String(data.created_at).slice(0, 10), updated_at: new Date().toISOString(),
      }, { onConflict: "admission_id" }).select("id").single();
      if (studentError) throw new Error(`طالب علم بنانے میں خرابی: ${studentError.message}`);
      const { error: sessionError } = await client.from("student_sessions").upsert({
        student_id: student.id, academic_session: `${year}-${year + 1}`, department: data.department,
        session_status: "جاری", updated_at: new Date().toISOString(),
      }, { onConflict: "student_id,academic_session" });
      if (sessionError) throw new Error(`سالانہ ریکارڈ میں خرابی: ${sessionError.message}`);
    }
    await auditAdminAction(request, "status_change", "admissions", id, { status });
    return NextResponse.json({ success: true, admission: data });
  } catch (error) {
    console.error("Admin admissions PATCH error:", error);
    return NextResponse.json(
      { success: false, message: "ریکارڈ اپڈیٹ نہیں ہوسکا۔" },
      { status: 500 }
    );
  }
}
