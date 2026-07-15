import Image from "next/image";
import Link from "next/link";
import { news } from "@/lib/news";

export default function LatestNews() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center">
          <span className="text-green-700 font-semibold">
            جامعہ کی سرگرمیاں
          </span>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-blue-900">
            تازہ خبریں اور اعلانات
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-gray-600 leading-8">
            جامعہ بلال الاسلامیہ لاہور کی تازہ ترین خبریں، تعلیمی سرگرمیاں،
            داخلہ اپڈیٹس، سیمینارز اور اہم اعلانات یہاں ملاحظہ کریں۔
          </p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
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
                <div className="flex items-center justify-between text-sm">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {item.category}
                  </span>

                  <span className="text-gray-500">
                    {item.date}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold text-blue-900 leading-9">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-8">
                  {item.excerpt}
                </p>

                <Link
                  href={`/news/${item.id}`}
                  className="inline-flex items-center mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl transition"
                >
                  مزید پڑھیں
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/news"
            className="inline-block border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-10 py-4 rounded-xl font-bold transition"
          >
            تمام خبریں دیکھیں
          </Link>
        </div>
      </div>
    </section>
  );
}