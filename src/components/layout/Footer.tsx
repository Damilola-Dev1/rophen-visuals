import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  EnvelopeSimple,
  FacebookLogo,
  InstagramLogo,
  Phone,
  TiktokLogo,
  WhatsappLogo,
  YoutubeLogo,
} from "@phosphor-icons/react";
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

function SocialIcon({ platform }: { platform: SocialLink["platform"] }) {
  switch (platform) {
    case "instagram":
      return <InstagramLogo size={20} aria-hidden="true" />;
    case "tiktok":
      return <TiktokLogo size={20} aria-hidden="true" />;
    case "youtube":
      return <YoutubeLogo size={20} aria-hidden="true" />;
    case "facebook":
      return <FacebookLogo size={20} aria-hidden="true" />;
    default:
      return <ArrowUpRight size={20} aria-hidden="true" />;
  }
}

const linkClass =
  "inline-flex items-center gap-3 text-sm text-ivory/80 transition-colors hover:text-bronze";

// Bordered contact and social rows.
const rowClass =
  "group flex items-center justify-between gap-4 border-b border-ivory/15 py-3.5 text-sm text-ivory/80 transition-colors hover:text-bronze focus-visible:text-bronze";

const rowArrow = (
  <ArrowUpRight
    size={18}
    aria-hidden="true"
    className="flex-none transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transform-none"
  />
);

const headingClass = "text-xs uppercase tracking-[0.2em] text-bronze";

export default function Footer() {
  return (
    <footer className="bg-charcoal px-6 pb-8 pt-20 text-ivory md:px-16">
      <div className="grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-4xl md:text-5xl">{site.name}</p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/75">
            {site.description}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
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

        <div className="md:col-span-4">
          <h2 className={headingClass}>Get in touch</h2>
          <ul className="mt-5 border-t border-ivory/15">
            {site.email && (
              <li>
                <a href={`mailto:${site.email}`} className={rowClass}>
                  <span className="inline-flex items-center gap-3">
                    <EnvelopeSimple size={20} aria-hidden="true" />
                    {site.email}
                  </span>
                  {rowArrow}
                </a>
              </li>
            )}
            {site.phone && (
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className={rowClass}
                >
                  <span className="inline-flex items-center gap-3">
                    <Phone size={20} aria-hidden="true" />
                    {site.phone}
                  </span>
                  {rowArrow}
                </a>
              </li>
            )}
            {site.whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className={rowClass}
                >
                  <span className="inline-flex items-center gap-3">
                    <WhatsappLogo size={20} aria-hidden="true" />
                    WhatsApp
                  </span>
                  {rowArrow}
                </a>
              </li>
            )}
            {site.socialLinks.map((link) => (
              <li key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={rowClass}
                >
                  <span className="inline-flex items-center gap-3">
                    <SocialIcon platform={link.platform} />
                    {link.label ?? platformLabels[link.platform]}
                  </span>
                  {rowArrow}
                </a>
              </li>
            ))}
            {site.location && (
              <li className="border-b border-ivory/15 py-3.5 text-sm text-ivory/80">
                {site.location}
              </li>
            )}
            <li>
              <Link to="/contact" className={rowClass}>
                <span>Send an enquiry</span>
                {rowArrow}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-16 border-t border-ivory/15 pt-6 text-xs text-ivory/60">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
