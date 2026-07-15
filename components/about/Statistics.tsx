const stats = [
  {
    number: "1500+",
    title: "طلبہ",
    icon: "👨‍🎓",
  },
  {
    number: "80+",
    title: "اساتذہ",
    icon: "👨‍🏫",
  },
  {
    number: "25+",
    title: "شعبہ جات",
    icon: "🏛️",
  },
  {
    number: "500+",
    title: "فارغین",
    icon: "📚",
  },
];

export default function Statistics() {
  return (
    <section className="bg-blue-900 text-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item) => (

            <div
              key={item.title}
              className="text-center"
            >

              <div className="text-5xl mb-4">

                {item.icon}

              </div>

              <h2 className="text-4xl font-bold">

                {item.number}

              </h2>

              <p className="mt-2 text-lg">

                {item.title}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}