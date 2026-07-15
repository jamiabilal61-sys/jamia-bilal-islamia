import Image from "next/image";
import Link from "next/link";
import { faculty } from "@/lib/faculty";

export default function Faculty() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-16">

          <span className="text-green-700 font-semibold">
            اساتذۂ کرام
          </span>

          <h2 className="mt-3 text-4xl lg:text-5xl font-bold text-blue-900">
            ہمارے ممتاز اساتذہ
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-gray-600 leading-8">
            جامعہ بلال الاسلامیہ لاہور میں مختلف علومِ اسلامیہ کے ماہر اور
            تجربہ کار اساتذۂ کرام طلبہ کی علمی و عملی تربیت کرتے ہیں۔
          </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {faculty.map((teacher) => (

            <div
              key={teacher.id}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >

              <div className="relative h-80">

                <Image
                  src={teacher.image}
                  alt={teacher.name}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="p-6 text-center">

                <h3 className="text-xl font-bold text-blue-900">
                  {teacher.name}
                </h3>

                <p className="mt-2 text-green-700 font-semibold">
                  {teacher.subject}
                </p>

                <Link
                  href="/faculty"
                  className="inline-block mt-6 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl transition"
                >
                  مزید تفصیل
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}