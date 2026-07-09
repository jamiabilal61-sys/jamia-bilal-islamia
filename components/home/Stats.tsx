const stats = [
  {
    number: "+3200",
    title: "طلبہ",
    color: "text-blue-700",
  },
  {
    number: "85",
    title: "اساتذہ",
    color: "text-green-700",
  },
  {
    number: "14",
    title: "شعبہ جات",
    color: "text-amber-600",
  },
  {
    number: "+950",
    title: "فضلاء",
    color: "text-red-600",
  },
];

export default function Stats() {
  return (
    <section className="bg-white py-16">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item) => (

            <div
              key={item.title}
              className="
                rounded-2xl
                bg-white
                shadow-lg
                border
                p-8
                text-center
                hover:shadow-xl
                transition
                duration-300
              "
            >

              <h2 className={`text-5xl font-extrabold ${item.color}`}>
                {item.number}
              </h2>

              <p className="mt-4 text-xl text-gray-700 font-semibold">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}