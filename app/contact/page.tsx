import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import GoogleMap from "@/components/contact/GoogleMap";

export default function ContactPage() {
  return (
    <main>

      <section className="bg-blue-900 text-white py-20">

        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-5xl font-bold">
            رابطہ
          </h1>

          <p className="mt-5 text-blue-100">
            جامعہ بلال الاسلامیہ لاہور سے رابطہ کرنے کے تمام ذرائع
          </p>

        </div>

      </section>

      <ContactInfo />

      <ContactForm />

      <GoogleMap />

    </main>
  );
}