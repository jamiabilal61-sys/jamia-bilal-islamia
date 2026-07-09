import PageHeader from "@/components/common/PageHeader";
import AboutIntro from "@/components/about/AboutIntro";
import MissionVision from "@/components/about/MissionVision";
import Timeline from "@/components/about/Timeline";

export default function AboutPage() {
  return (
    <main>

      <PageHeader
        title="جامعہ کا تعارف"
        subtitle="علم، عمل اور اخلاق کا عظیم گہوارہ"
      />

      <AboutIntro />

      <MissionVision />

      <Timeline />

    </main>
  );
}