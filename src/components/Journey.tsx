"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { educationData, experienceData } from "@/data/journey";
import { Briefcase, Calendar, GraduationCap } from "lucide-react";

/**
 * Journey component mapping the developer's education and career timeline.
 * Employs client side tabs and CSS slide/fade transitions on toggle.
 * Timeline features a neutral center line and opaque progressive node markers.
 */
export function Journey() {
  const [activeTab, setActiveTab] = useState<"education" | "experience">(
    "education",
  );

  // Helper function to calculate progressive timeline colors representing a visual journey (top is oldest)
  const getJourneyTheme = (index: number, status: string) => {
    // Current ongoing status (active)
    if (status === "current") {
      return {
        node: "from-emerald-400 to-green-600 border-emerald-200 dark:border-emerald-950 shadow-emerald-500/10 text-white",
        badge: "bg-gradient-to-r from-emerald-500 to-green-600 text-white",
      };
    }
    // Future upcoming targets
    if (status === "future") {
      return {
        node: "from-orange-400 to-amber-600 border-orange-200 dark:border-orange-950 shadow-orange-500/10 text-white",
        badge: "bg-gradient-to-r from-orange-500 to-amber-600 text-white",
      };
    }

    // Completed status
    return {
      node: "from-blue-400 to-sky-600 border-blue-200 dark:border-blue-950 shadow-blue-500/10 text-white",
      badge: "bg-gradient-to-r from-blue-500 to-sky-600 text-white",
    };
  };

  return (
    <section
      id="journey"
      className="py-16 md:py-24 relative bg-background dark:bg-gray-950"
    >
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Section heading - Solid text colors with orange accent */}
          <h2 className="reveal text-3xl md:text-4xl font-bold mb-6 text-center text-slate-900 dark:text-white">
            My <span className="text-orange-500">Journey</span>
          </h2>

          <p className="reveal delay-100 text-lg text-muted-foreground text-center max-w-xl mx-auto mb-12">
            From logistics expertise to software development, exploring the path
            of continuous learning and growth.
          </p>

          {/* Tab Navigation */}
          <div className="reveal delay-200 flex justify-center my-8 md:my-12 px-4">
            <div className="relative grid grid-cols-2 items-center bg-gray-100 dark:bg-neutral-900 p-1 rounded-xl w-full max-w-md mx-auto shadow-sm transition-colors duration-300">
              {/* Sliding background indicator pill */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute top-1 bottom-1 left-1 rounded-lg bg-orange-500 shadow-lg shadow-orange-500/20",
                  "w-[calc(50%-0.25rem)] transition-all duration-500 ease-out",
                  activeTab === "experience"
                    ? "left-[calc(50%+0.25rem)]"
                    : "left-1",
                )}
              />
              <button
                onClick={() => setActiveTab("education")}
                className={cn(
                  "relative z-10 w-full px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-colors duration-300 cursor-pointer",
                  activeTab === "education"
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200",
                )}
              >
                <GraduationCap className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
                Education
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={cn(
                  "relative z-10 w-full px-3 py-2 md:px-6 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-colors duration-300 cursor-pointer",
                  activeTab === "experience"
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200",
                )}
              >
                <Briefcase className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
                Work Experience
              </button>
            </div>
          </div>

          {/* Timeline Content */}
          <div key={activeTab} className="relative animate-fade-in">
            {/* Center Line - Neutral slate-200 / neutral-800 line */}
            <div className="hidden min-[1150px]:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200 dark:bg-neutral-800"></div>

            {/* Timeline Items */}
            <div className="space-y-6 lg:space-y-16 px-4 lg:px-8">
              {(activeTab === "education" ? educationData : experienceData).map(
                (item, index) => {
                  const IconComponent = item.icon;
                  const isLeft = index % 2 === 0;
                  const theme = getJourneyTheme(index, item.status);

                  return (
                    <div
                      key={item.title}
                      className={cn(
                        "relative flex items-start transition-all duration-700 transform animate-fade-in-up",
                        "max-[1149px]:justify-center min-[1150px]:justify-start",
                        isLeft && "min-[1150px]:justify-start",
                        !isLeft && "min-[1150px]:justify-end",
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {/* Timeline Node */}
                      <div className="hidden min-[1150px]:block absolute left-2 min-[1150px]:left-1/2 transform min-[1150px]:-translate-x-1/2 z-10">
                        <div
                          className={`w-10 h-10 min-[1150px]:w-16 min-[1150px]:h-16 bg-gradient-to-br ${theme.node} rounded-full border-3 border-white dark:border-gray-900 shadow-lg flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-500 ease-out`}
                        >
                          <IconComponent className="w-8 h-8" />
                        </div>
                      </div>

                      {/* Content Card (Glassmorphic look) */}
                      <div
                        className={`w-full max-w-md min-[1150px]:max-w-lg ${
                          isLeft
                            ? "min-[1150px]:mr-auto min-[1150px]:pr-16 min-[1150px]:ml-8"
                            : "min-[1150px]:ml-auto min-[1150px]:pl-16"
                        }`}
                      >
                        <div
                          className={`p-6 lg:p-8 rounded-xl bg-slate-50/40 dark:bg-neutral-900/40 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-black/[0.04] dark:border-white/[0.06] transition-all duration-500 ease-out hover:border-orange-500/30 dark:hover:border-orange-500/30 hover:shadow-xl hover:scale-[1.02] group text-left min-[1150px]:${
                            isLeft ? "text-right" : "text-left"
                          }`}
                        >
                          {/* Year Badge */}
                          <div
                            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-3 transition-all duration-300 ${theme.badge}`}
                          >
                            <Calendar className="w-4 h-4 inline align-middle mr-1" />
                            {item.year}
                          </div>

                          {/* Title */}
                          <h3 className="text-lg lg:text-xl font-bold mb-2 text-slate-800 dark:text-slate-100 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-500">
                            {item.title}
                          </h3>

                          {/* Subtitle */}
                          <h4 className="text-sm lg:text-md font-semibold text-orange-500 dark:text-orange-400 transition-colors duration-300 mb-2">
                            {item.subtitle}
                          </h4>

                          {/* Institution/Company */}
                          <p className="text-xs lg:text-sm font-bold text-slate-700 dark:text-slate-300 transition-colors duration-300 mb-2">
                            {activeTab === "education"
                              ? (item as (typeof educationData)[0]).institution
                              : (item as (typeof experienceData)[0]).company}
                          </p>

                          <p className="text-xs lg:text-sm leading-relaxed text-slate-500 dark:text-slate-400 transition-colors duration-300 whitespace-pre-line">
                            {item.description}
                          </p>

                          {/* Active/Current status indicator */}
                          {item.status === "current" && (
                            <div className="mt-3">
                              <span className="inline-block px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-full transition-colors duration-300">
                                Current
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
