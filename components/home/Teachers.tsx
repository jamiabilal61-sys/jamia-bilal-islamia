import { teachers } from "@/lib/teachers";

export default function Teachers() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900">
          اساتذہ کرام
        </h2>

        <p className="text-center text-gray-600 mt-3">
          ہمارے قابلِ احترام اساتذہ
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

          {teachers.map((teacher) => (

            <div
              key={teacher.id}
              className="bg-slate-50 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >

              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-6">

                <h3 className="text-2xl font-bold text-blue-900">
                  {teacher.name}
                </h3>

                <p className="text-green-700 font-semibold mt-2">
                  {teacher.position}
                </p>

                <p className="text-gray-600 mt-4">
                  {teacher.description}
                </p>

                <button
                  className="mt-6 bg-blue-700 text-white px-5 py-2 rounded-lg hover:bg-blue-800"
                >
                  مکمل تعارف
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}