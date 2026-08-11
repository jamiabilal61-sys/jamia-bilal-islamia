"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Student = { id: string; student_number: string; student_name: string; father_name: string; phone: string; current_department: string };
type Template = { id: string; title: string; category: string; channel: string; body: string };
type QueueItem = { id: string; recipient_name: string; recipient_phone: string; channel: string; category: string; message: string; status: string; scheduled_at: string };

const labels: Record<string, string> = { pending_approval: "منظوری منتظر", approved: "منظور شدہ", sent: "ارسال شدہ", failed: "ناکام", cancelled: "منسوخ" };

export default function NotificationsManager() {
  const [students, setStudents] = useState<Student[]>([]), [templates, setTemplates] = useState<Template[]>([]), [queue, setQueue] = useState<QueueItem[]>([]);
  const [selected, setSelected] = useState<string[]>([]), [message, setMessage] = useState(""), [channel, setChannel] = useState("whatsapp"), [category, setCategory] = useState("عمومی"), [search, setSearch] = useState("");
  const [notice, setNotice] = useState(""), [busy, setBusy] = useState(false);
  const load = async () => { const r = await fetch("/api/admin/notifications"); const j = await r.json(); if (j.success) { setStudents(j.students); setTemplates(j.templates); setQueue(j.queue); } else setNotice(j.message || "ریکارڈ دستیاب نہیں۔"); };
  useEffect(() => { void load(); }, []);
  const shown = useMemo(() => students.filter(s => `${s.student_name} ${s.father_name} ${s.student_number} ${s.phone}`.includes(search)), [students, search]);
  const submit = async (e: FormEvent) => { e.preventDefault(); setBusy(true); const r = await fetch("/api/admin/notifications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentIds: selected, message, channel, category }) }); const j = await r.json(); setNotice(j.success ? `${j.queued} پیغامات منظوری کی قطار میں شامل ہوگئے۔` : j.message); if (j.success) { setSelected([]); setMessage(""); await load(); } setBusy(false); };
  const change = async (id: string, status: string) => { await fetch("/api/admin/notifications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }) }); await load(); };
  const wa = (item: QueueItem) => `https://wa.me/${item.recipient_phone.replace(/^0/, "92").replace(/\D/g, "")}?text=${encodeURIComponent(item.message)}`;
  return <div className="space-y-7">
    {notice && <div className="rounded-xl bg-blue-50 p-4 text-blue-900">{notice}</div>}
    <form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="grid gap-4 md:grid-cols-3"><select value={channel} onChange={e=>setChannel(e.target.value)} className="rounded-xl border p-3"><option value="whatsapp">WhatsApp</option><option value="sms">SMS</option></select><select value={category} onChange={e=>setCategory(e.target.value)} className="rounded-xl border p-3"><option>عمومی</option><option>فیس یاددہانی</option><option>غیر حاضری</option><option>نتیجہ</option><option>رخصت</option><option>ہنگامی</option></select><select onChange={e=>{const t=templates.find(x=>x.id===e.target.value); if(t){setMessage(t.body);setCategory(t.category);setChannel(t.channel);}}} className="rounded-xl border p-3"><option value="">محفوظ سانچہ منتخب کریں</option>{templates.map(t=><option key={t.id} value={t.id}>{t.title}</option>)}</select></div>
      <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={5} placeholder="پیغام لکھیں۔ {طالب علم} اور {طالب علم نمبر} خود تبدیل ہوں گے۔" className="mt-4 w-full rounded-xl border p-3" />
      <div className="mt-4 rounded-xl border p-4"><div className="mb-3 flex flex-wrap gap-3"><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="طالب علم، نمبر یا موبائل تلاش کریں" className="min-w-64 flex-1 rounded-lg border p-2"/><button type="button" onClick={()=>setSelected(shown.map(s=>s.id))} className="rounded-lg bg-slate-100 px-4">سب منتخب</button><button type="button" onClick={()=>setSelected([])} className="rounded-lg bg-slate-100 px-4">انتخاب ختم</button></div><div className="grid max-h-52 gap-2 overflow-auto md:grid-cols-2">{shown.map(s=><label key={s.id} className="flex gap-2 rounded-lg bg-slate-50 p-2"><input type="checkbox" checked={selected.includes(s.id)} onChange={e=>setSelected(e.target.checked?[...selected,s.id]:selected.filter(x=>x!==s.id))}/><span>{s.student_name} — {s.student_number} — {s.phone || "نمبر موجود نہیں"}</span></label>)}</div></div>
      <button disabled={busy} className="mt-4 rounded-xl bg-blue-900 px-6 py-3 font-bold text-white disabled:opacity-50">{busy ? "محفوظ ہو رہا ہے…" : `منظوری کے لیے شامل کریں (${selected.length})`}</button>
    </form>
    <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"><div className="border-b p-5 text-xl font-bold">ارسال کی قطار</div><div className="overflow-x-auto"><table className="w-full text-right text-sm"><thead className="bg-slate-50"><tr><th className="p-3">وصول کنندہ</th><th className="p-3">قسم</th><th className="p-3">پیغام</th><th className="p-3">حیثیت</th><th className="p-3">کارروائی</th></tr></thead><tbody>{queue.map(q=><tr key={q.id} className="border-t"><td className="p-3">{q.recipient_name}<br/><span dir="ltr">{q.recipient_phone}</span></td><td className="p-3">{q.channel} / {q.category}</td><td className="max-w-md p-3">{q.message}</td><td className="p-3">{labels[q.status] || q.status}</td><td className="p-3"><div className="flex flex-wrap gap-2">{q.status==="pending_approval"&&<><button onClick={()=>change(q.id,"approved")} className="rounded bg-emerald-700 px-3 py-2 text-white">منظور</button><button onClick={()=>change(q.id,"cancelled")} className="rounded bg-red-700 px-3 py-2 text-white">منسوخ</button></>}{q.status==="approved"&&q.channel==="whatsapp"&&<a href={wa(q)} target="_blank" rel="noreferrer" onClick={()=>setTimeout(()=>void change(q.id,"sent"),500)} className="rounded bg-green-600 px-3 py-2 text-white">WhatsApp کھولیں</a>}</div></td></tr>)}</tbody></table></div></section>
  </div>;
}
