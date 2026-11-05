"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { site } from "@/data";
import type { Portal, PointerState } from "@/components/canvas/ArmillarySphere";
import { INTRO_DONE_EVENT } from "@/hooks/useIntroDone";

const ArmillaryCanvas = dynamic(
  () => import("@/components/canvas/ArmillarySphere"),
  { ssr: false }
);

const STORAGE_KEY = "intro-seen";
const FX_KEY = "intro-fx"; // manual choice: "full" | "lite" (persists)
const FX_AUTO_KEY = "intro-fx-auto"; // automatic downgrade (this session)

type Tier = "full" | "lite";

const PORTALS: readonly Portal[] = [
  { id: "lab", label: "The Lab", hash: "#research" },
  { id: "workshop", label: "The Workshop", hash: "#projects" },
  { id: "sketchbook", label: "The Sketchbook", hash: "#creative" },
  { id: "story", label: "The Story", hash: "#about" },
];

// Where each pearl sits on the lite (non-WebGL) sphere, in % of its box.
const LITE_PEARLS: Record<string, { left: string; top: string }> = {
  lab: { left: "20%", top: "24%" },
  workshop: { left: "82%", top: "30%" },
  sketchbook: { left: "16%", top: "76%" },
  story: { left: "80%", top: "78%" },
};

function detectTier(): Tier {
  try {
    const manual = localStorage.getItem(FX_KEY);
    if (manual === "full" || manual === "lite") return manual;
    if (sessionStorage.getItem(FX_AUTO_KEY) === "lite") return "lite";
  } catch {
    /* storage unavailable */
  }
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "lite";

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean };
  };
  if (nav.connection?.saveData) return "lite";
  if (nav.deviceMemory && nav.deviceMemory <= 4) return "lite";
  if (nav.hardwareConcurrency && nav.hardwareConcurrency <= 4) return "lite";

  try {
    const c = document.createElement("canvas");
    if (!(c.getContext("webgl2") || c.getContext("webgl"))) return "lite";
  } catch {
    return "lite";
  }
  return "full";
}

