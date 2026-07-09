import Link from "next/link";
import { navigation } from "@/lib/navigation";
import { siteConfig } from "@/lib/site";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* لوگو */}

          <Link href="/" className="text-2xl font-bold text-blue-900">

            {siteConfig.nameUr}

          </Link>

          {/* Menu */}

          <nav className="hidden lg:flex items-center gap-8">

            {navigation.map((item) => (

              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-blue-700 font-medium transition"
              >
                {item.title}
              </Link>

            ))}

          </nav>

          {/* Portal Button */}

          <Link
            href="/login"
            className="bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            پورٹل
          </Link>

        </div>

      </div>

    </header>
  );
}