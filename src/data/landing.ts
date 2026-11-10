/**
 * Landing pages — shown as an auto-scrolling strip under Selected works.
 * They link straight to the live site (no case study page).
 *
 * image: a 16:10 screenshot in public/assets/screenshots (webp, ~1600px wide).
 * link:  the live demo — each landing page is its own Vercel project on a
 *        subdomain, e.g. "https://roast.windyoncloud.me".
 *   Leave "" to show the card without a link.
 */
export interface LandingPage {
  title: string;
  /** One short line: who it is for / what it sells. */
  kind: string;
  image: string;
  link: string;
}

// Empty = strip hidden. Move entries from landingPageDrafts once they are real work.
export const landingPages: LandingPage[] = [];

// ───────── MOCK entries (borrowed screenshots to preview the layout; replace with real work) ─────────
export const landingPageDrafts: LandingPage[] = [
  {
    title: "Roast & Co",
    kind: "Coffee roaster",
    image: "/assets/screenshots/roast-preview.webp",
    link: "https://windle.vercel.app", // MOCK link
  },
  {
    title: "Mock Landing 2",
    kind: "Fitness studio",
    image: "/assets/screenshots/windspace-preview.webp",
    link: "https://windle.vercel.app", // MOCK link
  },
  {
    title: "Mock Landing 3",
    kind: "Skincare brand",
    image: "/assets/screenshots/windsphere-preview.webp",
    link: "https://windle.vercel.app", // MOCK link
  },
  {
    title: "Mock Landing 4",
    kind: "Co-working space",
    image: "/assets/screenshots/routeline-preview.webp",
    link: "https://windle.vercel.app", // MOCK link
  },
  {
    title: "Mock Landing 5",
    kind: "Event / conference",
    image: "/assets/screenshots/stockflow-preview.webp",
    link: "https://windle.vercel.app", // MOCK link
  },
];
