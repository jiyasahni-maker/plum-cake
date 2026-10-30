"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  THEME_TRANSITION_COVER_MS,
  THEME_TRANSITION_REVEAL_MS,
  useTheme,
} from "@/contexts/ThemeContext";

const COPY = {
  dreamer: {
    label: "Entering the Observatory",
    bg: "#050816",
    glow: "#C084FC",
  },
  engineer: {
    label: "Entering the Studio",
    bg: "#FFFFFF",
    glow: "#2563EB",
  },
} as const;

/**
 * A full-screen iris wipe that plays over the ThemeContext's transition
 * window. The circle grows to fully cover the viewport in the *incoming*
 * mode's color (masking the underlying theme swap), then contracts away
 * to reveal the new mode already in place. This is the "entrapment"
 * moment — it should feel like stepping through a door, not a CSS toggle.
 */
export default function ModeTransition() {
  const { isTransitioning, transitioningTo } = useTheme();
  const target = transitioningTo ? COPY[transitioningTo] : null;

  const coverS = THEME_TRANSITION_COVER_MS / 1000;
  const revealS = THEME_TRANSITION_REVEAL_MS / 1000;

  return (
    <AnimatePresence>
      {isTransitioning && target && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center"
          style={{ backgroundColor: target.bg }}
          initial={{ clipPath: "circle(0% at 90% 6%)" }}
          animate={{
            clipPath: [
              "circle(0% at 90% 6%)",
              "circle(150% at 90% 6%)",
              "circle(150% at 90% 6%)",
              "circle(0% at 50% 50%)",
            ],
          }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{
            duration: coverS + revealS,
            times: [
              0,
              coverS / (coverS + revealS),
              coverS / (coverS + revealS) + 0.08,
              1,
            ],
            ease: "easeInOut",
          }}
        >
          <motion.span
            className="text-sm tracking-[0.35em] uppercase"
            style={{ color: target.glow, fontFamily: "var(--font-heading)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{
              duration: coverS + revealS,
              times: [0, coverS / (coverS + revealS), 0.85, 1],
            }}
          >
            {target.label}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
