import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("Page not found", { noindex: true });

  return (
    <section className="px-6 pb-20 pt-36 md:px-16 md:pb-28">
      <div className="mx-auto max-w-[1400px]">
        <p className="text-sm uppercase tracking-[0.2em] text-stone-deep">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-stone-deep md:text-lg">
          That page doesn&rsquo;t exist. It may have moved, or the link may be
          wrong.
        </p>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-base font-medium text-ivory transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
          >
            Back to home
            <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/30 px-7 py-3.5 text-base font-medium text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-ivory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
