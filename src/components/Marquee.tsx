"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Wrapper for the CSS marquee (.marquee / .marquee-track in globals.css).
 * Instead of `animation-play-state: paused` (an instant stop that reads as a
 * jolt), hovering or focusing eases the track's playback rate down to 0 and
 * back up again, so the strip glides to a halt.
 */
export function Marquee({
  className,
  style,
  children,
}: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const track = el?.querySelector<HTMLElement>(".marquee-track");
    if (!el || !track) return;

    let frame = 0;
    let rate = 1;
    let target = 1;
    let hovered = false;
    let focused = false;

    const animation = () => track.getAnimations().find((a) => a instanceof CSSAnimation);

    const tick = () => {
      const anim = animation();
      if (!anim) return; // phones / reduced motion: no animation, nothing to ease
      rate += (target - rate) * 0.12;
      if (Math.abs(target - rate) < 0.005) rate = target;
      anim.playbackRate = rate;
      if (rate !== target) frame = requestAnimationFrame(tick);
    };
    const ease = () => {
      target = hovered || focused ? 0 : 1;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };

    const enter = () => ((hovered = true), ease());
    const leave = () => ((hovered = false), ease());
    const focusIn = () => ((focused = true), ease());
    const focusOut = (e: FocusEvent) => {
      if (el.contains(e.relatedTarget as Node | null)) return;
      focused = false;
      ease();
    };

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focusin", focusIn);
    el.addEventListener("focusout", focusOut);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focusin", focusIn);
      el.removeEventListener("focusout", focusOut);
    };
  }, []);

  return (
    <div ref={root} className={className} style={style}>
      {children}
    </div>
  );
}
