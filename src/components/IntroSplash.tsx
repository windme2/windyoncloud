"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const WORD = "windyoncloud";

interface IntroSplashProps {
  /** Called once the word has settled, with the impact point (px) the iris should open from. */
  onDone: (origin: { x: number; y: number }) => void;
}

/** Deterministic random, so every visit plays the same splash. */
function rng(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Water-drop splash (ported from intro.html): a drop falls onto the wordmark's centre, ripples spread,
 * one bead per letter bursts out and turns into its glyph, then the letters line up over a waterline.
 */
export function IntroSplash({ onDone }: IntroSplashProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const liquidRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(onDone);
  useEffect(() => {
    doneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null;
    let cancelled = false;

    const build = () => {
      const stage = stageRef.current;
      const word = wordRef.current;
      const line = lineRef.current;
      const liquid = liquidRef.current;
      const rings = ringsRef.current;
      if (cancelled || !stage || !word || !line || !liquid || !rings) return;
      const letters = Array.from(word.children) as HTMLElement[];

      const el = (
        cls: string,
        parent: HTMLElement,
        size: number,
        x: number,
        y: number,
        h?: number,
      ) => {
        const d = document.createElement("div");
        d.className = cls;
        d.style.width = `${size}px`;
        d.style.height = `${h ?? size}px`;
        d.style.left = `${x}px`;
        d.style.top = `${y}px`;
        parent.appendChild(d);
        // drops, spray and beads start hidden; the timeline scales each one in when it is due
        gsap.set(d, { xPercent: -50, yPercent: -50, scale: cls === "splash-drop" ? 0 : 1 });
        return d;
      };

      const rand = rng(7);
      const sr = stage.getBoundingClientRect();
      const wr = word.getBoundingClientRect();
      const fs = parseFloat(getComputedStyle(word).fontSize);

      // impact point = centre of the wordmark
      const ix = wr.left + wr.width / 2 - sr.left;
      const iy = wr.top + wr.height / 2 - sr.top;
      const R = Math.min(sr.width * 0.44, fs * 4.4);

      // shuffled angle slots so letters land out of order
      const slots = letters.map((_, i) => i);
      for (let k = slots.length - 1; k > 0; k--) {
        const j = Math.floor(rand() * (k + 1));
        [slots[k], slots[j]] = [slots[j], slots[k]];
      }

      tl = gsap.timeline();

      // 1. the drop
      const dropSize = fs * 0.42;
      const drop = el("splash-drop", liquid, dropSize * 0.72, ix, iy, dropSize);
      tl.set(drop, { y: -(iy + dropSize * 2), scaleX: 0.9, scaleY: 1.2 })
        .to(drop, { y: 0, duration: 0.65, ease: "power2.in" }, 0.15)
        .addLabel("hit")
        .to(
          drop,
          { scaleX: 2.3, scaleY: 0.25, duration: 0.09, ease: "power1.out" },
          "hit",
        )
        .to(drop, { scale: 0, duration: 0.2, ease: "power2.in" }, "hit+=0.09");

      // 2. ripples
      for (let r = 0; r < 3; r++) {
        const ring = el("splash-ring", rings, fs * 7, ix, iy, fs * 1.7);
        tl.fromTo(
          ring,
          { scale: 0.05, opacity: 0.7 },
          // immediateRender off: a fromTo applies its "from" at build time, which showed the rings
          // as small flat marks at the impact point before the drop had even landed
          { scale: 1, opacity: 0, duration: 1.2, ease: "power2.out", immediateRender: false },
          `hit+=${r * 0.16}`,
        );
      }

      // 3. fine spray
      for (let s = 0; s < 12; s++) {
        const sp = el(
          "splash-drop",
          liquid,
          fs * (0.05 + rand() * 0.06),
          ix,
          iy,
        );
        const sx0 = (rand() - 0.5) * R * 1.8;
        const sh = fs * (0.8 + rand() * 2.2);
        tl.set(sp, { scale: 0 }, 0)
          .set(sp, { scale: 1 }, "hit")
          .to(sp, { x: sx0, duration: 0.95, ease: "power1.out" }, "hit")
          .to(sp, { y: -sh, duration: 0.4, ease: "power2.out" }, "hit")
          .to(
            sp,
            { y: fs * 0.4, scale: 0, duration: 0.55, ease: "power2.in" },
            "hit+=0.4",
          );
      }

      // 4. one bead per letter: burst -> becomes the glyph -> lines up
      const beadSize = fs * 0.2;
      letters.forEach((l, i) => {
        const lr = l.getBoundingClientRect();
        const lcx = lr.left + lr.width / 2 - sr.left;
        const lcy = lr.top + lr.height / 2 - sr.top;

        const t = slots[i] / (letters.length - 1);
        const ang = Math.PI * (1 - (0.1 + 0.8 * t));
        const rad = R * (0.55 + 0.45 * rand());
        let sx = ix + Math.cos(ang) * rad * 1.15;
        let sy = iy - Math.sin(ang) * rad * 0.8 - fs * 0.35;
        sx = Math.max(fs * 0.5, Math.min(sr.width - fs * 0.5, sx));
        sy = Math.max(fs * 0.7, sy);

        const sag = fs * 0.22;
        const bead = el("splash-drop", liquid, beadSize, ix, iy);
        const morphAt = 0.6 + rand() * 0.2;

        tl!
          .set(bead, { scale: 0 }, 0)
          .set(bead, { scale: 1 }, "hit")
          .to(bead, { x: sx - ix, duration: 0.8, ease: "power2.out" }, "hit")
          .to(
            bead,
            { y: sy - iy - sag, duration: 0.45, ease: "power2.out" },
            "hit",
          )
          .to(
            bead,
            { y: sy - iy, duration: 0.4, ease: "sine.inOut" },
            "hit+=0.45",
          )
          .to(
            bead,
            { scale: 0, duration: 0.3, ease: "power2.in" },
            `hit+=${morphAt}`,
          );

        tl!
          .set(
            l,
            {
              x: sx - lcx,
              y: sy - lcy,
              rotation: (rand() - 0.5) * 70,
              scale: 0.2,
              opacity: 0,
              filter: "blur(8px)",
            },
            0,
          )
          .to(
            l,
            {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.45,
              ease: "back.out(2)",
            },
            `hit+=${morphAt + 0.05}`,
          )
          .to(
            l,
            { x: 0, y: 0, rotation: 0, duration: 0.8, ease: "expo.inOut" },
            `hit+=${1.0 + i * 0.04}`,
          )
          .call(
            () => l.classList.add("settled"),
            undefined,
            `hit+=${1.4 + i * 0.04}`,
          );
      });

      // 5. settle: waterline + a ripple through the word, then hand over to the iris
      tl.to(line, { scaleX: 1, duration: 0.8, ease: "expo.out" }, "hit+=1.95")
        .to(
          letters,
          {
            y: -fs * 0.09,
            duration: 0.2,
            ease: "sine.out",
            stagger: 0.035,
            yoyo: true,
            repeat: 1,
          },
          "hit+=2.0",
        )
        .set(letters, { clearProps: "filter" })
        .call(
          () => doneRef.current({ x: ix + sr.left, y: iy + sr.top }),
          undefined,
          // the wave ends ~hit+2.8; hold the settled word a beat before the iris opens
          "hit+=3.3",
        );

      word.style.visibility = "visible";
    };

    // measure only once the display font is in, or the letter positions are off
    const ready = document.fonts?.ready ?? Promise.resolve();
    const fallback = setTimeout(build, 1500);
    ready.then(() => {
      clearTimeout(fallback);
      if (!tl) build();
    });

    return () => {
      cancelled = true;
      clearTimeout(fallback);
      tl?.kill();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="intro-splash absolute inset-0 grid place-items-center overflow-hidden"
    >
      <div ref={ringsRef} className="pointer-events-none absolute inset-0" />
      <div ref={liquidRef} className="pointer-events-none absolute inset-0" />
      <div className="relative flex flex-col gap-[0.32em] font-display text-[clamp(2.2rem,8vw,5.5rem)]">
        <h1
          ref={wordRef}
          aria-label={WORD}
          className="invisible m-0 whitespace-nowrap text-[1em] font-light leading-none"
        >
          {WORD.split("").map((c, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={i < 4 ? "splash-ch" : "splash-ch soft"}
            >
              {c}
            </span>
          ))}
        </h1>
        <div ref={lineRef} aria-hidden="true" className="splash-line" />
      </div>
    </div>
  );
}
