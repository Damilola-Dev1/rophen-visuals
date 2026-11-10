import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

export default function NotFoundPage() {
  usePageTitle("Page not found");

  return (
    <section className="px-6 py-20 md:px-16">
      <h1 className="font-display text-5xl md:text-6xl">Page not found</h1>
      <p className="mt-4 max-w-xl text-stone-deep">
        That page doesn't exist. It may have moved, or the link may be wrong.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block text-sm font-medium underline underline-offset-4"
      >
        Back to home
      </Link>
    </section>
  );
}
