"use client";

import dynamic from "next/dynamic";
import { useTheme } from "@/contexts/ThemeContext";

// Three.js/WebGL only makes sense client-side, and there's no reason to
// ship it in the initial bundle before we know which mode is active.
const StarField = dynamic(() => import("@/components/canvas/StarField"), {
  ssr: false,
});

export default function RootBackground() {
  const { mode } = useTheme();

  return (
    <div className="fixed inset-0 -z-50 bg-[var(--bg)] transition-colors duration-500">
      {mode === "dreamer" ? (
        <StarField />
      ) : (
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #111827 1px, transparent 1px), linear-gradient(to bottom, #111827 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      )}
    </div>
  );
}