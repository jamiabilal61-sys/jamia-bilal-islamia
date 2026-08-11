import Link from "next/link";
import { faculty } from "@/lib/faculty";

export default function Faculty() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <span className="font-semibold text-emerald-700">اساتذہ کرام</span>
        <h2 className="mt-3 text-4xl font-bold text-blue-900 sm:text-5xl">ہمارا علمی و تدریسی عملہ</h2>
        <p className="mx-auto mt-5 max-w-2xl leading-8 text-gray-600">
          جامعہ بلال الاسلامیہ لاہور کے {faculty.length} قابلِ احترام اساتذہ و شیوخ کی مکمل فہرست ملاحظہ کریں۔
        </p>
        <Link href="/faculty" className="mt-8 inline-block rounded-xl bg-emerald-700 px-7 py-3 font-bold text-white hover:bg-emerald-800">
          اساتذہ کی مکمل فہرست
        </Link>
      </div>
    </section>
  );
}
