import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import CtaSection from "../components/home/CtaSection";
import { services } from "../data/services";
import { usePageTitle } from "../hooks/usePageTitle";

export default function ServicesPage() {
  usePageTitle("Services");

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
            Video and photography for individuals, brands and events. Choose a
            service to start an enquiry.
          </p>

          <ul className="mt-12 border-t border-charcoal/15 md:mt-16">
            {services.map((service, index) => (
              <li key={service.slug} className="border-b border-charcoal/15">
                <Link
                  to={`/contact?service=${service.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-5 gap-y-3 py-8 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-charcoal md:grid-cols-12 md:items-center md:gap-x-8 md:py-10"
                >
                  <span className="pt-1 text-sm tracking-[0.2em] text-stone-deep md:col-span-1 md:pt-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h2 className="font-display text-3xl font-medium leading-tight text-charcoal transition-transform duration-300 ease-out group-hover:translate-x-2 group-active:translate-x-2 motion-reduce:transform-none md:col-span-5 md:text-5xl">
                    {service.title}
                  </h2>

                  <ArrowUpRight
                    size={28}
                    weight="regular"
                    aria-hidden="true"
                    className="text-charcoal transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transform-none md:order-last md:col-span-1 md:justify-self-end"
                  />

                  <p className="col-start-2 col-end-4 text-base leading-relaxed text-stone-deep md:col-span-5 md:col-start-auto md:col-end-auto md:text-lg">
                    {service.description}
                    <span className="sr-only">
                      {" "}
                      Enquire about {service.title}.
                    </span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
