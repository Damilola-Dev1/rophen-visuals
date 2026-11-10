import { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
];

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <header className="border-b border-charcoal/15 bg-ivory px-6 py-4 md:px-16">
        <nav
          aria-label="Temporary navigation"
          className="flex flex-wrap gap-x-6 gap-y-2 text-sm"
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                isActive
                  ? "font-medium underline underline-offset-4"
                  : "text-stone-deep"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
