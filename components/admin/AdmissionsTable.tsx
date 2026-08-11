"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import AdmissionPrintDocument from "./AdmissionPrintDocument";
import StudentCardPrint from "./StudentCardPrint";

export type Admission = {
  id: string;
  admission_number: string | null;
  student_name: string;
  father_name: string;
  phone: string;
  email: string | null;
  date_of_birth: string;
  gender: string;
  department: string;
  address: string;
  student_image_signed_url?: string | null;
  status: "زیر غور" | "منظور" | "مسترد";
  admin_notes: string | null;
  created_at: string;
};

const labels: Record<string, string> = {
  admission_number: "داخلہ نمبر", student_name: "طالب علم", father_name: "والد کا نام",
  phone: "موبائل", email: "ای میل", date_of_birth: "تاریخ پیدائش", gender: "جنس",
  department: "شعبہ", address: "پتہ", status: "حیثیت", created_at: "درخواست کی تاریخ",
};

export default function AdmissionsTable() {
  const [items, setItems] = useState<Admission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("تمام");
  const [department, setDepartment] = useState("تمام");
  const [sortKey, setSortKey] = useState<keyof Admission>("created_at");
  const [ascending, setAscending] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [detail, setDetail] = useState<Admission | null>(null);
  const [saving, setSaving] = useState(false);
  const [printAdmission, setPrintAdmission] = useState<Admission | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [printMode, setPrintMode] = useState<"form" | "card" | null>(null);

  async function load() {
    setError("");
    try {
      const response = await fetch("/api/admin/admissions", { cache: "no-store" });
      if (response.status === 401) { window.location.href = "/admin/login"; return; }
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "ریکارڈ حاصل نہیں ہوسکا۔");
      setItems(result.admissions);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "ریکارڈ حاصل نہیں ہوسکا۔");
    } finally { setLoading(false); }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, []);

  const departments = useMemo(() => Array.from(new Set(items.map((x) => x.department))).sort(), [items]);
  const visible = useMemo(() => items.filter((item) => {
    const haystack = [item.admission_number, item.student_name, item.father_name, item.phone, item.email, item.address].join(" ").toLowerCase();
    return haystack.includes(search.toLowerCase()) && (status === "تمام" || item.status === status) && (department === "تمام" || item.department === department);
  }).sort((a, b) => {
    const left = String(a[sortKey] ?? ""); const right = String(b[sortKey] ?? "");
    return left.localeCompare(right, "ur", { numeric: true }) * (ascending ? 1 : -1);
  }), [items, search, status, department, sortKey, ascending]);

  const exportItems = selected.size ? visible.filter((item) => selected.has(item.id)) : visible;
  const exportRows = exportItems.map((item) => ({
    "داخلہ نمبر": item.admission_number ?? "", "طالب علم": item.student_name, "والد کا نام": item.father_name,
    "موبائل": item.phone, "ای میل": item.email ?? "", "تاریخ پیدائش": item.date_of_birth, "جنس": item.gender,
    "شعبہ": item.department, "پتہ": item.address, "حیثیت": item.status,
    "درخواست کی تاریخ": new Date(item.created_at).toLocaleDateString("ur-PK"),
  }));

  async function exportExcel() {
    const XLSX = await import("xlsx");
    const sheet = XLSX.utils.json_to_sheet(exportRows);
    sheet["!cols"] = Object.keys(exportRows[0] ?? {}).map(() => ({ wch: 22 }));
    const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, "Admissions");
    XLSX.writeFile(book, "jamia-bilal-admissions.xlsx");
  }

  async function exportWord() {
    const { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } = await import("docx");
    const headers = Object.keys(exportRows[0] ?? { "ریکارڈ": "" });
    const rows = [headers, ...exportRows.map((row) => headers.map((key) => String(row[key as keyof typeof row] ?? "")))];
    const table = new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: rows.map((row, index) => new TableRow({ children: row.map((value) => new TableCell({ children: [new Paragraph({ bidirectional: true, children: [new TextRun({ text: value, bold: index === 0 })] })] })) })) });
    const doc = new Document({ sections: [{ children: [new Paragraph({ alignment: "center", bidirectional: true, children: [new TextRun({ text: "جامعہ بلال الاسلامیہ لاہور — داخلہ ریکارڈ", bold: true, size: 32 })] }), table] }] });
    const blob = await Packer.toBlob(doc); download(blob, "jamia-bilal-admissions.docx");
  }

  async function exportPdf() {
    const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import("html2canvas"), import("jspdf")]);
    const node = document.getElementById("admissions-print-area"); if (!node) return;
    const canvas = await html2canvas(node, { scale: 2, backgroundColor: "#ffffff" });
    const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
    const width = 277; const height = canvas.height * width / canvas.width;
    pdf.addImage(canvas.toDataURL("image/png"), "PNG", 10, 10, width, Math.min(height, 190));
    pdf.save("jamia-bilal-admissions.pdf");
  }

  function download(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = filename; anchor.click(); URL.revokeObjectURL(url);
  }

  async function printForm(admission: Admission) {
    const QRCode = await import("qrcode");
    const qrValue = JSON.stringify({
      id: admission.id,
      admissionNumber: admission.admission_number,
      studentName: admission.student_name,
      department: admission.department,
    });
    const dataUrl = await QRCode.toDataURL(qrValue, { width: 240, margin: 1, errorCorrectionLevel: "M" });
    setPrintAdmission(admission);
    setPrintMode("form");
    setQrDataUrl(dataUrl);
    window.setTimeout(() => window.print(), 250);
  }

  async function printStudentCard(admission: Admission) {
    if (admission.status !== "منظور") {
      setError("سٹوڈنٹ کارڈ صرف منظور شدہ طالب علم کے لیے جاری ہوسکتا ہے۔");
      return;
    }
    const year = new Date().getFullYear();
    const QRCode = await import("qrcode");
    const dataUrl = await QRCode.toDataURL(JSON.stringify({
      id: admission.id,
      admissionNumber: admission.admission_number,
      studentName: admission.student_name,
      department: admission.department,
      academicSession: `${year}-${year + 1}`,
    }), { width: 240, margin: 1, errorCorrectionLevel: "M" });
    setPrintAdmission(admission);
    setPrintMode("card");
    setQrDataUrl(dataUrl);
    window.setTimeout(() => window.print(), 250);
  }

  async function saveDetail() {
    if (!detail) return; setSaving(true); setError("");
    try {
      const response = await fetch("/api/admin/admissions", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: detail.id, status: detail.status, adminNotes: detail.admin_notes }) });
      const result = await response.json(); if (!response.ok) throw new Error(result.message || "ریکارڈ اپڈیٹ نہیں ہوسکا۔");
      setItems((current) => current.map((item) => item.id === detail.id ? { ...item, ...result.admission } : item)); setDetail(null);
    } catch (saveError) { setError(saveError instanceof Error ? saveError.message : "ریکارڈ اپڈیٹ نہیں ہوسکا۔"); }
    finally { setSaving(false); }
  }

  return <section dir="rtl" className="space-y-5">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div><h1 className="text-3xl font-black text-slate-900">داخلہ درخواستیں</h1><p className="text-slate-500 mt-1">کل {items.length} درخواستیں — موجودہ نتیجہ {visible.length}</p></div>
      <div className="flex flex-wrap gap-2">
        <button onClick={exportExcel} disabled={!exportItems.length} className="rounded-xl bg-emerald-700 px-4 py-2 text-white disabled:opacity-50">Excel</button>
        <button onClick={exportWord} disabled={!exportItems.length} className="rounded-xl bg-blue-700 px-4 py-2 text-white disabled:opacity-50">Word</button>
        <button onClick={exportPdf} disabled={!exportItems.length} className="rounded-xl bg-red-700 px-4 py-2 text-white disabled:opacity-50">PDF</button>
      </div>
    </div>
    <div className="grid gap-3 rounded-2xl bg-white p-4 shadow-sm md:grid-cols-4">
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="نام، نمبر، موبائل یا پتہ تلاش کریں" className="rounded-xl border px-4 py-3" />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-xl border px-4 py-3"><option>تمام</option><option>زیر غور</option><option>منظور</option><option>مسترد</option></select>
      <select value={department} onChange={(e) => setDepartment(e.target.value)} className="rounded-xl border px-4 py-3"><option>تمام</option>{departments.map((x) => <option key={x}>{x}</option>)}</select>
      <select value={String(sortKey)} onChange={(e) => setSortKey(e.target.value as keyof Admission)} className="rounded-xl border px-4 py-3"><option value="created_at">تاریخ کے مطابق</option><option value="student_name">نام کے مطابق</option><option value="admission_number">داخلہ نمبر کے مطابق</option><option value="department">شعبہ کے مطابق</option></select>
    </div>
    <button onClick={() => setAscending((x) => !x)} className="text-sm text-blue-800">ترتیب: {ascending ? "اوپر سے نیچے ↑" : "نیچے سے اوپر ↓"}</button>
    {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}
    <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
      <table className="min-w-full text-right text-sm"><thead className="bg-slate-100"><tr>
        <th className="p-3"><input type="checkbox" checked={visible.length > 0 && visible.every((x) => selected.has(x.id))} onChange={(e) => setSelected(e.target.checked ? new Set(visible.map((x) => x.id)) : new Set())} /></th>
        {['داخلہ نمبر','طالب علم','والد','شعبہ','موبائل','تاریخ','حیثیت','تفصیل'].map((x) => <th key={x} className="whitespace-nowrap p-3">{x}</th>)}
      </tr></thead><tbody>{loading ? <tr><td colSpan={9} className="p-10 text-center">ریکارڈ لوڈ ہورہا ہے…</td></tr> : visible.length === 0 ? <tr><td colSpan={9} className="p-10 text-center text-slate-500">کوئی ریکارڈ نہیں ملا۔</td></tr> : visible.map((item) => <tr key={item.id} className="border-t hover:bg-slate-50">
        <td className="p-3"><input type="checkbox" checked={selected.has(item.id)} onChange={(e) => setSelected((current) => { const next = new Set(current); if (e.target.checked) next.add(item.id); else next.delete(item.id); return next; })} /></td>
        <td className="p-3 font-mono">{item.admission_number}</td><td className="p-3 font-bold">{item.student_name}</td><td className="p-3">{item.father_name}</td><td className="p-3">{item.department}</td><td className="p-3" dir="ltr">{item.phone}</td><td className="p-3 whitespace-nowrap">{new Date(item.created_at).toLocaleDateString("ur-PK")}</td>
        <td className="p-3"><span className={`rounded-full px-3 py-1 ${item.status === "منظور" ? "bg-green-100 text-green-800" : item.status === "مسترد" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>{item.status}</span></td>
        <td className="p-3"><button onClick={() => setDetail({ ...item })} className="rounded-lg bg-blue-50 px-3 py-2 text-blue-800">دیکھیں</button></td>
      </tr>)}</tbody></table>
    </div>
    <div id="admissions-print-area" className="fixed -left-[10000px] top-0 w-[1100px] bg-white p-8 text-black"><h2 className="mb-6 text-center text-2xl font-bold">جامعہ بلال الاسلامیہ لاہور — داخلہ ریکارڈ</h2><table className="w-full border-collapse text-sm"><thead><tr>{Object.keys(exportRows[0] ?? {}).map((x) => <th key={x} className="border p-2">{x}</th>)}</tr></thead><tbody>{exportRows.map((row, i) => <tr key={i}>{Object.values(row).map((x, j) => <td key={j} className="border p-2">{x}</td>)}</tr>)}</tbody></table></div>
    {detail && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(e) => e.target === e.currentTarget && setDetail(null)}><div className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
      <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b bg-white/95 px-5 py-4 backdrop-blur sm:px-7"><div><h2 className="text-2xl font-black text-slate-900">{detail.student_name}</h2><p className="mt-1 text-sm text-slate-500">داخلہ نمبر: <span dir="ltr" className="font-semibold">{detail.admission_number}</span></p></div><button onClick={() => setDetail(null)} aria-label="تفصیل بند کریں" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-2xl text-slate-700 hover:bg-slate-200">×</button></div>
      <div className="p-5 sm:p-7">
      <div className={`grid items-start gap-5 ${detail.student_image_signed_url ? "md:grid-cols-[160px_minmax(0,1fr)]" : "grid-cols-1"}`}>{detail.student_image_signed_url && <Image src={detail.student_image_signed_url} alt={detail.student_name} width={160} height={190} unoptimized className="mx-auto h-[190px] w-[160px] rounded-2xl border object-cover shadow-sm md:mx-0" />}<div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">{Object.entries(labels).map(([key,label]) => <div key={key} className={`min-w-0 rounded-2xl border border-slate-100 bg-slate-50 p-4 ${key === "address" ? "sm:col-span-2" : ""}`}><div className="text-xs font-medium text-slate-500">{label}</div><div className="mt-1 break-words font-semibold leading-7 text-slate-900">{key === "created_at" ? new Date(detail.created_at).toLocaleString("ur-PK") : String(detail[key as keyof Admission] ?? "—")}</div></div>)}</div></div>
      <div className="mt-6 grid gap-5 border-t pt-6 md:grid-cols-2"><label className="font-bold text-slate-800">حیثیت<select value={detail.status} onChange={(e) => setDetail({ ...detail, status: e.target.value as Admission['status'] })} className="mt-2 w-full rounded-xl border border-slate-300 bg-white p-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"><option>زیر غور</option><option>منظور</option><option>مسترد</option></select></label><label className="font-bold text-slate-800">ایڈمن نوٹس<textarea value={detail.admin_notes ?? ""} onChange={(e) => setDetail({ ...detail, admin_notes: e.target.value })} placeholder="درخواست کے متعلق نوٹ لکھیں" className="mt-2 min-h-28 w-full resize-y rounded-xl border border-slate-300 p-3 font-normal outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100" /></label></div>
      <div className="mt-6 flex flex-wrap justify-end gap-3"><button onClick={() => void printForm(detail)} className="rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-emerald-800">داخلہ فارم، رسید / PDF</button><button onClick={() => void printStudentCard(detail)} disabled={detail.status !== "منظور"} title={detail.status !== "منظور" ? "پہلے درخواست منظور کریں" : "سالانہ سٹوڈنٹ کارڈ"} className="rounded-xl bg-violet-700 px-5 py-3 font-semibold text-white shadow-sm hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-40">سالانہ سٹوڈنٹ کارڈ</button><button onClick={saveDetail} disabled={saving} className="rounded-xl bg-blue-800 px-6 py-3 font-semibold text-white shadow-sm hover:bg-blue-900 disabled:opacity-50">{saving ? "محفوظ ہورہا ہے…" : "تبدیلی محفوظ کریں"}</button></div>
      </div>
    </div></div>}
    {printAdmission && printMode === "form" && <AdmissionPrintDocument admission={printAdmission} qrDataUrl={qrDataUrl} />}
    {printAdmission && printMode === "card" && <StudentCardPrint admission={printAdmission} qrDataUrl={qrDataUrl} />}
  </section>;
}
