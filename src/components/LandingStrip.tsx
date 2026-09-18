import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { landingPages, type LandingPage } from "@/data/landing";
import { Marquee } from "@/components/Marquee";

function Card({ page, copy = false }: { page: LandingPage; copy?: boolean }) {
  const body = (
    <>
      <span className="landing-frame relative block aspect-[16/10] overflow-hidden rounded-2xl p-1.5">
        <span className="relative block h-full w-full overflow-hidden rounded-xl">
          <Image
            src={page.image}
            alt={copy ? "" : `${page.title} landing page`}
            fill
            className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 80vw, 420px"
          />
          {/* Hover (pointer devices): same "pill over a dark veil" as the project cards */}
          {page.link && (
            <span className="absolute inset-0 hidden items-center justify-center bg-[#020823]/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100 md:flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/60 px-5 py-2.5 text-[10px] font-medium uppercase tracking-[0.25em] text-white">
                Visit site <ArrowUpRight size={12} />
              </span>
            </span>
          )}
        </span>
      </span>
      <span className="mt-4 flex items-start justify-between gap-4 px-1">
        <span>
          <span className="block font-display text-lg font-light leading-tight">{page.title}</span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {page.kind}
          </span>
        </span>
        {page.link && (
          <ArrowUpRight
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            className="mt-1 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
          />
        )}
      </span>
    </>
  );

  return page.link ? (
    <a
      href={page.link}
      target="_blank"
      rel="noopener noreferrer"
      tabIndex={copy ? -1 : undefined}
      aria-label={copy ? undefined : `${page.title} — visit site (opens in a new tab)`}
      className="group block outline-none"
    >
      {body}
    </a>
  ) : (
    <div className="group block">{body}</div>
  );
}

/**
 * Landing pages under Selected works.
 *  - 3+ pages, desktop: endless drifting strip (rendered twice so it loops), eases to a stop on hover/focus
 *  - phones / reduced motion: a swipeable row that snaps card by card, no auto-scroll
 *  - 1–2 pages: a plain grid (a loop of two looks repetitive)
 * `link` is the page's own deploy, e.g. "https://roast.windyoncloud.me".
 * `lang="th"` swaps the heading copy for the Thai /services page.
 */
export function LandingStrip({ lang = "en" }: { lang?: "en" | "th" }) {
  const th = lang === "th";
  if (landingPages.length === 0) return null;
  const loop = landingPages.length >= 3;

  return (
    <div className="mt-24 md:mt-32">
      <div className="container max-w-7xl">
        <div className="reveal flex items-end justify-between gap-6 border-b pb-5">
          <h3 className="font-display text-3xl font-extralight leading-none tracking-tight md:text-5xl">
            <span className="text-sky">
              {th ? (
                <>
                  ตัวอย่าง <span className="accent">Landing page</span>
                </>
              ) : (
                <>
                  Landing <span className="accent font-serif font-light italic">pages</span>
                </>
              )}
              {!th && <span className="accent">.</span>}
            </span>
          </h3>
          <p className="hidden max-w-[16rem] text-right text-sm leading-relaxed text-muted-foreground sm:block">
            {th
              ? "หน้าเดียวที่โหลดเร็ว เล่าเรื่องชัด และพาคนดูไปสู่การติดต่อ"
              : "Fast, focused one-pagers built to turn visits into customers."}
          </p>
        </div>

        {!loop && (
          <ul className="mt-10 grid gap-8 sm:grid-cols-2">
            {landingPages.map((page) => (
              <li key={page.title} className="reveal">
                <Card page={page} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {loop && (
        <Marquee
          className="marquee reveal mt-10"
          style={{ "--marquee-duration": `${landingPages.length * 9}s` } as React.CSSProperties}
        >
          <ul className="marquee-track flex w-max">
            {[...landingPages, ...landingPages].map((page, i) => {
              const copy = i >= landingPages.length;
              return (
                <li
                  key={i}
                  aria-hidden={copy || undefined}
                  className="w-[78vw] max-w-[340px] shrink-0 pr-4 md:w-[420px] md:max-w-none md:pr-8"
                >
                  <Card page={page} copy={copy} />
                </li>
              );
            })}
          </ul>
        </Marquee>
      )}
    </div>
  );
}
