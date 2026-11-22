import type { HeroMedia } from "../types";

// Hero background media.
//
// videoUrl: a link to a short, compressed .mp4 loop, hosted on Cloudinary.
//   The vc_h264 part makes sure it plays on iPhone Safari.
//   To swap the video later, upload the new one to Cloudinary and change this one line.
// posterImage: a still frame from the same video (so_2 = the 2-second mark).
//   It shows before the video loads and whenever the video can't play.
export const heroMedia: HeroMedia = {
  videoUrl:
    "https://res.cloudinary.com/xowl35un/video/upload/vc_h264/v1795364607/hero-loop.mp4",
  posterImage:
    "https://res.cloudinary.com/xowl35un/video/upload/so_2/v1795364607/hero-loop.jpg",
};
