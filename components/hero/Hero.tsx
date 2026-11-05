"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Container from "@/components/ui/Container";
import { useTheme } from "@/contexts/ThemeContext";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

// Lets the painting melt into the next room instead of ending on a hard edge.
const BOTTOM_FADE = "linear-gradient(to bottom, #000 72%, transparent 100%)";

export default function Hero() {
  const { mode } = useTheme();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "28%"]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {mode === "dreamer" ? (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ WebkitMaskImage: BOTTOM_FADE, maskImage: BOTTOM_FADE }}
        >
          {/* The same painting as the opening scene, so arriving feels continuous */}
          <motion.div className="absolute inset-0" style={{ y: bgY, scale: 1.1 }}>
            <img
              src="/intro/backdrop.webp"
              alt=""
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>

          <div className="absolute inset-0 mix-blend-screen">
            <div
              className="intro-drift absolute -left-[10%] top-[35%] h-[55%] w-[60%] rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(circle, #7C3AED, transparent 70%)" }}
            />
            <div
              className="intro-drift absolute -right-[10%] top-[20%] h-[50%] w-[55%] rounded-full opacity-25 blur-3xl"
              style={{
                background: "radial-gradient(circle, #14b8a6, transparent 70%)",
                animationDelay: "-6s",
              }}
            />
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-[88%] opacity-70 md:h-full md:opacity-100"
            style={{ y: fgY, mixBlendMode: "screen" }}
          >
            <img
              src="/intro/fg-left.webp"
              alt=""
              decoding="async"
              className="h-full w-auto max-w-none"
            />
          </motion.div>
          <motion.div
            className="absolute bottom-0 right-0 hidden h-full md:block"
            style={{ y: fgY, mixBlendMode: "screen" }}
          >
            <img
              src="/intro/fg-right.webp"
              alt=""
              decoding="async"
              className="h-full w-auto max-w-none"
            />
          </motion.div>

          {/* Veil so the name stays readable over the window */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,8,22,0.5), rgba(5,8,22,0.2) 40%, rgba(5,8,22,0.55)), radial-gradient(ellipse at 50% 50%, rgba(5,8,22,0.55), transparent 65%)",
            }}
          />
        </div>
      ) : (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 28%, rgba(37,99,235,0.10), transparent 70%), radial-gradient(50% 40% at 80% 90%, rgba(124,58,237,0.06), transparent 70%)",
            }}
          />
        </div>
      )}

      <Container className="relative z-10 pt-24">
        <HeroContent />
      </Container>

      <ScrollIndicator />
    </section>
  );
}
