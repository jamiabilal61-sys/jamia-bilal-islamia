import StudentDocumentsManager from "@/components/admin/StudentDocumentsManager";

export default function DocumentsPage() {
  return <main dir="rtl"><h1 className="text-3xl font-black text-slate-900">اسناد، سرٹیفکیٹس اور شناختی کارڈ</h1><p className="mb-7 mt-2 text-slate-500">منفرد سیریل نمبر، دوبارہ اجرا، منسوخی، پرنٹ اور آن لائن تصدیق</p><StudentDocumentsManager /></main>;
}
