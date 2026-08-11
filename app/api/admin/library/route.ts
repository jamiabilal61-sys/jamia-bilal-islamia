import { NextRequest, NextResponse } from "next/server";
import { adminDb, isAuthorizedAdmin } from "@/lib/admin-db";
export const runtime = "nodejs";

function clean(value: unknown){return String(value??"").trim()}
function today(){return new Date().toISOString().slice(0,10)}

export async function GET(request:NextRequest){
 if(!(await isAuthorizedAdmin(request)))return NextResponse.json({success:false},{status:401});
 try{const db=adminDb();const [books,copies,loans,students,faculty]=await Promise.all([
  db.from("library_books").select("*").order("title"),db.from("library_copies").select("*").order("accession_number"),
  db.from("library_loans").select("*").order("issued_at",{ascending:false}).limit(1000),
  db.from("students").select("id,student_name,student_number,current_department").eq("student_status","فعال").order("student_name"),
  db.from("faculty_members").select("id,teacher_name,phone,status").eq("status","فعال").order("teacher_name")
 ]);const error=[books,copies,loans,students,faculty].find(x=>x.error)?.error;if(error)throw error;
 return NextResponse.json({success:true,books:books.data??[],copies:copies.data??[],loans:loans.data??[],students:students.data??[],faculty:faculty.data??[]});
 }catch(error){console.error("Library GET",error);return NextResponse.json({success:false,message:"لائبریری ریکارڈ حاصل نہیں ہوسکا۔ پہلے library-management.sql چلائیں۔"},{status:500})}
}

export async function POST(request:NextRequest){
 if(!(await isAuthorizedAdmin(request)))return NextResponse.json({success:false},{status:401});
 try{const b=await request.json(),db=adminDb();let error:unknown=null,message="ریکارڈ محفوظ ہوگیا۔";
  if(b.action==="book"){
   if(!clean(b.title)||!clean(b.author))return NextResponse.json({success:false,message:"کتاب اور مصنف کا نام لازمی ہے۔"},{status:400});
   const {data:book,error:bookError}=await db.from("library_books").insert({title:clean(b.title),author:clean(b.author),category:clean(b.category)||"عمومی",publisher:clean(b.publisher)||null,isbn:clean(b.isbn)||null,language:clean(b.language)||"اردو",shelf_location:clean(b.shelfLocation)||null,description:clean(b.description)||null}).select("id").single();
   if(bookError)throw bookError;const count=Math.max(1,Math.min(100,Number(b.copyCount)||1));const prefix=clean(b.accessionPrefix)||`JB-${Date.now().toString().slice(-6)}`;
   const rows=Array.from({length:count},(_,i)=>({book_id:book.id,accession_number:count===1?prefix:`${prefix}-${String(i+1).padStart(2,"0")}`,condition:"درست",status:"دستیاب"}));({error}=await db.from("library_copies").insert(rows));message=`کتاب اور ${count} نسخے محفوظ ہوگئے۔`;
  }else if(b.action==="copy"){
   if(!b.bookId||!clean(b.accessionNumber))return NextResponse.json({success:false,message:"کتاب اور نسخے کا شناختی نمبر لازمی ہے۔"},{status:400});
   ({error}=await db.from("library_copies").insert({book_id:b.bookId,accession_number:clean(b.accessionNumber),condition:b.condition||"درست",status:"دستیاب"}));message="نیا نسخہ محفوظ ہوگیا۔";
  }else if(b.action==="issue"){
   if(!b.copyId||!b.borrowerId||!b.borrowerType||!b.dueDate)return NextResponse.json({success:false,message:"نسخہ، مستعار لینے والا اور واپسی کی تاریخ منتخب کریں۔"},{status:400});
   const {data:copy}=await db.from("library_copies").select("id,book_id,accession_number,status").eq("id",b.copyId).single();if(!copy||copy.status!=="دستیاب")return NextResponse.json({success:false,message:"یہ نسخہ اس وقت دستیاب نہیں۔"},{status:409});
   let borrowerName="",borrowerNumber="";if(b.borrowerType==="طالب علم"){const {data:p}=await db.from("students").select("student_name,student_number").eq("id",b.borrowerId).single();if(!p)throw new Error("Borrower missing");borrowerName=p.student_name;borrowerNumber=p.student_number}else{const {data:p}=await db.from("faculty_members").select("teacher_name,phone").eq("id",b.borrowerId).single();if(!p)throw new Error("Borrower missing");borrowerName=p.teacher_name;borrowerNumber=p.phone||"—"}
   const {data:book}=await db.from("library_books").select("title").eq("id",copy.book_id).single();const {error:loanError}=await db.from("library_loans").insert({copy_id:copy.id,book_id:copy.book_id,book_title:book?.title||"",accession_number:copy.accession_number,borrower_type:b.borrowerType,borrower_id:b.borrowerId,borrower_name:borrowerName,borrower_number:borrowerNumber,issued_at:b.issueDate||today(),due_date:b.dueDate,status:"جاری",notes:clean(b.notes)||null});if(loanError)throw loanError;({error}=await db.from("library_copies").update({status:"جاری",updated_at:new Date().toISOString()}).eq("id",copy.id).eq("status","دستیاب"));message="کتاب کامیابی سے جاری ہوگئی۔";
  }else if(b.action==="return"){
   const {data:loan}=await db.from("library_loans").select("*").eq("id",b.loanId).eq("status","جاری").single();if(!loan)return NextResponse.json({success:false,message:"فعال اجرا ریکارڈ نہیں ملا۔"},{status:404});const returned=b.returnDate||today();const lateDays=Math.max(0,Math.ceil((new Date(returned).getTime()-new Date(loan.due_date).getTime())/86400000));const fine=Math.max(0,Number(b.fine)||0);const condition=b.condition||"درست";const finalStatus=condition==="گم شدہ"?"گم شدہ":condition==="ناقابل استعمال"?"خراب":"دستیاب";
   const {error:loanError}=await db.from("library_loans").update({returned_at:returned,late_days:lateDays,fine_amount:fine,return_condition:condition,status:condition==="گم شدہ"?"گم شدہ":"واپس",notes:clean(b.notes)||loan.notes,updated_at:new Date().toISOString()}).eq("id",b.loanId);if(loanError)throw loanError;({error}=await db.from("library_copies").update({status:finalStatus,condition,updated_at:new Date().toISOString()}).eq("id",loan.copy_id));message=`کتاب واپس ہوگئی${lateDays?`؛ ${lateDays} دن تاخیر`:""}۔`;
  }else if(b.action==="finePaid"){
   ({error}=await db.from("library_loans").update({fine_paid:true,updated_at:new Date().toISOString()}).eq("id",b.loanId));message="جرمانہ وصولی درج ہوگئی۔";
  }else return NextResponse.json({success:false,message:"درخواست درست نہیں۔"},{status:400});
  if(error)throw error;return NextResponse.json({success:true,message});
 }catch(error){console.error("Library POST",error);return NextResponse.json({success:false,message:"ریکارڈ محفوظ نہیں ہوسکا۔ شناختی نمبر کی تکرار یا ڈیٹابیس کی ترتیب چیک کریں۔"},{status:500})}
}
