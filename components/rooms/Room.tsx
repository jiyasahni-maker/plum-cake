"use client";

import { useRef, type ReactNode } from "react";
import clsx from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import Container from "@/components/ui/Container";

// Shown whenever the painted backdrop is missing or still loading.
const FALLBACK =
  "radial-gradient(ellipse at 20% 30%, rgba(124,58,237,0.35), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(20,184,166,0.18), transparent 55%), linear-gradient(180deg, #0a0f2a, #0d0a26)";

// Rooms melt into each other (and into the star field) at their edges.
const EDGE_MASK =
  "linear-gradient(to bottom, transparent 0%, #000 16%, #000 84%, transparent 100%)";

/**
 * One "room" of the observatory: a painted backdrop that drifts as you scroll,
 * a darkening veil so text stays readable, and the content on top.
 * In studio mode it drops the painting and becomes a plain, airy section.
 */
export default function Room({
  id,
  image,
  children,
  className,
  veil = 0.55,
}: {
  id: string;
  image: string;
  children: ReactNode;
  className?: string;
  /** 0-1: how strongly to darken the painting behind text. */
  veil?: number;
}) {
  const { mode } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-7%", "7%"]);

  return (
    <section
      id={id}
      ref={ref}
      className={clsx(
        "relative isolate flex min-h-screen items-center overflow-hidden py-28 md:py-36",
        className
      )}
    >
      {mode === "dreamer" && (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ WebkitMaskImage: EDGE_MASK, maskImage: EDGE_MASK }}
        >
          <motion.div
            className="absolute -inset-y-[9%] inset-x-0"
            style={{
              y,
              backgroundImage: `url(${image}), ${FALLBACK}`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            className="absolute inset-0"
            style={{ background: `rgba(5,8,22,${veil})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(5,8,22,0.7) 100%)",
            }}
          />
        </div>
      )}
      <Container>{children}</Container>
    </section>
  );
}
