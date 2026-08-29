import { Lock } from "lucide-react";
import type { Project } from "@/data/projects";

/** "Internal" / "Under NDA": explains why a project has no Live / Source link. */
export function AccessBadge({ access }: { access: NonNullable<Project["access"]> }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
      <Lock size={10} aria-hidden="true" /> {access}
    </span>
  );
}
