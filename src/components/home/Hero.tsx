import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { heroMedia } from "../../data/hero";

function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const { videoUrl, posterImage } = heroMedia;

  const showVideo = Boolean(videoUrl) && !reduceMotion && !videoFailed;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React doesn't always write the muted attribute, and iOS needs it before autoplay.
    video.muted = true;
    video.play().catch(() => {
      // Autoplay can be blocked (low-power mode, for example). The poster stays visible.
    });
  }, [showVideo]);

  return (
    <div className="absolute inset-0 bg-charcoal" aria-hidden="true">
      {/* The poster is always underneath, so something shows straight away. */}
      {posterImage && (
        <img
          src={posterImage}
          alt=""
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {showVideo && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          src={videoUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        />
      )}

      {!showVideo && !posterImage && import.meta.env.DEV && (
        <div
          className="grid h-full w-full place-items-center"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(242,238,230,0.05) 0, rgba(242,238,230,0.05) 14px, transparent 14px, transparent 28px)",
          }}
        >
          <span className="mt-[28rem] text-xs uppercase tracking-[0.18em] text-ivory/50 md:mt-[34rem]">
            Hero video slot (development only)
          </span>
        </div>
      )}
    </div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  // Fade-up on page load, one after another. Skipped if "reduce motion" is on.
  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : ({
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: "easeOut" },
        } as const);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-charcoal text-ivory"
    >
      <HeroBackground />
      <div className="absolute inset-0 bg-charcoal/75" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-32 text-center md:px-16">
        <motion.p
          {...rise(0)}
          className="whitespace-nowrap text-xs font-medium uppercase tracking-[0.1em] text-bronze sm:text-sm sm:tracking-[0.2em] md:text-base"
        >
          Videography · Photography · Content
        </motion.p>

        <motion.h1
          {...rise(0.12)}
          id="hero-heading"
          className="mt-6 text-balance font-display text-5xl font-semibold leading-[1.02] [text-shadow:0_2px_18px_rgba(36,35,31,0.55)] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Visual stories, captured with{" "}
          <span className="italic font-medium">intention.</span>
        </motion.h1>

        <motion.p
          {...rise(0.24)}
          className="mt-6 max-w-xl text-base leading-relaxed text-ivory/90 md:text-lg"
        >
          From personal moments to brand campaigns and live events, Rophen
          Visuals creates videos and photographs that bring your ideas to life.
        </motion.p>

        <motion.div
          {...rise(0.36)}
          className="mt-10 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row"
        >
          <Link
            to="/projects"
            className="inline-flex min-h-[52px] w-full max-w-xs items-center justify-center gap-2 rounded-full bg-bronze px-8 text-sm font-semibold text-charcoal transition-colors hover:bg-ivory sm:w-auto"
          >
            Explore Our Work
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link
            to="/contact"
            className="hidden min-h-[52px] items-center justify-center rounded-full border border-ivory/55 px-8 text-sm font-medium transition-colors hover:bg-ivory hover:text-charcoal sm:inline-flex"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
