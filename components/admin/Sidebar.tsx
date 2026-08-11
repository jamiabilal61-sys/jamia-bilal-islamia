"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menu = [
  {
    title: "ڈیش بورڈ",
    href: "/admin",
    icon: "🏠",
    permission: "dashboard",
  },
  {
    title: "داخلہ درخواستیں",
    href: "/admin/admissions",
    icon: "📄",
    permission: "admissions",
  },
  {
    title: "شعبہ جات",
    href: "/admin/departments",
    icon: "🏫",
    permission: "settings",
  },
  {
    title: "اساتذہ و ٹائم ٹیبل",
    href: "/admin/faculty",
    icon: "👨‍🏫",
    permission: "faculty",
  },
  {
    title: "طلبہ",
    href: "/admin/students",
    icon: "🎓",
    permission: "students",
  },
  {
    title: "Word/Excel سے طلبہ درآمد",
    href: "/admin/student-import",
    icon: "📥",
    permission: "student_import",
  },
  {
    title: "روزانہ حاضری",
    href: "/admin/attendance",
    icon: "✅",
    permission: "attendance",
  },
  {
    title: "فیس و واجبات",
    href: "/admin/fees",
    icon: "🧾",
    permission: "fees",
  },
  {
    title: "امتحانات و نتائج",
    href: "/admin/exams",
    icon: "📊",
    permission: "exams",
  },
  {
    title: "رخصت و نظم و ضبط",
    href: "/admin/leave-discipline",
    icon: "📝",
    permission: "discipline",
  },
  {
    title: "ہاسٹل و میس",
    href: "/admin/hostel",
    icon: "🏢",
    permission: "hostel",
  },
  {
    title: "والدین و طلبہ پورٹل",
    href: "/admin/portal-accounts",
    icon: "👪",
    permission: "portal_accounts",
  },
  {
    title: "لائبریری و کتب",
    href: "/admin/library",
    icon: "📚",
    permission: "library",
  },
  {
    title: "ملازمین و تنخواہ",
    href: "/admin/payroll",
    icon: "💼",
    permission: "payroll",
  },
  {
    title: "اسناد و شناختی کارڈ",
    href: "/admin/documents",
    icon: "🏅",
    permission: "documents",
  },
  {
    title: "واٹس ایپ و SMS اطلاعات",
    href: "/admin/notifications",
    icon: "🔔",
    permission: "notifications",
  },
  {
    title: "خبریں",
    href: "/admin/news",
    icon: "📰",
    permission: "news",
  },
  {
    title: "گیلری",
    href: "/admin/gallery",
    icon: "🖼️",
    permission: "news",
  },
  {
    title: "سیٹنگز",
    href: "/admin/settings",
    icon: "⚙️",
    permission: "settings",
  },
  { title: "صارفین و اختیارات", href: "/admin/users", icon: "🔐", permission: "users" },
  { title: "بیک اپ، آڈٹ و سکیورٹی", href: "/admin/system", icon: "🛡️", permission: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [access,setAccess]=useState<string[]>([]);
  const [superAdmin,setSuperAdmin]=useState(false);
  useEffect(()=>{fetch("/api/admin/session").then(r=>r.json()).then(x=>{setAccess(x.session?.permissions||[]);setSuperAdmin(x.session?.role==="super_admin")})},[]);

  return (
    <aside className="w-72 shrink-0 bg-blue-900 text-white min-h-screen max-lg:min-h-0 max-lg:w-full print:hidden">

      <div className="text-center py-8 border-b border-blue-700">

        <h2 className="text-2xl font-bold">
          جامعہ بلال
        </h2>

        <p className="text-sm mt-2 text-blue-200">
          Admin Panel
        </p>

      </div>

      <nav className="p-4 space-y-2">

        {menu.filter(item=>superAdmin||access.includes(item.permission)).map((item) => (

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
