"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
    <Button
      variant="outline"
      size="icon"
      onClick={scrollToTop}
      aria-label="Go to top"
      className={`fixed bottom-8 right-8 z-50 rounded-full shadow-lg transition-all duration-500 ${
        scrolled
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      } bg-white dark:bg-gray-900 text-gray-800 dark:text-white
      hover:bg-gradient-to-r hover:from-orange-500 hover:to-rose-500 hover:text-white border-0
      dark:hover:bg-gradient-to-r dark:hover:from-orange-500 dark:hover:to-rose-500
      hover:shadow-xl hover:shadow-orange-500/25 dark:hover:shadow-orange-950/30
      hover:scale-105`}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
