"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useExperience } from "@/providers/ExperienceProvider";

interface Particle {
  id: number;
  angle: number;
  burstDistance: number;
  size: number;
  delay: number;
}

function useParticles(count: number, seedKey: unknown): Particle[] {
  return useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        angle: Math.random() * Math.PI * 2,
        burstDistance: 30 + Math.random() * 70,
        size: 1.5 + Math.random() * 2.5,
        delay: Math.random() * 0.15,
      })),
    // Re-roll a fresh set each time a burst actually fires
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, seedKey]
  );
}

/**
 * Estimated screen position of the navbar logo, derived from Navbar's own
 * layout classes (mx-auto w-[95%] max-w-7xl, mt-5, px-6). This doesn't need
 * to be pixel-perfect — BrandMark's own layoutId flight handles the precise
 * landing. The particles only need to converge near it for the stream to
 * read as "heading toward the logo."
 */
function estimateLogoTarget() {
  if (typeof window === "undefined") return { x: 60, y: 50 };

  const viewportWidth = window.innerWidth;
  const navWidth = Math.min(viewportWidth * 0.95, 1280);
  const navLeft = (viewportWidth - navWidth) / 2;

  return {
    x: navLeft + 24 + 18, // px-6 inset + half the 36px logo
    y: 20 + 32, // mt-5 + half the h-16 navbar height
  };
}

export default function StardustBurst() {
  const { burstOrigin } = useExperience();
  const particles = useParticles(28, burstOrigin);
  const target = useMemo(estimateLogoTarget, [burstOrigin]);

  return (
    <AnimatePresence>
      {burstOrigin && (
        <div className="pointer-events-none fixed inset-0 z-[300]">
          {particles.map((p) => {
            const burstX = burstOrigin.x + Math.cos(p.angle) * p.burstDistance;
            const burstY = burstOrigin.y + Math.sin(p.angle) * p.burstDistance;

            return (
              <motion.span
                key={p.id}
                className="absolute rounded-full bg-white"
                style={{ width: p.size, height: p.size, top: 0, left: 0 }}
                initial={{
                  x: burstOrigin.x,
                  y: burstOrigin.y,
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  // hold briefly at the burst point, then stream to the logo
                  x: [burstOrigin.x, burstX, burstX, target.x],
                  y: [burstOrigin.y, burstY, burstY, target.y],
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 0.7, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.1,
                  delay: p.delay,
                  times: [0, 0.3, 0.8, 1],
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
}