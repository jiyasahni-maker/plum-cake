"use client";

import { motion } from "framer-motion";
import { about, site } from "@/data";
import { useTheme } from "@/contexts/ThemeContext";
import { useIntroDone } from "@/hooks/useIntroDone";
import HeroActions from "./HeroActions";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroContent() {
  const { mode } = useTheme();
  const done = useIntroDone();
  const dreamer = mode === "dreamer";

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: done ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 1.1, delay, ease },
  });

  if (dreamer) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.p
          {...rise(0.2)}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.55em] text-[#ffd9a0]"
          style={{ textShadow: "0 0 18px rgba(255,190,100,0.6)" }}
        >
          Hello, traveler
        </motion.p>
        <motion.h1
          {...rise(0.4)}
          className="text-5xl font-black leading-none sm:text-7xl lg:text-8xl"
          style={{
            fontFamily: "var(--font-heading)",
            textShadow:
              "0 0 50px rgba(167,139,250,0.75), 0 2px 14px rgba(5,8,22,0.95)",
          }}
        >
          {site.name}
        </motion.h1>
        <motion.p
          {...rise(0.7)}
          className="mt-8 max-w-2xl text-lg leading-8 text-[#efe8ff]/90"
          style={{ textShadow: "0 2px 12px rgba(5,8,22,0.95)" }}
        >
          {site.tagline}
        </motion.p>
        <motion.div {...rise(0.95)}>
          <HeroActions />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
      <motion.p
        {...rise(0.1)}
        className="mb-5 text-sm font-medium text-neutral-500"
      >
        {about.headline}
      </motion.p>
      <motion.h1
        {...rise(0.25)}
        className="bg-gradient-to-b from-neutral-950 to-neutral-600 bg-clip-text text-6xl font-semibold leading-[1.02] tracking-tight text-transparent sm:text-8xl lg:text-9xl"
      >
        {site.name}.
      </motion.h1>
      <motion.p
        {...rise(0.45)}
        className="mt-8 max-w-2xl text-xl leading-9 text-neutral-600 sm:text-2xl sm:leading-10"
      >
        {site.tagline}
      </motion.p>
      <motion.div {...rise(0.65)}>
        <HeroActions />
      </motion.div>
    </div>
  );
}
