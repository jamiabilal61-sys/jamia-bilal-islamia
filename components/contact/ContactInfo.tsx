export default function ContactInfo() {
  const contacts = [
    {
      title: "پتہ",
      value: "جامعہ بلال الاسلامیہ، جونا منڈی، لاہور، پاکستان",
      icon: "📍",
    },
    {
      title: "فون",
      value: "042-37651234",
      icon: "☎️",
    },
    {
      title: "موبائل",
      value: "0300-1234567",
      icon: "📱",
    },
    {
      title: "ای میل",
      value: "info@jamiabilal.edu.pk",
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

      </div>
    </section>
  );
}