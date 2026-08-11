"use client";

import { useState } from "react";

type Row = { rowNumber: number; studentName: string; fatherName: string; phone: string; studentNumber: string; department: string; className: string; address: string; dateOfBirth: string; gender: string; valid: boolean; errors: string[] };

export default function StudentImportManager() {
  const [file, setFile] = useState<File | null>(null), [rows, setRows] = useState<Row[]>([]), [busy, setBusy] = useState(false), [notice, setNotice] = useState(""), [fileName, setFileName] = useState("");
  const send = async (mode: "preview" | "import") => {
    if (!file && mode === "preview") return setNotice("پہلے Word یا Excel فائل منتخب کریں۔");
    setBusy(true); setNotice(""); const form = new FormData(); form.set("mode", mode); if (file) form.set("file", file); if (mode === "import") { form.set("rows", JSON.stringify(rows.filter(r=>r.valid))); form.set("fileName", fileName); }
    const response = await fetch("/api/admin/student-import", { method: "POST", body: form }); const data = await response.json();
    if (data.success && mode === "preview") { setRows(data.rows); setFileName(data.fileName); setNotice(`${data.summary.total} قطاریں ملیں؛ ${data.summary.valid} درست اور ${data.summary.invalid} جانچ طلب ہیں۔`); }
    else if (data.success) { setNotice(`${data.imported} طلبہ کامیابی سے درآمد ہوئے، ${data.skipped} پہلے سے موجود یا چھوڑے گئے۔`); setRows([]); setFile(null); }
    else setNotice(data.message || "کارروائی مکمل نہیں ہوسکی۔"); setBusy(false);
  };
  return <div className="space-y-6">
    {notice && <div className="rounded-xl bg-blue-50 p-4 text-blue-900">{notice}</div>}
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h2 className="mb-2 text-xl font-bold">1۔ موجودہ فائل منتخب کریں</h2><p className="mb-4 text-sm text-slate-500">قبول شدہ فارمیٹ: .xlsx، .xls، .csv، .docx۔ پہلی قطار میں عنوانات ہوں؛ مثلاً نام، والد کا نام، موبائل، شعبہ، جماعت۔</p><div className="flex flex-wrap items-center gap-3"><input type="file" accept=".xlsx,.xls,.csv,.docx" onChange={e=>{setFile(e.target.files?.[0]||null);setRows([])}} className="rounded-xl border p-3"/><button disabled={busy||!file} onClick={()=>send("preview")} className="rounded-xl bg-blue-900 px-6 py-3 font-bold text-white disabled:opacity-50">{busy?"پڑھا جا رہا ہے…":"پیشگی جائزہ بنائیں"}</button></div></section>
    {!!rows.length && <section className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200"><div className="flex flex-wrap items-center justify-between gap-3 border-b p-5"><div><h2 className="text-xl font-bold">2۔ ریکارڈ کی تصدیق</h2><p className="text-sm text-slate-500">سرخ قطاریں درآمد نہیں ہوں گی۔ پہلے اصل فائل میں ان کی اصلاح کیجیے۔</p></div><button disabled={busy||!rows.some(r=>r.valid)} onClick={()=>send("import")} className="rounded-xl bg-emerald-700 px-6 py-3 font-bold text-white disabled:opacity-50">درست ریکارڈ درآمد کریں</button></div><div className="max-h-[32rem] overflow-auto"><table className="w-full whitespace-nowrap text-right text-sm"><thead className="sticky top-0 bg-slate-100"><tr>{["قطار","طالب علم","والد","موبائل","نمبر","شعبہ","جماعت","نتیجہ"].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{rows.map(r=><tr key={r.rowNumber} className={`border-t ${r.valid?"":"bg-red-50"}`}><td className="p-3">{r.rowNumber}</td><td className="p-3">{r.studentName}</td><td className="p-3">{r.fatherName}</td><td className="p-3" dir="ltr">{r.phone}</td><td className="p-3">{r.studentNumber||"خودکار"}</td><td className="p-3">{r.department}</td><td className="p-3">{r.className}</td><td className="p-3">{r.valid?"درست":r.errors.join("، ")}</td></tr>)}</tbody></table></div></section>}
  </div>;
}
