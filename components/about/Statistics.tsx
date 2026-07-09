export default function Statistics() {
  const stats = [
    {
      number: "10+",
      title: "سال کا تجربہ",
    },
    {
      number: "1000+",
      title: "طلبہ",
    },
    {
      number: "30+",
      title: "اساتذہ",
    },
    {
      number: "10+",
      title: "شعبہ جات",
    },
  ];

  return (
    <section className="bg-blue-900 py-20">

      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="text-center text-white"
            >

              <h2 className="text-5xl font-bold text-yellow-400">

                {item.number}

              </h2>

              <p className="mt-4 text-xl">

                {item.title}

              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}