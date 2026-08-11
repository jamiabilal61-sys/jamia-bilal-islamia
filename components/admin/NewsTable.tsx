"use client";

import Link from "next/link";

const news = [
  {
    id: 1,
    title: "داخلہ برائے تعلیمی سال 2027 کا آغاز",
    category: "داخلہ",
    date: "01 فروری 2027",
    status: "شائع شدہ",
  },
  {
    id: 2,
    title: "سالانہ تقریب تقسیم اسناد",
    category: "تقریبات",
    date: "10 جولائی 2026",
    status: "ڈرافٹ",
  },
];

export default function NewsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex items-center justify-between mb-6">

        <div>

          <h2 className="text-2xl font-bold text-blue-900">
            خبروں کی فہرست
          </h2>

          <p className="text-gray-500 mt-1">
            جامعہ بلال الاسلامیہ لاہور کی تمام خبریں اور اعلانات
          </p>

        </div>

        <Link
          href="/admin/news/create"
          className="bg-blue-700 text-white px-5 py-2 rounded-xl hover:bg-blue-800 transition"
        >
          + نئی خبر
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-4 text-center">عنوان</th>

              <th className="p-4 text-center">زمرہ</th>

              <th className="p-4 text-center">تاریخ</th>

              <th className="p-4 text-center">اسٹیٹس</th>

              <th className="p-4 text-center">ایکشن</th>

            </tr>

          </thead>

          <tbody>

            {news.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >

                <td className="p-4 font-medium">
                  {item.title}
                </td>

                <td className="p-4 text-center">
                  {item.category}
                </td>

                <td className="p-4 text-center">
                  {item.date}
                </td>

                <td className="p-4 text-center">

                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      item.status === "شائع شدہ"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    <Link
                      href={`/admin/news/${item.id}`}
                      className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-lg transition"
                      title="دیکھیں"
                    >
                      👁
                    </Link>

                    <Link
                      href={`/admin/news/${item.id}/edit`}
                      className="bg-green-100 hover:bg-green-200 px-3 py-1 rounded-lg transition"
                      title="ترمیم"
                    >
                      ✏️
                    </Link>

                    <button
                      className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded-lg transition"
                      title="حذف کریں"
                    >
                      🗑
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}