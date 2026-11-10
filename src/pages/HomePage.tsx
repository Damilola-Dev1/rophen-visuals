import Hero from "../components/home/Hero";
import Showreel from "../components/home/Showreel";
import { usePageTitle } from "../hooks/usePageTitle";

export default function HomePage() {
  usePageTitle();

  return (
    <>
      <Hero />
      <Showreel />
    </>
  );
}
