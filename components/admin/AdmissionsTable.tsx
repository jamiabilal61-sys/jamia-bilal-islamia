"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import StatusBadge from "./StatusBadge";
import Pagination from "./Pagination";

const admissions = [
  {
    id: 1,
    studentName: "احمد علی",
    fatherName: "محمد علی",
    className: "حفظ القرآن",
    phone: "03001234567",
    status: "منظور",
  },
  {
    id: 2,
    studentName: "بلال احمد",
    fatherName: "احمد خان",
    className: "عالمیہ",
    phone: "03111234567",
    status: "زیر غور",
  },
  {
    id: 3,
    studentName: "محمد عمر",
    fatherName: "خالد محمود",
    className: "تجوید",
    phone: "03221234567",
    status: "مسترد",
  },
];

export default function AdmissionsTable() {
  const [search, setSearch] = useState("");

  const filtered = admissions.filter(
    (item) =>
      item.studentName.includes(search) ||
      item.phone.includes(search)
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <div className="overflow-x-auto mt-6">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3">طالب علم</th>

              <th className="p-3">والد</th>

              <th className="p-3">جماعت</th>

              <th className="p-3">موبائل</th>

              <th className="p-3">اسٹیٹس</th>

              <th className="p-3">ایکشن</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item) => (

              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >

                <td className="p-3">{item.studentName}</td>

                <td className="p-3">{item.fatherName}</td>

                <td className="p-3">{item.className}</td>

                <td className="p-3">{item.phone}</td>

                <td className="p-3">
                  <StatusBadge status={item.status} />
                </td>

                <td className="p-3">

                  <div className="flex justify-center gap-2">

                    <button className="px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200">
                      👁
                    </button>

                    <button className="px-3 py-1 rounded-lg bg-green-100 hover:bg-green-200">
                      ✏️
                    </button>

                    <button className="px-3 py-1 rounded-lg bg-red-100 hover:bg-red-200">
                      🗑
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <Pagination />

    </div>
  );
}