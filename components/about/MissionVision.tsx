export default function MissionVision() {
  return (
    <section className="bg-slate-50 py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-blue-900">

            ہمارا مشن اور وژن

          </h2>

          <p className="mt-4 text-gray-600">

            قرآن و سنت کی روشنی میں علم، عمل اور کردار کی تعمیر

          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Mission */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="text-5xl mb-5">
              🎯
            </div>

            <h3 className="text-2xl font-bold mb-4">

              ہمارا مشن

            </h3>

            <p className="text-gray-600 leading-8">

              ایسے علماء، حفاظ اور طلبہ تیار کرنا جو
              قرآن و سنت کی صحیح تعلیمات کو معاشرے تک
              پہنچائیں۔

            </p>

          </div>

          {/* Vision */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="text-5xl mb-5">
              🌍
            </div>

            <h3 className="text-2xl font-bold mb-4">

              ہمارا وژن

            </h3>

            <p className="text-gray-600 leading-8">

              دینی اور عصری علوم کے امتزاج سے
              ایک مثالی اسلامی تعلیمی ادارہ بننا۔

            </p>

          </div>

          {/* Values */}

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <div className="text-5xl mb-5">
              ⭐
            </div>

            <h3 className="text-2xl font-bold mb-4">

              ہماری اقدار

            </h3>

            <p className="text-gray-600 leading-8">

              اخلاص، تقویٰ، دیانت، تحقیق،
              اعتدال اور خدمتِ خلق۔

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}