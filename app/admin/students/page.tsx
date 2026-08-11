import StudentsTable from "@/components/admin/StudentsTable";

export default function StudentsPage() {
  return (
    <main className="p-4 sm:p-8" dir="rtl">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-black text-slate-900">
            مستقل طلبہ اور سالانہ ریکارڈ
          </h1>

          <p className="text-gray-500 mt-2">
            داخلہ منظور ہوتے ہی طالب علم یہاں شامل ہوگا؛ ہر تعلیمی سال الگ محفوظ رہے گا۔
          </p>

        </div>

      </div>

      <StudentsTable />

    </main>
  );
}
