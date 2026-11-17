import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "@phosphor-icons/react";
import CtaSection from "../components/home/CtaSection";
import { services } from "../data/services";
import { usePageTitle } from "../hooks/usePageTitle";

export default function ServicesPage() {
  usePageTitle("Services");

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <>
      <section className="px-6 pb-16 pt-36 md:px-16 md:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-deep">
            What we do
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl">
            Services
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-stone-deep md:text-lg">
            Video and photography for individuals, brands and events. Tap a
            service to see what it covers.
          </p>

          <ul className="mt-12 rounded-3xl bg-charcoal px-6 py-2 md:mt-16 md:px-12 md:py-4">
            {services.map((service, index) => {
              const isOpen = openIndex === index;
              const buttonId = `service-button-${service.slug}`;
              const panelId = `service-panel-${service.slug}`;

              return (
                <li
                  key={service.slug}
                  className="border-b border-ivory/15 last:border-b-0"
                >
                  <h2>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="group grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 py-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-[#c5a77d] md:grid-cols-[4rem_1fr_auto] md:gap-x-8 md:py-8"
                    >
                      <span className="text-sm tracking-[0.2em] text-[#c5a77d]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-2xl font-medium leading-tight text-ivory md:text-5xl">
                        {service.title}
                      </span>
                      <Plus
                        size={28}
                        weight="regular"
                        aria-hidden="true"
                        className={`text-[#c5a77d] transition-transform duration-300 motion-reduce:transition-none ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                  </h2>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.35,
                          ease: "easeOut",
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-[3.5rem] md:pb-10 md:pl-[6rem]">
                          <p className="max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg">
                            {service.description}
                          </p>
                          <Link
                            to={`/contact?service=${service.slug}`}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c5a77d] px-6 py-3 text-base font-medium text-charcoal transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
                          >
                            Start an enquiry
                            <ArrowUpRight
                              size={20}
                              weight="regular"
                              aria-hidden="true"
                            />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
