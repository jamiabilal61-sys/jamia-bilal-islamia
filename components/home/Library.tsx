export default function Library() {
  return (
    <section className="py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900">
          ڈیجیٹل لائبریری
        </h2>

        <p className="text-center text-gray-600 mt-3">
          جامعہ کی کتب، رسائل اور علمی مواد
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-5xl mb-4">📖</div>

            <h3 className="text-2xl font-bold text-blue-900">
              فتاویٰ بلالیہ
            </h3>

            <p className="mt-3 text-gray-600">
              دارالافتاء کے مستند فتاویٰ کا مجموعہ۔
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-5xl mb-4">📚</div>

            <h3 className="text-2xl font-bold text-blue-900">
              آسان فقہ
            </h3>

            <p className="mt-3 text-gray-600">
              نماز، روزہ، زکوٰۃ اور دیگر بنیادی احکام۔
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-5xl mb-4">🕌</div>

            <h3 className="text-2xl font-bold text-blue-900">
              ماہنامہ پیام بلال
            </h3>

            <p className="mt-3 text-gray-600">
              جامعہ کی تازہ علمی و تحقیقی تحریریں۔
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}