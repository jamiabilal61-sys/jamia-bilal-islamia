import { news } from "@/lib/news";

export default function LatestNews() {
  return (
    <section className="py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-blue-900">
            تازہ خبریں
          </h2>

          <p className="text-gray-600 mt-3">
            جامعہ بلال الاسلامیہ لاہور کی تازہ ترین خبریں اور سرگرمیاں
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14">

          {news.map((item) => (

            <article
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">

                <span className="text-sm text-green-700 font-semibold">
                  {item.date}
                </span>

                <h3 className="text-2xl font-bold mt-3 text-blue-900">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-8">
                  {item.excerpt}
                </p>

                <button
                  className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg transition"
                >
                  مزید پڑھیں
                </button>

              </div>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}