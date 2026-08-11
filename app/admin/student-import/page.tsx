import StudentImportManager from "@/components/admin/StudentImportManager";

export default function StudentImportPage() {
  return <main dir="rtl"><h1 className="text-3xl font-black text-slate-900">Word اور Excel سے طلبہ کا ریکارڈ</h1><p className="mb-7 mt-2 text-slate-500">فائل کی خودکار پہچان، پیشگی جائزہ، غلطیوں کی نشاندہی اور نقل سے محفوظ درآمد</p><StudentImportManager /></main>;
}
