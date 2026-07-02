"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        window.location.pathname,
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 transition-colors duration-300">
      <div className="relative max-w-md w-full text-center space-y-8">
        {/* Animated Background Blur */}
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-rose-500/10 dark:bg-rose-500/5 rounded-full blur-3xl animate-pulse delay-75"></div>

        <div className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-850 rounded-2xl p-8 shadow-xl">
          <h1 className="text-8xl font-extrabold bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-transparent bg-clip-text">
            404
          </h1>
          <h2 className="text-2xl font-bold mt-4 text-slate-800 dark:text-slate-100">
            Page Not Found
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 mb-8">
            Oops! The page you are looking for doesn&apos;t exist or has been
            moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              asChild
              className="flex items-center gap-2 border-gray-200 dark:border-gray-800 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/30 cursor-pointer"
            >
              <button onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4" /> Go Back
              </button>
            </Button>
            <Button
              asChild
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white hover:from-orange-600 hover:to-rose-600 shadow-md hover:shadow-orange-500/20 cursor-pointer"
            >
              <Link href="/">
                <Home className="w-4 h-4" /> Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
