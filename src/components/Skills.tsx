"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { skillsData, tabLabels } from "@/data/skills";
import { Icon } from "@iconify/react";

/**
 * Skills section component listing developer capabilities.
 * Supports active tab filtering, clean card grids with level badge indicators,
 * and dynamic theme orange category filters.
 */
export function Skills() {
  const [activeTab, setActiveTab] =
    useState<keyof typeof skillsData>("frontend");

  const handleTabChange = (newTab: keyof typeof skillsData) => {
    setActiveTab(newTab);
  };

  // Determine badge dot color representing skill level status
  const getLevelDotColor = (level: string) => {
    switch (level) {
      case "Advanced":
        return "bg-emerald-500";
      case "Intermediate":
        return "bg-orange-500";
      case "Basic":
        return "bg-slate-400 dark:bg-neutral-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <section
      id="skills"
      className="py-16 md:py-24 relative bg-background dark:bg-gray-950 scroll-mt-20"
    >
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Section heading - Solid color text with orange accent */}
          <h2 className="reveal text-3xl md:text-4xl font-bold mb-6 text-center text-slate-900 dark:text-white">
            My <span className="text-orange-500">Skills</span>
          </h2>
          <p className="reveal delay-100 text-lg text-muted-foreground text-center max-w-xl mx-auto mb-8">
            Technical expertise categorized by operational layers, mapping
            languages, databases, framework technologies, and systems
            operations.
          </p>

          {/* Category Filter Navigation */}
          <div className="reveal delay-200 flex flex-wrap justify-center gap-3 mb-12">
            {(Object.keys(skillsData) as Array<keyof typeof skillsData>).map(
              (tab) => (
                <ButtonTab
                  key={tab}
                  active={activeTab === tab}
                  onClick={() => handleTabChange(tab)}
                  label={tabLabels[tab]}
                />
              ),
            )}
          </div>

          {/* Skills Cards Grid */}
          <div
            key={activeTab}
            className="reveal delay-300 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-all duration-300 animate-tab-change"
          >
            {skillsData[activeTab].map((skill) => (
              <div
                key={`${activeTab}-${skill.name}`}
                className="group relative bg-slate-50/40 dark:bg-neutral-900/40 backdrop-blur-md p-6 rounded-2xl border border-black/[0.04] dark:border-white/[0.06] hover:border-orange-500/30 dark:hover:border-orange-500/30 hover:bg-white dark:hover:bg-neutral-900/80 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-10px_rgba(249,115,22,0.1)] cursor-pointer overflow-hidden flex flex-col items-center space-y-4"
              >
                {/* Icon Wrapper container */}
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-neutral-800/80 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-inner border border-black/[0.02] dark:border-white/[0.02] group-hover:border-orange-500/20">
                  <Icon
                    icon={skill.icon}
                    className="w-8 h-8 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 transition-colors duration-300 group-hover:text-orange-500 dark:group-hover:text-orange-400">
                  {skill.name}
                </h3>

                {/* Clean dot indicator level badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-medium border border-black/[0.05] dark:border-white/[0.05] bg-black/[0.02] dark:bg-white/[0.02] text-slate-500 dark:text-slate-400">
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse-slow",
                      getLevelDotColor(skill.level),
                    )}
                  />
                  {skill.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ButtonTabProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

function ButtonTab({ active, onClick, label }: ButtonTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-300 hover:scale-105 cursor-pointer",
        active
          ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 border-orange-500"
          : "bg-background border-border text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-500/30",
      )}
    >
      {label}
    </button>
  );
}
