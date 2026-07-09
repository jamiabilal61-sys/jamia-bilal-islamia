export default function MissionVision() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-700 font-semibold">
            ہمارا نصب العین
          </span>

          <h2 className="text-5xl font-bold text-blue-900 mt-3">
            مشن، ویژن اور اقدار
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Mission */}

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <div className="text-5xl mb-6">
              🎯
            </div>

            <h3 className="text-3xl font-bold text-blue-900">
              ہمارا مشن
            </h3>

            <p className="text-gray-600 leading-9 mt-6">

              قرآن و سنت کی روشنی میں ایسے علماء،
              حفاظ، مفتیانِ کرام اور باکردار نوجوان
              تیار کرنا جو دین و ملت کی خدمت کریں۔

            </p>

          </div>

          {/* Vision */}

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <div className="text-5xl mb-6">
              👁
            </div>

            <h3 className="text-3xl font-bold text-blue-900">
              ہمارا ویژن
            </h3>

            <p className="text-gray-600 leading-9 mt-6">

              ایسا عالمی اسلامی تعلیمی ادارہ بننا
              جو دینی اور عصری علوم میں بہترین
              رہنمائی فراہم کرے۔

            </p>

          </div>

          {/* Values */}

          <div className="bg-white rounded-3xl shadow-lg p-10">

            <div className="text-5xl mb-6">
              ⭐
            </div>

            <h3 className="text-3xl font-bold text-blue-900">
              ہماری اقدار
            </h3>

            <p className="text-gray-600 leading-9 mt-6">

              اخلاص، تقویٰ، تحقیق،
              حسنِ اخلاق، اعتدال اور
              خدمتِ خلق ہماری بنیادی اقدار ہیں۔

            </p>

          </div>

        </div>

      </div>

    </section>
  );
}