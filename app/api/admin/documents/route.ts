import { NextRequest, NextResponse } from "next/server";
import { adminDb, isAuthorizedAdmin } from "@/lib/admin-db";
export const runtime = "nodejs";
const clean=(v:unknown)=>String(v??"").trim();
const codes:Record<string,string>={"شناختی کارڈ":"ID","زیرِ تعلیم سرٹیفکیٹ":"ENR","کردار سرٹیفکیٹ":"CHR","سندِ تکمیل":"CMP","سندِ فراغت":"GRD","نتیجہ تصدیق":"RES"};
function token(){return crypto.randomUUID().replaceAll("-","").slice(0,20).toUpperCase()}

export async function GET(request:NextRequest){
 if(!(await isAuthorizedAdmin(request)))return NextResponse.json({success:false},{status:401});
 try{const db=adminDb();const [students,documents]=await Promise.all([
  db.from("students").select("id,student_number,student_name,father_name,date_of_birth,current_department,student_status,student_image_url,student_sessions(*)").order("student_name"),
  db.from("student_documents").select("*").order("issued_at",{ascending:false}).limit(2000)
 ]);const error=students.error||documents.error;if(error)throw error;
 const enriched=await Promise.all((students.data??[]).map(async s=>{if(!s.student_image_url)return s;const {data}=await db.storage.from("admission-documents").createSignedUrl(s.student_image_url,3600);return {...s,student_image_signed_url:data?.signedUrl??null}}));
 return NextResponse.json({success:true,students:enriched,documents:documents.data??[]});
 }catch(error){console.error("Documents GET",error);return NextResponse.json({success:false,message:"اسناد کا ریکارڈ حاصل نہیں ہوسکا۔ پہلے student-documents.sql چلائیں۔"},{status:500})}
}

export async function POST(request:NextRequest){
 if(!(await isAuthorizedAdmin(request)))return NextResponse.json({success:false},{status:401});
 try{const b=await request.json(),db=adminDb(),type=clean(b.documentType);if(!b.studentId||!codes[type])return NextResponse.json({success:false,message:"طالب علم اور درست دستاویز منتخب کریں۔"},{status:400});
  const year=new Date().getFullYear();const {data:seq,error:seqError}=await db.rpc("next_student_document_number",{p_year:year,p_code:codes[type]});if(seqError)throw seqError;
  const record={student_id:b.studentId,document_type:type,serial_number:seq,verification_token:token(),academic_session:clean(b.academicSession)||null,department:clean(b.department)||null,class_name:clean(b.className)||null,issue_reason:clean(b.issueReason)||"اصل اجرا",valid_until:b.validUntil||null,remarks:clean(b.remarks)||null,signatory_name:clean(b.signatoryName)||"مدیر جامعہ",issued_at:b.issuedAt||new Date().toISOString().slice(0,10)};
  const {data,error}=await db.from("student_documents").insert(record).select("*").single();if(error)throw error;return NextResponse.json({success:true,message:`${type} جاری ہوگیا۔ سیریل نمبر: ${seq}`,document:data});
 }catch(error){console.error("Documents POST",error);return NextResponse.json({success:false,message:"دستاویز جاری نہیں ہوسکی۔ ڈیٹابیس ترتیب چیک کریں۔"},{status:500})}
}

export async function PATCH(request:NextRequest){
 if(!(await isAuthorizedAdmin(request)))return NextResponse.json({success:false},{status:401});
 try{const b=await request.json();if(!b.id||!["فعال","منسوخ","گم شدہ"].includes(b.status))return NextResponse.json({success:false,message:"درست حیثیت منتخب کریں۔"},{status:400});const {error}=await adminDb().from("student_documents").update({status:b.status,cancel_reason:clean(b.cancelReason)||null,updated_at:new Date().toISOString()}).eq("id",b.id);if(error)throw error;return NextResponse.json({success:true,message:"دستاویز کی حیثیت محفوظ ہوگئی۔"});}catch(error){console.error("Documents PATCH",error);return NextResponse.json({success:false,message:"حیثیت محفوظ نہیں ہوسکی۔"},{status:500})}
}
