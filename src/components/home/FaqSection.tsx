import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, CaretDown } from "@phosphor-icons/react";
import { faqs } from "../../data/faqs";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  if (faqs.length === 0) return null;

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="bg-ivory px-6 pb-20 pt-8 md:px-16 md:pb-28 md:pt-16"
    >
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-deep">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl"
          >
            Frequently Asked Questions
          </h2>
        </div>

        <ul className="mt-12 divide-y divide-charcoal/10 overflow-hidden rounded-3xl bg-white md:mt-16">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const buttonId = `faq-button-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <li key={faq.id}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="group flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition-colors duration-300 hover:bg-charcoal/[0.03] focus-visible:bg-charcoal/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-charcoal md:px-8 md:py-7"
                  >
                    <span className="text-lg font-medium leading-snug text-charcoal transition-transform duration-300 ease-out group-hover:translate-x-2 group-active:translate-x-2 motion-reduce:transform-none md:text-xl">
                      {faq.question}
                    </span>
                    <CaretDown
                      size={22}
                      weight="regular"
                      aria-hidden="true"
                      className={`flex-none text-charcoal transition-transform duration-300 ease-out motion-reduce:transition-none ${
                        isOpen
                          ? "rotate-180"
                          : "group-hover:translate-y-1 motion-reduce:transform-none"
                      }`}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-7 text-base leading-relaxed text-stone-deep md:px-8 md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-10 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-base font-medium text-ivory transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
          >
            Ask Something Else
            <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
