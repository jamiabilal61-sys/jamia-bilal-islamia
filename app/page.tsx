import Hero from "@/components/home/Hero";
import QuickLinks from "@/components/home/QuickLinks";
import RectorMessage from "@/components/home/RectorMessage";
import LatestNews from "@/components/home/LatestNews";
import Departments from "@/components/home/Departments";
import AdmissionsBanner from "@/components/home/AdmissionsBanner";
import Statistics from "@/components/home/Statistics";
import Faculty from "@/components/home/Faculty";
import Gallery from "@/components/home/Gallery";

export default function HomePage() {
  return (
    <main>
      <Hero />

      <QuickLinks />

      <RectorMessage />

      <LatestNews />

      <Departments />

      <AdmissionsBanner />

      <Statistics />

      <Faculty />

      <Gallery />
    </main>
  );
}