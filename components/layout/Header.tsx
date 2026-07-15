import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-6">

        <div className="h-24 flex items-center justify-between">

          {/* Logo + Name */}

          <Link
            href="/"
            className="flex items-center gap-4"
          >

            <Image
              src={siteConfig.logo}
              alt={siteConfig.nameEn}
              width={60}
              height={60}
              priority
            />

            <div>

              <h1 className="text-2xl font-bold text-blue-900">

                {siteConfig.nameUr}

              </h1>

              <p className="text-sm text-gray-600">

                {siteConfig.tagline}

              </p>

            </div>

          </Link>

          {/* Right Side */}

          <div className="flex items-center gap-3">

            <button
              className="border rounded-lg px-4 py-2 hover:bg-gray-100"
            >
              🔍 تلاش
            </button>

            <Link
              href="/admissions"
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              داخلہ
            </Link>

            <Link
              href="/login"
              className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              پورٹل
            </Link>

          </div>

        </div>

      </div>

    </header>
  );
}