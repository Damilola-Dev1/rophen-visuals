import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_NAME = "Rophen Visuals";
const SITE_URL = "https://rophen-visuals.vercel.app";

const DEFAULT_DESCRIPTION =
  "Rophen Visuals creates video and photography for individuals, brands and events. Established in 2024.";

// Descriptions by page address. Unlisted pages use the default above.
const descriptions: Record<string, string> = {
  "/": DEFAULT_DESCRIPTION,
  "/about":
    "Meet Funmilola Adekunle, the creative behind Rophen Visuals, telling stories through video and photography.",
  "/services":
    "Mobile videography, photography, content creation, event coverage, behind-the-scenes and video editing from Rophen Visuals.",
  "/contact":
    "Start a project with Rophen Visuals. Share your idea and send your enquiry on WhatsApp.",
  "/projects": "Selected video and photography projects by Rophen Visuals.",
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

interface PageOptions {
  noindex?: boolean;
  description?: string;
}

export function usePageTitle(title?: string, options: PageOptions = {}) {
  const { pathname } = useLocation();
  const noindex = options.noindex ?? false;
  const customDescription = options.description;

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
    const description =
      customDescription ?? descriptions[path] ?? DEFAULT_DESCRIPTION;
    const url = `${SITE_URL}${path === "/" ? "/" : path}`;

    document.title = fullTitle;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex" : "index, follow");
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertCanonical(url);
  }, [title, pathname, noindex, customDescription]);
}
