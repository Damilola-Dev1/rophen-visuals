import type { FAQ } from "../types";

// Answers are the client's own wording, lightly trimmed to match the six
// confirmed services. Edit here to change them.
export const faqs: FAQ[] = [
  {
    id: "services",
    question: "What services do you offer?",
    answer:
      "I offer mobile videography, photography, content creation, event coverage, behind-the-scenes coverage and video editing. Whether you need something shot from scratch or want to make better use of the content you already have, there's a service for you. Explore the Services page to see what I offer.",
  },
  {
    id: "cost",
    question: "How much does a video shoot cost?",
    answer:
      "Every project comes with its own creative direction and production needs, so there's no one-size-fits-all price. The cost depends on the type of shoot, location, duration and what's involved. Get in touch, share what you have in mind and your budget, and I'll send you a suitable quote.",
  },
  {
    id: "turnaround",
    question: "How long does it take to receive the finished video?",
    answer:
      "Turnaround time depends on the type of project, its length and the level of editing involved. We'll agree on a delivery timeline before production begins, so you know what to expect.",
  },
  {
    id: "before-shoot",
    question: "What do I need to provide before a video shoot?",
    answer:
      "You don't need to have everything figured out before reaching out. A brief about your idea, the purpose of the video and any references you have will give us a good starting point. We can work out the creative direction and other details together.",
  },
  {
    id: "travel",
    question: "Do you cover events and projects outside your location?",
    answer:
      "Yes! I'm open to working on projects beyond my immediate location. Travel arrangements and any additional logistics can be discussed during booking, depending on the project's location and requirements.",
  },
  {
    id: "booking",
    question: "How do I book your services?",
    answer:
      "Simply get in touch through the contact page or WhatsApp. Share a few details about your project, and we'll discuss your needs, availability, pricing and the next steps.",
  },
];
