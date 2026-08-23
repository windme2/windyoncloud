"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { getLenis, setLenis } from "@/lib/lenis";

/**
 * Inertia scrolling for the whole site. Wheel scrolling is eased by Lenis;
 * touch keeps native momentum. `#anchor` links scroll through it too.
 *
 * On client-side navigation (e.g. opening a case study) the new page starts
 * at the top, or at its `#section` when the link has one ("/#about").
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: { offset: -72 },
    });
    setLenis(lenis);

    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    // The first load is handled by the browser (including its scroll restoration)
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // Wait a frame so the new page is laid out before measuring
    const frame = requestAnimationFrame(() => {
      const lenis = getLenis();
      lenis?.resize();
      const target = window.location.hash ? document.querySelector(window.location.hash) : null;

      if (target instanceof HTMLElement) {
        if (lenis) lenis.scrollTo(target, { offset: -80, immediate: true, force: true });
        else target.scrollIntoView();
      } else if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        window.scrollTo(0, 0);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
