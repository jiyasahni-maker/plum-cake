"use client";

import { useState } from "react";
import { navigation } from "@/data";
import { useTheme } from "@/contexts/ThemeContext";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { mode, toggleTheme, isTransitioning } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="mx-auto mt-5 flex h-16 w-[95%] max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/20 px-6 backdrop-blur-xl">

        {/* Logo */}

        <a
          href="#hero"
          className="text-xl font-black tracking-wider"
        >
          JS
        </a>

        {/* Desktop */}

        <div className="hidden items-center gap-8 md:flex">

          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm transition-opacity hover:opacity-60"
            >
              {item.label}
            </a>
          ))}

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            disabled={isTransitioning}
            aria-label={
              mode === "dreamer"
                ? "Switch to studio mode"
                : "Switch to observatory mode"
            }
          >
            {mode === "dreamer" ? "✦" : "☀"}
          </Button>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>

      </nav>

      {menuOpen && (
        <div className="mx-auto mt-3 flex w-[95%] max-w-7xl flex-col rounded-3xl border border-white/10 bg-black/40 p-6 backdrop-blur-xl md:hidden">

          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-3"
            >
              {item.label}
            </a>
          ))}

        </div>
      )}
    </header>
  );
}