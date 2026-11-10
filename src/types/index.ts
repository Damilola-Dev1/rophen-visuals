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

export interface HeroMedia {
  videoUrl: string;
  posterImage: string;
}

export interface ShowreelVideo {
  title: string;
  videoUrl: string;
  posterImage: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  website?: string;
  order: number;
  published: boolean;
}
