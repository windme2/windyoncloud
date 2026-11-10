/**
 * Projects section data configurations.
 * Contains portfolio projects metadata and list of filter categories.
 */

/**
 * Project categories: what the project *is*, from a visitor's point of view (the stack is in `tags`).
 * Shown as the card badge, the case study "Type" row and the /projects filter, which only lists
 * categories that actually have projects, so the unused ones here never appear.
 */
export type ProjectCategory =
  | "Web App"
  | "Business System"
  | "API & Backend"
  | "DevOps & Cloud";

export interface ProjectImage {
  src: string;
  /** Short caption under the image; also used as alt text. */
  caption?: string;
}

export interface Project {
  /** URL segment for the case study page: /projects/<slug> */
  slug: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoLink: string;
  codeLink: string;
  featured: boolean;
  category: ProjectCategory;
  /** Optional longer write-up shown on the case study page. */
  summary?: string;
  /**
   * Numbered highlights on the case study page (01, 02, 03…).
   * A plain string is shown as-is; { title, text } adds a short heading.
   */
  highlights?: (string | { title: string; text: string })[];
  /** Case study side panel — each row only appears when it is filled in. */
  year?: string;
  role?: string;
  status?: string;
  /**
   * Work that cannot be linked (company system, client under NDA).
   * Shows a badge on the card and the case study so missing links read as intentional.
   */
  access?: "Internal" | "Under NDA";
  /** Extra screenshots on the case study page (16:10 works best). */
  gallery?: ProjectImage[];
  /** System / architecture diagram, shown full width on its own (SVG or PNG/WebP). */
  diagram?: ProjectImage;
  /** Fill in to turn the case study page into a story: each field renders its own section. */
  story?: {
    problem?: string;
    approach?: string;
    decisions?: string[];
    outcome?: string;
  };
}

export const projects: Project[] = [
  {
    slug: "windspace",
    title: "WindSpace - Personal Blog Platform",
    description:
      "Personal blog platform with modern features, and responsive design for seamless content creation.",
    image: "/assets/screenshots/windspace-preview.webp",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express.js",
      "Tailwind CSS",
      "Shadcn UI",
      "Supabase (PostgreSQL)",
    ],
    demoLink: "https://windspace.vercel.app",
    codeLink: "https://github.com/windme2/windspace",
    featured: true,
    category: "Web App",
    summary:
      "A personal blog platform: a React + Vite front end talking to a Node/Express API, with content stored in Supabase (PostgreSQL). Built so writing and publishing stay simple and reading feels good on any screen.",
    highlights: [
      "Responsive reading experience from phone to desktop",
      "Content and data in Supabase (PostgreSQL)",
      "Express.js API behind the React front end",
      "UI built with Tailwind CSS and shadcn/ui",
    ],
  },
  {
    slug: "windsphere",
    title: "WindSphere - Weather Forecast",
    description:
      "Weather forecast Web Application with 5-day analytics for Bangkok region, featuring glassmorphic UI and responsive design layout.",
    image: "/assets/screenshots/windsphere-preview.webp",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Shadcn UI",
      "Radix UI",
      "Lucide React",
      "Open Weather API",
    ],
    demoLink: "https://windsphere.vercel.app",
    codeLink: "https://github.com/windme2/windsphere",
    featured: true,
    category: "Web App",
    summary:
      "A weather forecast web app for the Bangkok region. It pulls five days of data from the OpenWeather API and presents it in a glassmorphic, responsive interface.",
    highlights: [
      "Five-day forecast analytics for Bangkok",
      "Live data from the OpenWeather API",
      "Glassmorphic UI that adapts to any screen",
      "React + TypeScript on Vite, Radix UI primitives",
    ],
  },
  {
    slug: "windle",
    title: "Windle - Word Puzzle Game",
    description:
      "Word Puzzle game with engaging gameplay and modern UI design.",
    image: "/assets/screenshots/windle-preview.webp",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express.js",
      "Shadcn UI",
      "Radix UI",
      "Lucide React",
    ],
    demoLink: "https://windle.vercel.app",
    codeLink: "https://github.com/windme2/windle",
    featured: true,
    category: "Web App",
    summary:
      "A word puzzle game with a clean, modern interface and an Express.js backend. Designed to be quick to pick up and satisfying to play.",
    highlights: [
      "Word puzzle gameplay with on-screen keyboard",
      "Express.js backend",
      "Accessible components from Radix UI",
      "React + TypeScript on Vite",
    ],
  },
];

// Filter pills: "All" plus every category that has at least one project
export const categories: string[] = [
  "All",
  ...Array.from(new Set(projects.map((project) => project.category))),
];

/**
 * Drafts kept off the site (no page, not in /projects or the sitemap).
 * Move an entry into `projects` once it is real.
 */
export const draftProjects: Project[] = [
  // ───────── MOCK projects (placeholders to preview the layout; replace with real work) ─────────
  // Landing pages live in src/data/landing.ts (shown as a carousel, not here).
  {
    slug: "stockflow",
    title: "StockFlow - Inventory Control System",
    description:
      "Internal inventory system with live stock levels, low-stock alerts and purchase orders for a distribution warehouse.",
    image: "/assets/screenshots/stockflow-preview.webp",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma ORM", "Tailwind CSS"],
    demoLink: "",
    codeLink: "",
    featured: true,
    category: "Business System",
    summary:
      "MOCK: an internal system that replaces spreadsheet stock counts with live levels, alerts and purchase orders. Replace this text with the real project.",
    highlights: [
      { title: "Live stock levels", text: "MOCK: every SKU shows its current quantity, updated as goods move." },
      { title: "Low-stock alerts", text: "MOCK: items below their reorder point are flagged before they run out." },
      { title: "Purchase orders", text: "MOCK: create, approve and receive orders without leaving the system." },
    ],
    year: "2025",
    role: "Full-stack developer",
    status: "MOCK",
    diagram: { src: "/assets/diagrams/stockflow-architecture.svg", caption: "MOCK: request flow from the web app to the database" },
    gallery: [
      { src: "/assets/screenshots/stockflow-preview.webp", caption: "MOCK: stock overview" },
      { src: "/assets/screenshots/routeline-preview.webp", caption: "MOCK: purchase order screen" },
      { src: "/assets/screenshots/windspace-preview.webp", caption: "MOCK: low-stock alerts" },
    ],
  },
  {
    slug: "routeline",
    title: "RouteLine - Delivery Dashboard",
    description:
      "Live dashboard tracking drivers, routes and on-time delivery for a last-mile logistics team.",
    image: "/assets/screenshots/routeline-preview.webp",
    tags: ["React", "TypeScript", "Node.js", "Express.js", "PostgreSQL"],
    demoLink: "",
    codeLink: "",
    featured: false,
    category: "Business System",
    access: "Internal",
    summary:
      "MOCK: a dashboard that shows deliveries, routes and driver status in one place. Replace this text with the real project.",
    highlights: ["Route map with driver positions", "On-time delivery metrics", "Daily volume overview"],
  },
];
