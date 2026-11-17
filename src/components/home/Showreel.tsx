import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Play, X } from "@phosphor-icons/react";
import VideoPlayer from "../ui/VideoPlayer";
import { showreelVideos } from "../../data/showreel";

const PHONE_QUERY = "(max-width: 767px)";

export default function Showreel() {
  const groupRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  const [isPhone, setIsPhone] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(PHONE_QUERY).matches,
  );
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia(PHONE_QUERY);
    const update = () => setIsPhone(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // While the full-screen player is open: lock page scroll, close on Escape.
  useEffect(() => {
    if (openIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex]);

  // Progress is 0 when the boxes' top reaches the bottom of the screen,
  // and 1 when they are centred on screen. Scrolling up reverses it.
  const { scrollYProgress } = useScroll({
    target: groupRef,
    offset: ["start end", "center center"],
  });

  // Each padded box starts a little smaller, with thinner padding and
  // tighter corners, and grows to its full size. (Computer layout only.)
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
  const openVideo = openIndex !== null ? items[openIndex] : null;

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

      {isPhone ? (
        /* Phone: two poster tiles side by side. Tap one to watch it full screen. */
        <div className="mx-auto mt-10 grid w-full max-w-md grid-cols-2 gap-3">
          {items.map((video, index) => {
            const position = staggered && index % 2 === 1 ? "mt-10" : "";
            const canPlay = Boolean(video.videoUrl);

            return (
              <button
                key={video.title}
                type="button"
                disabled={!canPlay}
                onClick={() => setOpenIndex(index)}
                aria-label={`Play ${video.title}`}
                className={`relative isolate aspect-[9/16] w-full overflow-hidden rounded-2xl bg-charcoal ${position}`}
              >
                {video.posterImage && (
                  <img
                    src={video.posterImage}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <span className="absolute inset-0 grid place-items-center bg-charcoal/20">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-bronze text-charcoal">
                    <Play size={24} weight="fill" aria-hidden="true" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Computer: unchanged side-by-side boxes that grow as you scroll. */
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
      )}

      {openVideo && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={openVideo.title}
          className="fixed inset-0 z-[100] grid place-items-center bg-charcoal/95 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close video"
            className="absolute right-4 top-4 z-10 grid h-12 w-12 place-items-center rounded-full bg-bronze text-charcoal"
          >
            <X size={22} weight="bold" aria-hidden="true" />
          </button>
          <video
            key={openVideo.videoUrl}
            src={openVideo.videoUrl}
            poster={openVideo.posterImage || undefined}
            controls
            autoPlay
            playsInline
            onClick={(event) => event.stopPropagation()}
            className="max-h-[85svh] max-w-full rounded-2xl bg-charcoal object-contain"
          />
        </div>
      )}
    </section>
  );
}
