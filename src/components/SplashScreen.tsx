"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onComplete: () => void;
}

/**
 * Minimalist and premium Splash Screen.
 * Sequences a loading line that morphs into a spinning circle,
 * then opens up like an iris curtain camera lens to reveal the main page.
 */
export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState<
    "line" | "morphing" | "spinning" | "reveal"
  >("line");

  useEffect(() => {
    // Stage 1 (line fill) lasts 1000ms
    const timer1 = setTimeout(() => {
      setStage("morphing");
    }, 1000);

    // Stage 2 (morphing to circle) lasts 500ms
    const timer2 = setTimeout(() => {
      setStage("spinning");
    }, 1500);

    // Stage 3 (spinning circle) lasts 1000ms
    const timer3 = setTimeout(() => {
      setStage("reveal");
    }, 2500);

    // Stage 4 (iris opening reveal curtain) completes after 800ms
    const timer4 = setTimeout(() => {
      onComplete();
    }, 3300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden",
        stage === "reveal" ? "bg-transparent" : "bg-black",
      )}
    >
      {/* CSS Keyframe animations styling */}
      <style>{`
        @keyframes progress-fill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes iris-open {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(300);
          }
        }
      `}</style>

      {/* Soft background ambient glow - fades during reveal */}
      {stage !== "reveal" && (
        <div className="absolute w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse-slow" />
      )}

      {/* Main Content Layout (Logo & Loading Indicator) */}
      <div
        className={cn(
          "relative flex flex-col items-center space-y-8 z-10 transition-all duration-500 ease-in-out",
          stage === "reveal" && "opacity-0 scale-90 pointer-events-none",
        )}
      >
        {/* Pulsing Brand Logo */}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white animate-pulse-gentle">
          <span>windyoncloud</span>
          <span className="text-orange-500 ml-0.5 animate-bounce-subtle inline-block">
            .
          </span>
          <span className="text-zinc-500 text-xl font-normal ml-1">me</span>
        </h1>

        {/* Morphing Loading Element */}
        <div className="h-10 flex items-center justify-center">
          <div
            className={cn(
              "relative transition-all duration-500 ease-in-out flex items-center justify-center",
              stage === "line" &&
                "w-32 h-[2px] bg-zinc-800 rounded-full overflow-hidden border-0",
              stage === "morphing" &&
                "w-6 h-6 rounded-full bg-transparent border-2 border-zinc-800 border-t-orange-500",
              stage === "spinning" &&
                "w-6 h-6 rounded-full bg-transparent border-2 border-zinc-800 border-t-orange-500 animate-spin",
              stage === "reveal" &&
                "w-6 h-6 rounded-full bg-transparent border-0 opacity-0",
            )}
          >
            {/* The progress filler, animating only during the 'line' stage */}
            {stage === "line" && (
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full"
                style={{
                  animation:
                    "progress-fill 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards",
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Iris Curtain Shutter Reveal Layer (Expands outward from the center) */}
      {stage === "reveal" && (
        <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
          <div
            className="w-[12px] h-[12px] rounded-full border-[150vmax] border-black bg-transparent"
            style={{
              animation:
                "iris-open 0.8s cubic-bezier(0.85, 0, 0.15, 1) forwards",
            }}
          />
        </div>
      )}
    </div>
  );
}
