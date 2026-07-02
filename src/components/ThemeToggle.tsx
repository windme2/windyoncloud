"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * ThemeToggle component that switches active styles between light and dark modes.
 * Uses next-themes to sync values and avoids hydration mismatch with a skeleton loader.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting until client-side mount is complete
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Return a placeholder structure during server rendering
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full bg-muted/50 shadow-md"
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
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full bg-muted/50 hover:bg-primary/10 transition-colors overflow-hidden relative shadow-md dark:shadow-cyan-950/20"
      aria-label="Toggle theme"
    >
      {/* Cyan-themed hover background overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-300 to-sky-300 dark:from-cyan-900 dark:to-sky-900 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>

      {/* Sun icon for light mode indicator */}
      <Sun
        className={`h-[1.2rem] w-[1.2rem] absolute transition-all duration-500 ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        } text-yellow-500`}
      />

      {/* Moon icon for dark mode indicator */}
      <Moon
        className={`h-[1.2rem] w-[1.2rem] absolute transition-all duration-500 ${
          theme !== "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        } text-orange-500`}
      />
    </Button>
  );
}
