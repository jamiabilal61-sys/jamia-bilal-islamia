export default function AboutIntro() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid lg:grid-cols-2 gap-16 items-center">

        {/* Image */}
        <div>
          <img
            src="/images/hero.jpg"
            alt="جامعہ بلال الاسلامیہ"
            className="rounded-2xl shadow-xl w-full"
          />
        </div>

        {/* Content */}
        <div>
          <span className="text-blue-700 font-bold">
            ہمارا تعارف
          </span>

          <h2 className="text-4xl font-bold mt-4 mb-6">
            جامعہ بلال الاسلامیہ لاہور
          </h2>

          <p className="leading-9 text-gray-700">
            جامعہ بلال الاسلامیہ لاہور ایک مستند دینی و
            تعلیمی ادارہ ہے جہاں قرآن کریم، حدیث،
            فقہ، حفظ، تخصص اور جدید علوم کی
            تعلیم دی جاتی ہے۔
          </p>

          <p className="leading-9 text-gray-700 mt-6">
            ہمارا مقصد ایسے علماء اور نوجوان تیار کرنا
            ہے جو دین اور دنیا دونوں میدانوں میں امت
            مسلمہ کی خدمت کریں۔
          </p>
        </div>

      </div>
    </section>
  );
}