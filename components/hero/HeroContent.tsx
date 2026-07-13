"use client";

import { motion } from "framer-motion";
import { site } from "@/data";
import HeroActions from "./HeroActions";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

// AppLayout (and therefore Hero) only ever mounts after the moon has been
// clicked, so this animates in on mount — no external "revealed" gate needed.
export default function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto flex max-w-5xl flex-col items-center text-center"
    >
      <motion.p
        variants={item}
        className="mb-6 text-sm font-semibold uppercase tracking-[0.45em] text-[var(--accent)]"
      >
        HELLO.
      </motion.p>

      <motion.h1
        variants={item}
        className="text-5xl font-black leading-none sm:text-7xl lg:text-8xl"
      >
        <span className="mb-4 block text-2xl font-normal tracking-normal">
          I'm
        </span>

        {site.name}
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-8 max-w-2xl text-lg leading-8 opacity-80"
      >
        {site.tagline}
      </motion.p>

      <motion.div variants={item}>
        <HeroActions />
      </motion.div>
    </motion.div>
  );
}