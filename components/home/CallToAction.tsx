import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="bg-blue-900 py-20">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <span className="inline-block bg-yellow-400 text-blue-900 font-bold px-5 py-2 rounded-full mb-6">
          🎓 داخلے جاری ہیں
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-white">
          نئے تعلیمی سال 2026-27 کے داخلے شروع ہو چکے ہیں
        </h2>

        <p className="text-blue-100 text-xl mt-6 leading-9">
          جامعہ بلال الاسلامیہ لاہور میں
          درسِ نظامی، حفظ القرآن،
          تخصص فی الافتاء،
          کمپیوٹر سائنس اور دیگر شعبہ جات
          میں داخلہ فارم جمع کروائیں۔
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-5 mt-12">

          <Link
            href="/admissions"
            className="
            bg-yellow-400
            hover:bg-yellow-300
            text-blue-900
            font-bold
            px-8
            py-4
            rounded-xl
            transition
            "
          >
            آن لائن داخلہ
          </Link>

          <Link
            href="/portal/login"
            className="
            border-2
            border-white
            text-white
            hover:bg-white
            hover:text-blue-900
            font-bold
            px-8
            py-4
            rounded-xl
            transition
            "
          >
            سرپرست پورٹل
          </Link>

        </div>

      </div>

    </section>
  );
}
