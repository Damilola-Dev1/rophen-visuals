import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { usePageTitle } from "../hooks/usePageTitle";
import { about } from "../data/about";

export default function AboutPage() {
  usePageTitle("About");

  const hasPortrait = Boolean(about.portraitImage);
  // Live site: the photo column only appears once a real photo exists.
  const showPortraitColumn = hasPortrait || import.meta.env.DEV;

  return (
    <section className="px-6 pb-20 pt-36 md:px-16 md:pb-28">
      <div
        className={`mx-auto max-w-[1400px] ${
          showPortraitColumn
            ? "grid gap-10 md:grid-cols-2 md:items-start md:gap-16"
            : ""
        }`}
      >
        {showPortraitColumn && (
          <div>
            {hasPortrait ? (
              <img
                src={about.portraitImage}
                alt={about.portraitAlt}
                className="aspect-[4/5] w-full rounded-3xl object-cover"
              />
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center rounded-3xl border-2 border-dashed border-charcoal/25 p-6 text-center text-sm text-stone-deep">
                Dev slot: portrait photo (set portraitImage in
                src/data/about.ts)
              </div>
            )}
          </div>
        )}

        <div className={showPortraitColumn ? "" : "max-w-3xl"}>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-deep">
            About
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl">
            {about.name}
          </h1>

          <div className="mt-8 space-y-5 text-base leading-relaxed text-charcoal md:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>

          <p className="mt-10 font-display text-2xl font-medium italic leading-snug text-charcoal md:text-3xl">
            {about.closingLine}
          </p>

          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-base font-medium text-ivory transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal"
          >
            Start a Project
            <ArrowUpRight size={20} weight="regular" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
