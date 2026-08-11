import Image from "next/image";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">

      {/* Background */}
      <Image
        src="/images/hero.jpg"
        alt="جامعہ بلال الاسلامیہ"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-green-900/70 to-black/60" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 w-full">

        <div className="max-w-3xl">

          <p className="text-yellow-400 text-lg mb-4">
            بسم اللہ الرحمن الرحیم
          </p>

          <h1 className="whitespace-nowrap text-[clamp(1.75rem,4.4vw,4.5rem)] font-bold leading-[1.6] text-white">
            {siteConfig.nameUr}
          </h1>

          <p className="mt-6 text-2xl text-green-200">
            {siteConfig.tagline}
          </p>

          <p className="mt-8 text-lg leading-9 text-gray-200">
            جامعہ بلال الاسلامیہ لاہور ایک جدید دینی و عصری تعلیمی ادارہ ہے
            جہاں قرآن، حدیث، فقہ، حفظ القرآن، تخصص، دعوت اور جدید علوم کو
            اعلیٰ معیار کے ساتھ پڑھایا جاتا ہے۔
          </p>

          <div className="flex flex-wrap gap-4 mt-10">

            <Button>
              آن لائن داخلہ
            </Button>

            <Button variant="secondary">
              جامعہ کا تعارف
            </Button>

            <Button variant="outline">
              رابطہ کریں
            </Button>

          </div>

        </div>

      </div>

    </section>
  );
}
