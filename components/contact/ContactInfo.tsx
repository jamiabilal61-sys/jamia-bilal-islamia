import { siteConfig } from "@/lib/site";

export default function ContactInfo() {
  const contacts = [
    {
      title: "پتہ",
      value: "جامعہ بلال الاسلامیہ، جونا منڈی، لاہور، پاکستان",
      icon: "📍",
    },
    {
      title: "فون",
      value: siteConfig.phone,
      icon: "☎️",
    },
    {
      title: "موبائل",
      value: siteConfig.mobile,
      icon: "📱",
    },
    {
      title: "ای میل",
      value: siteConfig.email,
      icon: "✉️",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <span className="text-green-700 font-semibold">
            رابطہ معلومات
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-blue-900 mt-3">
            ہم سے رابطہ کریں
          </h2>

          <p className="mt-5 text-gray-600 max-w-3xl mx-auto leading-8">
            اگر آپ داخلہ، کورسز یا جامعہ سے متعلق کسی بھی معلومات کے لیے
            رابطہ کرنا چاہتے ہیں تو درج ذیل ذرائع استعمال کریں۔
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {contacts.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-8 text-center"
            >
              <div className="text-5xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold text-blue-900">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-8">
                {item.value}
              </p>
            </div>
          ))}

        </div>

        <div className="mt-12 rounded-3xl bg-blue-950 px-6 py-8 text-center text-white">
          <h3 className="text-2xl font-bold">سوشل میڈیا پر رابطہ</h3>
          <div className="mt-6 flex flex-wrap justify-center gap-4" dir="ltr">
            <a href={siteConfig.social.facebook} target="_blank" rel="noreferrer" className="rounded-xl bg-white px-6 py-3 font-bold text-blue-900 transition hover:bg-yellow-400">Facebook</a>
            <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="rounded-xl bg-white px-6 py-3 font-bold text-blue-900 transition hover:bg-yellow-400">Instagram</a>
            <a href={siteConfig.social.x} target="_blank" rel="noreferrer" className="rounded-xl bg-white px-6 py-3 font-bold text-blue-900 transition hover:bg-yellow-400">X</a>
          </div>
        </div>

      </div>
    </section>
  );
}
