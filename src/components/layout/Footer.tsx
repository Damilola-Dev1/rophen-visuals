import { Link, useLocation } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpRight,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  Phone,
  TiktokLogo,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
import Logo from "../ui/Logo";
import { site } from "../../data/site";
import type { SocialLink } from "../../types";

const platformLabels: Record<SocialLink["platform"], string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  facebook: "Facebook",
  other: "Website",
};

function SocialIcon({ platform }: { platform: SocialLink["platform"] }) {
  switch (platform) {
    case "instagram":
      return <InstagramLogo size={22} aria-hidden="true" />;
    case "tiktok":
      return <TiktokLogo size={22} aria-hidden="true" />;
    case "youtube":
      return <YoutubeLogo size={22} aria-hidden="true" />;
    case "facebook":
      return <FacebookLogo size={22} aria-hidden="true" />;
    default:
      return <ArrowUpRight size={22} aria-hidden="true" />;
  }
}

const headingClass = "text-xs uppercase tracking-[0.2em] text-bronze";

const iconButtonClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-colors hover:border-bronze hover:text-bronze focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze md:h-11 md:w-11";

export default function Footer() {
  const { pathname } = useLocation();
  const reduceMotion = useReducedMotion();
  const showCta = pathname !== "/contact";
  const whatsappDigits = site.whatsapp.replace(/\D/g, "");

  function backToTop() {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return (
    <footer className="bg-ivory px-6 pb-8 pt-8 text-ivory md:px-12 md:pb-12 md:pt-12">
      <div className="mx-auto max-w-6xl space-y-3 rounded-3xl bg-charcoal p-3 md:rounded-[2rem] md:p-4">
        {showCta && (
          <section
            id="start-a-project"
            aria-labelledby="cta-heading"
            className="rounded-2xl border border-ivory/15 px-6 py-10 text-center md:py-12"
          >
            <p className={headingClass}>Start a project</p>
            <h2
              id="cta-heading"
              className="mx-auto mt-4 max-w-3xl font-display text-4xl font-medium leading-[0.95] text-ivory md:text-5xl"
            >
              Let&rsquo;s tell your story
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ivory/75 md:text-base">
              Share a few details about your idea, event or brand, and
              we&rsquo;ll take it from there.
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-bronze px-6 py-3 text-sm font-medium text-charcoal transition-opacity duration-300 hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
              >
                Start a Project
                <ArrowUpRight size={18} weight="regular" aria-hidden="true" />
              </Link>

              {whatsappDigits && (
                <a
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/30 px-6 py-3 text-sm font-medium text-ivory transition-colors duration-300 hover:border-bronze hover:text-bronze focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze"
                >
                  <WhatsappLogo size={18} weight="regular" aria-hidden="true" />
                  Chat on WhatsApp
                </a>
              )}
            </div>
          </section>
        )}

        <div className="flex items-center justify-between gap-3 rounded-2xl border border-ivory/15 px-4 py-3 md:px-5">
          <ul className="flex items-center gap-1.5 sm:gap-2">
            {site.phone && (
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  aria-label={`Call ${site.phone}`}
                  className={iconButtonClass}
                >
                  <Phone size={22} aria-hidden="true" />
                </a>
              </li>
            )}
            {whatsappDigits && (
              <li>
                <a
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Chat on WhatsApp"
                  className={iconButtonClass}
                >
                  <WhatsappLogo size={22} aria-hidden="true" />
                </a>
              </li>
            )}
            {site.email && (
              <li>
                <a
                  href={`mailto:${site.email}`}
                  aria-label={`Email ${site.email}`}
                  className={iconButtonClass}
                >
                  <EnvelopeSimple size={22} aria-hidden="true" />
                </a>
              </li>
            )}
            {site.socialLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.label ?? platformLabels[link.platform]}
                  className={iconButtonClass}
                >
                  <SocialIcon platform={link.platform} />
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={backToTop}
            aria-label="Back to top"
            className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-ivory/20 px-4 text-sm text-ivory/80 transition-colors hover:border-bronze hover:text-bronze focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze sm:h-auto sm:gap-2 sm:px-5 sm:py-3"
          >
            <span className="sm:hidden">Top</span>
            <span className="hidden sm:inline">Back to top</span>
            <ArrowUp size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-1">
          <Logo className="h-9 w-auto md:h-10" />
          <p className="text-right text-xs text-ivory/60">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            {site.location ? ` ${site.location}` : ""}
          </p>
        </div>
      </div>
    </footer>
  );
}
