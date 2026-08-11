import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function AdmissionsBanner() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-green-800 via-green-700 to-blue-800 text-white shadow-2xl">

          <div className="grid lg:grid-cols-2 gap-10 items-center p-10 lg:p-16">

            {/* Left */}

            <div>

              <span className="inline-block bg-yellow-400 text-black px-4 py-2 rounded-full font-bold mb-5">
                🎓 داخلہ 2026 جاری ہے
              </span>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                جامعہ بلال الاسلامیہ لاہور میں داخلے شروع ہو چکے ہیں
              </h2>

              <p className="mt-6 text-lg leading-9 text-green-100">
                حفظ القرآن، درسِ نظامی، دارالافتاء، عصری تعلیم اور
                کمپیوٹر کورسز میں محدود نشستوں پر داخلے جاری ہیں۔
              </p>

              <div className="flex flex-wrap gap-4 mt-10">

                <Link
                  href="/admissions"
                  className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition"
                >
                  آن لائن درخواست دیں
                </Link>

                <Link
                  href="/contact"
                  className="border-2 border-white px-8 py-4 rounded-xl hover:bg-white hover:text-green-800 transition"
                >
                  رابطہ کریں
                </Link>

              </div>

            </div>

            {/* Right */}

            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">

              <h3 className="text-2xl font-bold mb-6">
                اہم معلومات
              </h3>

              <div className="space-y-4">

                <div className="flex justify-between border-b border-white/20 pb-3">
                  <span>داخلہ شروع</span>
                  <strong>1 جولائی 2026</strong>
                </div>

                <div className="flex justify-between border-b border-white/20 pb-3">
                  <span>آخری تاریخ</span>
                  <strong>31 اگست 2026</strong>
                </div>

                <div className="flex justify-between border-b border-white/20 pb-3">
                  <span>رابطہ</span>
                  <strong dir="ltr">{siteConfig.phone}</strong>
                </div>

                <div className="flex justify-between">
                  <span>ای میل</span>
                  <strong dir="ltr">{siteConfig.email}</strong>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
