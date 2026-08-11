import FacultyTimetableManager from "@/components/admin/FacultyTimetableManager";

export default function FacultyPage() {
  return (
    <main dir="rtl">
      <h1 className="text-3xl font-black text-slate-900">اساتذہ اور خودکار ٹائم ٹیبل</h1>
      <p className="mb-7 mt-2 text-slate-500">اساتذہ، تخصص، دستیابی اور تدریسی بوجھ محفوظ کرکے ٹکراؤ سے پاک ہفتہ وار نظام الاوقات بنائیں</p>
      <FacultyTimetableManager />
    </main>
  );
}
