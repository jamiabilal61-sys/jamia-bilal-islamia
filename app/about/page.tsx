import FAQ from "@/components/about/FAQ";
import Partners from "@/components/about/Partners";
import Testimonials from "@/components/about/Testimonials";
import Facilities from "@/components/about/Facilities";
import Faculty from "@/components/about/Faculty";
import Departments from "@/components/about/Departments";
import Timeline from "@/components/about/Timeline";
import MissionVision from "@/components/about/MissionVision";
import PageHeader from "@/components/common/PageHeader";
import Leadership from "@/components/about/Leadership";
import Statistics from "@/components/about/Statistics";

export default function AboutPage() {
  return (
    <main>

      <PageHeader
        title="جامعہ کا تعارف"
        subtitle="علم، عمل اور اخلاق کا عظیم گہوارہ"
      />

      <section className="py-20">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-blue-900">

            جامعہ بلال الاسلامیہ لاہور

          </h2>

          <p className="mt-8 text-lg leading-10 text-gray-700">

            جامعہ بلال الاسلامیہ لاہور ایک جدید اسلامی تعلیمی ادارہ ہے
            جہاں قرآنِ کریم، حدیث، فقہ، حفظ القرآن، تخصص فی الافتاء،
            کمپیوٹر سائنس اور جدید عصری علوم کو یکجا انداز میں پڑھایا جاتا ہے۔

          </p>

          <p className="mt-6 text-lg leading-10 text-gray-700">

            ہمارا مقصد ایسے علماء، حفاظ اور نوجوان تیار کرنا ہے
            جو دین و دنیا دونوں میدانوں میں امتِ مسلمہ کی خدمت کر سکیں۔

          </p>

        </div>

      </section>

      <Statistics />
      <MissionVision />
      <Timeline />
      <Departments />
      <Leadership />
      <Faculty />
      <Facilities />
      <Testimonials />
     <Partners />
      <FAQ />

    </main>
  );
}