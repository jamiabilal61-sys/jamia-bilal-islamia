import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-blue-700 to-green-700 text-white">

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-28 text-center">

        <p className="text-yellow-300 text-lg mb-4">
          بسم اللہ الرحمن الرحیم
        </p>

        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
          {siteConfig.nameUr}
        </h1>

        <h2 className="mt-5 text-2xl lg:text-3xl">
          {siteConfig.tagline}
        </h2>

        <p className="mt-8 max-w-3xl mx-auto text-lg leading-9 text-gray-100">
          جامعہ بلال الاسلامیہ لاہور ایک جدید اسلامی تعلیمی ادارہ ہے جہاں
          قرآن، حدیث، فقہ، حفظ القرآن، تخصص فی الافتاء اور جدید کمپیوٹر
          تعلیم کو یکجا کیا گیا ہے تاکہ طلبہ دین اور دنیا دونوں میں کامیاب
          ہوں۔
        </p>

        <div className="flex flex-wrap justify-center gap-5 mt-10">

          <Button>
            آن لائن داخلہ
          </Button>

          <Button variant="secondary">
            سرپرست پورٹل
          </Button>

          <Button variant="outline">
            جامعہ کا تعارف
          </Button>

        </div>

      </div>

    </section>
  );
}