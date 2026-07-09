export default function About() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900">
          جامعہ بلال الاسلامیہ لاہور
        </h2>

        <p className="text-center text-gray-600 mt-3">
          علم، عمل اور اخلاق کا عظیم گہوارہ
        </p>

        <div className="grid md:grid-cols-2 gap-12 mt-12 items-center">

          <div>

            <h3 className="text-3xl font-bold mb-6 text-blue-800">
              مقصدِ قیام
            </h3>

            <p className="text-lg leading-10 text-gray-700">

              جامعہ بلال الاسلامیہ لاہور ایک ایسا دینی و
              تعلیمی ادارہ ہے جہاں قرآن و سنت کی تعلیم،
              حفظ القرآن، درس نظامی، تخصص فی الافتاء
              اور جدید عصری علوم کو یکجا کیا گیا ہے۔

              ہمارا مقصد ایسے علماء، حفاظ،
              مفتیانِ کرام اور نوجوان تیار کرنا ہے
              جو دین و دنیا دونوں میدانوں میں
              امت کی خدمت کر سکیں۔

            </p>

          </div>

          <div>

            <img
              src="/images/jamia.jpg"
              alt="Jamia"
              className="rounded-2xl shadow-xl"
            />

          </div>

        </div>

      </div>
    </section>
  );
}