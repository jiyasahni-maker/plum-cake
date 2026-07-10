"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { toggleTheme, mode } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="mt-10 rounded-xl border px-6 py-3"
    >
      {mode === "dreamer"
        ? "Enter Engineer"
        : "Enter Dreamer"}
    </button>
  );
}