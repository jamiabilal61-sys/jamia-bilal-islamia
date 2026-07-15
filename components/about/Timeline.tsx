const history = [
  {
    year: "2010",
    title: "جامعہ کا قیام",
    description:
      "جامعہ بلال الاسلامیہ لاہور کا قیام دینی تعلیم کے فروغ کے لیے عمل میں آیا۔",
  },
  {
    year: "2010",
    title: "حفظ القرآن کا آغاز",
    description:
      "حفظ القرآن اور تجوید کے باقاعدہ شعبے کا افتتاح کیا گیا۔",
  },
  {
    year: "2012",
    title: "درس نظامی",
    description:
      "درس نظامی کا آغاز ہوا۔",
  },
  {
    year: "2015",
    title: "کمپیوٹر لیب",
    description:
      "طلبہ کے لیے  کمپیوٹر لیب قائم کی گئی۔",
  },
  {
    year: "2026",
    title: "ڈیجیٹل پورٹل",
    description:
      "جامعہ بلال الاسلامیہ کا جدید AI اور ڈیجیٹل پورٹل شروع کیا گیا۔",
  },
];

export default function Timeline() {
  return (
    <section className="py-20">

      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-blue-900">

            جامعہ کا تاریخی سفر

          </h2>

          <p className="mt-4 text-gray-600">

            چند اہم سنگ میل

          </p>

        </div>

        <div className="space-y-10">

          {history.map((item) => (

            <div
              key={item.year}
              className="flex gap-6 items-start"
            >

              <div className="w-24 text-blue-800 font-bold text-xl">

                {item.year}

              </div>

              <div className="flex-1 bg-white shadow rounded-xl p-6 border">

                <h3 className="text-2xl font-bold mb-3">

                  {item.title}

                </h3>

                <p className="text-gray-600 leading-8">

                  {item.description}

                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}