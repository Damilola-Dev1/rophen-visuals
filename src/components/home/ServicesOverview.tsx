import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import Slider from "../ui/Slider";
import { services } from "../../data/services";

export default function ServicesOverview() {
  const reduceMotion = useReducedMotion();

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

          <div className="mt-12 md:mt-16">
            <Slider
              label="Services"
              itemClassName="w-[82%] sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
            >
              {services.map((service, index) => (
                <Link
                  key={service.slug}
                  to={`/contact?service=${service.slug}`}
                  className="group flex min-h-[14rem] w-full flex-col justify-between rounded-3xl border border-charcoal/15 p-6 transition-colors duration-300 hover:bg-charcoal focus-visible:bg-charcoal md:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm tracking-[0.2em] text-stone-deep transition-colors duration-300 group-hover:text-bronze group-focus-visible:text-bronze">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <ArrowUpRight
                      size={24}
                      weight="regular"
                      aria-hidden="true"
                      className="text-charcoal transition-colors duration-300 group-hover:text-bronze group-focus-visible:text-bronze"
                    />
                  </div>

                  <div className="mt-10">
                    <h3 className="font-display text-3xl font-medium leading-tight text-charcoal transition-colors duration-300 group-hover:text-ivory group-focus-visible:text-ivory">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-stone-deep transition-colors duration-300 group-hover:text-ivory/75 group-focus-visible:text-ivory/75">
                      {service.description}
                    </p>
                    <span className="sr-only">
                      Enquire about {service.title}
                    </span>
                  </div>
                </Link>
              ))}
            </Slider>
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
            {services.map((service) => (
              <span
                key={service.slug}
                className="font-display text-3xl text-ivory md:text-5xl"
              >
                {service.title}
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
                {services.map((service) => (
                  <span
                    key={`${copy}-${service.slug}`}
                    className="flex flex-none items-center pr-8 font-display text-3xl text-ivory md:pr-12 md:text-5xl"
                  >
                    {service.title}
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
