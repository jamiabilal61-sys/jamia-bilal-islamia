import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { leadership } from "@/lib/leadership";

export const metadata: Metadata = {
  title: "قیادت و انتظامیہ | جامعہ بلال الاسلامیہ لاہور",
  description:
    "جامعہ بلال الاسلامیہ لاہور کے بانی، سرپرست اور مہتمم کا تعارف اور ادارے کے تعلیمی و تربیتی نصب العین کی تفصیل۔",
};

const responsibilities = [
  {
    title: "تعلیمی رہنمائی",
    description:
      "قرآن و سنت کی بنیاد پر نصاب، تدریس اور علمی سرگرمیوں کی مسلسل نگرانی۔",
  },
  {
    title: "تربیت و کردار سازی",
    description:
      "طلبہ میں علم کے ساتھ عمل، حسنِ اخلاق، دعوت اور خدمتِ دین کا جذبہ پیدا کرنا۔",
  },
  {
    title: "انتظامی نگرانی",
    description:
      "جامعہ کے شعبہ جات، اساتذہ اور طلبہ کے لیے منظم، محفوظ اور معیاری ماحول فراہم کرنا۔",
  },
];

export default function LeadershipPage() {
  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-blue-950 py-16 text-white sm:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.22),transparent_38%)]" />
        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <nav className="mb-5 text-sm text-blue-200" aria-label="صفحاتی راستہ">
            <Link href="/" className="transition hover:text-amber-300">
              صفحہ اول
            </Link>
            <span className="mx-2">/</span>
            <span>قیادت و انتظامیہ</span>
          </nav>
          <p className="font-bold text-amber-300">جامعہ بلال الاسلامیہ لاہور</p>
          <h1 className="mt-3 text-4xl font-black sm:text-5xl">قیادت و انتظامیہ</h1>
          <p className="mx-auto mt-5 max-w-3xl text-lg leading-9 text-blue-100">
            علمی بصیرت، مخلصانہ نگرانی اور منظم جدوجہد کے ذریعے قرآن و سنت کے
            باعمل خدام کی تیاری۔
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {leadership.map((leader, index) => (
            <article
              key={leader.id}
              className={`overflow-hidden rounded-3xl border bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                index === 2 ? "border-emerald-200" : "border-slate-200"
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <Image
                  src={leader.image}
                  alt={`${leader.name} - ${leader.position}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-center transition duration-500 hover:scale-105"
                  priority={index === 0}
                />
                <span className="absolute right-5 top-5 rounded-full bg-blue-950/90 px-4 py-1.5 text-sm font-bold text-white backdrop-blur">
                  {leader.position}
                </span>
              </div>

              <div className="p-6 sm:p-7">
                <h2 className="text-2xl font-black text-blue-950">{leader.name}</h2>
                <p className="mt-1 font-bold text-emerald-700">{leader.position}</p>
                <p className="mt-4 leading-8 text-slate-600">{leader.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl bg-slate-100 shadow-xl">
            <Image
              src="/images/leadership/muhtamim.jpg"
              alt="الشیخ سید محمد علی الہاشمی، مہتمم جامعہ بلال الاسلامیہ لاہور"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
          </div>

          <div>
            <p className="font-bold text-emerald-700">پیغامِ مہتمم</p>
            <h2 className="mt-2 text-3xl font-black text-blue-950 sm:text-4xl">
              علم کے ساتھ عمل اور کردار
            </h2>
            <blockquote className="mt-6 border-r-4 border-amber-400 pr-6 text-lg leading-10 text-slate-700">
              جامعہ بلال الاسلامیہ لاہور کا مقصد صرف اسناد دینا نہیں، بلکہ ایسے
              علماء تیار کرنا ہے جو قرآن و سنت کے صحیح نمائندہ ہوں، امت کی رہنمائی
              کریں اور جدید دور کے تقاضوں کو سمجھتے ہوں۔
            </blockquote>
            <p className="mt-6 text-xl font-black text-blue-950">
              الشیخ سید محمد علی الہاشمی
            </p>
            <p className="text-emerald-700">مہتمم جامعہ بلال الاسلامیہ لاہور</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="text-center">
          <p className="font-bold text-emerald-700">ہماری ذمہ داریاں</p>
          <h2 className="mt-2 text-3xl font-black text-blue-950 sm:text-4xl">
            ادارے کی رہنمائی کے بنیادی پہلو
          </h2>
        </div>

        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {responsibilities.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-700 text-lg font-black text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-black text-blue-950">{item.title}</h3>
              <p className="mt-3 leading-8 text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link
            href="/about"
            className="rounded-xl bg-emerald-700 px-7 py-3 font-bold text-white transition hover:bg-emerald-800"
          >
            جامعہ کا تعارف
          </Link>
          <Link
            href="/faculty"
            className="rounded-xl border border-blue-900 px-7 py-3 font-bold text-blue-950 transition hover:bg-blue-950 hover:text-white"
          >
            اساتذہ و شیوخ
          </Link>
        </div>
      </section>
    </main>
  );
}
