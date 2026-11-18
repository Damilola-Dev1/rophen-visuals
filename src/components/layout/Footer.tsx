import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react";
import Logo from "../ui/Logo";
import { navLinks } from "../../data/navigation";
import { site } from "../../data/site";
import type { SocialLink } from "../../types";

const platformLabels: Record<SocialLink["platform"], string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  other: "Website",
};

const linkClass =
  "inline-flex items-center gap-3 text-sm text-ivory/80 transition-colors hover:text-bronze";

const smallLinkClass = "transition-colors hover:text-bronze";

const headingClass = "text-xs uppercase tracking-[0.2em] text-bronze";

export default function Footer() {
  const { pathname } = useLocation();
  const showCta = pathname !== "/contact";
  const whatsappDigits = site.whatsapp.replace(/\D/g, "");

  return (
    <footer className="bg-charcoal px-6 pb-8 pt-20 text-ivory md:px-16 md:pt-28">
      {showCta && (
        <section
          id="start-a-project"
          aria-labelledby="cta-heading"
          className="mb-16 border-b border-ivory/15 pb-16 text-center md:mb-20 md:pb-24"
        >
          <p className={headingClass}>Start a project</p>
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
        </section>
      )}

      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-7">
          <Logo className="h-16 w-auto md:h-20" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/75">
            {site.description}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-5">
          <h2 className={headingClass}>Explore</h2>
          <ul className="mt-5 space-y-3">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-16 flex flex-col gap-3 border-t border-ivory/15 pt-6 text-xs text-ivory/60 md:flex-row md:items-center md:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <p className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {site.phone && (
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className={smallLinkClass}
            >
              {site.phone}
            </a>
          )}
          {site.email && (
            <a href={`mailto:${site.email}`} className={smallLinkClass}>
              {site.email}
            </a>
          )}
          {site.socialLinks.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={smallLinkClass}
            >
              {link.label ?? platformLabels[link.platform]}
            </a>
          ))}
          {site.location && <span>{site.location}</span>}
        </p>
      </div>
    </footer>
  );
}
