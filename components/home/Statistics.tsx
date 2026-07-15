export default function Statistics() {
  const stats = [
    {
      id: 1,
      icon: "👨‍🎓",
      value: "3200+",
      title: "طلبہ",
      color: "text-blue-700",
    },
    {
      id: 2,
      icon: "👨‍🏫",
      value: "85",
      title: "اساتذۂ کرام",
      color: "text-green-700",
    },
    {
      id: 3,
      icon: "🏛️",
      value: "14",
      title: "شعبہ جات",
      color: "text-yellow-600",
    },
    {
      id: 4,
      icon: "🎓",
      value: "950+",
      title: "فضلاء",
      color: "text-red-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="text-green-700 font-semibold">
            جامعہ ایک نظر میں
          </span>

          <h2 className="text-4xl font-bold text-blue-900 mt-3">
            ہمارے اہم اعداد و شمار
          </h2>

          <p className="text-gray-600 mt-4">
            جامعہ بلال الاسلامیہ لاہور کی چند نمایاں جھلکیاں
          </p>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 hover:-translate-y-2 p-8 text-center"
            >

              <div className="text-5xl">
                {item.icon}
              </div>

              <h3 className={`text-5xl font-bold mt-6 ${item.color}`}>
                {item.value}
              </h3>

              <p className="mt-4 text-gray-600 text-lg">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}