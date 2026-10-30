"use client";
import { useEffect, useRef } from "react";
import { createContext, useContext, useState } from "react";
import { Theme } from "@/types/theme";
import { dreamerTheme, engineerTheme } from "@/themes";

type ThemeMode = "dreamer" | "engineer";

// How long the portal overlay takes to fully cover the screen before the
// mode actually swaps underneath it. Kept in one place so the transition
// component and the context stay in sync.
export const THEME_TRANSITION_COVER_MS = 550;
// How long the overlay lingers/reveals after the swap.
export const THEME_TRANSITION_REVEAL_MS = 650;

interface ThemeContextType {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
  /** True for the full duration of the portal transition (cover + reveal). */
  isTransitioning: boolean;
  /** The mode being transitioned INTO, so the overlay can theme itself before the swap lands. */
  transitioningTo: ThemeMode | null;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>("dreamer");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitioningTo, setTransitioningTo] = useState<ThemeMode | null>(
    null
  );
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const toggleTheme = () => {
    if (isTransitioning) return; // ignore rapid double-taps mid-transition

    timers.current.forEach(clearTimeout);
    timers.current = [];

    const next: ThemeMode = mode === "dreamer" ? "engineer" : "dreamer";

    setTransitioningTo(next);
    setIsTransitioning(true);

    // Swap the actual theme once the overlay has fully covered the screen,
    // so the user never sees the old mode "snap" — it happens behind cover.
    timers.current.push(
      setTimeout(() => {
        setMode(next);
      }, THEME_TRANSITION_COVER_MS)
    );

    // Let the overlay finish its reveal animation, then clear transition state.
    timers.current.push(
      setTimeout(() => {
        setIsTransitioning(false);
        setTransitioningTo(null);
      }, THEME_TRANSITION_COVER_MS + THEME_TRANSITION_REVEAL_MS)
    );
  };

  useEffect(() => {
    return () => {
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const theme =
    mode === "dreamer"
      ? dreamerTheme
      : engineerTheme;

  useEffect(() => {
    document.documentElement.classList.remove(
      "dreamer",
      "engineer"
    );

    document.documentElement.classList.add(mode);
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        toggleTheme,
        isTransitioning,
        transitioningTo,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside ThemeProvider"
    );
  }

  return context;
}