"use client";

import clsx from "clsx";
import { useTheme } from "@/contexts/ThemeContext";

export default function RoomHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const { mode } = useTheme();
  const dreamer = mode === "dreamer";
  return (
    <div className={clsx("mb-14", align === "center" && "text-center")}>
      <p
        className={clsx(
          "mb-4 text-xs font-semibold uppercase",
          dreamer
            ? "tracking-[0.5em] text-[#ffd9a0]"
            : "tracking-[0.25em] text-[var(--accent)]"
        )}
        style={dreamer ? { textShadow: "0 0 18px rgba(255,190,100,0.55)" } : undefined}
      >
        {eyebrow}
      </p>
      <h2
        className={clsx(
          "max-w-3xl text-4xl leading-tight md:text-5xl lg:text-6xl",
          dreamer ? "font-black" : "font-semibold tracking-tight",
          align === "center" && "mx-auto"
        )}
        style={
          dreamer
            ? { textShadow: "0 0 40px rgba(167,139,250,0.5), 0 2px 12px rgba(5,8,22,0.9)" }
            : undefined
        }
      >
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "mt-5 max-w-2xl text-base leading-8 md:text-lg",
            dreamer ? "text-[#e4dcff]/80" : "text-neutral-600",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
