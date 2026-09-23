"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Group,
  Crown,
  Puzzle,
  Workflow,
  Network,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";

/**
 * About component containing personal stats, key attributes,
 * and the interactive photo stack.
 */
export function About() {
  const [cardOrder, setCardOrder] = useState([2, 1, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clicking a card brings it to the front of the stack
  const bringToFront = (id: number) => {
    setCardOrder((prev) => [...prev.filter((item) => item !== id), id]);
  };

  // Position 2 = front, 0 = back. Hovering the stack fans the cards out.
  const getCardStyle = (cardId: number) => {
    const position = cardOrder.indexOf(cardId);

    if (position === 2) {
      return {
        zIndex: 30,
        opacity: 1,
        transform: isHovered
          ? isMobile
            ? "rotate(0deg) translate(0px, -10px) scale(1.02)"
            : "rotate(0deg) translate(0px, -20px) scale(1.04)"
          : "rotate(0deg) translate(0px, 0px)",
      };
    }
    if (position === 1) {
      return {
        zIndex: 20,
        opacity: isHovered ? 1 : 0.92,
        transform: isHovered
          ? isMobile
            ? "rotate(-8deg) translate(-25px, 8px)"
            : "rotate(-12deg) translate(-50px, 15px)"
          : isMobile
            ? "rotate(-4deg) translate(-10px, 5px)"
            : "rotate(-6deg) translate(-20px, 10px)",
      };
    }
    return {
      zIndex: 10,
      opacity: isHovered ? 1 : 0.85,
      transform: isHovered
        ? isMobile
          ? "rotate(8deg) translate(25px, -8px)"
          : "rotate(12deg) translate(50px, -15px)"
        : isMobile
          ? "rotate(4deg) translate(10px, -5px)"
          : "rotate(6deg) translate(20px, -10px)",
    };
  };

  const stackCards = [
    {
      id: 0,
      src: "/assets/images/about-1.webp",
      alt: "Developer Workspace",
      caption: "Crafting code and solutions in a focused environment.",
    },
    {
      id: 1,
      src: "/assets/images/about-2.webp",
      alt: "IT Infrastructure",
      caption: "Managing servers, storage, and networks with precision.",
    },
    {
      id: 2,
      src: "/assets/images/about-3.webp",
      alt: "Software Engineer",
      caption: "Streamlining tasks through scripts and systems thinking.",
    },
  ];

  const principles = [
    {
      icon: Crown,
      title: "Leadership",
      text: "Guiding direction with clarity and trust.",
    },
    {
      icon: Puzzle,
      title: "Problem solving",
      text: "Navigating ambiguity with structured thinking.",
    },
    {
      icon: Group,
      title: "Teamwork",
      text: "Building momentum through shared ownership.",
    },
    {
      icon: TrendingUp,
      title: "Growth",
      text: "Embracing change through continuous learning.",
    },
    {
      icon: Workflow,
      title: "Automation mindset",
      text: "Turning repetitive work into reliable systems.",
    },
    {
      icon: Network,
      title: "Systems thinking",
      text: "Connecting infrastructure, software, and business needs.",
    },
  ];

  return (
    <section id="about" className="relative scroll-mt-20 py-20 md:py-32">
      <div className="container max-w-7xl">
        <SectionHeading index="02" label="About" title="About" accent="me" />

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Interactive fanned card stack: hover to fan out, click to bring forward */}
          <div className="reveal-3d flex justify-center">
            <div
              className="relative h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] md:h-[400px] md:w-[400px]"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {stackCards.map((card) => (
                <div
                  key={card.id}
                  style={getCardStyle(card.id)}
                  onClick={() => bringToFront(card.id)}
                  className="glass absolute inset-0 cursor-pointer select-none overflow-hidden rounded-3xl p-2 transition-all duration-500 ease-out"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      className="pointer-events-none object-cover"
                      sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, 400px"
                    />
                    {/* caption only on the front card (or when fanned out), so back cards never peek text */}
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1450]/95 via-[#0a1450]/60 to-transparent p-4 pt-10 text-left text-white transition-opacity duration-500",
                        cardOrder.indexOf(card.id) === 2 || isHovered
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    >
                      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-amber-300">
                        Workspace
                      </p>
                      <p className="font-display text-sm font-light">
                        {card.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div className="reveal delay-300 space-y-10">
            <div className="space-y-5 font-display text-xl font-light leading-relaxed text-muted-foreground md:text-2xl">
              <p>
                A{" "}
                <strong className="font-normal text-foreground">
                  hybrid developer
                </strong>{" "}
                with a background in product design, logistics and IT
                infrastructure, experienced with ERP systems and passionate
                about automating repetitive work.
              </p>
              <p>
                Now moving into{" "}
                <strong className="font-normal text-foreground">
                  DevOps and cloud engineering
                </strong>
                , with{" "}
                <strong className="font-normal text-foreground">
                  Solution Architect
                </strong>{" "}
                as the long-term goal.
              </p>
              <p>
                I combine logistics, infrastructure, automation, and full-stack
                development to build reliable solutions for real business
                problems, including reducing cloud infrastructure costs by
                81–88% through a GCP data migration.
              </p>
            </div>

            <ul className="grid grid-cols-1 border-t sm:grid-cols-2">
              {principles.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="flex gap-4 border-b py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
                >
                  <Icon
                    className="mt-0.5 h-5 w-5 shrink-0 text-primary-ink"
                    strokeWidth={1.25}
                  />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
