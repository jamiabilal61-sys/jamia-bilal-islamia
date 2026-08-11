import LibraryManager from "@/components/admin/LibraryManager";

export default function LibraryPage() {
  return <main dir="rtl"><h1 className="text-3xl font-black text-slate-900">لائبریری اور کتب کا نظام</h1><p className="mb-7 mt-2 text-slate-500">کتب، نسخوں، اجرا، واپسی، تاخیر، جرمانے اور نقصان کا مربوط ریکارڈ</p><LibraryManager /></main>;
}
