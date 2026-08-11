export default async function AdminNewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <h1 className="text-3xl font-bold">خبر کی تفصیل</h1>
      <p className="mt-4 text-slate-500">ریکارڈ: {id}</p>
    </main>
  );
}
