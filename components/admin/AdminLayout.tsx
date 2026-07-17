import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Area */}

      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 p-8">

          {children}

        </main>

      </div>

    </div>
  );
}