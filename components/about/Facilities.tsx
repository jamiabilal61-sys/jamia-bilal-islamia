import { facilities } from "@/lib/facilities";

export default function Facilities() {
  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-700 font-semibold">
            ہماری سہولیات
          </span>

          <h2 className="text-5xl font-bold text-blue-900 mt-3">
            جامعہ کی نمایاں سہولیات
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-8">
            جامعہ بلال الاسلامیہ لاہور طلبہ کو بہترین تعلیمی، رہائشی اور
            تحقیقی ماحول فراہم کرتی ہے۔
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {facilities.map((facility) => (

            <div
              key={facility.id}
              className="bg-slate-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >

              <div className="text-6xl mb-6">
                {facility.icon}
              </div>

              <h3 className="text-2xl font-bold text-blue-900">
                {facility.title}
              </h3>

              <p className="text-gray-600 leading-8 mt-5">
                {facility.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}