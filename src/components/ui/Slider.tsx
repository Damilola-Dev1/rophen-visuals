import { Children, useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { CaretLeft, CaretRight, Pause, Play } from "@phosphor-icons/react";

type SliderProps = {
  label: string;
  children: ReactNode;
  // Width classes for each slide, e.g. "w-[82%] md:w-[calc(50%-0.5rem)]".
  itemClassName?: string;
  // Set to move to the next slide automatically, in milliseconds.
  autoPlayMs?: number;
  tone?: "light" | "dark";
};

function measure(track: HTMLElement) {
  const start = track.scrollLeft <= 4;
  const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  let nearest = 0;
  let best = Infinity;
  Array.from(track.children).forEach((child, i) => {
    const distance = Math.abs(
      (child as HTMLElement).offsetLeft - track.scrollLeft,
    );
    if (distance < best) {
      best = distance;
      nearest = i;
    }
  });
  return { start, end, nearest };
}

export default function Slider({
  label,
  children,
  itemClassName = "",
  autoPlayMs,
  tone = "light",
}: SliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const touchTimer = useRef<number | undefined>(undefined);
  const reduceMotion = useReducedMotion();

  const items = Children.toArray(children);
  const count = items.length;

  const [state, setState] = useState({ active: 0, start: true, end: false });
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);

  const loop = Boolean(autoPlayMs);
  const autoPlay = loop && !reduceMotion && count > 1;
  const running = autoPlay && !userPaused && !interacting;

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { start, end, nearest } = measure(track);
    const active = end ? count - 1 : nearest;
    setState((prev) =>
      prev.active === active && prev.start === start && prev.end === end
        ? prev
        : { active, start, end },
    );
  }, [count]);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const target = track?.children[index] as HTMLElement | undefined;
      if (!track || !target) return;
      track.scrollTo({
        left: target.offsetLeft,
        behavior: reduceMotion ? "auto" : "smooth",
      });
    },
    [reduceMotion],
  );

  const step = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const { start, end, nearest } = measure(track);
      if (direction === 1) {
        if (end) {
          if (loop) goTo(0);
        } else {
          goTo(nearest + 1);
        }
      } else if (start) {
        if (loop) goTo(count - 1);
      } else {
        goTo(nearest - 1);
      }
    },
    [count, goTo, loop],
  );

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  useEffect(() => {
    if (!running || !autoPlayMs) return;
    const id = window.setInterval(() => step(1), autoPlayMs);
    return () => window.clearInterval(id);
  }, [running, autoPlayMs, step]);

  useEffect(() => () => window.clearTimeout(touchTimer.current), []);

  if (count === 0) return null;

  const dark = tone === "dark";
  const buttonClass = `grid h-12 w-12 place-items-center rounded-full border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40 ${
    dark
      ? "border-ivory/30 text-ivory hover:border-bronze hover:text-bronze focus-visible:outline-bronze"
      : "border-charcoal/30 text-charcoal hover:bg-charcoal hover:text-ivory focus-visible:outline-charcoal"
  }`;
  const fits = state.start && state.end;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => setInteracting(true)}
      onMouseLeave={() => setInteracting(false)}
      onFocus={() => setInteracting(true)}
      onBlur={() => setInteracting(false)}
      onTouchStart={() => {
        window.clearTimeout(touchTimer.current);
        setInteracting(true);
      }}
      onTouchEnd={() => {
        window.clearTimeout(touchTimer.current);
        touchTimer.current = window.setTimeout(
          () => setInteracting(false),
          4000,
        );
      }}
    >
      <ul
        ref={trackRef}
        onScroll={update}
        tabIndex={0}
        aria-live={running ? "off" : "polite"}
        className={`relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-3xl [scrollbar-width:none] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-scrollbar]:hidden ${
          dark
            ? "focus-visible:outline-bronze"
            : "focus-visible:outline-charcoal"
        }`}
      >
        {items.map((child, index) => (
          <li
            key={index}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}`}
            className={`flex flex-none snap-start ${itemClassName}`}
          >
            {child}
          </li>
        ))}
      </ul>

      {!fits && (
        <div className="mt-8 flex items-center justify-between gap-4">
          <div className="flex items-center">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={state.active === index}
                onClick={() => goTo(index)}
                className="grid h-6 w-6 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                <span
                  className={`block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none ${
                    state.active === index
                      ? `w-6 ${dark ? "bg-bronze" : "bg-charcoal"}`
                      : `w-2 ${dark ? "bg-ivory/30" : "bg-charcoal/25"}`
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {autoPlay && (
              <button
                type="button"
                aria-label={
                  userPaused
                    ? "Start automatic sliding"
                    : "Pause automatic sliding"
                }
                onClick={() => setUserPaused((value) => !value)}
                className={buttonClass}
              >
                {userPaused ? (
                  <Play size={20} weight="fill" aria-hidden="true" />
                ) : (
                  <Pause size={20} weight="fill" aria-hidden="true" />
                )}
              </button>
            )}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => step(-1)}
              disabled={!loop && state.start}
              className={buttonClass}
            >
              <CaretLeft size={20} weight="regular" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => step(1)}
              disabled={!loop && state.end}
              className={buttonClass}
            >
              <CaretRight size={20} weight="regular" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
