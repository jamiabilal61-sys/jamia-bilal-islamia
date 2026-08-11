"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return children;

  return (
    <div className="flex min-h-screen bg-gray-100 max-lg:block">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Area */}

      <div className="min-w-0 flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 p-8 max-sm:p-4">

          {children}

        </main>

      </div>

    </div>
  );
}
