import type { SiteConfig } from "../types";

// Business details are filled in once Rophen Visuals confirms them.
// Anything left empty ('' or []) is simply not shown on the site.
//
// whatsapp: digits only, with country code, e.g. '2348012345678'
// socialLinks example:
//   { platform: 'instagram', url: 'https://instagram.com/their-handle' }
export const site: SiteConfig = {
  name: "Rophen Visuals",
  description:
    "A creative visual production brand offering videography, photography, content creation and post-production services.",
  email: "",
  phone: "08020976934",
  whatsapp: "2348020976934",
  socialLinks: [
    {
      platform: "instagram",
      url: "https://www.instagram.com/rophen_visuals",
    },
    {
      platform: "tiktok",
      url: "https://www.tiktok.com/@rophen.visuals",
    },
  ],
};
