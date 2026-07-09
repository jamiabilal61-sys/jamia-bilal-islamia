import Image from "next/image";
import { faculty } from "@/lib/faculty";

export default function Faculty() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-700 font-semibold">
            اساتذہ کرام
          </span>

          <h2 className="text-5xl font-bold text-blue-900 mt-3">
            ہمارے ممتاز اساتذہ
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-8">
            جامعہ بلال الاسلامیہ لاہور کے قابلِ احترام اساتذہ کرام
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {faculty.map((teacher) => (

            <div
              key={teacher.id}
              className="bg-white rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            >

<div className="relative w-full h-72">

  <Image
    src={teacher.image}
    alt={teacher.name}
    fill
    className="object-cover"
  />

</div>
              
                 <div className="p-6 text-center">

                <h3 className="text-2xl font-bold text-blue-900">
                  {teacher.name}
                </h3>

                <p className="text-green-700 font-semibold mt-3">
                  {teacher.subject}
                </p>

                <button className="mt-6 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-xl transition">
                  مکمل پروفائل
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}