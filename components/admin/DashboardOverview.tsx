"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

type Stats = Record<string, number>;
const cards = [
  ["activeStudents","فعال طلبہ","🎓","/admin/students"], ["presentToday","آج حاضر طلبہ","✅","/admin/attendance"],
  ["monthlyReceived","اس ماہ وصول فیس","💰","/admin/fees"], ["monthlyDue","اس ماہ واجب الادا","🧾","/admin/fees"],
  ["results","درج نتائج","📊","/admin/exams"], ["hostelResidents","ہاسٹل کے مقیم","🏢","/admin/hostel"],
  ["activeLoans","جاری کتابیں","📚","/admin/library"], ["pendingMessages","منظوری کے منتظر پیغامات","🔔","/admin/notifications"],
  ["payrollDue","زیرِ ادائیگی تنخواہ","💼","/admin/payroll"],
];
export default function DashboardOverview() {
  const [stats,setStats]=useState<Stats>({}); const [error,setError]=useState("");
  useEffect(()=>{fetch("/api/admin/dashboard").then(r=>r.json()).then(x=>x.success?setStats(x.stats):setError(x.message)).catch(()=>setError("ڈیٹا حاصل نہیں ہوسکا۔"));},[]);
  return <div dir="rtl">
    {error && <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">{error}</div>}
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{cards.map(([key,title,icon,href])=><Link href={href} key={key} className="rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"><div className="flex items-start justify-between"><div><p className="text-slate-500">{title}</p><p className="mt-3 text-3xl font-bold text-blue-950">{stats[key] === undefined ? "…" : Number(stats[key]).toLocaleString("ur-PK")}</p></div><span className="text-3xl">{icon}</span></div></Link>)}</div>
  </div>;
}
