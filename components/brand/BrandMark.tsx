"use client";

import { motion } from "framer-motion";

interface BrandMarkProps {
  /** Rendered size in px — large on the landing overlay, small in the navbar */
  size: number;
  /** true once the moon has become the logo */
  revealed: boolean;
  className?: string;
}

/**
 * A single visual object that plays both roles:
 *  - the full moon on the landing overlay (unrevealed)
 *  - the crescent + "JS" logo mark in the navbar (revealed)
 *
 * Rendered in exactly one place at a time (Moon OR Navbar), sharing
 * layoutId="brand-mark" so Framer Motion animates position/size as one
 * continuous flight between them, while the two inner <motion.g> groups
 * crossfade the artwork (moon disc out, crescent+monogram in).
 */
export default function BrandMark({ size, revealed, className }: BrandMarkProps) {
  return (
    <motion.div
      layoutId="brand-mark"
      layout
      className={className}
      style={{ width: size, height: size }}
      transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.6 }}
    >
      <svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        role="img"
        aria-label="Jiya Sahni — home"
      >
        <defs>
          <radialGradient id="moon-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#e8e4ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#e8e4ff" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="crescent-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD166" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
        </defs>

        {/* Ambient halo — present only while unrevealed */}
        <motion.circle
          cx="100"
          cy="100"
          r="96"
          fill="url(#moon-glow)"
          animate={{ opacity: revealed ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Full moon disc */}
        <motion.g
          animate={{ opacity: revealed ? 0 : 1, scale: revealed ? 0.85 : 1 }}
          transition={{ duration: 0.45 }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <circle cx="100" cy="100" r="68" fill="#F4F1FF" />
          <circle cx="76" cy="72" r="9" fill="#DAD4F7" opacity="0.55" />
          <circle cx="122" cy="92" r="13" fill="#DAD4F7" opacity="0.45" />
          <circle cx="92" cy="128" r="7" fill="#DAD4F7" opacity="0.55" />
          <circle cx="128" cy="138" r="5" fill="#DAD4F7" opacity="0.4" />
        </motion.g>

        {/* Crescent + monogram — the resting logo state */}
        <motion.g
          animate={{ opacity: revealed ? 1 : 0, scale: revealed ? 1 : 1.15 }}
          transition={{ duration: 0.5, delay: revealed ? 0.3 : 0 }}
          style={{ transformOrigin: "100px 100px" }}
        >
          <path
            fillRule="evenodd"
            d="M100 30 a70 70 0 1 0 0 140 a70 70 0 1 0 0 -140
               M117 36 a64 64 0 1 0 0 128 a64 64 0 1 0 0 -128 Z"
            fill="url(#crescent-grad)"
          />
          <text
            x="72"
            y="118"
            fontFamily="var(--font-cinzel), Georgia, serif"
            fontSize="42"
            fontWeight="700"
            fill="var(--bg)"
          >
            JS
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}