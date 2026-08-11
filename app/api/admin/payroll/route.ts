import { NextRequest, NextResponse } from "next/server";
import { adminDb, isAuthorizedAdmin } from "@/lib/admin-db";
export const runtime = "nodejs";
const clean=(v:unknown)=>String(v??"").trim();
const number=(v:unknown)=>Math.max(0,Number(v)||0);

export async function GET(request:NextRequest){
 if(!(await isAuthorizedAdmin(request)))return NextResponse.json({success:false},{status:401});
 try{const db=adminDb();const [employees,attendance,payroll]=await Promise.all([
  db.from("faculty_members").select("*").order("teacher_name"),
  db.from("employee_attendance").select("*").order("attendance_date",{ascending:false}).limit(3000),
  db.from("employee_payroll").select("*").order("payroll_month",{ascending:false}).limit(1000)
 ]);const error=[employees,attendance,payroll].find(x=>x.error)?.error;if(error)throw error;
 return NextResponse.json({success:true,employees:employees.data??[],attendance:attendance.data??[],payroll:payroll.data??[]});
 }catch(error){console.error("Payroll GET",error);return NextResponse.json({success:false,message:"ملازمین کا ریکارڈ حاصل نہیں ہوسکا۔ پہلے employee-payroll.sql چلائیں۔"},{status:500})}
}

export async function POST(request:NextRequest){
 if(!(await isAuthorizedAdmin(request)))return NextResponse.json({success:false},{status:401});
 try{const b=await request.json(),db=adminDb();let error:unknown=null,message="ریکارڈ محفوظ ہوگیا۔";
  if(b.action==="profile"){
   if(!b.employeeId)return NextResponse.json({success:false,message:"ملازم منتخب کریں۔"},{status:400});
   ({error}=await db.from("faculty_members").update({employee_number:clean(b.employeeNumber)||null,designation:clean(b.designation)||"استاد",joining_date:b.joiningDate||null,basic_salary:number(b.basicSalary),bank_details:clean(b.bankDetails)||null,updated_at:new Date().toISOString()}).eq("id",b.employeeId));message="ملازم کی تنخواہی پروفائل محفوظ ہوگئی۔";
  }else if(b.action==="attendance"){
   if(!b.employeeId||!b.date)return NextResponse.json({success:false,message:"ملازم اور تاریخ منتخب کریں۔"},{status:400});
   ({error}=await db.from("employee_attendance").upsert({employee_id:b.employeeId,attendance_date:b.date,status:b.status||"حاضر",check_in:b.checkIn||null,check_out:b.checkOut||null,notes:clean(b.notes)||null,updated_at:new Date().toISOString()},{onConflict:"employee_id,attendance_date"}));message="حاضری محفوظ ہوگئی۔";
  }else if(b.action==="payroll"){
   if(!b.employeeId||!b.month)return NextResponse.json({success:false,message:"ملازم اور مہینہ منتخب کریں۔"},{status:400});
   const month=`${clean(b.month).slice(0,7)}-01`,start=`${clean(b.month).slice(0,7)}-01`;const endDate=new Date(`${start}T00:00:00Z`);endDate.setUTCMonth(endDate.getUTCMonth()+1);const end=endDate.toISOString().slice(0,10);
   const [{data:employee},{data:rows,error:attendanceError}]=await Promise.all([db.from("faculty_members").select("basic_salary").eq("id",b.employeeId).single(),db.from("employee_attendance").select("status").eq("employee_id",b.employeeId).gte("attendance_date",start).lt("attendance_date",end)]);if(attendanceError)throw attendanceError;
   const working=rows?.length||0,present=(rows||[]).reduce((n,r)=>n+(r.status==="حاضر"?1:r.status==="نصف دن"?0.5:0),0),absent=(rows||[]).reduce((n,r)=>n+(r.status==="غیر حاضر"?1:r.status==="نصف دن"?0.5:0),0),leave=(rows||[]).filter(r=>r.status==="رخصت").length;
   const basic=number(b.basicSalary||employee?.basic_salary),attendanceDeduction=working?Math.round((basic/working)*absent):0,allowances=number(b.allowances),otherDeductions=number(b.otherDeductions),net=Math.max(0,basic+allowances-attendanceDeduction-otherDeductions);
   ({error}=await db.from("employee_payroll").upsert({employee_id:b.employeeId,payroll_month:month,basic_salary:basic,working_days:working,present_days:present,absent_days:absent,leave_days:leave,attendance_deduction:attendanceDeduction,allowances,other_deductions:otherDeductions,net_salary:net,notes:clean(b.notes)||null,updated_at:new Date().toISOString()},{onConflict:"employee_id,payroll_month"}));message=`تنخواہ تیار ہوگئی؛ قابلِ ادائیگی رقم ${net.toLocaleString()} روپے ہے۔`;
  }else if(b.action==="paid"){
   ({error}=await db.from("employee_payroll").update({payment_status:"ادا شدہ",paid_at:b.paidAt||new Date().toISOString().slice(0,10),payment_method:clean(b.paymentMethod)||"نقد",reference_number:clean(b.referenceNumber)||null,updated_at:new Date().toISOString()}).eq("id",b.payrollId));message="تنخواہ کی ادائیگی درج ہوگئی۔";
  }else return NextResponse.json({success:false,message:"درخواست درست نہیں۔"},{status:400});
  if(error)throw error;return NextResponse.json({success:true,message});
 }catch(error){console.error("Payroll POST",error);return NextResponse.json({success:false,message:"ریکارڈ محفوظ نہیں ہوسکا۔ ملازم نمبر کی تکرار یا ڈیٹابیس ترتیب چیک کریں۔"},{status:500})}
}
