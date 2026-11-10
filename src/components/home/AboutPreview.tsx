import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { brandIntro } from "../../data/brand";

export default function AboutPreview() {
  const reduceMotion = useReducedMotion();

  const fadeIn = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.7, ease: "easeOut" as const },
      };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-ivory px-6 pb-20 pt-20 md:px-16 md:pb-28 md:pt-28"
    >
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-2 md:gap-16">
        <motion.div {...fadeIn}>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-deep">
            {brandIntro.eyebrow}
          </p>
          <h2
            id="about-heading"
            className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl"
          >
            {brandIntro.heading}
          </h2>
        </motion.div>

        <motion.div {...fadeIn}>
          <div className="space-y-5 text-base leading-relaxed text-charcoal md:text-lg">
            {brandIntro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-base font-medium text-ivory transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
          >
            More About Me
            <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
