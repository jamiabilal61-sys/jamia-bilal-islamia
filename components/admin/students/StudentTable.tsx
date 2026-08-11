"use client";

import Link from "next/link";

const students = [
  {
    id: "JBI-2027-0001",
    name: "محمد احمد",
    className: "حفظ اول",
    teacher: "قاری محمد اسماعیل",
    halaqa: "حلقہ نمبر 1",
    hostel: "رہائشی",
    room: "A-12",
    status: "زیر تعلیم",
  },
  {
    id: "JBI-2027-0002",
    name: "عبداللہ",
    className: "اصول شریعت سال اول",
    teacher: "مولانا خالد",
    halaqa: "-",
    hostel: "غیر رہائشی",
    room: "-",
    status: "زیر تعلیم",
  },
];

export default function StudentTable() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-blue-900">
            طلبہ کا ریکارڈ
          </h2>

          <p className="text-gray-500 mt-2">
            جامعہ بلال الاسلامیہ لاہور
          </p>

        </div>

        <Link
          href="/admin/students/create"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl"
        >
          + نیا طالب علم
        </Link>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-blue-50">

              <th className="p-4">Student ID</th>

              <th className="p-4">نام</th>

              <th className="p-4">کلاس</th>

              <th className="p-4">استاد</th>

              <th className="p-4">حلقہ</th>

              <th className="p-4">رہائش</th>

              <th className="p-4">کمرہ</th>

              <th className="p-4">اسٹیٹس</th>

              <th className="p-4">ایکشن</th>

            </tr>

          </thead>

          <tbody>

            {students.map((student) => (

              <tr
                key={student.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-4 font-semibold">
                  {student.id}
                </td>

                <td className="p-4">
                  {student.name}
                </td>

                <td className="p-4">
                  {student.className}
                </td>

                <td className="p-4">
                  {student.teacher}
                </td>

                <td className="p-4">
                  {student.halaqa}
                </td>

                <td className="p-4">
                  {student.hostel}
                </td>

                <td className="p-4">
                  {student.room}
                </td>

                <td className="p-4">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">

                    {student.status}

                  </span>

                </td>

                <td className="p-4">

                  <div className="flex justify-center gap-2">

                    <button className="bg-blue-100 px-3 py-1 rounded-lg">
                      👁
                    </button>

                    <button className="bg-green-100 px-3 py-1 rounded-lg">
                      ✏️
                    </button>

                    <button className="bg-red-100 px-3 py-1 rounded-lg">
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