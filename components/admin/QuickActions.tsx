import Link from "next/link";

const actions = [
  {
    title: "نیا داخلہ",
    href: "/admissions",
    color: "bg-blue-600",
    icon: "📄",
  },
  {
    title: "خبریں شامل کریں",
    href: "/admin/news",
    color: "bg-green-600",
    icon: "📰",
  },
  {
    title: "نیا استاد",
    href: "/admin/faculty",
    color: "bg-purple-600",
    icon: "👨‍🏫",
  },
  {
    title: "شعبہ شامل کریں",
    href: "/admin/departments",
    color: "bg-orange-500",
    icon: "🏫",
  },
];

export default function QuickActions() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-6">
        فوری ایکشن
      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        {actions.map((item) => (

          <Link
            key={item.title}
            href={item.href}
            className={`${item.color} text-white rounded-xl p-6 hover:opacity-90 transition`}
          >

            <div className="text-4xl mb-4">
              {item.icon}
            </div>

            <h3 className="text-xl font-bold">
              {item.title}
            </h3>

          </Link>

        ))}

      </div>

    </div>
  );
}