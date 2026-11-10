import { usePageTitle } from "../hooks/usePageTitle";

export default function AboutPage() {
  usePageTitle("About");

  return (
    <section className="px-6 py-20 md:px-16">
      <h1 className="font-display text-5xl md:text-6xl">About</h1>
      <p className="mt-4 max-w-xl text-stone-deep">
        Development placeholder. The about page is built in Phase 4.
      </p>
    </section>
  );
}
