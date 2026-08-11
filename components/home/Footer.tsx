import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12">

          {/* جامعہ */}

          <div>

            <h2 className="text-3xl font-bold">

              {siteConfig.nameUr}

            </h2>

            <p className="mt-5 leading-8 text-gray-300">

              {siteConfig.tagline}

            </p>

          </div>

          {/* اہم صفحات */}

          <div>

            <h3 className="text-2xl font-bold mb-6">

              اہم صفحات

            </h3>

            <ul className="space-y-4">

              <li>

                <Link href="/">
                  صفحہ اول
                </Link>

              </li>

              <li>

                <Link href="/about">
                  تعارف
                </Link>

              </li>

              <li>

                <Link href="/departments">
                  شعبہ جات
                </Link>

              </li>

              <li>

                <Link href="/teachers">
                  اساتذہ کرام
                </Link>

              </li>

              <li>

                <Link href="/admissions">
                  داخلہ
                </Link>

              </li>

              <li>

                <Link href="/contact">
                  رابطہ
                </Link>

              </li>

            </ul>

          </div>

          {/* رابطہ */}

          <div>

            <h3 className="text-2xl font-bold mb-6">

              رابطہ

            </h3>

            <p className="mb-4">

              📍 {siteConfig.address}

            </p>

            <p className="mb-4">

              ☎ {siteConfig.phone}

            </p>

            <p className="mb-4">

              📱 {siteConfig.mobile}

            </p>

            <p>

              ✉ {siteConfig.email}

            </p>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-800">

        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-gray-400">

          © 2026 {siteConfig.nameUr}

          <br />

          تمام حقوق محفوظ ہیں۔

        </div>

      </div>

    </footer>
  );
}
