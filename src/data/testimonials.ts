import type { Testimonial } from "../types";

// REAL testimonials go here, word for word, ONLY with the person's permission.
// Leave this empty until then. While it is empty, the live site hides the section.
export const testimonials: Testimonial[] = [];

// DEMO testimonials: shown only on your computer (npm run dev), and only while
// `testimonials` above is empty. They never appear on the live site.
const demoTestimonials: Testimonial[] = [
  {
    id: "demo-1",
    quote: "Demo text. A real client testimonial replaces this.",
    name: "Demo Name",
    role: "Demo role",
    permissionGranted: true,
  },
  {
    id: "demo-2",
    quote: "Demo text. A real client testimonial replaces this.",
    name: "Demo Name",
    role: "Demo role",
    permissionGranted: true,
  },
  {
    id: "demo-3",
    quote: "Demo text. A real client testimonial replaces this.",
    name: "Demo Name",
    permissionGranted: true,
  },
];

export const isUsingDemoTestimonials =
  import.meta.env.DEV && testimonials.length === 0;

export function getTestimonials(): Testimonial[] {
  const source = isUsingDemoTestimonials ? demoTestimonials : testimonials;
  return source.filter((item) => item.permissionGranted);
}
