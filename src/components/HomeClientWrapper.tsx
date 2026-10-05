"use client";

import { useCallback, useEffect, useState } from "react";
import { IntroTerminal } from "./IntroTerminal";
import { IntroSplash } from "./IntroSplash";
import { getLenis } from "@/lib/lenis";

interface HomeClientWrapperProps {
  children: React.ReactNode;
}

type Phase = "terminal" | "stage" | "iris" | "done";

/** Seen this session (or reduced motion): skip the intro. */
const introSeen = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  sessionStorage.getItem("windy-intro") === "done";

/**
 * False only while the very first page load hydrates. Client-side navigations back to "/" mount this
 * wrapper with no server HTML to match, so they can read sessionStorage up front and never flash the
 * terminal (the hard-reload case is covered by the data-intro-seen script in the root layout).
 */
let hydrated = false;

/**
 * Opening sequence, once per session (skippable from the Skip button, click, Space or Esc):
 *   1. a short terminal boot,
 *   2. a water drop falls on the wordmark, each letter bursts out as a bead and lines up (IntroSplash),
 *   3. the page opens as a growing circle from the splash point.
 * Skipped for returning visits in the same session and for reduced motion.
 */
export function HomeClientWrapper({ children }: HomeClientWrapperProps) {
  const [phase, setPhase] = useState<Phase>(() =>
    hydrated && introSeen() ? "done" : "terminal",
  );
  // circle centre (the splash point) and the radius it must reach to cover the screen
  const [iris, setIris] = useState({ x: 0, y: 0, r: 2000 });

  const finish = useCallback(() => {
    const root = document.documentElement;
    sessionStorage.setItem("windy-intro", "done");
    delete root.dataset.intro;
    root.style.overflowY = "";
    getLenis()?.start();
    setPhase("done");
  }, []);

  useEffect(() => {
    hydrated = true;
    if (introSeen()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPhase("done");
      return;
    }
    const root = document.documentElement;
    root.dataset.intro = "on";
    // Keep the scrollbar track (overflow-y: scroll) while locking scrolling by hand: switching to
    // overflow:hidden removes the scrollbar, widening the page, and it jumps sideways when the intro ends.
    root.style.overflowY = "scroll";
    getLenis()?.stop();
    const block = (e: Event) => e.preventDefault();
    const blockKeys = (e: KeyboardEvent) => {
      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End"].includes(
          e.key,
        )
      )
        e.preventDefault();
    };
    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", blockKeys);
    return () => {
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", blockKeys);
      delete root.dataset.intro;
      root.style.overflowY = "";
      getLenis()?.start();
    };
  }, []);

  const toStage = useCallback(
    () => setPhase((p) => (p === "terminal" ? "stage" : p)),
    [],
  );

  // The splash calls back once the word has settled: open the page from its impact point
  const toIris = useCallback(({ x, y }: { x: number; y: number }) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    // farthest corner from the centre + a small margin
    setIris({
      x,
      y,
      r: Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) + 40,
    });
    setPhase((p) => (p === "stage" ? "iris" : p));
  }, []);

  useEffect(() => {
    if (phase !== "iris") return;
    const done = setTimeout(finish, 1550);
    return () => clearTimeout(done);
  }, [phase, finish]);

  // Click / Space / Esc skips whatever is playing
  useEffect(() => {
    if (phase === "done") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Escape") {
        e.preventDefault();
        finish();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, finish]);

  return (
    <>
      {phase === "terminal" && (
        <IntroTerminal onComplete={toStage} onSkip={finish} />
      )}

      {phase !== "done" && (
        <div
          aria-hidden="true"
          onClick={finish}
          className="intro-stage fixed inset-0 z-[9998] overflow-hidden"
        >
          {/* The scene is only mounted once the terminal is done, so its timeline starts then */}
          {phase !== "terminal" && <IntroSplash onDone={toIris} />}
        </div>
      )}

      <div
        className={phase === "iris" ? "page-iris" : undefined}
        style={
          phase === "iris"
            ? ({
                "--R": `${iris.r}px`,
                "--ix": `${iris.x}px`,
                "--iy": `${iris.y}px`,
              } as React.CSSProperties)
            : undefined
        }
      >
        {children}
      </div>
    </>
  );
}
