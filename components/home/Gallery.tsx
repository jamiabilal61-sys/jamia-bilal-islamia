import Image from "next/image";
import Link from "next/link";
import { gallery } from "@/lib/gallery";

export default function Gallery() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="text-green-700 font-semibold">
            تصویری گیلری
          </span>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-blue-900">
            جامعہ کی جھلکیاں
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto leading-8">
            جامعہ بلال الاسلامیہ لاہور کی مختلف علمی، دینی اور
            تعلیمی سرگرمیوں کی منتخب تصاویر۔
          </p>

        </div>

        {/* Gallery */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {gallery.map((item) => (

            <div
              key={item.id}
              className="group relative overflow-hidden rounded-3xl shadow-lg"
            >

              <div className="relative h-72">

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />

              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute bottom-0 right-0 left-0 p-6 text-white">

                <span className="inline-block bg-green-600 px-3 py-1 rounded-full text-sm mb-3">
                  {item.category}
                </span>

                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

              </div>

            </div>

          ))}

        </div>

        {/* Button */}

        <div className="text-center mt-16">

          <Link
            href="/gallery"
            className="inline-block bg-blue-700 hover:bg-blue-800 text-white px-10 py-4 rounded-xl font-bold transition"
          >
            مکمل گیلری دیکھیں
          </Link>

        </div>

      </div>
    </section>
  );
}