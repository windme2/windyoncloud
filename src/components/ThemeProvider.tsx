"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      // every element easing its own colours at its own pace made text flicker; the toggle crossfades
      // the whole page in one go instead (View Transitions) with per-element transitions off
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
