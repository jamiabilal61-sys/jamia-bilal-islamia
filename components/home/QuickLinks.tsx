import Link from "next/link";
import { quickLinks } from "@/data/quick-links";

export default function QuickLinks() {
  return (
    <section className="bg-white py-12">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {quickLinks.map((item) => (

            <Link
              key={item.href}
              href={item.href}
              className="bg-white border rounded-2xl shadow-sm hover:shadow-xl transition duration-300 p-6 text-center hover:-translate-y-2"
            >

              <div className="text-5xl">

                {item.icon}

              </div>

              <h3 className="mt-5 font-bold text-blue-900">

                {item.title}

              </h3>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}