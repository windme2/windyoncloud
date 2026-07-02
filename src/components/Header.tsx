"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Header navigation bar component.
 * Dynamic styling based on scroll state, scroll offset detection,
 * custom smooth click scrolling, and toggle mobile drawer menu.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  // Track page scroll to toggle background blur and highlight active section link
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section highlighters based on scroll coordinates
      const sections = document.querySelectorAll("section[id]");
      const scrollY = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = (current as HTMLElement).offsetHeight;
        const sectionId = current.getAttribute("id") || "";
        const sectionTop = (current as HTMLElement).offsetTop - 120; // Safe landing buffer

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveLink(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Custom pixel-perfect smooth scroll click handler with header offset landing buffer
  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out",
        isScrolled || isMenuOpen
          ? "bg-background py-4 shadow-md border-b border-border/10"
          : "bg-transparent py-6",
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="text-xl md:text-2xl font-bold tracking-tighter relative hover:text-foreground transition-colors hover:scale-105 transform group cursor-pointer"
          onClick={(e) => handleScrollTo(e, "#home")}
        >
          <span className="relative z-10">windyoncloud</span>
          <span className="text-orange-500 ml-0.5">.</span>
          <span className="text-muted-foreground">me</span>
          <span className="absolute w-full scale-x-0 h-0.5 bottom-0 left-0 bg-orange-500 origin-bottom-right transition-transform duration-300 group-hover:scale-x-100 group-hover:origin-bottom-left"></span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={cn(
                "hover:text-foreground font-medium transition-colors hover:scale-105 transform relative cursor-pointer",
                activeLink === link.href.substring(1)
                  ? "text-foreground"
                  : "text-muted-foreground",
                "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-orange-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left",
              )}
            >
              {link.name}
            </a>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation controls */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 shadow-md rounded-md bg-muted/30 border border-border/10"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-foreground"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer drop menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-black shadow-lg animate-fade-in border-b border-border/15">
          <div className="container max-w-7xl mx-auto py-4 flex flex-col space-y-4 px-4 md:px-8 text-left">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "font-medium transition-all py-2 hover:pl-2 hover:text-orange-500 dark:hover:text-orange-500",
                  activeLink === link.href.substring(1)
                    ? "text-orange-500 dark:text-orange-500 font-bold"
                    : "text-slate-600 dark:text-slate-400",
                )}
                onClick={(e) => {
                  setIsMenuOpen(false);
                  handleScrollTo(e, link.href);
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
