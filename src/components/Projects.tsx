"use client";

import { ExternalLink } from "lucide-react";
import { Github } from "@/components/icons";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { projects, categories } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";

/**
 * Projects showcase component displaying filtered works.
 * Redesigned with glassmorphic cards, border glow transitions, and responsive overlays.
 * Shows up to 9 projects on the home page, with theme orange category filters.
 */
export function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <section
      id="projects"
      className="py-16 md:py-24 relative bg-background dark:bg-gray-950 scroll-mt-20"
    >
      <div className="container">
        {/* Section Heading - Clean solid text with orange accent */}
        <h2 className="reveal text-3xl md:text-4xl font-bold mb-6 text-center text-slate-900 dark:text-white">
          My <span className="text-orange-500">Projects</span>
        </h2>
        <p className="reveal delay-100 text-lg text-muted-foreground text-center max-w-xl mx-auto mb-12">
          A curated set of projects marking my shift from logistics to frontend,
          with focus on modern tech and user-first design.
        </p>

        {/* Category Filter Navigation */}
        <div className="reveal delay-200 flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-300 flex items-center gap-2 hover:scale-105 cursor-pointer",
                activeCategory === category
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20 border-orange-500"
                  : "bg-background border-border text-slate-600 dark:text-slate-400 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-500/30",
              )}
            >
              <span>{category}</span>
              <span
                className={cn(
                  "px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors",
                  activeCategory === category
                    ? "bg-white/20 text-white"
                    : "bg-black/[0.05] dark:bg-white/[0.05] text-slate-500",
                )}
              >
                {category === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === category).length}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Cards Grid (Max 9 items) */}
        <div
          key={activeCategory}
          className="reveal delay-300 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 animate-tab-change"
        >
          {filteredProjects.slice(0, 9).map((project, index) => (
            <div
              key={project.title}
              className="group relative overflow-hidden bg-slate-50/40 dark:bg-neutral-900/40 backdrop-blur-md rounded-2xl border border-black/[0.04] dark:border-white/[0.06] hover:border-orange-500/30 dark:hover:border-orange-500/30 hover:bg-white dark:hover:bg-neutral-900/80 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-[0_15px_30px_-10px_rgba(249,115,22,0.1)] flex flex-col justify-between"
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              {/* Image Container with Hover Zoom Overlay */}
              <div className="relative aspect-video overflow-hidden bg-muted rounded-t-2xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Category Badge */}
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-semibold backdrop-blur-sm">
                  {project.category}
                </span>

                {/* Overlay Links on hover */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm text-sm flex items-center gap-1.5"
                    >
                      <ExternalLink size={14} /> Demo
                    </a>
                  )}
                  {project.codeLink && (
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 rounded-lg bg-white/20 border border-white/10 text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm text-sm flex items-center gap-1.5"
                    >
                      <Github className="w-3.5 h-3.5" /> Code
                    </a>
                  )}
                </div>
              </div>

              {/* Title & Description Details */}
              <div className="p-6 flex-1 flex flex-col justify-between text-left">
                <div className="space-y-3">
                  {project.featured && (
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      ⭐ Featured
                    </span>
                  )}
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tag Badges Footer */}
                <div className="flex flex-wrap gap-1.5 pt-6 mt-auto">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/[0.03] dark:bg-white/[0.03] text-slate-500 dark:text-slate-400 border border-black/[0.02] dark:border-white/[0.02] transition-all duration-300 group-hover:bg-black/[0.06] dark:group-hover:bg-white/[0.06] group-hover:text-slate-800 dark:group-hover:text-slate-200 group-hover:border-black/[0.08] dark:group-hover:border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Redirect More Projects Link (Only show if filtered projects exceed 9) */}
        {filteredProjects.length > 9 && (
          <div className="flex justify-end mt-10">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-1.5 text-sm font-bold text-slate-800 dark:text-slate-200 hover:text-orange-500 transition-colors cursor-pointer"
            >
              More Projects{" "}
              <span className="transition-transform group-hover:translate-x-1.5">
                ❯
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
