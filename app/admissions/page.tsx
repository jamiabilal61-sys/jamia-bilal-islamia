import PageHeader from "@/components/common/PageHeader";
import AdmissionForm from "@/components/admissions/AdmissionForm";

export default function AdmissionsPage() {
  return (
    <main>
      <PageHeader
        title="آن لائن داخلہ"
        subtitle="جامعہ بلال الاسلامیہ لاہور میں داخلہ فارم"
      />

      <AdmissionForm />

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-900">
            داخلے کے لیے ضروری ہدایات
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            فارم مکمل اور درست معلومات کے ساتھ پُر کریں۔ تمام معلومات کی تصدیق
            کے بعد جامعہ کی انتظامیہ آپ سے رابطہ کرے گی۔ اگر کسی مرحلے پر مزید
            معلومات درکار ہوں تو آپ دیے گئے رابطہ نمبرز پر بھی رابطہ کر سکتے
            ہیں۔
          </p>
        </div>
      </section>
    </main>
  );
}