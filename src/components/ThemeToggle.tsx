"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

/**
 * ThemeToggle component that switches active styles between light and dark modes.
 * Uses next-themes to sync values and avoids hydration mismatch with a skeleton loader.
 */
export function ThemeToggle() {
  const { resolvedTheme: theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  // one smooth crossfade of the whole page (where supported); otherwise an instant swap
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    document.startViewTransition(() => flushSync(() => setTheme(next)));
  };

  // Avoid hydration mismatch by waiting until client-side mount is complete
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Return a placeholder structure during server rendering
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full border border-current/30 bg-transparent"
        aria-label="Toggle theme"
      >
        <span className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      // hover: the original soft tint; by day the moon turns orange (the ghost variant made it white)
      className="relative overflow-hidden rounded-full border border-current/30 bg-transparent transition-colors hover:bg-white/10 hover:text-primary dark:hover:text-accent-foreground"
      aria-label="Toggle theme"
    >
      {/* Sun icon for light mode indicator */}
      <Sun
        className={`h-[1.2rem] w-[1.2rem] absolute transition-[rotate,scale,opacity] duration-500 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        } text-yellow-400`}
      />

      {/* Moon icon for dark mode indicator */}
      <Moon
        className={`h-[1.2rem] w-[1.2rem] absolute transition-[rotate,scale,opacity] duration-500 ${
          theme !== "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        } text-current`}
      />
    </Button>
  );
}
