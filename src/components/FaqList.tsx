"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accordion: one answer open at a time (the first by default). Opening another
 * closes the previous one; both animate their height together (grid 0fr → 1fr).
 */
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <div className="border-t">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="reveal border-b">
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left font-display text-lg font-light md:text-xl"
              >
                {item.q}
                <Plus
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
