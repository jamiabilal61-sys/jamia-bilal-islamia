import { news } from "@/lib/news";
import Image from "next/image";
import Link from "next/link";

export default function NewsPage() {
  return (
    <main className="bg-slate-50 min-h-screen">

      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            خبریں اور اعلانات
          </h1>

          <p className="mt-5 text-blue-100 text-lg">
            جامعہ بلال الاسلامیہ لاہور کی تمام تازہ ترین خبریں
          </p>

        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {news.map((item) => (

              <article
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition"
              >

                <div className="relative h-56">

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />

                </div>

                <div className="p-6">

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {item.category}
                  </span>

                  <h2 className="mt-4 text-2xl font-bold text-blue-900">
                    {item.title}
                  </h2>

                  <p className="mt-4 text-gray-600 leading-8">
                    {item.excerpt}
                  </p>

                  <Link
                    href={`/news/${item.id}`}
                    className="inline-block mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl"
                  >
                    مزید پڑھیں
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div>
      </section>

    </main>
  );
}