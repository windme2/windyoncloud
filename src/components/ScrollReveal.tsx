"use client";

import { useEffect, useRef } from "react";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Document-space top of an element, ignoring transforms (offsetTop chain). */
const docTop = (el: HTMLElement) => {
  let y = 0;
  let node: HTMLElement | null = el;
  while (node) {
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return y;
};

interface Item {
  el: HTMLElement;
  speed: number; // data-speed:    translateY = scrollY * speed
  parallax: number; // data-parallax: translateY = viewport-centre distance * -parallax
  scrollx: number; // data-scrollx:  translateX = viewport-centre distance * -scrollx
  wrap: number; // data-wrap:     looping translateY (clouds)
  mouse: [number, number]; // data-mouse="x,y": pointer parallax in px
  progress: boolean; // data-progress: sets --p (0..1)
  top: number;
  height: number;
  x: number; // current (lerped) values
  y: number;
}

/**
 * Scroll + pointer motion for the whole page. One rAF loop, no layout reads
 * per frame (geometry is measured on resize), values are lerped for silky
 * motion, and everything is applied with the `translate` property.
 *
 *  - `.reveal`, `.reveal-3d`, `.reveal-clip` get `.reveal-visible` in view
 *    (a MutationObserver also catches elements added later, e.g. filters)
 *  - `data-speed`, `data-parallax`, `data-scrollx`, `data-wrap`, `data-mouse`
 *  - `data-progress`  sets `--p`
 *  - `data-stack`     sticky card stack: sets `--cover` on each card (0..1)
 *  - `data-tilt`      3D tilt following the pointer
 *  - `data-spotlight` sets --sx/--sy for a cursor-following highlight
 * Also renders the thin scroll-progress bar. Honors prefers-reduced-motion.
 */
export function ScrollReveal() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const REVEAL = ".reveal, .reveal-3d, .reveal-clip";

    // ── reveal ──
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );
    const seen = new WeakSet<Element>();
    const watch = (root: ParentNode) => {
      root.querySelectorAll(REVEAL).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (reduce) el.classList.add("reveal-visible");
        else io.observe(el);
      });
    };
    watch(document);

    // ── motion items ──
    let items: Item[] = [];
    let stacks: { cards: HTMLElement[]; tops: number[]; heights: number[] }[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let dirty = true;
    let running = false;
    let vh = window.innerHeight;
    let stackEnabled = false;
    const layer = (k: string) => document.querySelector<HTMLElement>(`[data-sky="${k}"]`);
    const sky = layer("m") && layer("a") && layer("s")
      ? { m: layer("m")!, a: layer("a")!, s: layer("s")! }
      : null;

    const collect = () => {
      const nodes = document.querySelectorAll<HTMLElement>(
        "[data-speed],[data-parallax],[data-scrollx],[data-wrap],[data-mouse],[data-progress]",
      );
      const prev = new Map(items.map((i) => [i.el, i]));
      items = Array.from(nodes).map((el) => {
        const old = prev.get(el);
        const [mx, my] = (el.dataset.mouse ?? "0,0").split(",").map(parseFloat);
        return {
          el,
          speed: parseFloat(el.dataset.speed ?? "0"),
          parallax: parseFloat(el.dataset.parallax ?? "0"),
          scrollx: parseFloat(el.dataset.scrollx ?? "0"),
          wrap: parseFloat(el.dataset.wrap ?? "0"),
          mouse: [mx || 0, my || 0],
          progress: el.hasAttribute("data-progress"),
          top: 0,
          height: 0,
          x: old?.x ?? 0,
          y: old?.y ?? 0,
        };
      });
    };

    const measure = () => {
      vh = window.innerHeight;
      stackEnabled = window.matchMedia("(min-width: 768px) and (min-height: 760px)").matches;
      items.forEach((it) => {
        it.top = docTop(it.el);
        it.height = it.el.offsetHeight;
      });

      // sticky card stacks: natural (un-stuck) tops from the parent + sizes
      const groups = new Map<HTMLElement, HTMLElement[]>();
      document.querySelectorAll<HTMLElement>("[data-stack]").forEach((card) => {
        const parent = card.parentElement as HTMLElement;
        groups.set(parent, [...(groups.get(parent) ?? []), card]);
      });
      stacks = Array.from(groups, ([parent, cards]) => {
        let y = docTop(parent);
        const tops: number[] = [];
        const heights: number[] = [];
        cards.forEach((card) => {
          const cs = getComputedStyle(card);
          y += parseFloat(cs.marginTop);
          tops.push(y);
          heights.push(card.offsetHeight);
          y += card.offsetHeight + parseFloat(cs.marginBottom);
        });
        return { cards, tops, heights };
      });
      dirty = true;
      kick();
    };

    const apply = (): boolean => {
      const sy = window.scrollY;
      let moving = false;

      const max = document.documentElement.scrollHeight - vh;
      const progress = max > 0 ? clamp(sy / max) : 0;
      if (barRef.current) barRef.current.style.scale = `${progress} 1`;
      if (sky) {
        // morning → afternoon → sunset
        const morning = clamp(1 - progress * 2.2);
        const sunset = clamp(progress * 2.2 - 1.2);
        sky.m.style.opacity = "1";
        sky.a.style.opacity = String(clamp(1 - morning) * (1 - sunset));
        sky.s.style.opacity = String(sunset);
        sky.m.style.opacity = String(Math.max(morning, 0));
      }

      for (const it of items) {
        // targets
        let ty = sy * it.speed + it.mouse[1] * mouseY;
        let tx = it.mouse[0] * mouseX;
        if (it.parallax) ty += -(it.top + it.height / 2 - (sy + vh / 2)) * it.parallax;
        if (it.scrollx) tx += -(it.top + it.height / 2 - (sy + vh / 2)) * it.scrollx;

        if (it.wrap) {
          const span = vh + 500;
          // keep each cloud's starting height, wrap inside the viewport,
          // and skip the lerp (a wrap-around teleport must be instant)
          const raw = it.top - sy * it.wrap;
          const wrapped = ((((raw + 250) % span) + span) % span) - 250;
          it.el.style.translate = `0 ${(wrapped - it.top).toFixed(1)}px`;
          continue;
        }

        // lerp for silky motion
        const dx = tx - it.x;
        const dy = ty - it.y;
        if (Math.abs(dx) > 0.05 || Math.abs(dy) > 0.05) {
          it.x += dx * 0.12;
          it.y += dy * 0.12;
          moving = true;
        } else {
          it.x = tx;
          it.y = ty;
        }
        if (it.speed || it.parallax || it.scrollx || it.mouse[0] || it.mouse[1]) {
          it.el.style.translate = `${it.x.toFixed(2)}px ${it.y.toFixed(2)}px`;
        }
        if (it.progress) {
          it.el.style.setProperty("--p", clamp((sy + vh * 0.7 - it.top) / it.height).toFixed(3));
        }
      }

      // sticky stack: how far each card is covered by the next one
      for (const group of stacks) {
        group.cards.forEach((card, i) => {
          let cover = 0;
          if (stackEnabled && i < group.cards.length - 1) {
            const nextTop = group.tops[i + 1];
            cover = clamp((sy + vh - nextTop) / (vh * 0.86));
          }
          card.style.setProperty("--cover", cover.toFixed(3));
        });
      }
      return moving;
    };

    function kick() {
      if (running || reduce) return;
      running = true;
      requestAnimationFrame(loop);
    }
    function loop() {
      const moving = apply();
      if (moving || dirty) {
        dirty = false;
        requestAnimationFrame(loop);
      } else {
        running = false;
      }
    }

    const onScroll = () => {
      dirty = true;
      kick();
    };
    const onPointerMove = (e: PointerEvent) => {
      if (reduce || e.pointerType === "touch") return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      dirty = true;
      kick();
      tilt(e);
      spotlight(e);
    };

    // ── spotlight: expose the pointer position inside the hovered card ──
    const spotlight = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
    };

    // ── tilt (event delegation) ──
    let tilted: HTMLElement | null = null;
    const resetTilt = () => {
      if (tilted) tilted.style.transform = "";
      tilted = null;
    };
    const tilt = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-tilt]") ?? null;
      if (el !== tilted) resetTilt();
      if (!el) return;
      tilted = el;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${(px * 7).toFixed(2)}deg) rotateX(${(-py * 7).toFixed(2)}deg)`;
    };

    // New nodes (filter / tab switches): reveal them and re-measure
    let remeasure = 0;
    const mo = new MutationObserver((mutations) => {
      let touched = false;
      mutations.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (n.nodeType !== 1) return;
          const el = n as Element;
          touched = true;
          if (el.matches(REVEAL) && !seen.has(el)) {
            seen.add(el);
            if (reduce) el.classList.add("reveal-visible");
            else io.observe(el);
          }
          watch(el);
        }),
      );
      if (touched) {
        cancelAnimationFrame(remeasure);
        remeasure = requestAnimationFrame(() => {
          collect();
          measure();
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Re-measure when layout changes size (images, fonts, tabs)
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(remeasure);
      remeasure = requestAnimationFrame(measure);
    });
    ro.observe(document.body);

    collect();
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", resetTilt);

    return () => {
      io.disconnect();
      mo.disconnect();
      ro.disconnect();
      cancelAnimationFrame(remeasure);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", resetTilt);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="scroll-progress pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
      style={{ scale: "0 1" }}
    />
  );
}
