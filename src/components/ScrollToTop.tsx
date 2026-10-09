"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Go to top"
      className={`fixed bottom-8 right-6 z-50 grid h-12 w-12 cursor-pointer place-items-center rounded-full border bg-background/70 text-foreground backdrop-blur transition-all duration-500 hover:border-primary hover:bg-primary hover:text-primary-foreground dark:hover:bg-white/15 dark:hover:text-foreground md:right-8 ${
        scrolled
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-10 opacity-0"
      }`}
    >
      <ArrowUp className="h-4 w-4" strokeWidth={1.5} />
    </button>
  );
}
