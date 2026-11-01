"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { SocialLinks } from "@/components/SocialIcon";
import { projects } from "@/data/projects";

/** Pre-rendered cloud sprite (see public/assets/clouds). */
function CloudSprite({
  src,
  className,
  speed,
  blur = 0,
}: {
  src: string;
  className: string;
  speed: number;
  blur?: number;
}) {
  return (
    <div
      data-speed={speed}
      aria-hidden="true"
      className={`pointer-events-none absolute z-40 dark:hidden ${className}`}
    >
      <div
        style={{
          aspectRatio: "1300 / 600",
          backgroundImage: `url(/assets/clouds/cloud-${src}.webp)`,
          backgroundSize: "100% 100%",
          filter: blur ? `blur(${blur}px)` : undefined,
        }}
      />
    </div>
  );
}

const nameClass =
  "absolute inset-x-0 top-[17%] text-center font-display text-[clamp(4.5rem,24vw,21rem)] font-light leading-[0.85] tracking-tight md:top-[15vh] md:text-[clamp(4.5rem,21vw,21rem)]";

/**
 * Hero — a cut-out portrait stands in front of the giant name (like a poster):
 * the filled name sits behind the person, an outline copy sits in front so the
 * name stays readable. Sun and clouds by day, moon and stars by night.
 */
