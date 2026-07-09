import { partners } from "@/lib/partners";

export default function Partners() {
  return (
    <section className="bg-white py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-700 font-semibold">
            وابستہ ادارے
          </span>

          <h2 className="text-5xl font-bold text-blue-900 mt-3">

            ہمارے شراکت دار

          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-8">

            وہ ادارے جن کے ساتھ جامعہ علمی و تعلیمی تعاون رکھتی ہے۔

          </p>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          {partners.map((partner) => (

            <div
              key={partner.id}
              className="bg-slate-50 rounded-3xl shadow hover:shadow-xl transition duration-300 p-8 flex flex-col items-center"
            >

              <img
                src={partner.logo}
                alt={partner.name}
                className="h-20 w-auto object-contain"
              />

              <h3 className="mt-6 text-center text-blue-900 font-bold">

                {partner.name}

              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}