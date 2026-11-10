export interface SocialLink {
  platform: "instagram" | "tiktok" | "youtube" | "facebook" | "other";
  url: string;
  label?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  email: string;
  phone: string;
  whatsapp: string;
  location?: string;
  logo?: string;
  socialLinks: SocialLink[];
}

export interface NavItem {
  to: string;
  label: string;
  end?: boolean;
}
