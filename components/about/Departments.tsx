import { departments } from "@/lib/departments";

export default function Departments() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-700 font-semibold">
            تعلیمی شعبہ جات
          </span>

          <h2 className="text-5xl font-bold text-blue-900 mt-3">
            جامعہ کے شعبے
          </h2>

          <p className="text-gray-600 mt-5">
            جامعہ بلال الاسلامیہ لاہور کے اہم تعلیمی شعبہ جات
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {departments.map((department) => (
            <div
              key={department.id}
              className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 transition"
            >
              <div className="text-5xl mb-6">
                {department.icon}
              </div>

              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                {department.title}
              </h3>

              <p className="text-gray-600 leading-8">
                {department.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}