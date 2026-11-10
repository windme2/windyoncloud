/**
 * Testimonials — a quote carousel between Projects and Contact. Hidden when empty.
 * Use real recommendations (e.g. from LinkedIn) and ask the person before quoting them.
 * link: where the quote can be checked (their LinkedIn recommendation), or "".
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  link: string;
}

// Empty = section hidden. Move entries from testimonialDrafts once each person approves the wording.
export const testimonials: Testimonial[] = [];

// ───────── Draft entries (replace the copy with approved recommendations) ─────────
export const testimonialDrafts: Testimonial[] = [
  {
    quote:
      "Draft: A dependable and thoughtful professional who approaches every challenge with clarity, patience, and a strong sense of ownership.",
    name: "Thinnakrit Chankate",
    role: "Programmer",
    company: "Metro Systems Corporation Public Company Limited",
    link: "",
  },
  {
    quote:
      "Draft: A reliable teammate who brings structured thinking, careful execution, and a practical approach to improving day-to-day operations.",
    name: "Chanikarn Sangchot",
    role: "Assistant Inventory Manager",
    company: "Systems Dot Com Company Limited",
    link: "",
  },
  {
    quote:
      "Draft: A responsible and adaptable professional who communicates clearly, learns quickly, and works well with people across different roles.",
    name: "Palita Khaochalad",
    role: "BOI Service Officer",
    company: "The Federation of Thai Industries (FTI)",
    link: "",
  },
];
