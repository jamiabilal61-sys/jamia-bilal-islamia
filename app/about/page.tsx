import PageHeader from "@/components/common/PageHeader";

import AboutIntro from "@/components/about/AboutIntro";
import Statistics from "@/components/about/Statistics";
import MissionVision from "@/components/about/MissionVision";
import Timeline from "@/components/about/Timeline";
import Departments from "@/components/about/Departments";
import Leadership from "@/components/about/Leadership";
import Faculty from "@/components/about/Faculty";
import Facilities from "@/components/about/Facilities";
import Testimonials from "@/components/about/Testimonials";
import Partners from "@/components/about/Partners";
import FAQ from "@/components/about/FAQ";

export default function AboutPage() {
  return (
    <main>

      <PageHeader
        title="جامعہ کا تعارف"
        subtitle="علم، عمل اور اخلاق کا عظیم گہوارہ"
      />

      <AboutIntro />

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