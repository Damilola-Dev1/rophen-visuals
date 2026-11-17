import type { ShowreelVideo } from "../types";

// The showreel videos, shown as two portrait (9:16) frames side by side.
// Leave videoUrl empty until the edited footage is ready. An empty entry shows
// a development slot locally and is hidden on the live site.
//
// videoUrl: a direct link to the compressed .mp4 (for example from Cloudinary).
// posterImage: shown before playback, a frame taken from the video.
export const showreelVideos: ShowreelVideo[] = [
  {
    title: "Rophen Visuals showreel, part one",
    videoUrl:
      "https://res.cloudinary.com/xowl35un/video/upload/vc_h264,w_720,q_auto/v1794922513/showreel-1.mp4",
    posterImage:
      "https://res.cloudinary.com/xowl35un/video/upload/so_2,w_720,q_auto/v1794922513/showreel-1.jpg",
  },
  {
    title: "Rophen Visuals showreel, part two",
    videoUrl:
      "https://res.cloudinary.com/xowl35un/video/upload/vc_h264,w_720,q_auto/v1794922551/showreel-2.mp4",
    posterImage:
      "https://res.cloudinary.com/xowl35un/video/upload/so_2,w_720,q_auto/v1794922551/showreel-2.jpg",
  },
];
