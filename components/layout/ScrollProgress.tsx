"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export default function ScrollProgress() {
  const { mode } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left"
      style={{
        scaleX,
        background:
          mode === "dreamer"
            ? "linear-gradient(90deg,#7C3AED,#C084FC,#FFD166)"
            : "#2563eb",
      }}
    />
  );
}
