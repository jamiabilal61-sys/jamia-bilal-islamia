import { leadership } from "@/lib/leadership";

export default function Leadership() {
  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-700 font-semibold">
            انتظامیہ
          </span>

          <h2 className="text-5xl font-bold text-blue-900 mt-3">
            قیادتِ جامعہ
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-8">
            جامعہ بلال الاسلامیہ لاہور کی علمی و انتظامی قیادت
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {leadership.map((leader) => (

            <div
              key={leader.id}
              className="bg-white rounded-3xl overflow-hidden shadow-lg border border-slate-100 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            >

              <img
                src={leader.image}
                alt={leader.name}
                className="w-full h-80 object-cover"
              />

              <div className="p-8">

                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-semibold">
                  {leader.position}
                </span>

                <h3 className="text-2xl font-bold text-blue-900 mt-5">
                  {leader.name}
                </h3>

                <p className="text-gray-600 leading-8 mt-5">
                  {leader.description}
                </p>

                <button className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl transition">
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