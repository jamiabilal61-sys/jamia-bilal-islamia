"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { menu } from "@/lib/menu";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto">

        <ul className="flex items-center justify-center gap-2 py-3">

          {menu.map((item) => {

            const active = pathname === item.href;

            return (
              <li
                key={item.href}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className={`block rounded-lg px-4 py-2 transition-all duration-300

                  ${
                    active
                      ? "bg-yellow-400 text-blue-900"
                      : "text-white hover:bg-blue-800 hover:text-yellow-300"
                  }

                  `}
                >
                  {item.title}
                </Link>

                {item.children && (

                  <div
                    className="
                    invisible
                    absolute
                    right-0
                    top-full
                    mt-2
                    w-64
                    rounded-xl
                    bg-white
                    shadow-xl
                    opacity-0
                    transition-all
                    duration-300

                    group-hover:visible
                    group-hover:opacity-100
                    "
                  >

                    {item.children.map((child) => (

                      <Link
                        key={child.href}
                        href={child.href}
                        className="
                        block
                        border-b
                        px-5
                        py-3
                        text-gray-700
                        hover:bg-blue-50
                        hover:text-blue-700
                        "
                      >
                        {child.title}
                      </Link>

                    ))}

                  </div>

                )}

              </li>
            );

          })}

        </ul>

      </div>
    </nav>
  );
}