export default function Statistics() {
  return (
    <section className="bg-white py-12">

      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h2 className="text-5xl font-bold text-blue-700">
              3200+
            </h2>

            <p className="mt-2 text-gray-600">
              طلبہ
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-green-700">
              85
            </h2>

            <p className="mt-2 text-gray-600">
              اساتذہ
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-yellow-600">
              14
            </h2>

            <p className="mt-2 text-gray-600">
              شعبہ جات
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold text-red-600">
              950+
            </h2>

            <p className="mt-2 text-gray-600">
              فضلاء
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}