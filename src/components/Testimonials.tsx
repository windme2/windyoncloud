"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { testimonials as defaultItems, type Testimonial } from "@/data/testimonials";
import { cn } from "@/lib/utils";

/**
 * Kind words — one quote at a time in a snap-scrolling track, so it swipes
 * natively on touch; arrows and dots scroll it on desktop. No auto-play:
 * quotes need reading time. Not a numbered section (it supports Contact).
 * /services passes its own Thai quotes, heading and `lang="th"`.
 */
/** Initials for the avatar; Thai names skip leading vowels (เ แ โ ใ ไ) and the "คุณ" title. */
const initials = (name: string) =>
  name
    .replace(/^คุณ\s*/, "")
    .split(/\s+/)
    .map((w) => w.replace(/^[เแโใไ]/, "")[0] ?? "")
    .slice(0, 2)
    .join("");

export function Testimonials({
  items: testimonials = defaultItems,
  heading,
  lang = "en",
}: {
  items?: Testimonial[];
  heading?: ReactNode;
  lang?: "en" | "th";
} = {}) {
  const th = lang === "th";
  const track = useRef<HTMLUListElement>(null);
  const [current, setCurrent] = useState(0);

  // Follow the slide in view (swipe, arrows, dots or keyboard)
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(Number((entry.target as HTMLElement).dataset.index));
        });
      },
      { root: el, threshold: 0.6 },
    );
    el.querySelectorAll("li").forEach((li) => io.observe(li));
    return () => io.disconnect();
  }, []);

  if (testimonials.length === 0) return null;

  const go = (index: number) => {
    const el = track.current;
    if (!el) return;
    const next = (index + testimonials.length) % testimonials.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  const arrow =
    "grid h-12 w-12 cursor-pointer place-items-center rounded-full border transition-colors hover:border-foreground hover:bg-foreground hover:text-background";

  return (
    <section aria-label={th ? "รีวิวจากลูกค้า" : "Testimonials"} className={cn("relative", th ? "pt-24 md:pt-36" : "py-20 md:py-28")}>
      <div className="container max-w-7xl">
        <div className="reveal flex items-end justify-between gap-6 border-b pb-5">
          <h2 className="font-display text-3xl font-extralight leading-none tracking-tight md:text-5xl">
            <span className="text-sky">
              {heading ?? (
                <>
                  Kind <span className="accent font-serif font-light italic">words</span>
                  <span className="accent">.</span>
                </>
              )}
            </span>
          </h2>
          {testimonials.length > 1 && (
            <div className="flex gap-3">
              <button type="button" onClick={() => go(current - 1)} className={arrow} aria-label={th ? "รีวิวก่อนหน้า" : "Previous testimonial"}>
                <ArrowLeft size={16} strokeWidth={1.5} />
              </button>
              <button type="button" onClick={() => go(current + 1)} className={arrow} aria-label={th ? "รีวิวถัดไป" : "Next testimonial"}>
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          )}
        </div>

        <ul
          ref={track}
          className="reveal mt-10 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:mt-14 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <li
              key={t.name + i}
              data-index={i}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${testimonials.length}`}
              className="w-full shrink-0 snap-center"
            >
              <figure className="grid gap-8 md:grid-cols-12 md:gap-16">
                <span
                  aria-hidden="true"
                  className="font-serif text-7xl font-light italic leading-none text-primary-ink md:col-span-1 md:text-8xl"
                >
                  &ldquo;
                </span>
                <div className="md:col-span-11">
                  <blockquote className="max-w-4xl text-balance font-display text-2xl font-light leading-snug tracking-tight md:text-4xl">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border font-display text-sm">
                      {initials(t.name)}
                    </span>
                    <span>
                      <span className="flex items-center gap-2 text-base">
                        {t.name}
                        {t.link && (
                          <a
                            href={t.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`See ${t.name}'s recommendation`}
                            className="opacity-60 transition-opacity hover:opacity-100"
                          >
                            <ArrowUpRight size={14} />
                          </a>
                        )}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 block text-muted-foreground",
                          th ? "text-xs" : "font-mono text-[10px] uppercase tracking-[0.2em]",
                        )}
                      >
                        {t.role} | {t.company}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            </li>
          ))}
        </ul>

        {testimonials.length > 1 && (
          <div className="mt-10 flex gap-2 md:pl-[calc((100%+4rem)/12)]">
            {testimonials.map((t, i) => (
              <button
                key={t.name + i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={current === i}
                className={cn(
                  "h-1 cursor-pointer rounded-full transition-all duration-500",
                  current === i ? "w-10 bg-primary" : "w-4 bg-foreground/25 hover:bg-foreground/50",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
