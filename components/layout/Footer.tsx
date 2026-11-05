"use client";

import clsx from "clsx";
import { socials } from "@/data";
import { useTheme } from "@/contexts/ThemeContext";

export default function Footer() {
  const { mode } = useTheme();
  const dreamer = mode === "dreamer";
  return (
    <footer
      className={clsx(
        "border-t py-12",
        dreamer ? "border-[#ffd9a0]/15" : "border-black/10"
      )}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 sm:flex-row">
        <p className="text-sm opacity-70">© 2026 Jiya Sahni</p>
        <div className="flex gap-6 text-sm">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className={clsx(
                "transition-colors",
                dreamer ? "hover:text-[#ffd9a0]" : "hover:text-[var(--accent)]"
              )}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
