import PayrollManager from "@/components/admin/PayrollManager";

export default function PayrollPage() {
  return <main dir="rtl"><h1 className="text-3xl font-black text-slate-900">ملازمین، حاضری اور تنخواہ</h1><p className="mb-7 mt-2 text-slate-500">ملازم پروفائل، روزانہ حاضری، ماہانہ حساب، ادائیگی اور قابلِ پرنٹ پے سلپ</p><PayrollManager /></main>;
}
