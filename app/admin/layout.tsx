import { ReactNode } from "react";
import AdminLayout from "@/components/admin/AdminLayout";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <AdminLayout>
      {children}
    </AdminLayout>
  );
}