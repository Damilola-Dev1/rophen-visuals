import type { ShowreelVideo } from "../types";

// The showreel videos, shown as two portrait (9:16) frames side by side.
// Leave videoUrl empty until the edited footage is ready. An empty entry shows
// a development slot locally and is hidden on the live site.
//
// videoUrl: a direct link to the compressed .mp4 (for example from Cloudinary).
// posterImage: shown before playback, e.g. '/media/showreel-1-poster.jpg'.
export const showreelVideos: ShowreelVideo[] = [
  {
    title: "Rophen Visuals showreel, part one",
    videoUrl: "/media/hero.mp4",
    posterImage: "",
  },
  {
    title: "Rophen Visuals showreel, part two",
    videoUrl: "/media/hero.mp4",
    posterImage: "",
  },
];
