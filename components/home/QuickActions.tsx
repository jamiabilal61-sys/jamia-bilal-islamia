import Link from "next/link";

const actions = [
  {
    title: "آن لائن داخلہ",
    description: "گھر بیٹھے داخلہ فارم جمع کروائیں۔",
    icon: "🎓",
    link: "/admission",
  },
  {
    title: "سرپرست پورٹل",
    description: "اپنے بچے کی کارکردگی دیکھیں۔",
    icon: "👨‍👩‍👦",
    link: "/guardian",
  },
  {
    title: "دارالافتاء",
    description: "شرعی مسائل کے لیے سوالات ارسال کریں۔",
    icon: "⚖️",
    link: "/fatwa",
  },
  {
    title: "ڈیجیٹل لائبریری",
    description: "کتب، مجلات اور علمی مواد پڑھیں۔",
    icon: "📚",
    link: "/library",
  },
];

export default function QuickActions() {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900 mb-14">
          فوری خدمات
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {actions.map((item) => (

            <Link
              key={item.title}
              href={item.link}
              className="
              bg-white
              rounded-2xl
              shadow-lg
              hover:shadow-2xl
              transition
              duration-300
              p-8
              text-center
              border
              hover:-translate-y-2
              "
            >

              <div className="text-6xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-blue-900 mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600 mb-6">
                {item.description}
              </p>

              <span className="text-green-700 font-bold">
                مزید پڑھیں →
              </span>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}