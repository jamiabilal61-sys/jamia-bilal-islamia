"use client";
import { FormEvent, useEffect, useState } from "react";

type Student={id:string;student_name:string;student_number:string;father_name:string;current_department:string;phone?:string};
type Account={id:string;student_id:string;username:string;account_type:string;guardian_name?:string;guardian_phone?:string;status:string;last_login_at?:string};
type Notice={id:string;title:string;message:string;notice_type:string;students?:Student|null;created_at:string};
export default function PortalAccountsManager(){
 const [students,setStudents]=useState<Student[]>([]),[accounts,setAccounts]=useState<Account[]>([]),[notices,setNotices]=useState<Notice[]>([]),[message,setMessage]=useState("");
 const [studentId,setStudentId]=useState(""),[password,setPassword]=useState(""),[accountType,setAccountType]=useState("والدین");
 async function load(){const r=await fetch("/api/admin/portal-accounts");const d=await r.json();if(d.success){setStudents(d.students);setAccounts(d.accounts);setNotices(d.notices)}else setMessage(d.message||"ریکارڈ حاصل نہیں ہوسکا۔")}
 useEffect(()=>{void load()},[]);
 async function send(body:unknown){setMessage("محفوظ کیا جا رہا ہے…");const r=await fetch("/api/admin/portal-accounts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)});const d=await r.json();setMessage(d.message);if(d.success){setPassword("");await load()}}
 function accountSubmit(e:FormEvent){e.preventDefault();void send({action:"account",studentId,password,accountType})}
 function noticeSubmit(e:FormEvent<HTMLFormElement>){e.preventDefault();const f=new FormData(e.currentTarget);void send({action:"notice",studentId:f.get("noticeStudent"),title:f.get("title"),message:f.get("message"),noticeType:f.get("noticeType"),expiresAt:f.get("expiresAt")});e.currentTarget.reset()}
 const input="w-full rounded-xl border border-slate-300 bg-white px-4 py-3";
 return <div className="space-y-7" dir="rtl">{message&&<div className="rounded-xl bg-amber-50 p-4 text-amber-900">{message}</div>}
  <div className="grid gap-6 lg:grid-cols-2">
   <form onSubmit={accountSubmit} className="rounded-2xl bg-white p-6 shadow"><h2 className="mb-5 text-xl font-black">اکاؤنٹ بنائیں یا پاس ورڈ ری سیٹ کریں</h2><div className="space-y-4">
    <select className={input} value={studentId} onChange={e=>setStudentId(e.target.value)} required><option value="">طالب علم منتخب کریں</option>{students.map(s=><option key={s.id} value={s.id}>{s.student_number} — {s.student_name} ({s.father_name})</option>)}</select>
    <select className={input} value={accountType} onChange={e=>setAccountType(e.target.value)}><option>والدین</option><option>طالب علم</option><option>مشترکہ</option></select>
    <input className={input} type="password" minLength={6} value={password} onChange={e=>setPassword(e.target.value)} placeholder="نیا پاس ورڈ (کم از کم 6 حروف)" required />
    <p className="text-sm text-slate-500">صارف نام خودکار طور پر طالب علم نمبر ہوگا۔ پاس ورڈ صرف محفوظ کرتے وقت والدین کو دیں؛ بعد میں اصل پاس ورڈ دکھائی نہیں دے گا۔</p><button className="rounded-xl bg-blue-900 px-6 py-3 font-bold text-white">اکاؤنٹ محفوظ کریں</button>
   </div></form>
   <form onSubmit={noticeSubmit} className="rounded-2xl bg-white p-6 shadow"><h2 className="mb-5 text-xl font-black">والدین/طلبہ کو نوٹس</h2><div className="space-y-4">
    <select name="noticeStudent" className={input}><option value="">تمام والدین و طلبہ</option>{students.map(s=><option key={s.id} value={s.id}>{s.student_number} — {s.student_name}</option>)}</select>
    <div className="grid grid-cols-2 gap-3"><select name="noticeType" className={input}><option>عمومی</option><option>فیس</option><option>تعلیمی</option><option>ہنگامی</option></select><input name="expiresAt" type="date" className={input}/></div>
    <input name="title" className={input} placeholder="عنوان" required/><textarea name="message" className={input} rows={3} placeholder="مکمل پیغام" required/><button className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white">نوٹس جاری کریں</button>
   </div></form>
  </div>
  <section className="rounded-2xl bg-white p-6 shadow"><h2 className="mb-4 text-xl font-black">فعال پورٹل اکاؤنٹس ({accounts.length})</h2><div className="overflow-x-auto"><table className="w-full text-right"><thead className="bg-slate-100"><tr><th className="p-3">طالب علم</th><th>صارف نام</th><th>قسم</th><th>آخری لاگ اِن</th><th>حیثیت</th></tr></thead><tbody>{accounts.map(a=>{const s=students.find(x=>x.id===a.student_id);return <tr key={a.id} className="border-b"><td className="p-3 font-bold">{s?.student_name||"—"}</td><td>{a.username}</td><td>{a.account_type}</td><td>{a.last_login_at?new Date(a.last_login_at).toLocaleString("ur-PK"):"ابھی نہیں"}</td><td><button onClick={()=>void send({action:"status",id:a.id,status:a.status==="فعال"?"غیر فعال":"فعال"})} className={`rounded-full px-3 py-1 text-sm ${a.status==="فعال"?"bg-green-100 text-green-800":"bg-red-100 text-red-800"}`}>{a.status}</button></td></tr>})}</tbody></table></div></section>
  <section className="rounded-2xl bg-white p-6 shadow"><h2 className="mb-4 text-xl font-black">حالیہ نوٹس ({notices.length})</h2><div className="space-y-3">{notices.slice(0,10).map(n=><div key={n.id} className="rounded-xl border p-4"><b>{n.title}</b><p className="mt-1 text-slate-600">{n.message}</p></div>)}</div></section>
 </div>
}
