import { useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { WhatsappLogo } from "@phosphor-icons/react";
import { services } from "../data/services";
import { site } from "../data/site";
import { usePageTitle } from "../hooks/usePageTitle";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-charcoal/25 bg-white px-4 py-3.5 text-base text-charcoal placeholder:text-stone-deep/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal";

const labelClass = "block text-sm font-medium text-charcoal";

export default function ContactPage() {
  usePageTitle("Contact");

  const [searchParams] = useSearchParams();

  // The link /contact?service=<slug> preselects a service. Unknown slugs are ignored.
  const paramSlug = searchParams.get("service") ?? "";
  const validParam = services.some((s) => s.slug === paramSlug)
    ? paramSlug
    : "";

  const [chosenSlug, setChosenSlug] = useState<string | null>(null);
  const selectedSlug = chosenSlug ?? validParam;

  const whatsappDigits = site.whatsapp.replace(/\D/g, "");
  const canSend = whatsappDigits.length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();
    const service = services.find((s) => s.slug === selectedSlug);

    const lines = [
      `Hello ${site.name}, my name is ${name}.`,
      service
        ? `I'm interested in: ${service.title}.`
        : "I'd like to make an enquiry.",
      date ? `Preferred date: ${date}.` : "",
      details ? `Details: ${details}` : "",
    ].filter(Boolean);

    const url = `https://wa.me/${whatsappDigits}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="px-6 pb-20 pt-36 md:px-16 md:pb-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-stone-deep">
            Contact
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[0.95] text-charcoal md:text-7xl">
            Start a project
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone-deep md:text-lg">
            Tell me a little about your idea, event or brand. When you send the
            form, WhatsApp opens with your message ready to send.
          </p>
        </div>

        <div>
          {!canSend && (
            <p
              role="status"
              className="mb-6 rounded-2xl border border-charcoal/25 p-4 text-sm leading-relaxed text-stone-deep"
            >
              {import.meta.env.DEV
                ? "Dev note: add the WhatsApp number (digits with country code, e.g. 234...) to src/data/site.ts to enable sending."
                : "Enquiries are opening soon. Please check back shortly."}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className={labelClass}>
                Your name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="service" className={labelClass}>
                Service
              </label>
              <select
                id="service"
                name="service"
                value={selectedSlug}
                onChange={(e) => setChosenSlug(e.target.value)}
                className={fieldClass}
              >
                <option value="">Not sure yet</option>
                {services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className={labelClass}>
                Preferred date (optional)
              </label>
              <input id="date" name="date" type="date" className={fieldClass} />
            </div>

            <div>
              <label htmlFor="details" className={labelClass}>
                About your project
              </label>
              <textarea
                id="details"
                name="details"
                rows={5}
                required
                placeholder="What are you planning, and what would you like captured?"
                className={fieldClass}
              />
            </div>

            <button
              type="submit"
              disabled={!canSend}
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3.5 text-base font-medium text-ivory transition-opacity duration-300 hover:opacity-85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-charcoal disabled:cursor-not-allowed disabled:opacity-40"
            >
              <WhatsappLogo size={20} weight="regular" aria-hidden="true" />
              Send on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
