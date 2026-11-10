import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { heroMedia } from "../../data/hero";

function HeroBackground() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
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
      {showVideo && (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={videoUrl}
          poster={posterImage || undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoFailed(true)}
        />
      )}

      {!showVideo && posterImage && (
        <img src={posterImage} alt="" className="h-full w-full object-cover" />
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
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-charcoal text-ivory"
    >
      <HeroBackground />
      <div className="absolute inset-0 bg-charcoal/65" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 pb-16 pt-32 text-center md:px-16">
        <p className="text-xs uppercase tracking-[0.24em] text-bronze md:text-sm">
          Videography · Photography · Content
        </p>

        <h1
          id="hero-heading"
          className="mt-6 text-balance font-display text-5xl font-medium leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Visual stories, captured with intention.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85 md:text-lg">
          From personal moments to brand campaigns and live events, Rophen
          Visuals creates videos and photographs that bring your ideas to life.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/projects"
            className="inline-flex min-h-[52px] items-center gap-2 rounded-full bg-bronze px-8 text-sm font-semibold text-charcoal transition-colors hover:bg-ivory"
          >
            Explore Our Work
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex min-h-[52px] items-center rounded-full border border-ivory/55 px-8 text-sm font-medium transition-colors hover:bg-ivory hover:text-charcoal"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
