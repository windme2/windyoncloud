"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/data/navigation";
import { getLenis } from "@/lib/lenis";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Header navigation bar component.
 * Dynamic styling based on scroll state, scroll offset detection,
 * custom smooth click scrolling, and toggle mobile drawer menu.
 * On sub pages (/projects, case studies) the same menu links back to the
 * home page sections, with Projects marked as current.
 */
export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [activeLink, setActiveLink] = useState(
    isHome
      ? "home"
      : pathname.startsWith("/projects")
        ? "projects"
        : pathname.startsWith("/services")
          ? "services"
          : "",
  );

  // "#about" scrolls in place on the home page, and becomes "/#about" elsewhere
  const resolve = (href: string) =>
    href.startsWith("/")
      ? href
      : isHome
        ? href
        : href === "#home"
          ? "/"
          : `/${href}`;

  // Lock page scroll while the full-screen menu is open
  useEffect(() => {
    const lenis = getLenis();
    if (isMenuOpen) {
      lenis?.stop();
      document.documentElement.classList.add("menu-open");
    } else {
      lenis?.start();
      document.documentElement.classList.remove("menu-open");
    }
    return () => {
      lenis?.start();
      document.documentElement.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  // Close if the viewport grows past the mobile breakpoint
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => mq.matches && setIsMenuOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  // Desktop capsule: --hp eases toward the scroll progress (0 at the top, 1 after ~200px) every frame,
  // so wheel steps don't jump. Only a background layer and two translates read it (see globals.css),
  // never width or padding, so nothing re-lays out while it morphs. Phones keep a fixed capsule.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let cur = -1;
    let raf = 0;

    // where the capsule's edges land, and how far the logo / nav slide in to sit inside it
    const measure = () => {
      const w = header.clientWidth;
      const capX = Math.max(16, (w - 1056) / 2); // capsule: max 66rem wide, 16px gutter at minimum
      // the container itself never moves, so its padded edges are where the logo / nav rest
      const box = header.querySelector<HTMLElement>(".site-bar > .container");
      if (!box) return;
      const r = box.getBoundingClientRect();
      const cs = getComputedStyle(box);
      const left = r.left + parseFloat(cs.paddingLeft);
      const right = w - r.right + parseFloat(cs.paddingRight);
      // whole pixels: a half-pixel offset makes hovered items snap by ~0.5px when they get their own layer
      header.style.setProperty("--cap-x", `${Math.round(capX)}px`);
      header.style.setProperty(
        "--shift-l",
        `${Math.round(capX + 32 - left)}px`,
      );
      header.style.setProperty(
        "--shift-r",
        `${Math.round(capX + 16 - right)}px`,
      );
    };

    const target = () => Math.min(1, Math.max(0, (window.scrollY - 10) / 190));
    const tick = () => {
      const t = target();
      cur = cur < 0 || reduce ? t : cur + (t - cur) * 0.18;
      if (Math.abs(t - cur) < 0.001) cur = t;
      header.style.setProperty("--hp", cur.toFixed(4));
      raf = cur === t ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    measure();
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Track page scroll to toggle background blur and highlight active section link
  useEffect(() => {
    const handleScroll = () => {
      if (!isHome) return;

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

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

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
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(element, { offset: -80, duration: 1.4 });
        } else {
          const top =
            element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }
  };

  const cv = "/assets/documents/CV_Intouch_Charoenphon.pdf";

  return (
    <>
      <header
        ref={headerRef}
        className="site-header fixed top-0 left-0 w-full z-[60] text-foreground"
      >
        {/* Desktop: the plain transparent bar at the top; with scroll a glass capsule (.site-bar::before)
            closes in behind it. Phones: always a capsule, also while the menu is open. */}
        <div className="site-bar">
          <div className="container max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              id="site-logo"
              href={resolve("#home")}
              className="bar-start font-display text-lg font-light tracking-wide cursor-pointer"
              onClick={(e) => {
                setIsMenuOpen(false);
                handleScrollTo(e, resolve("#home"));
              }}
            >
              windyoncloud
            </Link>

            {/* Desktop Navigation */}
            <nav className="bar-end hidden md:flex items-center gap-5 lg:gap-8">
              {navLinks.map((link) =>
                // a link to its own page (Services) is a pill, apart from the section links
                link.href.startsWith("/") ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    aria-current={
                      activeLink === link.href.substring(1) ? "page" : undefined
                    }
                    className={cn(
                      "group inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[10px] font-medium uppercase tracking-[0.25em] transition-colors duration-300",
                      activeLink === link.href.substring(1)
                        ? "border-primary bg-primary text-white dark:text-primary-foreground"
                        : "border-current/30 hover:border-primary hover:bg-primary hover:text-white dark:hover:text-primary-foreground",
                    )}
                  >
                    {link.name}
                    <ArrowUpRight
                      size={12}
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                ) : (
                  <Link
                    key={link.name}
                    href={resolve(link.href)}
                    onClick={(e) => handleScrollTo(e, resolve(link.href))}
                    className={cn(
                      "text-[10px] font-medium uppercase tracking-[0.25em] transition-opacity relative cursor-pointer",
                      // tablet widths: the logo already goes home, so "Home" makes room for the rest
                      link.href === "#home" && "md:max-lg:hidden",
                      activeLink === link.href.substring(1)
                        ? "opacity-100"
                        : "opacity-80 hover:opacity-100",
                      "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-px after:-bottom-1 after:left-0 after:bg-current after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100",
                    )}
                  >
                    {link.name}
                  </Link>
                ),
              )}
              <ThemeToggle />
            </nav>

            {/* Mobile controls */}
            <div className="flex items-center space-x-3 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen((open) => !open)}
                className="relative grid h-10 w-10 place-items-center rounded-full border"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <span
                  className={cn(
                    "absolute h-px w-4 bg-current transition-transform duration-500 ease-out",
                    isMenuOpen ? "rotate-45" : "-translate-y-[3px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-4 bg-current transition-transform duration-500 ease-out",
                    isMenuOpen ? "-rotate-45" : "translate-y-[3px]",
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu: full screen, opens as a circle from the button and closes back into it */}
      <div
        id="mobile-menu"
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        className="fixed inset-0 z-[55] md:hidden bg-gradient-to-b from-[#bcdcff] to-[#f1f8ff] dark:from-[#02030f] dark:to-[#14135a] transition-[clip-path] duration-[750ms] ease-[cubic-bezier(0.76,0,0.24,1)]"
        style={{
          // centre of the menu button: right padding 1rem + half of 2.5rem; top = header padding + half
          clipPath: `circle(${isMenuOpen ? "150%" : "0%"} at calc(100% - 41px) 41px)`,
        }}
      >
        <nav className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <li key={link.name} className="overflow-hidden">
                <Link
                  href={resolve(link.href)}
                  onClick={(e) => {
                    setIsMenuOpen(false);
                    handleScrollTo(e, resolve(link.href));
                  }}
                  className={cn(
                    "group flex items-center py-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0",
                  )}
                  style={{
                    transitionDelay: isMenuOpen ? `${250 + i * 60}ms` : "0ms",
                  }}
                >
                  {/* hover / press effect lives on the inner elements so the entrance stagger never delays it.
                      The current page gets none: it is already marked and there is nothing to point at. */}
                  {(() => {
                    const current = activeLink === link.href.substring(1);
                    return (
                      <>
                        <span
                          className={cn(
                            "w-10 shrink-0 font-mono text-[10px] tracking-[0.25em] transition-colors duration-300",
                            current
                              ? "text-primary-ink"
                              : "text-muted-foreground group-hover:text-primary-ink group-active:text-primary-ink",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-5xl font-extralight tracking-tight transition-colors duration-300 ease-out sm:text-6xl",
                            current
                              ? "text-primary-ink"
                              : "group-hover:text-primary-ink group-active:text-primary-ink",
                          )}
                        >
                          {link.name}
                        </span>
                        {link.href.startsWith("/") && (
                          <ArrowUpRight
                            size={28}
                            strokeWidth={1.25}
                            aria-hidden="true"
                            className={cn(
                              "ml-2 self-start mt-2 transition-colors duration-300",
                              current
                                ? "text-primary-ink"
                                : "text-muted-foreground group-hover:text-primary-ink",
                            )}
                          />
                        )}
                      </>
                    );
                  })()}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "flex flex-wrap items-center gap-3 transition-all duration-700",
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: isMenuOpen ? "650ms" : "0ms" }}
          >
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-6 py-3 text-[10px] font-medium uppercase tracking-[0.25em] text-background"
            >
              <Download size={13} /> Download CV
            </a>
            <a
              href="mailto:intouch.crp@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[10px] font-medium uppercase tracking-[0.25em]"
            >
              <Mail size={13} /> Email
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
