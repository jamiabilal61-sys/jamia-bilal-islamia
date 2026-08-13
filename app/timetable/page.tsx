import type { Metadata } from "next";
import Link from "next/link";
import TimetableExplorer from "@/components/timetable/TimetableExplorer";

export const metadata: Metadata = {
  title: "کلاس اور اساتذہ کا ٹائم ٹیبل | جامعہ بلال الاسلامیہ",
  description: "جامعہ بلال الاسلامیہ لاہور کا کلاس وار اور استاد وار ہفتہ وار نظام الاوقات۔",
};

export default function TimetablePage() {
  return (
    <main className="bg-slate-50 pb-16">
      <section className="bg-blue-950 py-14 text-center text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <nav className="mb-4 text-sm text-blue-200">
            <Link href="/" className="hover:text-amber-300">صفحہ اول</Link>
            <span className="mx-2">/</span>
            <span>نظام الاوقات</span>
          </nav>
          <p className="font-bold text-amber-300">تعلیمی نظام</p>
          <h1 className="mt-2 text-4xl font-black sm:text-5xl">کلاس اور اساتذہ کا ٹائم ٹیبل</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-9 text-blue-100">
            ہر جماعت کے پیریڈ، مضمون، وقت اور متعلقہ استاد کی مکمل تفصیل۔
          </p>
        </div>
      </section>

      <div className="mx-auto -mt-6 max-w-7xl px-4 sm:px-6">
        <TimetableExplorer />
      </div>
    </main>
  );
}
