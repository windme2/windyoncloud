"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/icons";
import Image from "next/image";
import { typingTexts } from "@/data/hero";

/**
 * Hero section component.
 * Dynamic typing animation, profile picture neon cyan light glow,
 * social icon brand-colored overlays, and smooth scroll down controls.
 */
export function Hero() {
  const [currentText, setCurrentText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Self-typing logic loop - state updates are deferred inside setTimeout to prevent synchronous rendering cascading warnings
  useEffect(() => {
    const activeRole = typingTexts[roleIndex];
    let typeSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === activeRole.length) {
      typeSpeed = 1500; // Hold full text before deleting
    }

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex === activeRole.length) {
        setIsDeleting(true);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % typingTexts.length);
      } else {
        setCurrentText(
          isDeleting
            ? activeRole.substring(0, charIndex - 1)
            : activeRole.substring(0, charIndex + 1),
        );
        setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-32 md:pt-36 pb-20 md:pb-24 relative overflow-hidden bg-background dark:bg-black"
    >
      {/* Background soft ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/10 w-72 h-72 md:w-96 md:h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow -z-10" />
      <div className="absolute bottom-1/4 right-1/10 w-72 h-72 md:w-96 md:h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-slow -z-10" />

      <div className="container max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Profile Image with neon sky-blue/white pulsing light */}
        <div className="order-1 md:order-2 md:w-1/2 flex justify-center md:justify-end reveal delay-200">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            {/* Blinking Cyan Neon Glow Layer */}
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 dark:to-white rounded-full blur-lg opacity-75 animate-pulse" />
            <div className="relative w-full h-full rounded-full border-4 border-white dark:border-neutral-950 overflow-hidden shadow-2xl bg-neutral-900">
              <Image
                src="/assets/images/hero-1.webp"
                alt="Intouch Charoenphon Profile"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 256px, 384px"
              />
            </div>
          </div>
        </div>

        {/* Text Details Section */}
        <div className="order-2 md:order-1 md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
          <div className="reveal space-y-2">
            <h2 className="font-semibold text-lg md:text-xl text-slate-700 dark:text-slate-300">
              Hello, I&apos;m
            </h2>

            {/* Blurry glow name backdrop container */}
            <div className="relative inline-block">
              <div className="absolute -inset-x-8 -inset-y-3 bg-gradient-to-r from-orange-500/10 via-rose-500/15 to-cyan-500/10 blur-3xl opacity-75 dark:opacity-90 pointer-events-none -z-10 rounded-full" />
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-transparent bg-clip-text animate-gradient-text shadow-text select-none">
                INTOUCH CHAROENPHON
              </h1>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl font-medium text-muted-foreground mt-2 min-h-[2.5rem] sm:min-h-[2rem] whitespace-nowrap overflow-hidden text-ellipsis">
              {currentText}
              <span className="animate-pulse text-orange-500 font-bold">|</span>
            </p>
          </div>

          {/* Available for Work Badge */}
          <div className="reveal delay-100 mt-3">
            <div className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-default">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              Available for Work
            </div>
          </div>

          <p className="reveal delay-200 text-lg max-w-2xl text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            A hybrid developer merging logistics operations and IT
            infrastructure.
            <br />
            Fusing system automation, database management, and process
            efficiency.
          </p>

          <div className="reveal delay-300 flex flex-wrap justify-center md:justify-start gap-4">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 rounded-lg border-0 cursor-pointer"
            >
              <a href="#contact">Contact Me</a>
            </Button>

            {/* Download CV button - dark mode theme responsive colors */}
            <Button
              variant="ghost"
              asChild
              size="lg"
              className="transition-all duration-300 shadow-md 
              bg-white dark:bg-zinc-900 
              text-gray-800 dark:text-white 
              hover:bg-orange-500 hover:text-white hover:border-orange-500 hover:shadow-orange-500/20
              dark:hover:bg-orange-600 dark:hover:border-orange-600 dark:hover:shadow-orange-600/30
              border border-black/10 dark:border-white/10
              hover:scale-105 rounded-lg cursor-pointer"
            >
              <a
                href="/assets/documents/CV_Intouch_Charoenphon.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Download size={18} />
                <span>Download CV</span>
              </a>
            </Button>
          </div>

          {/* Social Icons Links - Brand specific colors override to prevent theme flash */}
          <div className="reveal delay-400 flex gap-4 flex-wrap">
            {/* GitHub */}
            <Button
              variant="outline"
              size="icon"
              asChild
              className="group relative rounded-full border border-border bg-background overflow-hidden
               transition-all duration-500 hover:shadow hover:bg-transparent hover:border-[#24292e] hover:text-white
               focus-visible:ring-2 focus-visible:ring-[#24292e] focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
            >
              <a
                href="https://github.com/windme2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid place-items-center w-10 h-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0
                   transition-transform duration-500 ease-out will-change-transform"
                  style={{ backgroundColor: "#24292e" }}
                />
                <Github className="relative z-10 h-5 w-5 text-foreground transition-colors duration-500 group-hover:text-white" />
              </a>
            </Button>

            {/* LinkedIn */}
            <Button
              variant="outline"
              size="icon"
              asChild
              className="group relative rounded-full border border-border bg-background overflow-hidden
               transition-all duration-500 hover:shadow hover:bg-transparent hover:border-[#0a66c2] hover:text-white
               focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
            >
              <a
                href="https://linkedin.com/in/intouch-charoenphon-a89b21207/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid place-items-center w-10 h-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0
                   transition-transform duration-500 ease-out will-change-transform"
                  style={{ backgroundColor: "#0a66c2" }}
                />
                <Linkedin className="relative z-10 h-5 w-5 text-foreground transition-colors duration-500 group-hover:text-white" />
              </a>
            </Button>

            {/* Instagram */}
            <Button
              variant="outline"
              size="icon"
              asChild
              className="group relative rounded-full border border-border bg-background overflow-hidden
               transition-all duration-500 hover:shadow hover:bg-transparent hover:border-[#d6249f] hover:text-white
               focus-visible:ring-2 focus-visible:ring-pink-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
            >
              <a
                href="https://instagram.com/withcrpn/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid place-items-center w-10 h-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0
                   transition-transform duration-500 ease-out will-change-transform"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
                  }}
                />
                <Instagram className="relative z-10 h-5 w-5 text-foreground transition-colors duration-500 group-hover:text-white" />
              </a>
            </Button>

            {/* Email */}
            <Button
              variant="outline"
              size="icon"
              asChild
              className="group relative rounded-full border border-border bg-background overflow-hidden
               transition-all duration-500 hover:shadow hover:bg-transparent hover:border-[#ea4335] hover:text-white
               focus-visible:ring-2 focus-visible:ring-[#ea4335] focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
            >
              <a
                href="mailto:intouch.crp@gmail.com"
                aria-label="Email"
                className="grid place-items-center w-10 h-10"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0
                   transition-transform duration-500 ease-out will-change-transform"
                  style={{ backgroundColor: "#ea4335" }}
                />
                <Mail className="relative z-10 h-5 w-5 text-foreground transition-colors duration-500 group-hover:text-white" />
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator - uses custom high-fidelity jump-and-flash scroll-down animation */}
        <div className="reveal delay-500 absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-scroll-down hidden md:block">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById("about");
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
            }}
            className="text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-all duration-300 flex flex-col items-center gap-1 group cursor-pointer"
          >
            <span className="text-[10px] uppercase tracking-wider font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Scroll Down
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="transition-transform duration-300"
              style={{ filter: "drop-shadow(0 0 6px currentColor)" }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
