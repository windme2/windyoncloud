import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/Header";
import { SkyBackground } from "@/components/SkyBackground";

export const metadata: Metadata = {
  title: "Page not found — windyoncloud",
  robots: { index: false },
};

const shortcuts = [
  { href: "/", label: "Home", note: "Start from the top" },
  { href: "/projects", label: "Projects", note: "Everything I have built" },
  { href: "/#contact", label: "Contact", note: "Say hello" },
];

export default function NotFound() {
  return (
    <div className="page-sky relative isolate flex min-h-screen flex-col overflow-hidden text-foreground">
      <SkyBackground />
      <Header />

      <main className="container flex max-w-7xl flex-1 flex-col items-center justify-center pb-16 text-center pt-32 md:pt-40">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Error 404 — page not found
        </p>
        <h1 className="text-sky title-glow font-display text-[clamp(7rem,26vw,20rem)] font-light leading-[0.85] tracking-tight">
          404<span className="accent">.</span>
        </h1>
        <p className="mt-2 font-serif text-2xl font-light italic text-foreground/90 md:text-4xl">
          this page drifted away.
        </p>
        <p className="mt-4 max-w-md text-balance text-sm leading-relaxed text-muted-foreground">
          The link may be old or mistyped. One of these should get you back on
          course.
        </p>

        <ul className="mt-12 grid w-full max-w-4xl border-t text-left sm:grid-cols-3">
          {shortcuts.map((s) => (
            <li
              key={s.href}
              className="border-b sm:border-b-0 sm:[&:not(:first-child)]:border-l"
            >
              <Link
                href={s.href}
                className="group flex items-center justify-between gap-4 py-6 sm:px-6"
              >
                <span>
                  <span className="block font-display text-2xl font-extralight transition-colors group-hover:text-primary-ink">
                    {s.label}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {s.note}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.25}
                  className="shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
