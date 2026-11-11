import { Link } from "react-router-dom";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import { site } from "../../data/site";

export default function CtaSection() {
  const whatsappDigits = site.whatsapp.replace(/\D/g, "");

  return (
    <section
      id="start-a-project"
      aria-labelledby="cta-heading"
      className="bg-ivory px-4 pb-16 pt-4 md:px-8 md:pb-24"
    >
      <div className="mx-auto max-w-[1400px] rounded-3xl bg-charcoal px-6 py-16 text-center md:rounded-[2.5rem] md:px-16 md:py-24">
        <p className="text-xs uppercase tracking-[0.2em] text-bronze">
          Start a project
        </p>
        <h2
          id="cta-heading"
          className="mx-auto mt-5 max-w-3xl font-display text-5xl font-medium leading-[0.95] text-ivory md:text-7xl"
        >
          Let&rsquo;s tell your story
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ivory/75 md:text-lg">
          Share a few details about your idea, event or brand, and we&rsquo;ll
          take it from there.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-bronze px-7 py-3.5 text-base font-medium text-charcoal transition-opacity duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
          >
            Start a Project
            <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
          </Link>

          {whatsappDigits && (
            <a
              href={`https://wa.me/${whatsappDigits}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-7 py-3.5 text-base font-medium text-ivory transition-colors duration-300 hover:border-bronze hover:text-bronze focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
            >
              <WhatsappLogo size={20} weight="regular" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
