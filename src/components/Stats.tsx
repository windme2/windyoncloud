"use client";

import { useEffect, useRef, useState } from "react";
import { experienceData } from "@/data/journey";

const YEARS_OF_EXPERIENCE = 9;
const PROJECTS_DELIVERED = 30;

/** Counts from 0 to `to` once, when scrolled into view. */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(to);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return <span ref={ref}>{value}</span>;
}

/**
 * Slim proof strip under the hero. Numbers come from the career data:
 * years since the first job, employers, and projects shipped.
 */
export function Stats() {
  const stats = [
    {
      value: YEARS_OF_EXPERIENCE,
      suffix: "+",
      label: "Years of experience",
    },
    { value: new Set(experienceData.map((job) => job.company)).size, suffix: "", label: "Companies" },
    { value: PROJECTS_DELIVERED, suffix: "+", label: "Projects delivered" },
  ];

  return (
    <section aria-label="At a glance" className="relative py-10 md:py-14">
      <div className="container max-w-7xl">
        <dl className="reveal grid grid-cols-3 border-y">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col px-2 py-6 text-center md:py-8 ${i > 0 ? "border-l" : ""}`}
            >
              <dt className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-auto font-display text-4xl sm:text-5xl font-extralight tabular-nums md:text-6xl">
                <span className="text-sky">
                  <CountUp to={stat.value} />
                  {stat.suffix}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
