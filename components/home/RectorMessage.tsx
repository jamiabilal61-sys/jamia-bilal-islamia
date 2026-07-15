import Image from "next/image";
import Link from "next/link";

export default function RectorMessage() {
  return (
    <section className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}

          <div className="relative">

            <Image
              src="/images/rector.jpg"
              alt="رئیس الجامعہ"
              width={500}
              height={600}
              className="rounded-3xl shadow-xl w-full h-auto"
            />

          </div>

          {/* Content */}

          <div>

            <span className="text-green-700 font-bold">

              رئیس الجامعہ کا پیغام

            </span>

            <h2 className="text-4xl font-bold mt-4 text-slate-900">

              خوش آمدید

            </h2>

            <p className="mt-8 leading-9 text-gray-700">

              جامعہ بلال الاسلامیہ لاہور میں ہمارا مقصد ایسے
              علماء، معلمین اور داعیان تیار کرنا ہے جو قرآن و سنت
              کی صحیح تعلیمات کو دنیا بھر میں عام کریں، اعلیٰ اخلاق
              کے حامل ہوں اور امت مسلمہ کی خدمت کو اپنی زندگی کا
              مقصد بنائیں۔

            </p>

            <p className="mt-6 leading-9 text-gray-700">

              ہم دعاگو ہیں کہ اللہ تعالیٰ اس ادارے کو امت کے لیے
              نافع بنائے اور یہاں سے فارغ ہونے والے طلبہ علم و عمل
              میں نمایاں مقام حاصل کریں۔

            </p>

            <div className="mt-10">

              <Link
                href="/about"
                className="inline-block bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl transition"
              >
                مزید پڑھیں
              </Link>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}