"use client";

import { useEffect, useMemo, useState } from "react";

type Student = { id: string; student_number: string; student_name: string; father_name: string; current_department: string };
type Fee = { id: string; student_id: string; academic_session: string; fee_month: string; fee_type: string; amount_due: number; amount_paid: number; payment_method: string | null; paid_at: string | null; receipt_number: string | null; notes: string | null };

const thisMonth = new Date().toISOString().slice(0, 7);
const initialForm = { studentId: "", feeMonth: thisMonth, feeType: "ماہانہ فیس", amountDue: "", amountPaid: "", paymentMethod: "نقد", notes: "" };

export default function FeesManager() {
  const [students, setStudents] = useState<Student[]>([]);
  const [fees, setFees] = useState<Fee[]>([]);
  const [session, setSession] = useState("");
  const [month, setMonth] = useState(thisMonth);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true); setMessage("");
    try {
      const response = await fetch(`/api/admin/fees?session=${encodeURIComponent(session)}`, { cache: "no-store" });
      if (response.status === 401) { window.location.href = "/admin/login"; return; }
      const result = await response.json(); if (!response.ok) throw new Error(result.message);
      setStudents(result.students); setFees(result.fees); setSession(result.session);
    } catch (error) { setMessage(error instanceof Error ? error.message : "ریکارڈ حاصل نہیں ہوسکا۔"); }
    finally { setLoading(false); }
  }
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, []);

  const rows = useMemo(() => students.filter(s => [s.student_number,s.student_name,s.father_name,s.current_department].join(" ").toLowerCase().includes(search.toLowerCase())).map(student => {
    const entries = fees.filter(f => f.student_id === student.id && f.fee_month === month);
    const due = entries.reduce((sum, f) => sum + Number(f.amount_due), 0);
    const paid = entries.reduce((sum, f) => sum + Number(f.amount_paid), 0);
    return { student, entries, due, paid, balance: due - paid };
  }), [students, fees, month, search]);
  const totals = rows.reduce((x, r) => ({ due: x.due + r.due, paid: x.paid + r.paid, balance: x.balance + r.balance }), { due: 0, paid: 0, balance: 0 });

  function selectStudent(student: Student, previous?: Fee) {
    setForm({ studentId: student.id, feeMonth: month, feeType: previous?.fee_type || "ماہانہ فیس", amountDue: String(previous?.amount_due ?? ""), amountPaid: String(previous?.amount_paid ?? ""), paymentMethod: previous?.payment_method || "نقد", notes: previous?.notes || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save() {
    setSaving(true); setMessage("");
    try {
      const response = await fetch("/api/admin/fees", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, academicSession: session }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.message);
      setMessage("فیس ریکارڈ اور رسید کامیابی سے محفوظ ہوگئے۔"); setForm(initialForm); await load();
    } catch (error) { setMessage(error instanceof Error ? error.message : "فیس محفوظ نہیں ہوسکی۔"); }
    finally { setSaving(false); }
  }

  function printReceipt(fee: Fee, student: Student) {
    const popup = window.open("", "_blank", "width=760,height=900"); if (!popup) return;
    const balance = Number(fee.amount_due) - Number(fee.amount_paid);
    popup.document.write(`<!doctype html><html dir="rtl"><head><meta charset="utf-8"><title>فیس رسید</title><style>body{font-family:Arial,sans-serif;padding:40px;color:#13213c}.receipt{border:2px solid #173b73;border-radius:18px;padding:28px}.head{text-align:center;border-bottom:2px solid #d4af37;padding-bottom:15px}h1{margin:0}.grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:24px 0}.box{background:#f5f7fb;padding:12px;border-radius:8px}.amount{font-size:22px;font-weight:bold}.footer{display:flex;justify-content:space-between;margin-top:55px}.line{border-top:1px solid;width:180px;text-align:center;padding-top:8px}@media print{body{padding:0}.receipt{break-inside:avoid}}</style></head><body><div class="receipt"><div class="head"><h1>جامعہ بلال الاسلامیہ</h1><p>فیس وصولی رسید</p></div><div class="grid"><div class="box"><b>رسید نمبر:</b> ${fee.receipt_number || "—"}</div><div class="box"><b>تاریخ:</b> ${fee.paid_at ? new Date(fee.paid_at).toLocaleDateString("ur-PK") : "—"}</div><div class="box"><b>طالب علم:</b> ${student.student_name}</div><div class="box"><b>طالب علم نمبر:</b> ${student.student_number}</div><div class="box"><b>والد:</b> ${student.father_name}</div><div class="box"><b>شعبہ:</b> ${student.current_department}</div><div class="box"><b>مد:</b> ${fee.fee_type}</div><div class="box"><b>مہینہ:</b> ${fee.fee_month}</div></div><p class="amount">وصول شدہ رقم: ${Number(fee.amount_paid).toLocaleString()} روپے</p><p>کل واجب: ${Number(fee.amount_due).toLocaleString()} روپے &nbsp; | &nbsp; بقایا: ${balance.toLocaleString()} روپے</p><p>طریقۂ ادائیگی: ${fee.payment_method || "—"}</p><div class="footer"><div class="line">وصول کنندہ</div><div class="line">مہر ادارہ</div></div></div><script>window.onload=()=>window.print()</script></body></html>`);
    popup.document.close();
  }

  return <div dir="rtl" className="space-y-6">
    <section className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="mb-4 text-xl font-black">نئی فیس / ادائیگی درج کریں</h2><div className="grid gap-3 md:grid-cols-4">
      <select value={form.studentId} onChange={e=>setForm({...form,studentId:e.target.value})} className="rounded-xl border p-3"><option value="">طالب علم منتخب کریں</option>{students.map(s=><option key={s.id} value={s.id}>{s.student_number} — {s.student_name}</option>)}</select>
      <input type="month" value={form.feeMonth} onChange={e=>setForm({...form,feeMonth:e.target.value})} className="rounded-xl border p-3" />
      <select value={form.feeType} onChange={e=>setForm({...form,feeType:e.target.value})} className="rounded-xl border p-3"><option>ماہانہ فیس</option><option>داخلہ فیس</option><option>امتحانی فیس</option><option>ہاسٹل فیس</option><option>کتب</option><option>دیگر</option></select>
      <input type="number" min="0" value={form.amountDue} onChange={e=>setForm({...form,amountDue:e.target.value})} placeholder="واجب رقم" className="rounded-xl border p-3" />
      <input type="number" min="0" value={form.amountPaid} onChange={e=>setForm({...form,amountPaid:e.target.value})} placeholder="وصول شدہ رقم" className="rounded-xl border p-3" />
      <select value={form.paymentMethod} onChange={e=>setForm({...form,paymentMethod:e.target.value})} className="rounded-xl border p-3"><option>نقد</option><option>بینک</option><option>ایزی پیسہ</option><option>جاز کیش</option><option>آن لائن</option></select>
      <input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="نوٹس" className="rounded-xl border p-3" />
      <button onClick={()=>void save()} disabled={saving || !form.studentId || !form.amountDue} className="rounded-xl bg-blue-900 p-3 font-bold text-white disabled:opacity-50">{saving ? "محفوظ ہورہا ہے…" : "محفوظ کریں اور رسید بنائیں"}</button>
    </div>{message && <p className="mt-4 rounded-xl bg-blue-50 p-3 text-blue-900">{message}</p>}</section>
    <div className="grid gap-3 md:grid-cols-3"><Stat title="کل واجب" value={totals.due}/><Stat title="کل وصول" value={totals.paid}/><Stat title="کل بقایا" value={totals.balance} alert/></div>
    <section className="rounded-2xl bg-white p-4 shadow-sm"><div className="mb-4 grid gap-3 md:grid-cols-3"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="نام، طالب علم نمبر یا شعبہ" className="rounded-xl border p-3 md:col-span-2"/><input type="month" value={month} onChange={e=>setMonth(e.target.value)} className="rounded-xl border p-3"/></div><div className="overflow-x-auto"><table className="min-w-full text-right text-sm"><thead className="bg-slate-100"><tr>{["طالب علم","شعبہ","واجب","وصول","بقایا","کارروائی"].map(x=><th key={x} className="p-3">{x}</th>)}</tr></thead><tbody>{loading?<tr><td colSpan={6} className="p-10 text-center">لوڈ ہورہا ہے…</td></tr>:rows.map(r=><tr key={r.student.id} className="border-t"><td className="p-3"><b>{r.student.student_name}</b><small className="block text-slate-500">{r.student.student_number}</small></td><td className="p-3">{r.student.current_department}</td><td className="p-3">{r.due.toLocaleString()}</td><td className="p-3 text-green-700">{r.paid.toLocaleString()}</td><td className="p-3 font-bold text-red-700">{r.balance.toLocaleString()}</td><td className="p-3 whitespace-nowrap"><button onClick={()=>selectStudent(r.student,r.entries[0])} className="rounded-lg bg-blue-50 px-3 py-2 text-blue-800">درج/اپڈیٹ</button>{r.entries[0]?.receipt_number && <button onClick={()=>printReceipt(r.entries[0],r.student)} className="mr-2 rounded-lg bg-amber-50 px-3 py-2 text-amber-800">رسید</button>}</td></tr>)}</tbody></table></div></section>
  </div>;
}

function Stat({title,value,alert=false}:{title:string;value:number;alert?:boolean}) { return <div className={`rounded-2xl p-5 shadow-sm ${alert?"bg-red-50 text-red-900":"bg-white text-slate-900"}`}><p className="text-sm opacity-70">{title}</p><p className="mt-2 text-3xl font-black">{value.toLocaleString()} <small className="text-sm">روپے</small></p></div>; }
