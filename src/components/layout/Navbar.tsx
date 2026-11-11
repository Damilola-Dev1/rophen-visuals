import { useCallback, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { List } from "@phosphor-icons/react";
import Logo from "../ui/Logo";
import { navLinks } from "../../data/navigation";
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
      <header className="fixed inset-x-0 top-2.5 z-50 flex justify-center px-3 md:top-4 md:px-6">
        <div className="flex w-full max-w-4xl items-center justify-between gap-4 rounded-full border border-ivory/15 bg-charcoal py-1.5 pl-4 pr-1.5 text-ivory md:pl-6">
          <Link to="/" className="flex items-center">
            <Logo className="h-9 w-auto md:h-10" />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            <nav aria-label="Main" className="flex items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `rounded-full px-3 py-1.5 text-sm transition-all duration-200 active:scale-95 motion-reduce:transform-none ${
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
              className="rounded-full bg-bronze px-4 py-2 text-sm font-medium text-charcoal transition-all duration-200 hover:bg-ivory active:scale-95 motion-reduce:transform-none"
            >
              Start a Project
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            className="group grid h-9 w-9 place-items-center rounded-full bg-ivory/10 transition-all duration-200 active:scale-90 active:bg-ivory/20 motion-reduce:transform-none md:hidden"
          >
            <List
              size={20}
              aria-hidden="true"
              className="transition-transform duration-300 ease-out group-active:rotate-90 motion-reduce:transform-none"
            />
          </button>
        </div>
      </header>

      <MobileNavigation open={menuOpen} onClose={closeMenu} />
    </>
  );
}
