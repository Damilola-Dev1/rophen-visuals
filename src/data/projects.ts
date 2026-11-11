import type { MediaItem, Project } from "../types";

// REAL projects go here once the client sends them. Leave this empty until then.
// While it is empty, the live site shows "coming soon" instead of projects.
export const projects: Project[] = [];

// Demo media: an empty url shows a dev-only slot. Never appears on the live site.
const demoMedia: MediaItem[] = [
  { type: "image", url: "", alt: "Demo photo one" },
  { type: "image", url: "", alt: "Demo photo two" },
  { type: "image", url: "", alt: "Demo photo three" },
  { type: "video", url: "", alt: "Demo video" },
];

// DEMO projects: shown only on your computer (npm run dev), and only while
// `projects` above is empty.
export const demoProjects: Project[] = [
  {
    slug: "demo-project-one",
    title: "Demo project one",
    category: "event-coverage",
    occasion: "Wedding",
    description: "Demo text. Replaced when the client sends real projects.",
    coverImage: "",
    media: demoMedia,
    featured: true,
  },
  {
    slug: "demo-project-two",
    title: "Demo project two",
    category: "photography",
    occasion: "Brand shoot",
    description: "Demo text. Replaced when the client sends real projects.",
    coverImage: "",
    media: demoMedia,
    featured: true,
  },
  {
    slug: "demo-project-three",
    title: "Demo project three",
    category: "mobile-videography",
    description: "Demo text. Replaced when the client sends real projects.",
    coverImage: "",
    media: demoMedia,
    featured: true,
  },
  {
    slug: "demo-project-four",
    title: "Demo project four",
    category: "behind-the-scenes",
    occasion: "Birthday",
    description: "Demo text. Replaced when the client sends real projects.",
    coverImage: "",
    media: demoMedia,
    featured: true,
  },
];

export const isUsingDemoProjects = import.meta.env.DEV && projects.length === 0;

export function getProjects(): Project[] {
  return isUsingDemoProjects ? demoProjects : projects;
}
