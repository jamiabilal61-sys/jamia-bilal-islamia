"use client";

import { useState } from "react";

export default function CreateNewsPage() {
  const [formData, setFormData] = useState({
    title: "",
    category: "داخلہ",
    date: "",
    status: "ڈرافٹ",
    content: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formData);

    alert("خبر کامیابی سے محفوظ ہوگئی۔");
  };

  return (
    <main className="max-w-5xl mx-auto p-8">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          نئی خبر شامل کریں
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>

            <label className="block mb-2 font-semibold">
              خبر کا عنوان
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="مثلاً: داخلہ برائے تعلیمی سال 2027"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>

              <label className="block mb-2 font-semibold">
                زمرہ
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>داخلہ</option>
                <option>اعلانات</option>
                <option>تقریبات</option>
                <option>امتحانات</option>
                <option>تعلیم</option>
              </select>

            </div>

            <div>

              <label className="block mb-2 font-semibold">
                تاریخ
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              />

            </div>

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              مکمل خبر
            </label>

            <textarea
              rows={8}
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="خبر کی مکمل تفصیل یہاں لکھیں..."
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              اشاعت کی حالت
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>ڈرافٹ</option>
              <option>شائع شدہ</option>
            </select>

          </div>

          <div className="flex gap-4">

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-xl transition"
            >
              خبر محفوظ کریں
            </button>

            <button
              type="reset"
              className="bg-gray-200 hover:bg-gray-300 px-8 py-3 rounded-xl transition"
            >
              صاف کریں
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}