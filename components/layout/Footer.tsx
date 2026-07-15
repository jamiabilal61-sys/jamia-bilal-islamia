import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B2C6B] text-white mt-20">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* About */}

          <div>

            <img
              src="/images/logo.png"
              alt="Jamia Bilal"
              className="h-20 w-auto mb-5"
            />

            <h3 className="text-2xl font-bold mb-4">
              جامعہ بلال الاسلامیہ لاہور
            </h3>

            <p className="text-gray-300 leading-8">
              جامعہ بلال الاسلامیہ لاہور ایک دینی و عصری تعلیمی ادارہ ہے
              جہاں قرآن، حدیث، فقہ، حفظ، دعوت و تربیت اور عصری علوم کی
              معیاری تعلیم دی جاتی ہے۔
            </p>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-2">
              اہم روابط
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>
                <Link href="/" className="hover:text-yellow-400">
                  صفحہ اول
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-yellow-400">
                  جامعہ کا تعارف
                </Link>
              </li>

              <li>
                <Link href="/departments" className="hover:text-yellow-400">
                  شعبہ جات
                </Link>
              </li>

              <li>
                <Link href="/news" className="hover:text-yellow-400">
                  خبریں
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-yellow-400">
                  رابطہ
                </Link>
              </li>

            </ul>

          </div>

          {/* Departments */}

          <div>

            <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-2">
              تعلیمی شعبے
            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>حفظ القرآن</li>

              <li>درس نظامی</li>

              <li>دارالافتاء</li>

              <li>عصری تعلیم</li>

              <li>کمپیوٹر کورس</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold mb-6 border-b border-white/20 pb-2">
              رابطہ
            </h3>

            <div className="space-y-4 text-gray-300 leading-8">

              <p>
                📍 جونا منڈی، لاہور، پاکستان
              </p>

              <p>
                ☎ 042-37651234
              </p>

              <p>
                📱 0300-1234567
              </p>

              <p>
                ✉ jamiabilal61@gmail.com
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-white/20">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-300 text-sm text-center">
            © 2026 جامعہ بلال الاسلامیہ لاہور۔ جملہ حقوق محفوظ ہیں۔
          </p>

          <p className="text-gray-300 text-sm">
            Design & Development by <span className="text-yellow-400 font-semibold">Farooqi Tech</span>
          </p>

        </div>

      </div>

    </footer>
  );
}