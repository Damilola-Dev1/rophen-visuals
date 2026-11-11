import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { services } from "../../data/services";

export default function ServicesOverview() {
  const reduceMotion = useReducedMotion();
  const touchStartX = useRef<number | null>(null);
  const [[index, direction], setPage] = useState<[number, number]>([0, 1]);

  const count = services.length;
  const service = services[index];

  function go(step: 1 | -1) {
    setPage(([current]) => [(current + step + count) % count, step]);
  }

  function goTo(target: number) {
    setPage(([current]) => [target, target >= current ? 1 : -1]);
  }

  const distance = reduceMotion ? 0 : 40;
  const variants: Variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * distance }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: -dir * distance }),
  };

  const arrowClass =
    "grid h-12 w-12 flex-none place-items-center rounded-full border border-charcoal/30 text-charcoal transition-all duration-300 hover:bg-charcoal hover:text-ivory active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal motion-reduce:transform-none";

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-ivory pb-0 pt-8 md:pt-16"
    >
      <div className="px-6 pb-20 md:px-16 md:pb-28">
        <div className="mx-auto max-w-[1400px]">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-deep">
            What we do
          </p>
          <h2
            id="services-heading"
            className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl"
          >
            Services
          </h2>

          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Services"
            className="mt-12 md:mt-16"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchStartX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              touchStartX.current = null;
              if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            }}
          >
            <div className="min-h-[22rem] md:min-h-[28rem]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={service.slug}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: reduceMotion ? 0 : 0.35,
                    ease: "easeOut",
                  }}
                  className="mx-auto grid max-w-5xl grid-cols-[1.15fr_1fr] items-center gap-4 md:gap-14"
                >
                  <div>
                    <p className="font-display text-xl italic leading-snug text-charcoal sm:text-2xl md:text-4xl">
                      {service.description}
                    </p>
                    <Link
                      to={`/contact?service=${service.slug}`}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-charcoal underline decoration-charcoal/40 underline-offset-8 transition-colors hover:decoration-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal md:text-base"
                    >
                      Enquire
                      <span className="sr-only"> about {service.title}</span>
                      <ArrowUpRight
                        size={18}
                        weight="regular"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>

                  <div className="flex aspect-[4/5] flex-col items-center justify-between rounded-3xl bg-charcoal px-4 py-8 text-center text-ivory md:px-8 md:py-12">
                    <p className="text-xs uppercase tracking-[0.2em] text-bronze">
                      Service
                    </p>
                    <div className="flex flex-col items-center">
                      <h3 className="break-words font-display text-2xl font-medium italic leading-tight sm:text-3xl md:text-5xl">
                        {service.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-5 block h-px w-14 bg-ivory/40"
                      />
                    </div>
                    <p className="font-display text-base text-ivory/70 md:text-xl">
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(count).padStart(2, "0")}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex items-center justify-center gap-3 md:mt-10 md:gap-5">
              <button
                type="button"
                aria-label="Previous service"
                onClick={() => go(-1)}
                className={arrowClass}
              >
                <ArrowLeft size={20} weight="regular" aria-hidden="true" />
              </button>

              <div className="flex items-center">
                {services.map((item, dotIndex) => (
                  <button
                    key={item.slug}
                    type="button"
                    aria-label={`Show ${item.title}`}
                    aria-current={index === dotIndex}
                    onClick={() => goTo(dotIndex)}
                    className="grid h-6 w-6 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                        index === dotIndex
                          ? "w-6 bg-charcoal"
                          : "w-2 bg-charcoal/25"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                type="button"
                aria-label="Next service"
                onClick={() => go(1)}
                className={arrowClass}
              >
                <ArrowRight size={20} weight="regular" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Moving strip of the service names. Static and wrapped for reduced motion. */}
      <div
        className="overflow-hidden bg-charcoal py-6 md:py-8"
        aria-hidden="true"
      >
        {reduceMotion ? (
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 px-6">
            {services.map((item) => (
              <span
                key={item.slug}
                className="font-display text-3xl text-ivory md:text-5xl"
              >
                {item.title}
              </span>
            ))}
          </div>
        ) : (
          <motion.div
            className="flex w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex flex-none">
                {services.map((item) => (
                  <span
                    key={`${copy}-${item.slug}`}
                    className="flex flex-none items-center pr-8 font-display text-3xl text-ivory md:pr-12 md:text-5xl"
                  >
                    {item.title}
                    <span className="ml-8 inline-block h-2 w-2 rounded-full bg-bronze md:ml-12" />
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
