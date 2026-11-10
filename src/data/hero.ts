import type { HeroMedia } from "../types";

// Hero background media.
//
// videoUrl: a direct link to a short, compressed .mp4 loop (about 10-15 seconds).
//   For now this is a small file in the public/media folder. Later it can be
//   swapped for a hosted link (for example Cloudinary) by changing this one line.
// posterImage: shown before the video loads and whenever the video can't play.
export const heroMedia: HeroMedia = {
  videoUrl: "/media/hero.mp4",
  posterImage: "/media/hero-poster.jpg",
};
