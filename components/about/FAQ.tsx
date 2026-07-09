import { faq } from "@/lib/faq";

export default function FAQ() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-5xl mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-blue-700 font-semibold">
            سوالات و جوابات
          </span>

          <h2 className="text-5xl font-bold text-blue-900 mt-3">
            اکثر پوچھے جانے والے سوالات
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto leading-8">
            جامعہ بلال الاسلامیہ لاہور سے متعلق اہم سوالات اور ان کے مختصر جوابات
          </p>

        </div>

        <div className="space-y-6">

          {faq.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg p-8"
            >

              <h3 className="text-2xl font-bold text-blue-900">

                {item.question}

              </h3>

              <p className="text-gray-600 leading-8 mt-5">

                {item.answer}

              </p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}