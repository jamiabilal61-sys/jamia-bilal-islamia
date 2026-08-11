import NewsTable from "@/components/admin/NewsTable";

export default function NewsPage() {
  return (
    <main className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-blue-900">
          News Management
        </h1>

        <p className="text-gray-600 mt-2">
          ویب سائٹ کی خبریں اور اعلانات
        </p>

      </div>

      <NewsTable />

    </main>
  );
}