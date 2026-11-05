"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function ScrollIndicator() {
  const { mode } = useTheme();
  const dreamer = mode === "dreamer";
  return (
    <a
      href="#about"
      aria-label="Scroll down"
      className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
    >
      <span
        className={
          dreamer
            ? "text-[10px] uppercase tracking-[0.4em] text-[#d8c4ff]"
            : "text-xs text-neutral-500"
        }
      >
        {dreamer ? "Scroll to wander" : "Scroll"}
      </span>
      <span
        className={
          dreamer
            ? "intro-breathe block h-12 w-px bg-gradient-to-b from-[#ffd9a0] to-transparent"
            : "block h-8 w-px bg-neutral-300"
        }
      />
    </a>
  );
}
