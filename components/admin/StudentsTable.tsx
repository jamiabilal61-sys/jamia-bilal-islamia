"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Session = { id: string; academic_session: string; department: string; class_name: string | null; roll_number: string | null; teacher_name: string | null; hostel_status: string; room_number: string | null; session_status: string; notes: string | null };
type Student = { id: string; student_number: string; student_name: string; father_name: string; phone: string | null; current_department: string; student_status: string; student_image_signed_url?: string | null; student_sessions: Session[] };

const emptySession = { academicSession: "", department: "", className: "", rollNumber: "", teacherName: "", hostelStatus: "غیر رہائشی", roomNumber: "", sessionStatus: "جاری", notes: "" };

export default function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("تمام");
  const [detail, setDetail] = useState<Student | null>(null);
  const [form, setForm] = useState(emptySession);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/admin/students", { cache: "no-store" });
      if (response.status === 401) { window.location.href = "/admin/login"; return; }
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      setStudents(result.students);
      setForm((x) => ({ ...x, academicSession: result.currentSession }));
    } catch (e) { setError(e instanceof Error ? e.message : "ریکارڈ حاصل نہیں ہوسکا۔"); }
    finally { setLoading(false); }
  }
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, []);

  const visible = useMemo(() => students.filter((s) => [s.student_number, s.student_name, s.father_name, s.phone, s.current_department].join(" ").toLowerCase().includes(search.toLowerCase()) && (filter === "تمام" || s.student_status === filter)), [students, search, filter]);

  function open(student: Student) {
    setDetail(student);
    setForm((x) => ({ ...emptySession, academicSession: x.academicSession, department: student.current_department }));
  }

  async function saveSession() {
    if (!detail) return; setSaving(true); setError("");
    try {
      const response = await fetch("/api/admin/students", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentId: detail.id, ...form }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.message);
      await load(); setDetail(null);
    } catch (e) { setError(e instanceof Error ? e.message : "ریکارڈ محفوظ نہیں ہوسکا۔"); }
    finally { setSaving(false); }
  }

  async function changeStatus(student: Student, studentStatus: string) {
    const response = await fetch("/api/admin/students", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: student.id, studentStatus }) });
    const result = await response.json(); if (!response.ok) { setError(result.message); return; } await load();
  }

  return <section dir="rtl" className="space-y-5">
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-3">
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="نام، طالب علم نمبر، موبائل یا شعبہ" className="rounded-xl border px-4 py-3 md:col-span-2" />
      <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border px-4 py-3"><option>تمام</option><option>فعال</option><option>غیر فعال</option><option>فارغ التحصیل</option><option>اخراج</option></select>
    </div>
    {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm"><table className="min-w-full text-right text-sm"><thead className="bg-slate-100"><tr>{["طالب علم نمبر","نام","والد","شعبہ","موبائل","سالانہ ریکارڈ","حیثیت","تفصیل"].map(x => <th key={x} className="p-3 whitespace-nowrap">{x}</th>)}</tr></thead><tbody>
      {loading ? <tr><td colSpan={8} className="p-10 text-center">ریکارڈ لوڈ ہورہا ہے…</td></tr> : visible.length === 0 ? <tr><td colSpan={8} className="p-10 text-center text-slate-500">کوئی طالب علم نہیں ملا۔ منظور شدہ داخلہ خود یہاں آجائے گا۔</td></tr> : visible.map(s => <tr key={s.id} className="border-t hover:bg-slate-50"><td className="p-3 font-mono">{s.student_number}</td><td className="p-3 font-bold">{s.student_name}</td><td className="p-3">{s.father_name}</td><td className="p-3">{s.current_department}</td><td className="p-3" dir="ltr">{s.phone}</td><td className="p-3">{s.student_sessions?.length ?? 0}</td><td className="p-3"><select value={s.student_status} onChange={(e) => void changeStatus(s, e.target.value)} className="rounded-lg border p-2"><option>فعال</option><option>غیر فعال</option><option>فارغ التحصیل</option><option>اخراج</option></select></td><td className="p-3"><button onClick={() => open(s)} className="rounded-lg bg-blue-50 px-3 py-2 text-blue-800">پروفائل</button></td></tr>)}
    </tbody></table></div>
    {detail && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" onMouseDown={(e) => e.target === e.currentTarget && setDetail(null)}><div className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
      <div className="flex justify-between gap-4 border-b pb-4"><div className="flex items-center gap-4">{detail.student_image_signed_url && <Image src={detail.student_image_signed_url} alt={detail.student_name} width={72} height={84} unoptimized className="h-20 w-16 rounded-xl object-cover" />}<div><h2 className="text-2xl font-black">{detail.student_name}</h2><p className="text-slate-500">{detail.student_number} — {detail.current_department}</p></div></div><button onClick={() => setDetail(null)} className="h-10 w-10 rounded-full bg-slate-100 text-2xl">×</button></div>
      <h3 className="mt-6 text-xl font-bold">گزشتہ تعلیمی ریکارڈ</h3><div className="mt-3 overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-slate-100"><tr>{["سیشن","شعبہ/جماعت","رول نمبر","استاد","رہائش","نتیجہ"].map(x => <th key={x} className="p-3">{x}</th>)}</tr></thead><tbody>{detail.student_sessions?.sort((a,b) => b.academic_session.localeCompare(a.academic_session)).map(x => <tr key={x.id} className="border-t"><td className="p-3">{x.academic_session}</td><td className="p-3">{x.department}{x.class_name ? ` — ${x.class_name}` : ""}</td><td className="p-3">{x.roll_number || "—"}</td><td className="p-3">{x.teacher_name || "—"}</td><td className="p-3">{x.hostel_status}{x.room_number ? ` (${x.room_number})` : ""}</td><td className="p-3">{x.session_status}</td></tr>)}</tbody></table></div>
      <h3 className="mt-7 border-t pt-6 text-xl font-bold">نیا سال / موجودہ سال اپڈیٹ کریں</h3><div className="mt-4 grid gap-4 md:grid-cols-3">
        <label>تعلیمی سیشن<input value={form.academicSession} onChange={e=>setForm({...form,academicSession:e.target.value})} className="mt-1 w-full rounded-xl border p-3" placeholder="2026-2027" /></label><label>شعبہ<input value={form.department} onChange={e=>setForm({...form,department:e.target.value})} className="mt-1 w-full rounded-xl border p-3" /></label><label>جماعت<input value={form.className} onChange={e=>setForm({...form,className:e.target.value})} className="mt-1 w-full rounded-xl border p-3" /></label>
        <label>رول نمبر<input value={form.rollNumber} onChange={e=>setForm({...form,rollNumber:e.target.value})} className="mt-1 w-full rounded-xl border p-3" /></label><label>استاد<input value={form.teacherName} onChange={e=>setForm({...form,teacherName:e.target.value})} className="mt-1 w-full rounded-xl border p-3" /></label><label>سیشن نتیجہ<select value={form.sessionStatus} onChange={e=>setForm({...form,sessionStatus:e.target.value})} className="mt-1 w-full rounded-xl border p-3"><option>جاری</option><option>کامیاب</option><option>دہرائی</option><option>مکمل</option><option>منسوخ</option></select></label>
        <label>رہائش<select value={form.hostelStatus} onChange={e=>setForm({...form,hostelStatus:e.target.value})} className="mt-1 w-full rounded-xl border p-3"><option>غیر رہائشی</option><option>رہائشی</option></select></label><label>کمرہ نمبر<input value={form.roomNumber} onChange={e=>setForm({...form,roomNumber:e.target.value})} className="mt-1 w-full rounded-xl border p-3" /></label><label>نوٹس<input value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} className="mt-1 w-full rounded-xl border p-3" /></label>
      </div><div className="mt-6 flex justify-end"><button onClick={() => void saveSession()} disabled={saving || !form.academicSession || !form.department} className="rounded-xl bg-blue-800 px-6 py-3 font-bold text-white disabled:opacity-50">{saving ? "محفوظ ہورہا ہے…" : "سالانہ ریکارڈ محفوظ کریں"}</button></div>
    </div></div>}
  </section>;
}
