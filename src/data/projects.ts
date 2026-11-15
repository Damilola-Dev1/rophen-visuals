import type { MediaItem, Project } from "../types";

// REAL projects go here once the client sends them. Leave this empty until then.
// While it is empty, the live site shows "coming soon" instead of projects.
export const projects: Project[] = [
  {
    slug: "a-beautiful-beginning",
    title: "A beautiful beginning",
    category: "event-coverage",
    occasion: "Wedding",
    coverImage:
      "https://res.cloudinary.com/xowl35un/video/upload/so_10/v1794748393/wedding-test.jpg",
    media: [
      {
        type: "video",
        url: "https://res.cloudinary.com/xowl35un/video/upload/vc_h264/v1794748393/wedding-test.mp4",
        posterImage:
          "https://res.cloudinary.com/xowl35un/video/upload/so_10/v1794748393/wedding-test.jpg",
        alt: "A beautiful beginning: the bride",
        orientation: "portrait",
      },
      {
        type: "video",
        url: "https://res.cloudinary.com/xowl35un/video/upload/v1794750715/wedding-1-720.mp4",
        posterImage:
          "https://res.cloudinary.com/xowl35un/video/upload/so_10/v1794750715/wedding-1-720.jpg",
        alt: "A beautiful beginning: the church and reception",
        orientation: "portrait",
      },
      {
        type: "video",
        url: "https://res.cloudinary.com/xowl35un/video/upload/vc_h264/v1794751554/wedding-3.mp4",
        posterImage:
          "https://res.cloudinary.com/xowl35un/video/upload/so_10/v1794751554/wedding-3.jpg",
        alt: "A beautiful beginning: the bride's outfit check at the traditional wedding",
        orientation: "portrait",
      },
      {
        type: "video",
        url: "https://res.cloudinary.com/xowl35un/video/upload/vc_h264,w_720,q_auto/v1794752059/wedding-4-original.mp4",
        posterImage:
          "https://res.cloudinary.com/xowl35un/video/upload/so_10/v1794752059/wedding-4-original.jpg",
        alt: "A beautiful beginning: the reception",
        orientation: "portrait",
      },
    ],
    featured: true,
  },
];

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
