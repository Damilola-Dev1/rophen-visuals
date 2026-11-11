import {
  getTestimonials,
  isUsingDemoTestimonials,
} from "../../data/testimonials";

export default function Testimonials() {
  const items = getTestimonials();

  // Live site: no real testimonials means the whole section stays hidden.
  if (items.length === 0) return null;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-charcoal px-6 py-20 text-ivory md:px-16 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <p className="text-xs uppercase tracking-[0.2em] text-bronze">
          Kind words
        </p>
        <h2
          id="testimonials-heading"
          className="mt-4 font-display text-5xl font-medium leading-[0.95] md:text-7xl"
        >
          What clients say
        </h2>
        {isUsingDemoTestimonials && (
          <p className="mt-4 text-sm text-ivory/60">
            Dev only: these are demo cards. Add real testimonials in
            src/data/testimonials.ts.
          </p>
        )}

        <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.id}>
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-ivory/15 p-6 md:p-8">
                <blockquote className="font-display text-2xl font-medium leading-snug md:text-3xl">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-8">
                  <p className="text-base font-medium text-ivory">
                    {item.name}
                  </p>
                  {item.role && (
                    <p className="mt-1 text-sm text-ivory/70">{item.role}</p>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
