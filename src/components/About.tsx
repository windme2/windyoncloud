"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Group, Crown, Puzzle } from "lucide-react";
import Image from "next/image";

/**
 * About component containing personal stats, key attributes,
 * and an interactive infinite horizontal scrolling marquee showing past work experience.
 */
export function About() {
  const [cardOrder, setCardOrder] = useState([2, 1, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bringToFront = (id: number) => {
    setCardOrder((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [...filtered, id];
    });
  };

  const getCardStyle = (cardId: number) => {
    const position = cardOrder.indexOf(cardId); // 0 (back) to 2 (front)

    let zIndex = 10;
    let transform = "";
    let opacity = 1;

    if (position === 2) {
      zIndex = 30;
      transform = isHovered
        ? isMobile
          ? "rotate(0deg) translate(0px, -10px) scale(1.02)"
          : "rotate(0deg) translate(0px, -20px) scale(1.04)"
        : "rotate(0deg) translate(0px, 0px)";
      opacity = 1;
    } else if (position === 1) {
      zIndex = 20;
      transform = isHovered
        ? isMobile
          ? "rotate(-8deg) translate(-25px, 8px)"
          : "rotate(-12deg) translate(-50px, 15px)"
        : isMobile
          ? "rotate(-4deg) translate(-10px, 5px)"
          : "rotate(-6deg) translate(-20px, 10px)";
      opacity = isHovered ? 1 : 0.9;
    } else {
      zIndex = 10;
      transform = isHovered
        ? isMobile
          ? "rotate(8deg) translate(25px, -8px)"
          : "rotate(12deg) translate(50px, -15px)"
        : isMobile
          ? "rotate(4deg) translate(10px, -5px)"
          : "rotate(6deg) translate(20px, -10px)";
      opacity = isHovered ? 1 : 0.8;
    }

    return {
      zIndex,
      transform,
      opacity,
    };
  };

  // Infinite marquee slides representing the developer's journey (6 distinct images/roles)
  const slides = [
    {
      image: "/assets/images/about.webp",
      role: "-",
      company: "-",
      year: "-",
      description: "-",
    },
    {
      image: "/assets/images/hero.webp",
      role: "-",
      company: "-",
      year: "-",
      description: "-",
    },
    {
      image: "/assets/images/about.webp",
      role: "-",
      company: "-",
      year: "-",
      description: "-",
    },
    {
      image: "/assets/images/hero.webp",
      role: "-",
      company: "-",
      year: "-",
      description: "-",
    },
    {
      image: "/assets/images/about.webp",
      role: "-",
      company: "-",
      year: "-",
      description: "-",
    },
    {
      image: "/assets/images/hero.webp",
      role: "-",
      company: "-",
      year: "-",
      description: "-",
    },
  ];

  // Double the slides array to ensure seamless infinite looping transition
  const marqueeSlides = [...slides, ...slides];

  return (
    <section
      id="about"
      className="py-16 md:py-24 relative bg-background dark:bg-gray-950 scroll-mt-20"
    >
      <div className="container">
        {/* About Me Section Header */}
        <div className="max-w-8xl mx-auto mb-16">
          <h2 className="reveal text-3xl md:text-4xl font-bold mb-6 text-center text-slate-900 dark:text-white">
            About <span className="text-orange-500">Me</span>
          </h2>

          {/* Two Column Layout: Image + Text Description */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Interactive Fanned-out Card Stack (4 Cards) */}
            <div className="reveal delay-200 mt-12 mb-16 lg:mb-0 flex justify-center">
              <div
                className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[380px] md:h-[380px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Ambient glow background */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl blur-2xl transition-[filter] duration-500 -z-30"></div>

                {/* Card 0: about-1.webp */}
                <div
                  style={getCardStyle(0)}
                  onClick={() => bringToFront(0)}
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl select-none cursor-pointer transition-all duration-500 ease-out bg-zinc-900"
                >
                  <Image
                    src="/assets/images/about-1.webp"
                    alt="Developer Workspace"
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 380px"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white text-left pointer-events-none">
                    <p className="text-[10px] uppercase tracking-wider text-orange-400 font-bold">
                      MYSPACE
                    </p>
                    <p className="text-xs sm:text-sm font-bold">
                      Where code meets operational logic.
                    </p>
                  </div>
                </div>

                {/* Card 1: about-2.webp */}
                <div
                  style={getCardStyle(1)}
                  onClick={() => bringToFront(1)}
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl select-none cursor-pointer transition-all duration-500 ease-out bg-zinc-900"
                >
                  <Image
                    src="/assets/images/about-2.webp"
                    alt="IT Infrastructure"
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 380px"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white text-left pointer-events-none">
                    <p className="text-[10px] uppercase tracking-wider text-orange-400 font-bold">
                      MYSPACE
                    </p>
                    <p className="text-xs sm:text-sm font-bold">
                      Stability built on solid infrastructure.
                    </p>
                  </div>
                </div>

                {/* Card 2: about-3.webp */}
                <div
                  style={getCardStyle(2)}
                  onClick={() => bringToFront(2)}
                  className="absolute inset-0 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 shadow-xl select-none cursor-pointer transition-all duration-500 ease-out bg-zinc-900"
                >
                  <Image
                    src="/assets/images/about-3.webp"
                    alt="Automation Workflow"
                    fill
                    className="object-cover pointer-events-none"
                    sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 380px"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-4 text-white text-left pointer-events-none">
                    <p className="text-[10px] uppercase tracking-wider text-orange-400 font-bold">
                      MYSPACE
                    </p>
                    <p className="text-xs sm:text-sm font-bold">
                      Efficiency through automated workflows.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Overview stats & text */}
            <div className="reveal delay-400 space-y-6">
              {/* Soft Skills Cards Grid - Refactored to match the Skills Cards layout */}
              <div className="mb-8 mt-6">
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {/* Leadership */}
                  <div className="group relative bg-slate-50/40 dark:bg-neutral-900/40 backdrop-blur-md p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] hover:bg-white dark:hover:bg-neutral-900/80 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-10px_rgba(245,158,11,0.1)] hover:border-amber-500/30 dark:hover:border-amber-500/30 cursor-pointer flex flex-col items-center text-center">
                    <Crown className="w-6 h-6 mb-2 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Leadership
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 text-balance min-h-[40px] leading-relaxed">
                      Guiding direction with clarity and trust.
                    </p>
                  </div>

                  {/* Problem Solving */}
                  <div className="group relative bg-slate-50/40 dark:bg-neutral-900/40 backdrop-blur-md p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] hover:bg-white dark:hover:bg-neutral-900/80 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-10px_rgba(249,115,22,0.1)] hover:border-orange-500/30 dark:hover:border-orange-500/30 cursor-pointer flex flex-col items-center text-center">
                    <Puzzle className="w-6 h-6 mb-2 text-orange-500 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Problem Solving
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 text-balance min-h-[40px] leading-relaxed">
                      Navigating ambiguity with structured thinking.
                    </p>
                  </div>

                  {/* Team Collaboration */}
                  <div className="group relative bg-slate-50/40 dark:bg-neutral-900/40 backdrop-blur-md p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] hover:bg-white dark:hover:bg-neutral-900/80 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-10px_rgba(14,165,233,0.1)] hover:border-sky-500/30 dark:hover:border-sky-500/30 cursor-pointer flex flex-col items-center text-center">
                    <Group className="w-6 h-6 mb-2 text-sky-500 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Teamwork
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 text-balance min-h-[40px] leading-relaxed">
                      Building momentum through shared ownership.
                    </p>
                  </div>

                  {/* Growth Mindset */}
                  <div className="group relative bg-slate-50/40 dark:bg-neutral-900/40 backdrop-blur-md p-5 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] hover:bg-white dark:hover:bg-neutral-900/80 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.1)] hover:border-emerald-500/30 dark:hover:border-emerald-500/30 cursor-pointer flex flex-col items-center text-center">
                    <TrendingUp className="w-6 h-6 mb-2 text-emerald-500 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Growth
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 text-balance min-h-[40px] leading-relaxed">
                      Embracing change through continuous learning.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bio Description Paragraphs */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A{" "}
                  <strong className="whitespace-nowrap">
                    Hybrid Developer
                  </strong>{" "}
                  bridging{" "}
                  <strong className="whitespace-nowrap">
                    Logistics Operations
                  </strong>
                  ,{" "}
                  <strong className="whitespace-nowrap">
                    IT Infrastructure
                  </strong>
                  , and{" "}
                  <strong className="whitespace-nowrap">
                    Software Engineering
                  </strong>
                  . Experienced in ERP (Microsoft Dynamics 365), Inventory
                  Controls, and system databases. Specialized in workflow
                  automation, data integrity, and building scalable systems.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Actively transitioning into a{" "}
                  <strong className="whitespace-nowrap">DevOps Engineer</strong>{" "}
                  role to engineer scalable pipelines, with the ultimate goal of
                  becoming a{" "}
                  <strong className="whitespace-nowrap">
                    Solution Architect
                  </strong>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Career Transition Gallery - Infinite Horizontal Scrolling Marquee */}
        <div className="mt-20 pt-16 border-t border-gray-200 dark:border-gray-850 w-full overflow-hidden">
          <h3 className="reveal text-2xl md:text-3xl font-bold mb-4 text-center text-slate-900 dark:text-white">
            Career Transition <span className="text-orange-500">Gallery</span>
          </h3>
          <p className="reveal delay-100 text-muted-foreground text-center max-w-xl mx-auto mb-12 px-4">
            Continuous horizontal marquee displaying the operational
            environments and infrastructure systems that shaped my system-level
            mindset.{" "}
          </p>

          {/* Marquee Track Wrapper (Hides overflow and holds the moving track) */}
          <div className="reveal delay-200 relative w-full overflow-hidden py-4 mask-gradient-sides">
            {/* The infinite scrolling flex container. Pauses on hover */}
            <div className="animate-marquee hover:[animation-play-state:paused] flex cursor-grab active:cursor-grabbing">
              {marqueeSlides.map((slide, idx) => (
                <div
                  key={`${slide.company}-${idx}`}
                  className="w-80 sm:w-96 h-60 sm:h-64 flex-shrink-0 mx-3.5 rounded-2xl relative overflow-hidden group/card shadow-lg border border-black/[0.04] dark:border-white/[0.06] bg-slate-50/40 dark:bg-neutral-900/40 backdrop-blur-md hover:bg-white dark:hover:bg-neutral-900/80 transition-all duration-500"
                >
                  {/* Styled Image Not Available Placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-zinc-500 opacity-30 group-hover/card:opacity-55 transition-opacity duration-500">
                    <svg
                      className="w-8 h-8 text-slate-400 dark:text-neutral-500 mb-2 transition-transform duration-700 group-hover/card:scale-110"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-[10px] font-bold tracking-widest uppercase">
                      Image N/A
                    </span>
                    <span className="text-[9px] mt-0.5">windyoncloud.me</span>
                  </div>
                  {/* Opaque gradient caption overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-100/95 via-slate-100/35 to-transparent dark:from-neutral-950/95 dark:via-neutral-950/35 to-transparent z-10 flex flex-col justify-end p-6 text-slate-800 dark:text-white text-left transition-all duration-300">
                    <span className="self-start px-2 py-0.5 rounded bg-orange-500 text-white text-[10px] font-bold mb-2">
                      {slide.company}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold mb-1 leading-snug text-slate-900 dark:text-white">
                      {slide.role}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-gray-300 leading-normal line-clamp-2">
                      {slide.description}
                    </p>
                    <span className="text-[10px] text-slate-500 dark:text-gray-400 font-medium mt-2">
                      📅 {slide.year}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
