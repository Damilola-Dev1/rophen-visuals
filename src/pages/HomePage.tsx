import { useReducedMotion } from "framer-motion";
import Hero from "../components/home/Hero";
import Showreel from "../components/home/Showreel";
import FeaturedProjects from "../components/home/FeaturedProjects";
import ServicesOverview from "../components/home/ServicesOverview";
import AboutPreview from "../components/home/AboutPreview";
import FaqSection from "../components/home/FaqSection";
import Testimonials from "../components/home/Testimonials";
import { usePageTitle } from "../hooks/usePageTitle";

export default function HomePage() {
  usePageTitle();
  const reduceMotion = useReducedMotion();

  return (
    <>
      {/* The Hero stays pinned to the top while the rest of the page
          slides up over it. Off when "reduce motion" is on. */}
      <div className={reduceMotion ? "" : "sticky top-0 z-0"}>
        <Hero />
      </div>

      {/* The "curtain": solid ivory, sits above the pinned Hero. */}
      <div className="relative z-10 bg-ivory">
        <Showreel />
        <FeaturedProjects />
        <ServicesOverview />
        <AboutPreview />
        <FaqSection />
        <Testimonials />
      </div>
    </>
  );
}
