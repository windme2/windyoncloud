"use client";

import { useEffect, useState } from "react";
import { IntroTerminal } from "./IntroTerminal";
import { SplashScreen } from "./SplashScreen";

interface HomeClientWrapperProps {
  children: React.ReactNode;
}

/**
 * HomeClientWrapper Component.
 * Binds the loading state and renders the terminal intro screen and splash screen for new browser sessions.
 * Caches the loaded state using sessionStorage.
 */
export function HomeClientWrapper({ children }: HomeClientWrapperProps) {
  const [loaderState, setLoaderState] = useState<
    "loading" | "terminal" | "splash" | "done"
  >("loading");

  useEffect(() => {
    const isBooted = sessionStorage.getItem("windy-booted");

    // Defer state update to next loop cycle to comply with React 19 rendering standards
    const timer = setTimeout(() => {
      if (isBooted === "true") {
        setLoaderState("done");
      } else {
        setLoaderState("terminal");
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleTerminalComplete = () => {
    setLoaderState("splash");
  };

  const handleSplashComplete = () => {
    sessionStorage.setItem("windy-booted", "true");
    setLoaderState("done");
  };

  // Prevent flash by waiting until mount check completes
  if (loaderState === "loading") {
    return <div className="min-h-screen bg-black" />;
  }

  const showLoader = loaderState === "terminal" || loaderState === "splash";

  return (
    <>
      {loaderState === "terminal" && (
        <IntroTerminal onComplete={handleTerminalComplete} />
      )}
      {loaderState === "splash" && (
        <SplashScreen onComplete={handleSplashComplete} />
      )}

      {/* Home page main elements with a smooth fade-in reveal transition */}
      <div
        className={`transition-opacity duration-1000 ease-out ${
          showLoader ? "opacity-0 h-screen overflow-hidden" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
