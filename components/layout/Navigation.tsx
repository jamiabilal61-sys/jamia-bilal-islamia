"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-y border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">

        {/* Mobile Header */}

        <div className="lg:hidden flex items-center justify-between h-16">

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl font-bold text-blue-900"
          >
            ☰
          </button>

          <span className="font-bold text-blue-900">
            جامعہ بلال الاسلامیہ
          </span>

        </div>

        {/* Desktop Navigation */}

        <div className="hidden lg:flex items-center justify-between h-16">

          <ul className="flex items-center gap-8">

            {navigation.map((item) => (
              <li
                key={item.title}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 h-16 px-2 text-[16px] font-semibold transition-colors duration-300 ${
                    pathname === item.href
                      ? "text-blue-700 border-b-2 border-blue-700"
                      : "text-gray-800 hover:text-blue-700"
                  }`}
                >
                  <span>{item.title}</span>

                  {"children" in item && (
                    <span className="text-xs transition-transform duration-300 group-hover:rotate-180">
                      ▼
                    </span>
                  )}
                </Link>

                {"children" in item && (
                  <div className="absolute right-0 top-full invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 min-w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">

                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
                      >
                        {child.title}
                      </Link>
                    ))}

                  </div>
                )}

              </li>
            ))}

          </ul>

          <div className="flex items-center gap-4">

            <button className="w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-100 transition">
              🔍
            </button>

            <Link
              href="/admissions"
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-xl font-semibold transition"
            >
              آن لائن داخلہ
            </Link>

          </div>

        </div>
        {/* Mobile Overlay */}

        <div
          className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 lg:hidden ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Sidebar */}

        <div
          className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`}
        >

          <div className="flex items-center justify-between p-5 border-b">

            <h2 className="font-bold text-blue-900">
              جامعہ بلال الاسلامیہ
            </h2>

            <button
              onClick={() => setIsOpen(false)}
              className="text-3xl"
            >
              ×
            </button>

          </div>

          <div>

            {navigation.map((item) => (

              <Link
                key={item.title}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex justify-between items-center px-6 py-4 border-b transition ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-700 font-bold"
                    : "hover:bg-gray-50"
                }`}
              >

                <span>{item.title}</span>

                {"children" in item && (
                  <span className="text-xs">
                    ▼
                  </span>
                )}

              </Link>

            ))}

            <div className="p-5">

              <Link
                href="/admissions"
                onClick={() => setIsOpen(false)}
                className="block text-center bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-bold transition"
              >
                آن لائن داخلہ
              </Link>

            </div>

          </div>

        </div>

      </div>
    </nav>
  );
}