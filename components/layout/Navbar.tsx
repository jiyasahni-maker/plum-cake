"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { navigation } from "@/data";
import { useTheme } from "@/contexts/ThemeContext";

const SECTION_IDS = ["hero", ...navigation.map((n) => n.href.slice(1))];

function ModeSwitch() {
  const { mode, toggleTheme, isTransitioning } = useTheme();
  const dreamer = mode === "dreamer";
  const options = [
    { id: "dreamer", icon: "✦", label: "Observatory" },
    { id: "engineer", icon: "☀", label: "Studio" },
  ] as const;

  return (
    <div
      role="group"
      aria-label="Site mode"
      className={clsx(
        "relative flex items-center rounded-full border p-1",
        dreamer ? "border-[#ffd9a0]/25 bg-black/20" : "border-black/10 bg-black/5"
      )}
    >
      {options.map((o) => {
        const active = mode === o.id;
        return (
          <button
            key={o.id}
            aria-pressed={active}
            aria-label={`${o.label} mode`}
            disabled={isTransitioning}
            onClick={() => {
              if (!active) toggleTheme();
            }}
            className={clsx(
              "relative z-10 flex items-center rounded-full px-3 py-1.5 text-xs transition-colors",
              active
                ? "text-white"
                : dreamer
                  ? "text-white/60 hover:text-white"
                  : "text-neutral-500 hover:text-neutral-900"
            )}
          >
            {active && (
              <motion.span
                layoutId="mode-pill"
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background: dreamer
                    ? "linear-gradient(135deg,#7C3AED,#C084FC)"
                    : "#111827",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span>{o.icon}</span>
            <span className="ml-1.5 hidden lg:inline">{o.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const { mode } = useTheme();
  const dreamer = mode === "dreamer";
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("hero");

  // Highlight the room you're currently standing in.
  useEffect(() => {
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const linkClass = (href: string) => {
    const on = href === `#${active}`;
    return clsx(
      "transition-all duration-300",
      dreamer
        ? clsx(
            "text-[11px] uppercase tracking-[0.25em]",
            on ? "text-[#ffd9a0]" : "text-white/70 hover:text-white"
          )
        : clsx(
            "text-sm",
            on ? "font-medium text-neutral-900" : "text-neutral-500 hover:text-neutral-900"
          )
    );
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav
        className={clsx(
          "mx-auto mt-5 flex h-16 w-[95%] max-w-7xl items-center justify-between rounded-full border px-4 backdrop-blur-xl transition-colors duration-500 md:px-6",
          dreamer
            ? "border-[#ffd9a0]/20 bg-[#0b0820]/55 text-[#F8FAFC] shadow-[0_0_40px_rgba(124,58,237,0.25)]"
            : "border-black/10 bg-white/70 text-[#18181b] shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
        )}
      >
        <a
          href="#hero"
          aria-label="Back to the top"
          className={clsx(
            "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-black tracking-wider",
            dreamer
              ? "border-[#ffd9a0]/50 text-[#ffd9a0] shadow-[0_0_18px_rgba(255,190,100,0.3)]"
              : "border-black/15 text-neutral-900"
          )}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          JS
        </a>

        <div className="hidden items-center gap-9 md:flex">
          {navigation.map((item) => (
            <a key={item.label} href={item.href} className={linkClass(item.href)}>
              {item.label}
              {dreamer && item.href === `#${active}` && (
                <motion.span
                  layoutId="nav-glow"
                  className="mx-auto mt-1 block h-px w-full bg-[#ffd9a0] shadow-[0_0_8px_#ffd9a0]"
                />
              )}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ModeSwitch />
          <button
            className="px-1 text-lg md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={clsx(
              "mx-auto mt-3 flex w-[95%] max-w-7xl flex-col rounded-3xl border p-4 backdrop-blur-xl md:hidden",
              dreamer
                ? "border-[#ffd9a0]/20 bg-[#0b0820]/80 text-white"
                : "border-black/10 bg-white/85 text-neutral-900"
            )}
          >
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={clsx("px-3 py-3", linkClass(item.href))}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
