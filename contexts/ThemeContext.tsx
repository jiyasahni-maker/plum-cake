"use client";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { Theme } from "@/types/theme";
import { dreamerTheme, engineerTheme } from "@/themes";

type ThemeMode = "dreamer" | "engineer";

interface ThemeContextType {
  mode: ThemeMode;
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ThemeMode>("dreamer");

  const toggleTheme = () => {
    setMode((prev) =>
      prev === "dreamer" ? "engineer" : "dreamer"
    );
  };

  const theme =
    mode === "dreamer"
      ? dreamerTheme
      : engineerTheme;

  return (
    <ThemeContext.Provider
      value={{
        mode,
        theme,
        toggleTheme,
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
useEffect(() => {

    document.documentElement.classList.remove(
        "dreamer",
        "engineer"
    );

    document.documentElement.classList.add(mode);

}, [mode]);