import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { navLinks } from "../../data/navigation";
import { site } from "../../data/site";

type MobileNavigationProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileNavigation({
  open,
  onClose,
}: MobileNavigationProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.25;
  const offset = reduceMotion ? 0 : -16;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])",
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto overscroll-contain bg-charcoal text-ivory md:hidden"
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: offset }}
          transition={{ duration, ease: "easeOut" }}
        >
          <div className="flex items-center justify-between px-5 pt-5">
            <span className="font-display text-xl tracking-wide">
              {site.name}
            </span>
            <button
              ref={closeRef}
              type="button"
              aria-label="Close menu"
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-full bg-ivory/10"
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10 flex-1 px-5">
            <ul>
              {navLinks.map((link, index) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-baseline gap-4 border-b border-ivory/15 py-4 font-display text-5xl ${
                        isActive ? "text-bronze" : ""
                      }`
                    }
                  >
                    <span className="font-sans text-sm text-bronze">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-10">
            <Link
              to="/contact"
              onClick={onClose}
              className="flex items-center justify-between rounded-full bg-bronze px-6 py-4 text-base font-medium text-charcoal"
            >
              Start a Project
              <ArrowUpRight size={20} aria-hidden="true" />
            </Link>
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                className="mt-6 block text-sm text-ivory/75"
              >
                {site.email}
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
