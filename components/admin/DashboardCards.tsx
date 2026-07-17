const stats = [
  {
    title: "کل درخواستیں",
    value: 156,
    color: "bg-blue-600",
    icon: "📄",
  },
  {
    title: "منظور شدہ",
    value: 98,
    color: "bg-green-600",
    icon: "✅",
  },
  {
    title: "زیرِ غور",
    value: 41,
    color: "bg-yellow-500",
    icon: "⏳",
  },
  {
    title: "مسترد",
    value: 17,
    color: "bg-red-600",
    icon: "❌",
  },
];

export default function DashboardCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className={`${item.color} rounded-2xl text-white p-6 shadow-lg`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{item.title}</p>

              <h2 className="text-4xl font-bold mt-3">
                {item.value}
              </h2>
            </div>

            <div className="text-5xl">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}