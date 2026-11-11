import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Minus, Plus } from "@phosphor-icons/react";
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
      <div className="mx-auto grid max-w-[1400px] gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-deep">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl"
          >
            Frequently Asked Questions
          </h2>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-base font-medium text-ivory transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
          >
            Ask Something Else
            <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
          </Link>
        </div>

        <ul className="border-t border-charcoal/15">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            const buttonId = `faq-button-${faq.id}`;
            const panelId = `faq-panel-${faq.id}`;

            return (
              <li key={faq.id} className="border-b border-charcoal/15">
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-2xl font-medium leading-snug text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal md:text-3xl"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <Minus
                        size={24}
                        weight="regular"
                        aria-hidden="true"
                        className="flex-none"
                      />
                    ) : (
                      <Plus
                        size={24}
                        weight="regular"
                        aria-hidden="true"
                        className="flex-none"
                      />
                    )}
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
                    <p className="pb-6 text-base leading-relaxed text-stone-deep md:text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
