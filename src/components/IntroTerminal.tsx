"use client";

import { useEffect, useState, useRef } from "react";
import { Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface IntroTerminalProps {
  onComplete: () => void;
}

interface LogLine {
  text: string;
  className?: string;
}

/**
 * IntroTerminal Component.
 * Implements a mock CLI booting environment before accessing the portfolio home page.
 * Uses sessionStorage to prevent looping on reload within the same browser tab session.
 */
export function IntroTerminal({ onComplete }: IntroTerminalProps) {
  const [typedText, setTypedText] = useState("");
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [step, setStep] = useState(0); // 0: typing, 1: printing logs, 2: fade-out
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const commandToType = "npm run dev";

  // Handle typing effect for the bootstrap command
  useEffect(() => {
    if (step !== 0) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < commandToType.length) {
        const nextChar = commandToType[currentIndex];
        setTypedText((prev) => prev + nextChar);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Completed typing, wait briefly then transition to booting log printout
        setTimeout(() => setStep(1), 500);
      }
    }, 75); // Snappy human typing speed

    return () => clearInterval(typingInterval);
  }, [step]);

  // Handle printing log sequences sequentially
  useEffect(() => {
    if (step !== 1) return;

    const logMessages: LogLine[] = [
      { text: "", className: "" },
      {
        text: "> windyoncloud@0.1.0 dev",
        className: "text-zinc-500 font-medium",
      },
      { text: "> next dev", className: "text-zinc-500 font-medium" },
      { text: "", className: "" },
      {
        text: "▲ Next.js 16.2.9 (Turbopack)",
        className: "text-zinc-100 font-bold",
      },
      {
        text: "  - Local:        http://localhost:3000",
        className: "text-sky-400",
      },
      { text: "  - Environments: .env.local", className: "text-zinc-400" },
      { text: "", className: "" },
      { text: "✓ Ready in 1.8s", className: "text-emerald-400 font-semibold" },
    ];

    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < logMessages.length) {
        const currentLog = logMessages[logIndex];
        setLogs((prev) => [...prev, currentLog]);
        logIndex++;
      } else {
        clearInterval(logInterval);
        // Completed logging, wait briefly then trigger fade-out transition
        setTimeout(() => {
          setStep(2);
          setTimeout(() => {
            onComplete();
          }, 650); // Wait for CSS opacity transition to complete
        }, 1000);
      }
    }, 200); // Speed of printing server log printouts

    return () => clearInterval(logInterval);
  }, [step, onComplete]);

  // Automatically scroll to the bottom of the log console on update
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [typedText, logs]);

  // Handle manual skip using Spacebar or Escape keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Escape") {
        e.preventDefault();
        onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4 font-mono select-none transition-opacity duration-500 ease-in-out ${
        step === 2 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* CRT Retro Screen Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,10,10,0.85)_0%,rgba(0,0,0,1)_100%)] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-scanlines pointer-events-none z-10 opacity-15" />

      {/* Terminal Box */}
      <div className="w-full max-w-2xl bg-zinc-950/95 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl shadow-black/80 relative z-20 flex flex-col h-[400px]">
        {/* Terminal Header */}
        <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <div className="text-xs text-zinc-400 font-semibold flex items-center gap-1.5">
            <Terminal size={12} className="text-zinc-500" /> bash - windyoncloud
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Console Workspace */}
        <div className="flex-1 p-6 overflow-y-auto text-left text-zinc-300 space-y-2 text-xs sm:text-sm leading-relaxed scrollbar-thin">
          <div>
            <span className="text-emerald-500 font-bold">
              visitor@windyoncloud
            </span>
            <span className="text-zinc-400">:</span>
            <span className="text-sky-400">~</span>
            <span className="text-zinc-400">$</span>{" "}
            <span className="text-white">{typedText}</span>
            {step === 0 && (
              <span className="animate-blink bg-zinc-400 text-transparent ml-0.5 inline-block w-2 h-4">
                |
              </span>
            )}
          </div>

          {/* Render Boot Logs */}
          {logs.map(
            (log, idx) =>
              log && (
                <div
                  key={idx}
                  className={cn(
                    "animate-fade-in min-h-[1.2rem] whitespace-pre",
                    log.className,
                  )}
                >
                  {log.text}
                </div>
              ),
          )}

          {step === 1 && (
            <div className="flex items-center gap-1">
              <span className="animate-blink bg-zinc-400 text-transparent inline-block w-2 h-4" />
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Skip controls Footer */}
        <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-2.5 flex items-center justify-between text-[10px] text-zinc-500">
          <div>Press [Space] or [Esc] to skip</div>
          <button
            onClick={() => onComplete()}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Skip Intro ❯
          </button>
        </div>
      </div>
    </div>
  );
}
