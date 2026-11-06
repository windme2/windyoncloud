"use client";

import { useLayoutEffect, useRef } from "react";

/**
 * A highlight that slides to the active tab. Put `barRef` on the (position: relative) container,
 * `pillRef` on an absolutely positioned span inside it (class `filter-pill`), and `data-pill-key={key}`
 * on every tab. The pill takes the active tab's exact box and re-measures whenever any tab changes
 * size (web font arriving, wrapping, breakpoint), so it never sits off the button's edge.
 * Give the active tab `pill-on` (globals.css): its border turns the pill's colour once the pill has
 * arrived, so the edge is drawn by the button itself and no seam can show.
 */
export function useSlidingPill(activeKey: string) {
  const barRef = useRef<HTMLDivElement & HTMLUListElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const placed = useRef(false);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const pill = pillRef.current;
    if (!bar || !pill) return;

    const place = () => {
      const btn = bar.querySelector<HTMLElement>(
        `[data-pill-key="${CSS.escape(activeKey)}"]`,
      );
      if (!btn) return;
      // sub-pixel exact (offsetLeft/Width round to whole px, which showed as a sliver on retina);
      // the bar's own translate (reveal slide-in) cancels out of the difference
      const br = bar.getBoundingClientRect();
      const r = btn.getBoundingClientRect();
      const x = r.left - br.left - bar.clientLeft;
      const y = r.top - br.top - bar.clientTop;
      const first = !placed.current;
      // first placement: appear in place instead of sliding in from the corner
      if (first) pill.style.transition = "none";
      pill.style.width = `${r.width}px`;
      pill.style.height = `${r.height}px`;
      pill.style.translate = `${x}px ${y}px`;
      pill.style.opacity = "1";
      if (first) {
        placed.current = true;
        void pill.offsetWidth; // commit before turning the transition back on
        pill.style.transition = "";
      }
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(bar);
    bar.querySelectorAll("[data-pill-key]").forEach((b) => ro.observe(b));
    document.fonts?.ready.then(place);
    return () => ro.disconnect();
  }, [activeKey]);

  return { barRef, pillRef };
}
