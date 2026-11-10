import { usePageTitle } from "../hooks/usePageTitle";

export default function ContactPage() {
  usePageTitle("Contact");

  return (
    <section className="px-6 pb-20 pt-36 md:px-16">
      <h1 className="font-display text-5xl md:text-6xl">Contact</h1>
      <p className="mt-4 max-w-xl text-stone-deep">
        Development placeholder. The enquiry form is built in Phase 5.
      </p>
    </section>
  );
}
