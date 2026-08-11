import { NextResponse } from "next/server";
import { adminDb } from "@/lib/admin-db";
export const runtime="nodejs";
export async function GET(_request:Request,{params}:{params:Promise<{token:string}>}){try{const {token}=await params;const {data,error}=await adminDb().from("student_documents").select("document_type,serial_number,academic_session,department,class_name,issued_at,valid_until,status,signatory_name,students(student_number,student_name,father_name)").eq("verification_token",token).single();if(error||!data)return NextResponse.json({success:false,message:"دستاویز نہیں ملی۔"},{status:404});return NextResponse.json({success:true,document:data})}catch{return NextResponse.json({success:false,message:"تصدیق ممکن نہیں۔"},{status:500})}}
