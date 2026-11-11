import { useEffect, useRef } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";

export type LightboxImage = { url: string; alt: string };

type LightboxProps = {
  images: LightboxImage[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

export default function Lightbox({
  images,
  index,
  onClose,
  onChange,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const open = index !== null;
  const count = images.length;

  // Scroll lock, focus into the dialog, and focus back to the opener on close.
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.querySelector<HTMLElement>("button")?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open]);

  // Keyboard: Escape, arrows, and a Tab focus trap.
  useEffect(() => {
    if (index === null) return;
    const current = index;

    function go(step: number) {
      if (count < 2) return;
      onChange((current + step + count) % count);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        go(-1);
      } else if (event.key === "ArrowRight") {
        go(1);
      } else if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          "button:not([disabled])",
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [index, count, onChange, onClose]);

  if (index === null) return null;
  const image = images[index];
  if (!image) return null;

  const buttonClass =
    "grid h-12 w-12 place-items-center rounded-full border border-ivory/30 bg-charcoal text-ivory transition-colors duration-300 hover:border-bronze hover:text-bronze focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze";

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4 md:p-10"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null || count < 2) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(dx) > 50) {
          onChange((index + (dx < 0 ? 1 : -1) + count) % count);
        }
      }}
    >
      <img
        src={image.url}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] max-w-full rounded-2xl object-contain"
      />

      <button
        type="button"
        aria-label="Close image viewer"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={`${buttonClass} absolute right-4 top-4 md:right-8 md:top-8`}
      >
        <X size={22} weight="regular" aria-hidden="true" />
      </button>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index - 1 + count) % count);
            }}
            className={`${buttonClass} absolute left-4 top-1/2 -translate-y-1/2 md:left-8`}
          >
            <CaretLeft size={22} weight="regular" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onChange((index + 1) % count);
            }}
            className={`${buttonClass} absolute right-4 top-1/2 -translate-y-1/2 md:right-8`}
          >
            <CaretRight size={22} weight="regular" aria-hidden="true" />
          </button>
          <p
            aria-live="polite"
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-ivory/75"
          >
            {index + 1} / {count}
          </p>
        </>
      )}
    </div>
  );
}
