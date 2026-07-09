const timeline = [
  {
    year: "2005",
    title: "جامعہ کا قیام",
    description: "جامعہ بلال الاسلامیہ لاہور کا قیام دینی تعلیم کے فروغ کے لیے عمل میں آیا۔",
  },
  {
    year: "2010",
    title: "شعبہ حفظ القرآن",
    description: "حفظ القرآن کا باقاعدہ شعبہ قائم کیا گیا۔",
  },
  {
    year: "2020",
    title: "عصری تعلیم",
    description: "کمپیوٹر اور جدید عصری علوم کا آغاز کیا گیا۔",
  },
  {
    year: "2026",
    title: "ڈیجیٹل پورٹل",
    description: "جامعہ کے جدید آن لائن پورٹل کا آغاز۔",
  },
  {
    year: "2015",
    title: "دار  الافتاء",
    description: "عوام الناس کی دینی رہنمائی کے لیے۔",
  },
];

export default function Timeline() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-700 font-semibold">
            تاریخ
          </span>

          <h2 className="text-5xl font-bold text-blue-900 mt-3">
            جامعہ کا سفر
          </h2>

        </div>

        <div className="relative">

          <div className="absolute right-6 top-0 bottom-0 w-1 bg-blue-700 rounded-full"></div>

          <div className="space-y-12">

            {timeline.map((item) => (

              <div
                key={item.year}
                className="relative pr-24"
              >

                <div className="absolute right-0 top-2 bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center font-bold">

                  {item.year}

                </div>

                <div className="bg-white rounded-3xl shadow-lg p-8">

                  <h3 className="text-3xl font-bold text-blue-900">

                    {item.title}

                  </h3>

                  <p className="mt-5 text-gray-600 leading-9">

                    {item.description}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}