/** Cheap, animated-with-CSS stand-in for the 3D sphere. */
function LiteSphere({
  onSelect,
  hovered,
  onHover,
}: {
  onSelect: (id: string) => void;
  hovered: string | null;
  onHover: (id: string | null) => void;
}) {
  return (
    <div className="absolute left-1/2 top-[52%] aspect-square w-[min(78vw,50vh)] -translate-x-1/2 -translate-y-1/2">
      <svg viewBox="0 0 400 400" className="h-full w-full overflow-visible" aria-hidden>
        <defs>
          <radialGradient id="liteCore">
            <stop offset="0%" stopColor="#e8d5ff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#a78bfa" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="liteGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f3d08a" />
            <stop offset="50%" stopColor="#c9953c" />
            <stop offset="100%" stopColor="#f3d08a" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="170" fill="url(#liteCore)" className="intro-breathe" />
        <g className="intro-spin">
          <ellipse cx="200" cy="200" rx="165" ry="58" fill="none" stroke="url(#liteGold)" strokeWidth="3" />
        </g>
        <g className="intro-spin-rev">
          <ellipse cx="200" cy="200" rx="165" ry="58" fill="none" stroke="url(#liteGold)" strokeWidth="3" transform="rotate(60 200 200)" />
        </g>
        <g className="intro-spin-slow">
          <ellipse cx="200" cy="200" rx="165" ry="58" fill="none" stroke="url(#liteGold)" strokeWidth="3" transform="rotate(120 200 200)" />
        </g>
        <circle cx="200" cy="200" r="38" fill="#efe3ff" className="intro-breathe" />
      </svg>

      <button
        aria-label="Enter the observatory"
        onClick={() => onSelect("core")}
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full"
      />

      {PORTALS.map((p, i) => {
        const pos = LITE_PEARLS[p.id];
        const on = hovered === p.id;
        return (
          <button
            key={p.id}
            aria-label={`Travel to ${p.label}`}
            onClick={() => onSelect(p.id)}
            onPointerEnter={() => onHover(p.id)}
            onPointerLeave={() => onHover(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 p-3"
            style={{ left: pos.left, top: pos.top }}
          >
            <span
              className="intro-breathe block h-4 w-4 rounded-full bg-[#f5ecff]"
              style={{
                boxShadow: on
                  ? "0 0 22px 8px rgba(255,217,160,0.9)"
                  : "0 0 14px 4px rgba(201,163,255,0.8)",
                animationDelay: `${i * 0.6}s`,
              }}
            />
            <span
              className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-[#ffd9a0]"
              style={{ opacity: on ? 1 : 0.55 }}
            >
              {p.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function IntroScene() {
  const [visible, setVisible] = useState(true);
  const [tier, setTier] = useState<Tier | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [entering, setEntering] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState>({ x: 0, y: 0 });

  // Parallax: closer layers travel further than the backdrop.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 50, damping: 18 });
  const sy = useSpring(py, { stiffness: 50, damping: 18 });
  const bgX = useTransform(sx, (v) => v * -12);
  const bgY = useTransform(sy, (v) => v * -8);
  const fgX = useTransform(sx, (v) => v * -30);
  const fgY = useTransform(sy, (v) => v * -16);
  const botX = useTransform(sx, (v) => v * -44);
  const botY = useTransform(sy, (v) => v * -10);

  // Decide tier + skip for returning visitors (deferred: no sync setState in effect).
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (sessionStorage.getItem(STORAGE_KEY)) setVisible(false);
      } catch {
        /* show the intro */
      }
      setTier(detectTier());
    }, 0);
    return () => clearTimeout(t);
  }, []);

  // Lock scrolling while the scene is up.
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (tier !== "full") return;
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    px.set(nx);
    py.set(ny);
    pointer.current = { x: nx, y: -ny };
    const root = rootRef.current;
    if (root) {
      root.style.setProperty("--mx", `${e.clientX}px`);
      root.style.setProperty("--my", `${e.clientY}px`);
      root.style.setProperty("--lit", "1");
    }
  };

  const select = (id: string) => {
    if (entering) return;
    setEntering(true);
    const hash = PORTALS.find((p) => p.id === id)?.hash;
    setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      setVisible(false);
      window.dispatchEvent(new Event(INTRO_DONE_EVENT));
      if (hash) {
        setTimeout(
          () => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }),
          900
        );
      }
    }, 800);
  };

  const downgrade = () => {
    try {
      sessionStorage.setItem(FX_AUTO_KEY, "lite");
    } catch {
      /* ignore */
    }
    setTier("lite");
  };

  const toggleFx = () => {
    const next: Tier = tier === "full" ? "lite" : "full";
    try {
      localStorage.setItem(FX_KEY, next);
      sessionStorage.removeItem(FX_AUTO_KEY);
    } catch {
      /* ignore */
    }
    setTier(next);
  };

  const hoveredPortal = PORTALS.find((p) => p.id === hovered);
  const hint = entering
    ? "Opening the sky…"
    : hoveredPortal
      ? `Travel to ${hoveredPortal.label}`
      : hovered === "core"
        ? "Step inside"
        : "Touch a glowing pearl to travel";

  const full = tier === "full";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro"
          ref={rootRef}
          role="dialog"
          aria-label="Welcome"
          className="fixed inset-0 z-[900] isolate overflow-hidden bg-[#050816] text-[#F8FAFC]"
          style={
            {
              "--mx": "50%",
              "--my": "60%",
              "--lit": "0",
              cursor: hovered ? "pointer" : "default",
            } as React.CSSProperties
          }
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.25,
            transition: { duration: 1.1, ease: [0.4, 0, 0.2, 1] },
          }}
          onPointerMove={onPointerMove}
        >
          {/* 1. Painted backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ x: bgX, y: bgY, scale: 1.06 }}
          >
            <img
              src="/intro/backdrop.webp"
              alt=""
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>

          {/* 2. Lantern cursor: a brightened copy of the painting revealed around the pointer */}
          {full && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              style={{
                x: bgX,
                y: bgY,
                scale: 1.06,
                opacity: "var(--lit)" as unknown as number,
                transition: "opacity 0.8s",
                WebkitMaskImage:
                  "radial-gradient(circle 230px at var(--mx) var(--my), #000 0%, transparent 100%)",
                maskImage:
                  "radial-gradient(circle 230px at var(--mx) var(--my), #000 0%, transparent 100%)",
              }}
            >
              <img
                src="/intro/backdrop.webp"
                alt=""
                decoding="async"
                className="h-full w-full object-cover object-center"
                style={{ filter: "brightness(1.9) saturate(1.35) contrast(1.05)" }}
              />
            </motion.div>
          )}

          {/* 3. Haze + light shaft */}
          <div className="pointer-events-none absolute inset-0 mix-blend-screen">
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
            <div
              className="intro-breathe absolute left-[38%] top-0 h-[75%] w-[26%] opacity-30"
              style={{
                background:
                  "linear-gradient(180deg, rgba(190,170,255,0.55), transparent)",
                clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
              }}
            />
          </div>

          {/* 4. The sphere: WebGL when we can afford it, CSS when we can't */}
          {tier === "full" && (
            <ArmillaryCanvas
              pointer={pointer}
              portals={PORTALS}
              hovered={hovered}
              entering={entering}
              onHover={setHovered}
              onSelect={select}
              onDowngrade={downgrade}
            />
          )}
          {tier === "lite" && (
            <>
              <LiteSphere onSelect={select} hovered={hovered} onHover={setHovered} />
              <div className="pointer-events-none absolute inset-0">
                {Array.from({ length: 16 }).map((_, i) => (
                  <span
                    key={i}
                    className="intro-float absolute h-1.5 w-1.5 rounded-full bg-[#ffd9a0]"
                    style={{
                      left: `${(i * 37) % 100}%`,
                      top: `${40 + ((i * 53) % 50)}%`,
                      animationDelay: `${(i * 0.7) % 6}s`,
                      animationDuration: `${6 + (i % 5)}s`,
                      filter: "blur(1px)",
                    }}
                  />
                ))}
              </div>
            </>
          )}

          {/* 5. Foreground framing (black background removed by 'screen' blending) */}
          <motion.div
            className="pointer-events-none absolute bottom-0 left-0 h-[88%] md:h-full"
            style={{ x: fgX, y: fgY, mixBlendMode: "screen" }}
          >
            <img
              src="/intro/fg-left.webp"
              alt=""
              decoding="async"
              className="h-full w-auto max-w-none object-left"
            />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute bottom-0 right-0 h-[88%] md:h-full"
            style={{ x: fgX, y: fgY, mixBlendMode: "screen" }}
          >
            <img
              src="/intro/fg-right.webp"
              alt=""
              decoding="async"
              className="h-full w-auto max-w-none object-right"
            />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0"
            style={{ x: botX, y: botY, mixBlendMode: "screen", scale: 1.04 }}
          >
            <img
              src="/intro/fg-bottom.webp"
              alt=""
              decoding="async"
              className="w-full"
            />
          </motion.div>

          {/* 6. Warm lantern glow + vignette */}
          {full && (
            <div
              className="pointer-events-none absolute inset-0 mix-blend-screen"
              style={{
                opacity: "var(--lit)",
                transition: "opacity 0.8s",
                background:
                  "radial-gradient(circle 320px at var(--mx) var(--my), rgba(255,190,100,0.16), transparent 70%)",
              }}
            />
          )}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 55%, transparent 45%, rgba(5,8,22,0.75) 100%)",
            }}
          />

          {/* 7. Words */}
          <div className="pointer-events-none relative z-10 flex flex-col items-center px-6 pt-[6vh] text-center">
            <motion.p
              className="mb-4 text-[11px] uppercase tracking-[0.55em] text-[#ffd9a0]"
              style={{ textShadow: "0 0 18px rgba(255,190,100,0.6)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Welcome to the observatory
            </motion.p>
            <motion.h1
              className="text-4xl font-black sm:text-6xl lg:text-7xl"
              style={{
                fontFamily: "var(--font-heading)",
                textShadow: "0 0 40px rgba(167,139,250,0.7), 0 2px 12px rgba(5,8,22,0.9)",
              }}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, delay: 0.8 }}
            >
              {site.name}
            </motion.h1>
            {site.tagline && (
              <motion.p
                className="mt-4 hidden max-w-lg text-sm opacity-80 sm:block"
                style={{ textShadow: "0 2px 10px rgba(5,8,22,0.9)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 1.2, delay: 1.6 }}
              >
                {site.tagline}
              </motion.p>
            )}
          </div>

          <div className="absolute inset-x-0 bottom-[14vh] z-10 flex flex-col items-center gap-4 px-6 md:bottom-[26vh]">
            <AnimatePresence mode="wait">
              <motion.p
                key={hint}
                className="pointer-events-none text-[11px] uppercase tracking-[0.3em] text-[#d8c4ff]"
                style={{ textShadow: "0 2px 10px rgba(5,8,22,0.95)" }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                {hint}
              </motion.p>
            </AnimatePresence>
            <motion.button
              onClick={() => select("core")}
              className="rounded-full border border-[#ffd9a0]/60 bg-[#0b0820]/60 px-8 py-3 text-xs uppercase tracking-[0.35em] text-[#ffe9c2] transition-colors hover:bg-[#7C3AED]/70"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.2 }}
            >
              Enter the Observatory
            </motion.button>
          </div>

          {/* Corner controls */}
          <button
            onClick={() => select("core")}
            className="absolute left-5 top-5 z-20 rounded-full border border-white/20 bg-[#0b0820]/40 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            Skip intro
          </button>
          {tier && (
            <button
              onClick={toggleFx}
              className="absolute right-5 top-5 z-20 rounded-full border border-white/20 bg-[#0b0820]/40 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              {full ? "Reduce effects" : "Full effects"}
            </button>
          )}

          {/* Flash when we step through */}
          <motion.div
            className="pointer-events-none absolute inset-0 bg-[#FFD166]"
            initial={{ opacity: 0 }}
            animate={{ opacity: entering ? [0, 0.4, 0] : 0 }}
            transition={{ duration: 0.8 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
