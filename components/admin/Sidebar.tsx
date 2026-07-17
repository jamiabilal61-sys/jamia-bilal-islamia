"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  {
    title: "ڈیش بورڈ",
    href: "/admin",
    icon: "🏠",
  },
  {
    title: "داخلہ درخواستیں",
    href: "/admin/admissions",
    icon: "📄",
  },
  {
    title: "شعبہ جات",
    href: "/admin/departments",
    icon: "🏫",
  },
  {
    title: "اساتذہ",
    href: "/admin/faculty",
    icon: "👨‍🏫",
  },
  {
    title: "طلبہ",
    href: "/admin/students",
    icon: "🎓",
  },
  {
    title: "خبریں",
    href: "/admin/news",
    icon: "📰",
  },
  {
    title: "گیلری",
    href: "/admin/gallery",
    icon: "🖼️",
  },
  {
    title: "سیٹنگز",
    href: "/admin/settings",
    icon: "⚙️",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-blue-900 text-white min-h-screen">

      <div className="text-center py-8 border-b border-blue-700">

        <h2 className="text-2xl font-bold">
          جامعہ بلال
        </h2>

        <p className="text-sm mt-2 text-blue-200">
          Admin Panel
        </p>

      </div>

      <nav className="p-4 space-y-2">

        {menu.map((item) => (

          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              pathname === item.href
                ? "bg-white text-blue-900 font-bold shadow"
                : "hover:bg-blue-800"
            }`}
          >

            <span>{item.icon}</span>

            <span>{item.title}</span>

          </Link>

        ))}

      </nav>

    </aside>
  );
}