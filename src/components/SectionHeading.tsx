interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  accent: string;
  as?: "h1" | "h2";
  /** Optional link/button shown on the right, under the index label (e.g. "All projects"). */
  action?: React.ReactNode;
}

/**
 * Shared section heading: ultra-light display title with an italic serif
 * accent word and a small mono index label, closed by a thin rule.
 */
export function SectionHeading({
  index,
  label,
  title,
  accent,
  as: Tag = "h2",
  action,
}: SectionHeadingProps) {
  return (
    <div className="reveal mb-12 flex items-end justify-between gap-6 border-b pb-5 md:mb-16">
      <Tag className="font-display text-4xl font-extralight leading-none tracking-tight sm:text-5xl md:text-7xl">
        <span className="block overflow-hidden pb-[0.12em]">
          <span className="rise text-sky">
            {title}{" "}
            <span className="accent font-serif font-light italic">{accent}</span>
            <span className="accent">.</span>
          </span>
        </span>
      </Tag>
      <div className="flex shrink-0 flex-col items-end gap-4 pb-1">
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:block">
          {index} — {label}
        </span>
        {action}
      </div>
    </div>
  );
}
