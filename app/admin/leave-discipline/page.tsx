import LeaveDisciplineManager from "@/components/admin/LeaveDisciplineManager";

export default function LeaveDisciplinePage() {
  return (
    <main dir="rtl">
      <h1 className="text-3xl font-black text-slate-900">رخصت اور نظم و ضبط</h1>
      <p className="mb-7 mt-2 text-slate-500">طلبہ و اساتذہ کی رخصت، واپسی، نوٹس اور تادیبی کارروائی کا مکمل ریکارڈ</p>
      <LeaveDisciplineManager />
    </main>
  );
}
