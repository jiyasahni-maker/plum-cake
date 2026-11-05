"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { about } from "@/data";
import { useTheme } from "@/contexts/ThemeContext";
import Room from "@/components/rooms/Room";
import RoomHeading from "@/components/rooms/RoomHeading";
import Reveal from "@/components/rooms/Reveal";
import Glass from "@/components/rooms/Glass";

/** Your portrait in a gilded arch. Falls back to monogram until /rooms/portrait.webp exists. */
function Portrait() {
  const { mode } = useTheme();
  const dreamer = mode === "dreamer";
  const [hasImage, setHasImage] = useState(true);
  const imgRef = useRef<HTMLImageElement>(null);

  // onError can fire before hydration, so also check once mounted.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) {
      const t = setTimeout(() => setHasImage(false), 0);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div
      className={clsx(
        "mx-auto aspect-[3/4] w-full max-w-sm p-[3px]",
        dreamer
          ? "rounded-t-[999px] rounded-b-3xl bg-gradient-to-b from-[#ffd9a0] via-[#b8863b] to-[#ffd9a0] shadow-[0_0_60px_rgba(255,190,100,0.28)]"
          : "rounded-3xl bg-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      )}
    >
      <div
        className={clsx(
          "relative flex h-full w-full items-center justify-center overflow-hidden",
          dreamer
            ? "rounded-t-[999px] rounded-b-[22px] bg-[radial-gradient(circle_at_50%_30%,#2a1f5c,#0b0820)]"
            : "rounded-[22px] bg-gradient-to-b from-neutral-100 to-neutral-200"
        )}
      >
        {hasImage ? (
          <img
            ref={imgRef}
            src="/rooms/portrait.webp"
            alt="Portrait of Jiya Sahni"
            onError={() => setHasImage(false)}
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            className={clsx(
              "text-7xl font-black",
              dreamer ? "text-[#ffd9a0]/80" : "text-neutral-400"
            )}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            JS
          </span>
        )}
      </div>
    </div>
  );
}

export default function About() {
  const { mode } = useTheme();
  const dreamer = mode === "dreamer";

  return (
    <Room id="about" image="/rooms/about.webp">
      <div className="grid items-center gap-14 md:grid-cols-5 md:gap-16">
        <Reveal className="md:col-span-2">
          <Portrait />
        </Reveal>

        <div className="md:col-span-3">
          <Reveal>
            <RoomHeading eyebrow={about.eyebrow} title={about.title} />
          </Reveal>

          <div className="space-y-6">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.12 * (i + 1)}>
                <p
                  className={clsx(
                    "text-lg leading-8",
                    dreamer
                      ? "text-[#e4dcff]/85"
                      : "text-xl leading-9 text-neutral-600"
                  )}
                  style={
                    dreamer ? { textShadow: "0 2px 10px rgba(5,8,22,0.9)" } : undefined
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {about.highlights.map((h, i) => (
              <Reveal key={h.label} delay={0.15 * i}>
                <Glass className="h-full !p-5">
                  <p
                    className={clsx(
                      "mb-2 text-[10px] font-semibold uppercase tracking-[0.3em]",
                      dreamer ? "text-[#ffd9a0]" : "text-[var(--accent)]"
                    )}
                  >
                    {h.label}
                  </p>
                  <p className="text-sm leading-6 opacity-90">{h.value}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Room>
  );
}
