import type { Metadata } from "next";
import Link from "next/link";
import { faculty } from "@/lib/faculty";

export const metadata: Metadata = {
  title: "اساتذہ و شیوخ | جامعہ بلال الاسلامیہ",
  description: "جامعہ بلال الاسلامیہ کے قابلِ احترام اساتذہ و شیوخ کی فہرست",
};

export default function FacultyPage() {
  return (
    <main className="bg-slate-50 py-16 sm:py-24">
      <section className="mx-auto max-w-6xl px-6">
        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm sm:p-12">
          <div className="text-center">
            <p className="font-bold text-emerald-700">جامعہ بلال الاسلامیہ</p>
            <h1 className="mt-3 text-3xl font-black text-blue-950 sm:text-5xl">اساتذہ و شیوخ</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-9 text-slate-600">
              جامعہ کے قابلِ احترام اساتذہ طلبہ کی علمی، عملی اور اخلاقی تربیت کے لیے مصروفِ خدمت ہیں۔
            </p>
          </div>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {faculty.map((teacher) => (
              <li
                key={teacher.id}
                className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-right"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-bold text-white">
                  {teacher.id}
                </span>
                <span className="font-bold leading-8 text-emerald-950">{teacher.name}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 text-center">
            <Link href="/" className="inline-block rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700">
              مرکزی صفحہ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