export function Hero() {
  const latest = projects[0];

  return (
    <section id="home" className="relative overflow-x-clip text-foreground">
      {/* Sun (day) / moon (night) glow behind the person */}
      <div
        aria-hidden="true"
        data-speed="0.3"
        data-mouse="-10,-8"
        className="pointer-events-none absolute inset-x-0 top-[2vh] mx-auto h-[90vw] max-h-[900px] w-[90vw] max-w-[900px] md:top-[-6vh]"
      >
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(190,225,255,0.95)_0%,rgba(110,175,255,0.38)_38%,transparent_66%)] dark:bg-[radial-gradient(circle,rgba(190,198,255,0.4)_0%,rgba(120,110,230,0.14)_42%,transparent_66%)]" />
      </div>

      {/* Stage: name + cut-out portrait */}
      <div className="relative h-[56svh] min-h-[400px] [--ph:82%] [mask-image:linear-gradient(to_bottom,black_74%,transparent_100%)] md:h-screen md:[--ph:76%]">
        {/* Name behind the person */}
        <h1
          aria-label="Intouch"
          data-speed="0.22"
          data-mouse="-8,0"
          className={`${nameClass} text-sky title-glow z-10`}
        >
          Intouch
        </h1>

        {/* Cut-out portrait (the shadow lives on the wrapper so it follows the silhouette) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex h-[var(--ph)] justify-center drop-shadow-[0_20px_40px_rgba(20,50,120,0.35)] dark:drop-shadow-[0_0_36px_rgba(150,160,255,0.5)]">
          <Image
            data-speed="0.06"
            src="/assets/images/hero-cutout.webp"
            alt="Portrait of Intouch Charoenphon"
            width={1596}
            height={1400}
            priority
            sizes="(max-width: 768px) 100vw, min(75vw, 1100px)"
            className="h-full w-auto max-w-none object-contain [mask-image:linear-gradient(to_bottom,black_62%,transparent_96%)]"
          />
        </div>

        {/* Outline copy of the name, clipped to the person's silhouette so the name reads through the figure */}
        <div
          aria-hidden="true"
          data-speed="0.06"
          className="pointer-events-none absolute inset-0 z-30"
          style={{
            WebkitMaskImage: "url(/assets/images/hero-cutout.webp)",
            maskImage: "url(/assets/images/hero-cutout.webp)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "auto var(--ph)",
            maskSize: "auto var(--ph)",
            WebkitMaskPosition: "50% 100%",
            maskPosition: "50% 100%",
          }}
        >
          <div
            data-speed="0.16"
            data-mouse="-8,0"
            className={`${nameClass} text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.8)]`}
          >
            Intouch
          </div>
        </div>

        {/* Cloud sprites in front of the person (day only) — nearest one is soft for depth of field */}
        <CloudSprite
          src="a"
          speed={-0.1}
          blur={2}
          className="-bottom-[22%] -left-[24%] w-[900px] max-w-[100%]"
        />
        <CloudSprite
          src="b"
          speed={-0.15}
          blur={2}
          className="-bottom-[26%] -right-[26%] w-[880px] max-w-[100%]"
        />
      </div>

      {/* Copy: sits beside the person on desktop, below the stage on mobile */}
      <div className="relative z-[45] px-6 pb-16 md:absolute md:bottom-[7vh] md:left-12 md:max-w-[22rem] md:px-0 md:pb-0 lg:left-20">
        {/* availability: rotating text ring around a pulsing dot */}
        <Link
          href="/services"
          aria-label="Available for work — see services"
          className="reveal group relative mb-4 hidden h-28 w-28 md:block"
        >
          <svg
            viewBox="0 0 120 120"
            aria-hidden="true"
            className="h-full w-full animate-[spin_20s_linear_infinite] text-foreground transition-colors group-hover:text-primary-ink"
          >
            <defs>
              <path
                id="avail-circle"
                d="M60,60 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
              />
            </defs>
            <text
              fontSize="10.5"
              fill="currentColor"
              fontFamily="var(--font-mono)"
            >
              <textPath
                href="#avail-circle"
                textLength="249"
                lengthAdjust="spacing"
              >
                AVAILABLE FOR WORK • OPEN TO PROJECTS •
              </textPath>
            </text>
          </svg>
          <span className="absolute inset-0 grid place-items-center">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
            </span>
          </span>
        </Link>
        <p className="reveal font-serif text-3xl font-light italic text-primary-ink md:text-4xl">
          software engineer.
        </p>
        <p className="reveal delay-100 mt-5 text-balance text-sm leading-relaxed text-muted-foreground sm:text-pretty">
          Web products that are quick to understand
          <br className="hidden sm:block" /> and solid underneath.
          <br className="hidden sm:block" /> Formerly logistics and IT
          infrastructure.
        </p>

        {/* actions side by side */}
        <div className="reveal delay-200 mt-7 flex flex-wrap items-center gap-3">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-6 py-3 text-[10px] font-medium uppercase tracking-[0.25em] text-primary-foreground transition-colors duration-300 hover:border-foreground hover:bg-foreground hover:text-background dark:hover:text-background"
          >
            Contact me
          </a>
          <a
            href="/assets/documents/CV_Intouch_Charoenphon.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[10px] font-medium uppercase tracking-[0.25em] transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <Download size={12} /> Download CV
          </a>
        </div>
        {/* social icons under the actions: secondary to Contact me, brand colour fills in on hover */}
        <SocialLinks className="reveal delay-300 mt-6" />
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-4 left-1/2 z-[46] hidden -translate-x-1/2 flex-col items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-foreground/75 transition-colors hover:text-foreground md:bottom-6 md:flex"
      >
        Scroll
        <span className="relative block h-10 w-px overflow-hidden bg-foreground/25">
          <span className="absolute left-0 top-0 h-4 w-px animate-[scroll-line_1.8s_ease-in-out_infinite] bg-foreground" />
        </span>
      </a>

      {/* Latest project card */}
      {latest && (
        <a
          href="#projects"
          className="group glass absolute bottom-8 right-6 z-[45] hidden items-center gap-4 rounded-2xl p-2 pr-5 transition-[translate,box-shadow,border-color] duration-500 ease-out hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_18px_40px_-12px_hsl(var(--primary)/0.45)] md:flex lg:right-12"
        >
          <span className="relative h-16 w-16 overflow-hidden rounded-xl">
            <Image
              src={latest.image}
              alt={latest.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="64px"
            />
          </span>
          <span>
            <span className="block text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
              Latest project
            </span>
            <span className="mt-0.5 block font-display text-base font-light leading-tight">
              {latest.title.split(" - ")[0]}
            </span>
            <span className="mt-1 inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.25em] text-primary-ink">
              View{" "}
              <ArrowRight
                size={10}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
          </span>
        </a>
      )}
    </section>
  );
}
