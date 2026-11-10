import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import VideoPlayer from "../ui/VideoPlayer";
import { showreelVideos } from "../../data/showreel";

export default function Showreel() {
  const groupRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Progress is 0 when the boxes' top reaches the bottom of the screen,
  // and 1 when they are centred on screen. Scrolling up reverses it.
  const { scrollYProgress } = useScroll({
    target: groupRef,
    offset: ["start end", "center center"],
  });

  // Each padded box starts a little smaller, with thinner padding and
  // tighter corners, and grows to its full size.
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0.86, 1],
  );
  const padding = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [18, 18] : [8, 18],
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [40, 40] : [24, 40],
  );

  // Live site: only videos that have a link. While developing: every slot shows.
  const items = import.meta.env.DEV
    ? showreelVideos
    : showreelVideos.filter((video) => video.videoUrl);

  if (items.length === 0) return null;

  const staggered = items.length > 1;

  return (
    <section
      id="showreel"
      aria-labelledby="showreel-heading"
      className="overflow-hidden bg-ivory px-4 pb-24 pt-20 md:px-8 md:pb-32 md:pt-28"
    >
      <h2
        id="showreel-heading"
        className="whitespace-nowrap text-center font-display text-[16vw] font-medium uppercase leading-[0.85] tracking-[-0.02em] text-charcoal"
      >
        Showreel
      </h2>

      <div
        ref={groupRef}
        className="mx-auto mt-10 flex w-full max-w-[1400px] flex-col items-center gap-10 md:mt-14 md:flex-row md:items-start md:justify-center md:gap-10 lg:gap-16"
      >
        {items.map((video, index) => {
          // The second box sits lower beside the first on larger screens.
          const position = staggered && index % 2 === 1 ? "md:mt-16" : "";

          return (
            <motion.div
              key={video.title}
              style={{ scale, padding, borderRadius }}
              className={`isolate w-full max-w-sm transform-gpu overflow-hidden bg-charcoal/[0.07] will-change-transform md:w-[min(30rem,42vw)] md:max-w-none md:flex-none ${position}`}
            >
              <VideoPlayer
                videoUrl={video.videoUrl}
                posterImage={video.posterImage}
                title={video.title}
                aspect="portrait"
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
