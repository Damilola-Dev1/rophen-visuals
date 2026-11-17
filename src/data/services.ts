import type { Service } from "../types";

// The slug is used in the link /contact?service=<slug>.
// image: only use a real photo from the client's work. Leave it out if there isn't one.
export const services: Service[] = [
  {
    slug: "mobile-videography",
    title: "Mobile Videography",
    description:
      "Creating videos for events, brands, individuals and special occasions.",
    image:
      "https://res.cloudinary.com/xowl35un/video/upload/so_10/v1794751554/wedding-3.jpg",
  },
  {
    slug: "photography",
    title: "Photography",
    description: "Capturing portraits, products, events and lifestyle moments.",
    image:
      "https://res.cloudinary.com/xowl35un/image/upload/f_auto,q_auto,w_900/lens-06",
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
    image:
      "https://res.cloudinary.com/xowl35un/video/upload/so_10/v1794750715/wedding-1-720.jpg",
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
