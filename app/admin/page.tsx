export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-blue-900 mb-2">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 mb-10">
          جامعہ بلال الاسلامیہ لاہور
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-blue-900">
              کل داخلے
            </h2>

            <p className="text-4xl font-bold mt-4">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-blue-900">
              خبریں
            </h2>

            <p className="text-4xl font-bold mt-4">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-blue-900">
              اساتذہ
            </h2>

            <p className="text-4xl font-bold mt-4">
              0
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-bold text-blue-900">
              شعبہ جات
            </h2>

            <p className="text-4xl font-bold mt-4">
              0
            </p>
          </div>

        </div>

      </div>

    </main>
  );
}