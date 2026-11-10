import type { Service } from "../types";

// The slug is used in the link /contact?service=<slug>.
export const services: Service[] = [
  {
    slug: "mobile-videography",
    title: "Mobile Videography",
    description:
      "Creating videos for events, brands, individuals and special occasions.",
  },
  {
    slug: "photography",
    title: "Photography",
    description: "Capturing portraits, products, events and lifestyle moments.",
  },
  {
    slug: "content-creation",
    title: "Content Creation",
    description:
      "Creating engaging visual content for individuals, businesses and brands.",
  },
  {
    slug: "event-coverage",
    title: "Event Coverage",
    description:
      "Documenting events, capturing the highlights, important moments and little details.",
  },
  {
    slug: "behind-the-scenes",
    title: "Behind-the-Scenes (BTS)",
    description:
      "Capturing the process, preparations and moments that happen behind the camera.",
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    description:
      "Editing and transforming raw footage into engaging, well-put-together videos.",
  },
];
