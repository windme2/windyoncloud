"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Github } from "@/components/icons";
import { projects, type Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";
import { LandingStrip } from "@/components/LandingStrip";
import { AccessBadge } from "@/components/AccessBadge";
import { getLenis } from "@/lib/lenis";
import { useSlidingPill } from "@/lib/useSlidingPill";

const pillClass =
  "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.25em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background";

/**
 * Staggered project list: image and glass info card alternate sides and
 * overlap, with a giant outlined numeral behind. Live / Source links appear
 * over the image on hover (desktop) and under the text on touch screens.
 */
function ProjectList({
  items,
  eagerFirst = false,
}: {
  items: Project[];
  /** Load the first image right away (on /projects it's above the fold and is the LCP). */
  eagerFirst?: boolean;
}) {
  return (
    <ol>
      {items.map((project, index) => {
        const flip = index % 2 === 1;

        return (
          <li
            key={project.title}
            data-stack
            className="glass-solid group relative mb-8 grid grid-cols-1 items-center gap-y-0 overflow-hidden rounded-2xl md:mb-[9vh] md:grid-cols-12 md:gap-y-6 md:overflow-visible md:rounded-none md:!border-0 md:!bg-transparent md:!shadow-none [@media(min-width:768px)_and_(min-height:760px)]:sticky"
            style={{
              top: "13vh",
              zIndex: index + 1,
              scale: "calc(1 - var(--cover, 0) * 0.05)",
              // stays solid until the next card is ~40% over it, then fades out by the time it's covered
              opacity: "calc(1.6 - var(--cover, 0) * 1.5)",
              transformOrigin: "50% 0%",
            }}
          >
            {/* Image: wipes in, tilts with the pointer, photo drifts inside the frame */}
            <div
              className={cn(
                "relative md:row-start-1 md:col-span-8",
                flip ? "md:col-start-5" : "md:col-start-1",
              )}
            >
              <div
                data-tilt
                className="reveal-clip transition-transform duration-300 ease-out will-change-transform"
              >
                <div className="glass relative aspect-[16/10] overflow-hidden max-md:!rounded-none max-md:!border-0 max-md:!bg-transparent max-md:!p-0 max-md:!shadow-none md:rounded-2xl md:p-1.5">
                  <div className="relative h-full w-full overflow-hidden md:rounded-xl">
                    <div
                      data-parallax="0.06"
                      className="proj-zoom absolute -inset-y-[9%] inset-x-0"
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        loading={eagerFirst && index === 0 ? "eager" : undefined}
                        fetchPriority={eagerFirst && index === 0 ? "high" : undefined}
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 62vw"
                      />
                    </div>
                    <Link
                      href={`/projects/${project.slug}`}
                      aria-label={`Case study: ${project.title}`}
                      className="absolute inset-0 z-10"
                    />
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 z-20 hidden items-center justify-center gap-4 bg-[#020823]/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                        project.demoLink || project.codeLink
                          ? "md:flex"
                          : "hidden",
                      )}
                    >
                      {project.demoLink && (
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            pillClass,
                            "pointer-events-auto border-white/60 text-white",
                          )}
                        >
                          <ExternalLink size={12} /> Live
                        </a>
                      )}
                      {project.codeLink && (
                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            pillClass,
                            "pointer-events-auto border-white/60 text-white",
                          )}
                        >
                          <Github className="h-3 w-3" /> Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info card: overlaps the image and drifts at a different speed */}
            <div
              data-parallax={flip ? "0.05" : "-0.05"}
              className={cn(
                "relative z-10 md:row-start-1 md:col-span-5",
                flip ? "md:col-start-1" : "md:col-start-8",
              )}
            >
              <div
                className={cn(
                  "proj-rise reveal glass-solid relative overflow-hidden p-5 sm:p-6 md:rounded-2xl md:p-8 max-md:!border-0 max-md:!bg-transparent max-md:!shadow-none",
                  flip ? "md:-translate-y-8" : "md:translate-y-8",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(items.length).padStart(2, "0")}
                  </span>
                  <span className="flex flex-wrap items-center justify-end gap-2">
                    {project.access && <AccessBadge access={project.access} />}
                    <span className="rounded-full bg-primary/12 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary-ink">
                      {project.category}
                    </span>
                  </span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-light leading-tight md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <ul className="mt-6 flex flex-wrap gap-1.5 border-t pt-5">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-foreground/20 bg-background/55 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/85"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/projects/${project.slug}`}
                  className="group/cs mt-6 inline-flex items-center gap-3 rounded-full border border-primary/40 bg-primary/10 py-1.5 pl-5 pr-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-primary-ink transition-colors duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Read case study
                  <span
                    aria-hidden="true"
                    className="grid h-7 w-7 place-items-center rounded-full bg-primary text-primary-foreground transition-[background-color,color,transform] duration-300 group-hover/cs:translate-x-0.5 group-hover/cs:bg-white group-hover/cs:text-primary-ink dark:text-primary-foreground dark:group-hover/cs:bg-primary-foreground dark:group-hover/cs:text-primary"
                  >
                    <ArrowRight
                      size={13}
                      strokeWidth={1.75}
                      className="transition-transform duration-300 group-hover/cs:-rotate-45"
                    />
                  </span>
                </Link>

                {/* Touch screens: no hover, so show the links here */}
                <div className="mt-6 flex gap-3 md:hidden">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={pillClass}
                    >
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={pillClass}
                    >
                      <Github className="h-3 w-3" /> Source
                    </a>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** How long the old list takes to leave before the new one comes in (matches .proj-list-leaving). */
const LEAVE_MS = 260;

/**
 * Category filter + list. Switching: a highlight pill slides to the chosen category, the current list
 * sinks away, then the new cards come in with the scroll entrance (image wipe + zoom, info card rising).
 * Only categories present in `items` get a button; no bar at all when there's just one.
 */
export function FilteredProjects({
  items,
  eagerFirst = false,
}: {
  items: Project[];
  eagerFirst?: boolean;
}) {
  // `active` moves the pill right away; `shown` swaps the list once the old one has left
  const [active, setActive] = useState("All");
  const [shown, setShown] = useState("All");
  const [leaving, setLeaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { barRef, pillRef } = useSlidingPill(active);
  const listRef = useRef<HTMLDivElement>(null);

  const cats = ["All", ...Array.from(new Set(items.map((p) => p.category)))];
  const countOf = (c: string) =>
    c === "All" ? items.length : items.filter((p) => p.category === c).length;
  const filtered =
    shown === "All" ? items : items.filter((p) => p.category === shown);

  useEffect(() => () => clearTimeout(timer.current), []);

  const choose = (category: string) => {
    if (category === active) return;
    setActive(category);
    setLeaving(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setShown(category);
      setLeaving(false);
      // scrolled down into the list? bring the top of the new list back into view
      const top = listRef.current?.getBoundingClientRect().top ?? 0;
      if (top < 0) {
        const lenis = getLenis();
        const y = window.scrollY + top - 160;
        if (lenis) lenis.scrollTo(y, { duration: 0.9 });
        else window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, LEAVE_MS);
  };

  return (
    <>
      {cats.length > 2 && (
        <div
          ref={barRef}
          role="group"
          aria-label="Filter projects by type"
          className="reveal relative mb-12 flex flex-wrap gap-3"
        >
          {/* the highlight that slides between buttons */}
          <span
            ref={pillRef}
            aria-hidden="true"
            className="filter-pill pointer-events-none absolute left-0 top-0 rounded-full bg-foreground opacity-0"
          />
          {cats.map((category) => {
            const on = active === category;
            return (
              <button
                key={category}
                data-pill-key={category}
                aria-pressed={on}
                onClick={() => choose(category)}
                className={cn(
                  "relative z-10 inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2 text-[10px] font-medium uppercase tracking-[0.25em] transition-[color,border-color] duration-500",
                  on
                    ? "pill-on text-background"
                    : "text-muted-foreground hover:border-foreground hover:text-foreground",
                )}
              >
                {category}
                <span
                  className={cn(
                    "font-mono tracking-normal transition-opacity duration-500",
                    on ? "opacity-60" : "opacity-50",
                  )}
                >
                  {countOf(category)}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div ref={listRef} className={cn("proj-list", leaving && "proj-list-leaving")}>
        <ProjectList key={shown} items={filtered} eagerFirst={eagerFirst} />
      </div>
    </>
  );
}

/** Home page shows only projects marked `featured: true`; /projects shows everything. */
const featured = projects.filter((project) => project.featured);

/**
 * Selected Works — the featured projects as a sticky stack with the category filter, the landing page
 * strip underneath and a link to the full /projects page when there are more.
 */
export function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-20 py-20 md:py-32">
      <div className="container max-w-7xl">
        <SectionHeading
          index="05"
          label="Projects"
          title="Selected"
          accent="works"
          action={
            projects.length > featured.length && (
              <Link href="/projects" className={cn(pillClass, "max-sm:px-4")}>
                All projects <ArrowRight size={12} />
              </Link>
            )
          }
        />

        <FilteredProjects items={featured} />
      </div>

      <LandingStrip />
    </section>
  );
}
