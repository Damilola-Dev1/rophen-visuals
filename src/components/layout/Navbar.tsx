import { useCallback, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { List } from "@phosphor-icons/react";
import { navLinks } from "../../data/navigation";
import { site } from "../../data/site";
import MobileNavigation from "./MobileNavigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4 md:px-4">
        <div className="flex w-full items-center justify-between gap-6 rounded-full bg-charcoal py-2 pl-5 pr-2 text-ivory md:w-auto md:gap-10 md:pl-7">
          <Link
            to="/"
            className="font-display text-xl leading-none tracking-wide"
          >
            {site.name}
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "text-bronze underline decoration-bronze underline-offset-[6px]"
                      : "text-ivory/75 hover:text-ivory"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <Link
            to="/contact"
            className="hidden rounded-full bg-bronze px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-ivory md:inline-block"
          >
            Start a Project
          </Link>

          <button
            ref={toggleRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full bg-ivory/10 md:hidden"
          >
            <List size={22} aria-hidden="true" />
          </button>
        </div>
      </header>

      <MobileNavigation open={menuOpen} onClose={closeMenu} />
    </>
  );
}
