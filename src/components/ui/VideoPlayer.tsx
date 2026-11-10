import { useRef, useState } from "react";
import { Play } from "@phosphor-icons/react";

type VideoPlayerProps = {
  videoUrl: string;
  posterImage?: string;
  title: string;
  aspect?: "landscape" | "portrait";
  className?: string;
};

export default function VideoPlayer({
  videoUrl,
  posterImage,
  title,
  aspect = "landscape",
  className = "",
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);

  const aspectClass = aspect === "portrait" ? "aspect-[9/16]" : "aspect-video";

  if (!videoUrl) {
    return (
      <div
        className={`relative grid ${aspectClass} place-items-center overflow-hidden rounded-2xl bg-charcoal ${className}`}
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(242,238,230,0.05) 0, rgba(242,238,230,0.05) 14px, transparent 14px, transparent 28px)",
        }}
      >
        {import.meta.env.DEV && (
          <span className="px-4 text-center text-xs uppercase tracking-[0.18em] text-ivory/60">
            {aspect === "portrait" ? "Portrait" : "Landscape"} video slot
            (development only)
          </span>
        )}
      </div>
    );
  }

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    video.controls = true;
    // Called directly from the tap so iPhone Safari allows playback with sound.
    video.play().catch(() => setStarted(false));
  };

  return (
    <div
      className={`relative isolate ${aspectClass} overflow-hidden rounded-2xl bg-charcoal ${className}`}
    >
      <video
        ref={videoRef}
        className="h-full w-full object-contain"
        src={videoUrl}
        poster={posterImage || undefined}
        controls={started}
        playsInline
        preload={posterImage ? "none" : "metadata"}
        aria-label={title}
        onError={() => setFailed(true)}
      />

      {!started && !failed && (
        <button
          type="button"
          onClick={handlePlay}
          aria-label={`Play ${title}`}
          className="absolute inset-0 grid place-items-center bg-charcoal/20 transition-colors hover:bg-charcoal/30"
        >
          <span className="grid h-20 w-20 place-items-center rounded-full bg-bronze text-charcoal md:h-24 md:w-24">
            <Play size={32} weight="fill" aria-hidden="true" />
          </span>
        </button>
      )}

      {failed && (
        <p
          role="status"
          className="absolute inset-0 grid place-items-center bg-charcoal/85 px-6 text-center text-sm text-ivory"
        >
          This video couldn't be loaded. Please try again later.
        </p>
      )}
    </div>
  );
}
