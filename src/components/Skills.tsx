"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { skillsData, tabLabels } from "@/data/skills";
import { Icon } from "@iconify/react";
import { ArrowUpRight } from "lucide-react";
import { certifications as allCertifications } from "@/data/certifications";
import { useSlidingPill } from "@/lib/useSlidingPill";

const certifications = allCertifications.filter((c) => !c.hidden);

/**
 * Skills section component listing developer capabilities.
 * Supports active tab filtering, clean card grids with level badge indicators,
 * and dynamic theme orange category filters.
 */
export function Skills() {
  // Basic-level skills stay out of the grid (they weaken the picture) and are
  // listed once, quietly, as "also familiar with". Deployment merges into
  // DevOps, and empty groups disappear.
  const familiar: string[] = [];
  const grouped = (
    Object.keys(skillsData) as Array<keyof typeof skillsData>
  ).map((key) => {
    const items = skillsData[key].filter((skill) => {
      if (skill.level === "Basic") {
        familiar.push(skill.name);
        return false;
      }
      return true;
    });
    return { key, label: tabLabels[key], items };
  });
  const groups = grouped
    .map((g) =>
      g.key === "devops"
        ? {
            ...g,
            label: "DevOps & Cloud",
            items: [
              ...g.items,
              ...(grouped.find((x) => x.key === "deployment")?.items ?? []),
            ],
          }
        : g,
    )
    .filter((g) => g.key !== "deployment" && g.items.length > 0);

  const [activeKey, setActiveKey] = useState<string>(
    groups[0]?.key ?? "frontend",
  );
  const active = groups.find((g) => g.key === activeKey) ?? groups[0];
  // mobile: a filled pill slides between the badges; desktop: a tinted bar slides between the rows
  const { barRef, pillRef } = useSlidingPill(active.key);

  // Determine badge dot color representing skill level status
  const getLevelDotColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-emerald-500";
      case "Intermediate":
        return "bg-primary";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <section id="skills" className="relative scroll-mt-20 py-20 md:py-32">
      <div className="container max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left: sticky title and vertical category list */}
          <div className="lg:col-span-4 lg:self-start">
            <p className="reveal font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              04 — Skills
            </p>
            <h2 className="reveal mt-4 font-display text-5xl font-extralight leading-none tracking-tight md:text-7xl">
              <span className="block overflow-hidden pb-[0.12em]">
                <span className="rise text-sky">
                  My{" "}
                  <span className="accent font-serif font-light italic">
                    skills
                  </span>
                  <span className="accent">.</span>
                </span>
              </span>
            </h2>
            <p className="reveal mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Interface to infrastructure.
            </p>

            {/* Badges (wrapping pills) on small screens, vertical list on lg */}
            <ul
              ref={barRef}
              className="reveal relative mt-8 flex flex-wrap gap-2 lg:mt-10 lg:block lg:gap-0 lg:border-t"
            >
              <span
                ref={pillRef}
                aria-hidden="true"
                className="filter-pill pointer-events-none absolute left-0 top-0 rounded-full bg-foreground opacity-0 lg:hidden"
              />
              {groups.map((group) => {
                const on = active.key === group.key;
                return (
                  <li key={group.key} className="lg:border-b">
                    <button
                      data-pill-key={group.key}
                      aria-pressed={on}
                      onClick={() => setActiveKey(group.key)}
                      className={cn(
                        "relative z-10 flex cursor-pointer items-center gap-3 text-left transition-[color,border-color,padding] duration-500",
                        // mobile / tablet: pill badge
                        "rounded-full border px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em]",
                        // desktop: row in a list
                        "lg:w-full lg:justify-between lg:rounded-none lg:border-0 lg:px-0 lg:py-4 lg:text-base lg:font-light lg:normal-case lg:tracking-normal",
                        on
                          ? "pill-on text-background lg:pl-3 lg:text-foreground"
                          : "text-muted-foreground hover:border-foreground hover:text-foreground lg:hover:pl-3",
                      )}
                    >
                      <span
                        className={cn(
                          "lg:font-display lg:text-lg lg:transition-[font-size,font-weight] lg:duration-500 lg:ease-out",
                          // the one being viewed reads bigger and bolder
                          on && "lg:text-[1.75rem] lg:font-normal",
                        )}
                      >
                        {group.label}
                      </span>
                      <span
                        className={cn(
                          "mr-4 hidden h-1.5 w-1.5 rounded-full transition-all lg:block",
                          on
                            ? "bg-primary shadow-[0_0_12px_hsl(var(--primary))]"
                            : "bg-transparent",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            {familiar.length > 0 && (
              <p className="reveal mt-8 max-w-xs text-xs leading-relaxed text-muted-foreground">
                <span className="font-mono uppercase tracking-[0.2em]">
                  Also familiar ·{" "}
                </span>
                {familiar.join(", ")}
              </p>
            )}
          </div>

          {/* Right: every group's cards stacked in one grid cell, so switching never changes the height
              (nothing below jumps). The active group flows in as a diagonal wave; the old one fades out. */}
          <div className="skills-stage reveal grid lg:col-span-8">
            {groups.map((group) => {
              const on = group.key === active.key;
              return (
                <div
                  key={group.key}
                  data-on={on || undefined}
                  inert={!on}
                  className="skills-group grid grid-cols-2 content-start gap-3 [grid-area:1/1] sm:gap-4 md:grid-cols-3 md:gap-5"
                >
                  {group.items.map((skill, i) => (
                    <div
                      key={skill.name}
                      data-spotlight
                      // diagonal wave: row + column (3 columns from md, 2 below; close enough for both)
                      style={
                        {
                          "--d": `${(Math.floor(i / 3) + (i % 3)) * 55}ms`,
                        } as React.CSSProperties
                      }
                      className="skill-card spotlight glass group relative flex flex-col items-start gap-5 overflow-hidden rounded-2xl p-5 md:gap-6 md:p-6"
                    >
                      <div className="relative grid h-12 w-12 place-items-center rounded-xl bg-white/95 text-[#0b1020] shadow-sm transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:scale-105">
                        <Icon icon={skill.icon} className="h-7 w-7" />
                      </div>
                      <div className="relative space-y-2">
                        <h3 className="font-display text-base font-light md:text-lg">
                          {skill.name}
                        </h3>
                        <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full",
                              getLevelDotColor(skill.level),
                            )}
                          />
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications: full-width row under the grid, hidden when there are none */}
        {certifications.length > 0 && (
          <div className="mt-16 md:mt-24">
            <p className="reveal border-b pb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Certifications
            </p>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert) => {
                const body = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/95 shadow-sm">
                      {cert.icon.startsWith("/") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cert.icon}
                          alt=""
                          width={24}
                          height={24}
                          className="h-6 w-6 object-contain"
                        />
                      ) : (
                        <Icon
                          icon={cert.icon}
                          className="h-6 w-6"
                          style={cert.color ? { color: cert.color } : undefined}
                        />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base font-light leading-snug md:text-lg">
                        {cert.name}
                      </span>
                      <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {cert.year
                          ? `${cert.issuer} · ${cert.year}`
                          : cert.issuer}
                      </span>
                    </span>
                    {cert.link && (
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        aria-hidden="true"
                        className="shrink-0 opacity-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                      />
                    )}
                  </>
                );
                const row =
                  "group flex h-full items-center gap-4 border-b py-5 sm:pr-6";
                return (
                  <li key={cert.name} className="reveal">
                    {cert.link ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={row}
                      >
                        {body}
                      </a>
                    ) : (
                      <div className={row}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
