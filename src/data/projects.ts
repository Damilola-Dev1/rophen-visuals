import type { Project } from "../types";

// REAL projects go here once the client sends them. Leave this empty until then.
// While it is empty, the live site hides the featured section completely.
export const projects: Project[] = [];

// DEMO projects: shown only on your computer (npm run dev), and only while
// `projects` above is empty. They never appear on the live site.
export const demoProjects: Project[] = [
  {
    slug: "demo-project-one",
    title: "Demo project one",
    category: "event-coverage",
    occasion: "Wedding",
    description: "Demo text. Replaced when the client sends real projects.",
    coverImage: "",
    media: [],
    featured: true,
  },
  {
    slug: "demo-project-two",
    title: "Demo project two",
    category: "photography",
    occasion: "Brand shoot",
    description: "Demo text. Replaced when the client sends real projects.",
    coverImage: "",
    media: [],
    featured: true,
  },
  {
    slug: "demo-project-three",
    title: "Demo project three",
    category: "mobile-videography",
    description: "Demo text. Replaced when the client sends real projects.",
    coverImage: "",
    media: [],
    featured: true,
  },
  {
    slug: "demo-project-four",
    title: "Demo project four",
    category: "behind-the-scenes",
    occasion: "Birthday",
    description: "Demo text. Replaced when the client sends real projects.",
    coverImage: "",
    media: [],
    featured: true,
  },
];
