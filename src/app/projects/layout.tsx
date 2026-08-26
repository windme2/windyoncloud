import type { Metadata } from "next";

// /projects/page.tsx is a client component, so its metadata lives here
export const metadata: Metadata = {
  title: "All projects — windyoncloud",
  description:
    "Every project by Intouch Charoenphon (windyoncloud): full-stack apps, internal systems and front-end work.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
