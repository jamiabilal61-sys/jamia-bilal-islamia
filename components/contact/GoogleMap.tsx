export default function GoogleMap() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-12">

          <span className="text-green-700 font-semibold">
            ہماری لوکیشن
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mt-3">
            جامعہ کا مقام
          </h2>

          <p className="mt-5 text-gray-600">
            گوگل میپ کے ذریعے جامعہ کا محلِ وقوع دیکھیں۔
          </p>

        </div>

        <div className="overflow-hidden rounded-3xl shadow-xl">

          <iframe
            src="https://www.google.com/maps?q=Lahore,Pakistan&output=embed"
            width="100%"
            height="500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>

      </div>

    </section>
  );
}