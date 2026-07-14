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
 *
 * The moon disc itself never sits still: a slow breathing scale/glow loop
 * runs continuously (independent of the reveal transition) so it feels
 * alive at rest, not just during the click animation.
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

          {/* Procedural fine crater speckle — turns noise into scattered
              dark micro-patches, clipped to whatever shape it's drawn on. */}
          <filter id="moon-texture" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="3"
              seed="7"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0.35 0.35 0.35 0 -0.65"
              result="craterAlpha"
            />
            <feComposite in="craterAlpha" in2="SourceGraphic" operator="in" />
          </filter>

          {/* Soft blur for the large maria (dark plain) patches */}
          <filter id="soft-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Outer group: the single reveal transition (fade + slight shrink) */}
        <motion.g
          animate={{ opacity: revealed ? 0 : 1, scale: revealed ? 0.85 : 1 }}
          transition={{ duration: 0.45 }}
          style={{ transformOrigin: "100px 100px" }}
        >
          {/* Inner group: idle breathing loop, always running regardless of reveal */}
          <motion.g
            animate={{ scale: [1, 1.015, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "100px 100px" }}
          >
            <motion.circle
              cx="100"
              cy="100"
              r="96"
              fill="url(#moon-glow)"
              animate={{ opacity: [0.55, 0.95, 0.55] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Base disc */}
            <circle cx="100" cy="100" r="68" fill="#EDE9FB" />

            {/* Large soft maria (lunar plains) */}
            <g filter="url(#soft-blur)" opacity="0.35">
              <ellipse cx="78" cy="82" rx="22" ry="16" fill="#B9B0E0" />
              <ellipse cx="122" cy="108" rx="18" ry="24" fill="#B9B0E0" />
              <ellipse cx="90" cy="132" rx="14" ry="10" fill="#B9B0E0" />
            </g>

            {/* Fine crater speckle overlay */}
            <circle
              cx="100"
              cy="100"
              r="68"
              fill="#6b6491"
              filter="url(#moon-texture)"
              opacity="0.5"
            />
          </motion.g>
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
            color="var(--fg)"
            fill="var(--bg)"
          >
            JS
          </text>
        </motion.g>
      </svg>
    </motion.div>
  );
}