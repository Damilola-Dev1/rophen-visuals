import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
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
  const offset = reduceMotion ? 0 : -12;

  // Links rise one after another after the panel has appeared.
  const listVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        delayChildren: reduceMotion ? 0 : 0.1,
        staggerChildren: reduceMotion ? 0 : 0.05,
      },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.3, ease: "easeOut" },
    },
  };

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
          className="fixed inset-0 z-[60] bg-charcoal/60 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration, ease: "easeOut" }}
          onClick={onClose}
        >
          <motion.div
            className="mx-3 mt-2.5 max-h-[calc(100dvh-1.25rem)] overflow-y-auto overscroll-contain rounded-3xl border border-ivory/15 bg-charcoal px-5 pb-5 pt-3 text-ivory"
            initial={{ opacity: 0, y: offset }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: offset }}
            transition={{ duration, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg tracking-wide">
                {site.name}
              </span>
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full bg-ivory/10 transition-all duration-200 active:scale-90 active:bg-ivory/20 motion-reduce:transform-none"
              >
                <motion.span
                  className="grid place-items-center"
                  initial={{
                    rotate: reduceMotion ? 0 : -90,
                    opacity: reduceMotion ? 1 : 0,
                  }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.3,
                    delay: reduceMotion ? 0 : 0.08,
                    ease: "easeOut",
                  }}
                >
                  <X size={20} aria-hidden="true" />
                </motion.span>
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-4">
              <motion.ul
                variants={listVariants}
                initial="hidden"
                animate="show"
              >
                {navLinks.map((link, index) => (
                  <motion.li key={link.to} variants={itemVariants}>
                    <NavLink
                      to={link.to}
                      end={link.end}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-baseline gap-3 border-t border-ivory/15 py-3 font-display text-2xl transition-all duration-200 active:translate-x-1 active:opacity-70 motion-reduce:transform-none ${
                          isActive ? "text-bronze" : ""
                        }`
                      }
                    >
                      <span className="font-sans text-xs text-bronze">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            <motion.div
              className="mt-4"
              initial={{
                opacity: reduceMotion ? 1 : 0,
                y: reduceMotion ? 0 : 14,
              }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                delay: reduceMotion ? 0 : 0.1 + navLinks.length * 0.05,
                ease: "easeOut",
              }}
            >
              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center justify-between rounded-full bg-bronze px-5 py-3 text-base font-medium text-charcoal transition-transform duration-200 active:scale-[0.98] motion-reduce:transform-none"
              >
                Start a Project
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              {site.email && (
                <a
                  href={`mailto:${site.email}`}
                  className="mt-4 block text-sm text-ivory/75"
                >
                  {site.email}
                </a>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
