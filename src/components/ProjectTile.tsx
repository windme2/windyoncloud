import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

/** Image-led project tile (screenshot, dark veil, title at the bottom) linking to the case study. */
export function ProjectTile({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl"
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
      />
      <span className="absolute inset-0 bg-gradient-to-t from-[#020823]/90 via-[#020823]/30 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white">
        <span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-white/85">
            {project.category}
          </span>
          <span className="mt-2 block font-display text-xl font-light leading-tight">
            {project.title.split(" - ")[0]}
          </span>
        </span>
        <ArrowUpRight
          size={18}
          strokeWidth={1.5}
          className="mb-0.5 shrink-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
