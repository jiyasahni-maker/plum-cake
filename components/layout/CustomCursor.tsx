"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

/** Observatory mode: a soft lantern glow that follows the pointer across the whole site. */
export default function CustomCursor() {
  const { mode } = useTheme();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mode !== "dreamer") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    const move = (e: PointerEvent) => {
      el.style.transform = `translate3d(${e.clientX - 160}px, ${e.clientY - 160}px, 0)`;
      el.style.opacity = "1";
    };
    const leave = () => {
      el.style.opacity = "0";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [mode]);

  if (mode !== "dreamer") return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-80 w-80 rounded-full opacity-0 mix-blend-screen transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle, rgba(255,190,100,0.16), rgba(167,139,250,0.06) 45%, transparent 70%)",
      }}
    />
  );
}
