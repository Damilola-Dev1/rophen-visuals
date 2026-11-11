import Hero from "../components/home/Hero";
import Showreel from "../components/home/Showreel";
import FeaturedProjects from "../components/home/FeaturedProjects";
import ServicesOverview from "../components/home/ServicesOverview";
import AboutPreview from "../components/home/AboutPreview";
import FaqSection from "../components/home/FaqSection";
import CtaSection from "../components/home/CtaSection";
import { usePageTitle } from "../hooks/usePageTitle";

export default function HomePage() {
  usePageTitle();

  return (
    <>
      <Hero />
      <Showreel />
      <FeaturedProjects />
      <ServicesOverview />
      <AboutPreview />
      <FaqSection />
      <CtaSection />
    </>
  );
}
