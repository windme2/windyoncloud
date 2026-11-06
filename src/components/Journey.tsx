"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { educationData, experienceData } from "@/data/journey";
import { SectionHeading } from "@/components/SectionHeading";
import { useSlidingPill } from "@/lib/useSlidingPill";

const tabs = [
  { id: "education", label: "Education" },
  { id: "experience", label: "Work experience" },
] as const;

/** Where the line's tip sits, as a fraction of the viewport height from the top. */
const TIP_AT = 0.62;
/** Node centre from the top of each item: desktop disc (top-8 + half of h-14), rail dot (top-9 + half of 11px). */
const nodeY = () => (window.innerWidth >= 1150 ? 60 : 41);

/**
 * Journey — a timeline that draws itself: the line grows (eased) as you scroll, a glowing head rides its tip,
 * each node lights up as the line reaches it and its card branches out from the line.
 * Zig-zag around a centre line from 1150px, a left rail below that.
 */
export function Journey() {
  const [activeTab, setActiveTab] = useState<"education" | "experience">(
    "education",
  );
  const trackRef = useRef<HTMLDivElement>(null);
  const { barRef, pillRef } = useSlidingPill(activeTab);

  const items = activeTab === "education" ? educationData : experienceData;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let cur = -1; // eased progress 0..1 (-1 = not started, jump straight to the target)
    let frame = 0;
    let running = false;

    const tick = () => {
      const rect = track.getBoundingClientRect();
      const vh = window.innerHeight;
      const tipY = vh * TIP_AT;
      const target = reduce
        ? 1
        : Math.min(1, Math.max(0, (tipY - rect.top) / rect.height));
      cur = cur < 0 ? target : cur + (target - cur) * 0.12;
      if (Math.abs(target - cur) < 0.0005) cur = target;

      track.style.setProperty("--p", cur.toFixed(4));
      track.style.setProperty("--tip", `${(cur * rect.height).toFixed(1)}px`);

      // light every node the (eased) line has reached; a card, once out, stays out
      const lineY = rect.top + cur * rect.height;
      let batch = 0;
      const ny = nodeY();
      track.querySelectorAll<HTMLElement>("[data-tl-item]").forEach((li) => {
        const lit = reduce || li.getBoundingClientRect().top + ny <= lineY + 1;
        li.toggleAttribute("data-lit", lit);
        if (lit && !li.hasAttribute("data-shown")) {
          // several at once (tab switch, jump-scroll): cascade them
          li.style.setProperty("--d", `${batch++ * 110}ms`);
          li.setAttribute("data-shown", "");
        }
      });

      if (running) frame = requestAnimationFrame(tick);
    };

    // only animate while the section is near the screen
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !running) {
          running = true;
          frame = requestAnimationFrame(tick);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(track);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="journey" className="relative scroll-mt-20 py-20 md:py-32">
      <div className="container max-w-7xl">
        <SectionHeading index="03" label="Journey" title="My" accent="journey" />

        <div className="reveal mb-14 flex min-[1150px]:justify-center">
          <div
            ref={barRef}
            role="group"
            aria-label="Journey"
            className="relative flex flex-wrap gap-3"
          >
            <span
              ref={pillRef}
              aria-hidden="true"
              className="filter-pill pointer-events-none absolute left-0 top-0 rounded-full bg-foreground opacity-0"
            />
            {tabs.map((tab) => {
              const on = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  aria-pressed={on}
                  data-pill-key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative z-10 cursor-pointer rounded-full border px-5 py-2 text-[10px] font-medium uppercase tracking-[0.25em] transition-[color,border-color] duration-500",
                    on
                      ? "pill-on text-background"
                      : "text-foreground/80 hover:border-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div ref={trackRef} className="tl relative">
          {/* Line: faint track, the drawn part, and a glowing head on its tip */}
          <div aria-hidden="true" className="tl-rail absolute top-0 h-full w-px bg-border" />
          <div aria-hidden="true" className="tl-rail tl-line absolute top-0 h-full w-px origin-top" />
          <div aria-hidden="true" className="tl-rail tl-head absolute top-0" />

          <ol key={activeTab} className="space-y-8 min-[1150px]:space-y-16">
            {items.map((item, index) => {
              const Icon = item.icon;
              const left = index % 2 === 0;
              const org =
                activeTab === "education"
                  ? (item as (typeof educationData)[0]).institution
                  : (item as (typeof experienceData)[0]).company;

              return (
                <li
                  key={`${activeTab}-${item.title}`}
                  data-tl-item
                  className="relative pl-9 min-[1150px]:pl-0"
                >
                  {/* Node: icon disc on the centre line (desktop), small dot on the rail (below) */}
                  <span
                    aria-hidden="true"
                    className="tl-node absolute left-1/2 top-8 z-10 hidden h-14 w-14 -translate-x-1/2 place-items-center rounded-full border min-[1150px]:grid"
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.25} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="tl-dot absolute left-[11px] top-9 z-10 h-[11px] w-[11px] -translate-x-1/2 rounded-full border min-[1150px]:hidden"
                  />

                  <article
                    className={cn(
                      "tl-card glass w-full overflow-hidden rounded-2xl min-[1150px]:w-[calc(50%-4rem)]",
                      left
                        ? "tl-from-centre-l min-[1150px]:mr-auto"
                        : "tl-from-centre-r min-[1150px]:ml-auto",
                    )}
                  >
                    <div className="p-6 md:p-8">
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        {item.year}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-light md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="mt-1 font-serif text-base font-light italic text-primary-ink">
                        {item.subtitle}
                      </p>
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                        {org}
                      </p>
                      <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      {(item.status === "current" ||
                        item.status === "incomplete") && (
                        <span className="mt-5 inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-primary-ink">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              item.status === "current"
                                ? "animate-pulse bg-primary"
                                : "bg-muted-foreground",
                            )}
                          />
                          {item.status === "current" ? "Current" : "Incomplete"}
                        </span>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
