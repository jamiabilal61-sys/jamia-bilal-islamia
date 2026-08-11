export default function NewNewsPage() {
  return (
    <main className="p-8">

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          نئی خبر شامل کریں
        </h1>

        <form className="space-y-6">

          <div>
            <label className="block mb-2 font-semibold">
              خبر کا عنوان
            </label>

            <input
              type="text"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              زمرہ
            </label>

            <select
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>اعلانات</option>
              <option>تقریبات</option>
              <option>خبریں</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              مکمل خبر
            </label>

            <textarea
              rows={8}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              اسٹیٹس
            </label>

            <select
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>ڈرافٹ</option>
              <option>شائع شدہ</option>
            </select>
          </div>

          <button
            className="bg-blue-700 text-white px-8 py-3 rounded-xl hover:bg-blue-800"
          >
            خبر محفوظ کریں
          </button>

        </form>

      </div>

    </main>
  );
}