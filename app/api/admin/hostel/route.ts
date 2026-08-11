import { NextRequest, NextResponse } from "next/server";
import { adminDb, isAuthorizedAdmin } from "@/lib/admin-db";
export const runtime = "nodejs";

export async function GET(request:NextRequest){
 if(!(await isAuthorizedAdmin(request)))return NextResponse.json({success:false},{status:401});
 try{const db=adminDb();const [students,rooms,allocations,gate,visits]=await Promise.all([
  db.from("students").select("id,student_name,student_number,current_department").eq("student_status","فعال").order("student_name"),
  db.from("hostel_rooms").select("*").order("block_name").order("room_number"),
  db.from("hostel_allocations").select("*").order("created_at",{ascending:false}),
  db.from("hostel_gate_register").select("*").order("movement_at",{ascending:false}).limit(300),
  db.from("hostel_visits").select("*").order("visit_at",{ascending:false}).limit(300),
 ]);const error=[students,rooms,allocations,gate,visits].find(x=>x.error)?.error;if(error)throw error;
 const roomRows=rooms.data??[],allocationRows=allocations.data??[];
 return NextResponse.json({success:true,students:students.data??[],rooms:roomRows.map(r=>({...r,occupied:allocationRows.filter(a=>a.room_id===r.id&&a.status==="مقیم").length})),allocations:allocationRows,gate:gate.data??[],visits:visits.data??[]});
 }catch(error){console.error("Hostel GET",error);return NextResponse.json({success:false,message:"ہاسٹل ریکارڈ حاصل نہیں ہوسکا۔ پہلے hostel-management.sql چلائیں۔"},{status:500})}
}
export async function POST(request:NextRequest){
 if(!(await isAuthorizedAdmin(request)))return NextResponse.json({success:false},{status:401});
 try{const b=await request.json(),db=adminDb();let error:unknown=null,message="ریکارڈ محفوظ ہوگیا۔";
  if(b.action==="room"){
   if(!String(b.roomNumber||"").trim()||Number(b.capacity)<1)return NextResponse.json({success:false,message:"کمرہ نمبر اور درست گنجائش لازمی ہیں۔"},{status:400});
   ({error}=await db.from("hostel_rooms").insert({room_number:String(b.roomNumber).trim(),block_name:String(b.blockName||"مرکزی ہاسٹل").trim(),capacity:Number(b.capacity),warden_name:String(b.wardenName||"").trim()||null,status:b.status||"فعال"}));message="نیا کمرہ محفوظ ہوگیا۔";
  }else if(b.action==="allocate"){
   if(!b.studentId||!b.roomId)return NextResponse.json({success:false,message:"طالب علم اور کمرہ منتخب کریں۔"},{status:400});
   const [{data:student},{data:room},{count:occupied},{data:existing}]=await Promise.all([db.from("students").select("student_name,student_number").eq("id",b.studentId).single(),db.from("hostel_rooms").select("room_number,block_name,capacity,status").eq("id",b.roomId).single(),db.from("hostel_allocations").select("id",{count:"exact",head:true}).eq("room_id",b.roomId).eq("status","مقیم"),db.from("hostel_allocations").select("id").eq("student_id",b.studentId).eq("status","مقیم").maybeSingle()]);
   if(!student||!room||room.status!=="فعال")return NextResponse.json({success:false,message:"طالب علم یا کمرہ درست نہیں۔"},{status:400});
   if(existing)return NextResponse.json({success:false,message:"اس طالب علم کو پہلے ہی کمرہ ملا ہوا ہے۔"},{status:409});
   if((occupied??0)>=room.capacity)return NextResponse.json({success:false,message:"اس کمرے کی گنجائش مکمل ہوچکی ہے۔"},{status:409});
   ({error}=await db.from("hostel_allocations").insert({student_id:b.studentId,student_name:student.student_name,student_number:student.student_number,room_id:b.roomId,room_number:room.room_number,block_name:room.block_name,bed_number:String(b.bedNumber||"").trim()||null,start_date:b.startDate||new Date().toISOString().slice(0,10),status:"مقیم"}));message="طالب علم کو کمرہ مختص ہوگیا۔";
  }else if(b.action==="vacate"){
   ({error}=await db.from("hostel_allocations").update({status:"کمرہ خالی",end_date:new Date().toISOString().slice(0,10),updated_at:new Date().toISOString()}).eq("id",b.id));message="کمرہ خالی کردیا گیا۔";
  }else if(b.action==="gate"||b.action==="visit"){
   if(!b.studentId)return NextResponse.json({success:false,message:"طالب علم منتخب کریں۔"},{status:400});
   const {data:student}=await db.from("students").select("student_name,student_number").eq("id",b.studentId).single();if(!student)throw new Error("Student missing");
   if(b.action==="gate"){if(!String(b.purpose||"").trim())return NextResponse.json({success:false,message:"آمد یا روانگی کا مقصد درج کریں۔"},{status:400});({error}=await db.from("hostel_gate_register").insert({student_id:b.studentId,student_name:student.student_name,student_number:student.student_number,movement_type:b.movementType,movement_at:b.movementAt,purpose:String(b.purpose).trim(),expected_return:b.expectedReturn||null,guardian_name:String(b.guardianName||"").trim()||null}));message="گیٹ رجسٹر محفوظ ہوگیا۔"}
   else{if(!String(b.visitorName||"").trim())return NextResponse.json({success:false,message:"ملاقاتی کا نام درج کریں۔"},{status:400});({error}=await db.from("hostel_visits").insert({student_id:b.studentId,student_name:student.student_name,student_number:student.student_number,visitor_name:String(b.visitorName).trim(),relationship:String(b.relationship||"").trim(),visit_at:b.visitAt,contact_number:String(b.contactNumber||"").trim()||null,notes:String(b.notes||"").trim()||null}));message="ملاقات کا ریکارڈ محفوظ ہوگیا۔"}
  }else if(b.action==="mess"){
   if(!b.date||!b.meal||!Array.isArray(b.studentIds)||!b.studentIds.length)return NextResponse.json({success:false,message:"تاریخ، کھانا اور کم از کم ایک طالب علم منتخب کریں۔"},{status:400});
   const {data:students}=await db.from("students").select("id,student_name,student_number").in("id",b.studentIds);({error}=await db.from("hostel_mess_attendance").upsert((students??[]).map(s=>({attendance_date:b.date,meal:b.meal,student_id:s.id,student_name:s.student_name,student_number:s.student_number,present:true})),{onConflict:"attendance_date,meal,student_id"}));message=`${students?.length??0} طلبہ کی میس حاضری محفوظ ہوگئی۔`;
  }else return NextResponse.json({success:false,message:"درخواست درست نہیں۔"},{status:400});
  if(error)throw error;return NextResponse.json({success:true,message});
 }catch(error){console.error("Hostel POST",error);return NextResponse.json({success:false,message:"ریکارڈ محفوظ نہیں ہوسکا۔"},{status:500})}
}
