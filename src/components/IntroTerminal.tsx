"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntroTerminalProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface Step {
  cmd: string;
  out: { text: string; className?: string }[];
}

/** The original boot: one command, then the dev-server log. */
const script: Step[] = [
  {
    cmd: "npm run dev",
    out: [
      { text: " ", className: "" },
      {
        text: "> windyoncloud@0.1.0 dev",
        className: "text-zinc-400 font-medium",
      },
      { text: "> next dev", className: "text-zinc-400 font-medium" },
      { text: " ", className: "" },
      {
        text: "\u25B2 Next.js 16.2.9 (Turbopack)",
        className: "text-zinc-100 font-bold",
      },
      {
        text: "  - Local:        http://localhost:3000",
        className: "text-sky-400",
      },
      { text: "  - Environments: .env.local", className: "text-zinc-400" },
      { text: " ", className: "" },
      {
        text: "\u2713 Ready in 1.8s",
        className: "text-emerald-400 font-semibold",
      },
    ],
  },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * IntroTerminal: a short CLI boot (install -> build -> start) shown before the
 * water-drop scene. The wrapper owns skipping; this only reports completion.
 */
export function IntroTerminal({ onComplete, onSkip }: IntroTerminalProps) {
  const [lines, setLines] = useState<
    { text: string; className?: string; prompt?: boolean }[]
  >([]);
  const [typing, setTyping] = useState("");
  const [fading, setFading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const [promptVisible, setPromptVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    // human-ish keystroke timing: uneven gaps, slower at the start, a short hitch mid-word
    const keyDelay = (i: number) => {
      const base = 22 + Math.random() * 24;
      return i === 1 ? base + 50 : i % 4 === 0 ? base + 20 : base;
    };
    (async () => {
      await sleep(300); // blinking cursor on an empty prompt
      for (const step of script) {
        setPromptVisible(true);
        for (let i = 1; i <= step.cmd.length; i++) {
          if (cancelled) return;
          setTyping(step.cmd.slice(0, i));
          await sleep(keyDelay(i));
        }
        await sleep(150); // beat before pressing Enter
        if (cancelled) return;
        setLines((l) => [...l, { text: step.cmd, prompt: true }]);
        setTyping("");
        setPromptVisible(false); // the command is "running": no prompt until it finishes
        await sleep(160);
        for (const o of step.out) {
          if (cancelled) return;
          setLines((l) => [...l, o]);
          await sleep(o.text.trim() === "" ? 30 : 70);
        }
      }
      if (cancelled) return;
      // stop on "Ready": no trailing prompt, a short hold, then out
      await sleep(350);
      setFading(true);
      await sleep(300);
      if (!cancelled) onComplete();
    })();
    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines, typing]);

  const prompt = (
    <>
      <span className="text-emerald-500 font-bold">visitor@windyoncloud</span>
      <span className="text-zinc-400">:</span>
      <span className="text-sky-400">~</span>
      <span className="text-zinc-400">$</span>{" "}
    </>
  );

  return (
    <div
      className={cn(
        "intro-terminal fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4 font-mono select-none transition-opacity duration-300 ease-in-out",
        fading ? "opacity-0 pointer-events-none" : "opacity-100",
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,10,10,0.85)_0%,rgba(0,0,0,1)_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-scanlines pointer-events-none z-10 opacity-15" />

      <div className="w-full max-w-[34rem] bg-zinc-950/95 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-black/80 relative z-20 flex flex-col h-[min(54vh,390px)]">
        <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="text-xs text-zinc-400 font-semibold flex items-center gap-1.5">
            <Terminal size={12} className="text-zinc-500" /> bash - windyoncloud
          </div>
          <div className="w-10" />
        </div>

        <div className="flex-1 p-4 sm:p-6 overflow-y-auto text-left text-zinc-300 space-y-1 text-[10px] sm:text-[13px] leading-relaxed">
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                "whitespace-pre-wrap break-all sm:break-normal",
                line.className,
              )}
            >
              {line.prompt ? (
                <>
                  {prompt}
                  <span className="text-white">{line.text}</span>
                </>
              ) : (
                line.text
              )}
            </div>
          ))}
          {promptVisible && (
            <div>
              {prompt}
              <span className="text-white">{typing}</span>
              <span className="animate-blink ml-0.5 inline-block h-4 w-2 bg-zinc-400 align-middle" />
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-900 px-4 py-2.5 text-[10px] text-zinc-400">
          <div className="hidden sm:block">Press [Space] or [Esc] to skip</div>
          <button
            onClick={onSkip}
            className="cursor-pointer transition-colors hover:text-white"
          >
            Skip Intro &#x276F;
          </button>
        </div>
      </div>
    </div>
  );
}
