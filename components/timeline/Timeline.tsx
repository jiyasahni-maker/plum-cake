"use client";

import { useRef } from "react";
import clsx from "clsx";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { journey, type JourneyEntry } from "@/data";
import { useTheme } from "@/contexts/ThemeContext";
import Room from "@/components/rooms/Room";
import RoomHeading from "@/components/rooms/RoomHeading";
import Reveal from "@/components/rooms/Reveal";
import Glass from "@/components/rooms/Glass";

const N = journey.length;
const ROW_PX = 260; // height of each milestone on desktop

// Zigzag the stars either side of centre so the path reads as a constellation.
const starX = (i: number) => (i % 2 === 0 ? 44 : 56);
const starY = (i: number) => ((i + 0.5) / N) * 100;
const POINTS = journey.map((_, i) => `${starX(i)},${starY(i)}`).join(" ");

function Card({ entry, align }: { entry: JourneyEntry; align: "left" | "right" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <Glass className={clsx("!p-6", align === "left" && "text-right")}>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#ffd9a0]">
          {entry.period}
          {entry.current && (
            <span className="ml-3 rounded-full border border-[#ffd9a0]/40 px-2 py-0.5 text-[9px] tracking-[0.25em]">
              Now
            </span>
          )}
        </p>
        <h3 className="text-xl leading-snug">{entry.title}</h3>
        {entry.place && (
          <p className="mt-1 text-sm text-[#7be0d2]">{entry.place}</p>
        )}
        <p className="mt-3 text-sm leading-7 text-[#e4dcff]/80">{entry.description}</p>
      </Glass>
    </motion.div>
  );
}

function StarNode({
  i,
  progress,
  current,
}: {
  i: number;
  progress: MotionValue<number>;
  current?: boolean;
}) {
  // A star lights up as the drawn line reaches it.
  const t = N > 1 ? i / (N - 1) : 0;
  const opacity = useTransform(progress, [Math.max(0, t - 0.06), t], [0.3, 1]);
  const scale = useTransform(progress, [Math.max(0, t - 0.06), t], [0.7, 1.15]);
  return (
    <motion.div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${starX(i)}%`, top: `${starY(i)}%`, opacity, scale }}
    >
      <span
        className={clsx("block text-4xl leading-none text-[#ffd9a0]", current && "intro-breathe")}
        style={{ filter: "drop-shadow(0 0 12px rgba(255,190,100,0.9))" }}
        aria-hidden
      >
        ✦
      </span>
    </motion.div>
  );
}

/** Wide screens in Observatory mode: a zigzag constellation drawn as you scroll. */
function Constellation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 60%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });

  return (
    <div
      ref={ref}
      className="relative hidden md:block"
      style={{ height: N * ROW_PX }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <polyline
          points={POINTS}
          fill="none"
          stroke="#C084FC"
          strokeOpacity={0.25}
          strokeWidth={1.5}
          strokeDasharray="4 8"
          vectorEffect="non-scaling-stroke"
        />
        <motion.polyline
          points={POINTS}
          fill="none"
          stroke="#FFD166"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          style={{
            pathLength: progress,
            filter: "drop-shadow(0 0 6px rgba(255,190,100,0.8))",
          }}
        />
      </svg>

      {journey.map((entry, i) => (
        <div key={entry.title}>
          <StarNode i={i} progress={progress} current={entry.current} />
          <div
            className="absolute w-[38%]"
            style={{
              top: `${starY(i)}%`,
              transform: "translateY(-50%)",
              ...(i % 2 === 0 ? { left: 0 } : { right: 0 }),
            }}
          >
            <Card entry={entry} align={i % 2 === 0 ? "left" : "right"} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Phones in Observatory mode, and the whole thing in Studio mode: a simple vertical list. */
function SimpleTimeline({ dreamer }: { dreamer: boolean }) {
  return (
    <ol
      className={clsx(
        "relative mx-auto max-w-3xl border-l pl-8",
        dreamer ? "border-[#ffd9a0]/30 md:hidden" : "border-black/10 md:pl-12"
      )}
    >
      {journey.map((entry, i) => (
        <li key={entry.title} className="relative pb-12 last:pb-0">
          <span
            className={clsx(
              "absolute -left-[calc(2rem+8px)] top-1.5 md:-left-[calc(3rem+8px)]",
              dreamer
                ? "text-xl leading-none text-[#ffd9a0] drop-shadow-[0_0_10px_rgba(255,190,100,0.9)]"
                : clsx(
                    "h-3.5 w-3.5 rounded-full border-2 border-white",
                    entry.current ? "bg-[var(--accent)]" : "bg-neutral-300"
                  )
            )}
            aria-hidden
          >
            {dreamer ? "✦" : null}
          </span>
          <Reveal delay={0.05 * i}>
            <p
              className={clsx(
                "mb-1 text-xs font-semibold uppercase",
                dreamer
                  ? "tracking-[0.3em] text-[#ffd9a0]"
                  : "tracking-[0.2em] text-[var(--accent)]"
              )}
            >
              {entry.period}
            </p>
            <h3
              className={clsx(
                dreamer ? "text-xl" : "text-2xl font-semibold tracking-tight"
              )}
            >
              {entry.title}
            </h3>
            {entry.place && (
              <p className={clsx("mt-1 text-sm", dreamer ? "text-[#7be0d2]" : "text-neutral-500")}>
                {entry.place}
              </p>
            )}
            <p
              className={clsx(
                "mt-3 leading-7",
                dreamer ? "text-sm text-[#e4dcff]/80" : "text-lg leading-8 text-neutral-600"
              )}
            >
              {entry.description}
            </p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export default function Timeline() {
  const { mode } = useTheme();
  const dreamer = mode === "dreamer";

  return (
    <Room id="timeline" image="/rooms/timeline.webp" veil={0.6}>
      <div>
        <Reveal>
          <RoomHeading
            eyebrow={dreamer ? "The Star Chart" : "Journey"}
            title={dreamer ? "Every milestone is a star." : "The path so far."}
            description={
              dreamer
                ? "Follow the line and watch the sky come together."
                : undefined
            }
          />
        </Reveal>
        {dreamer && <Constellation />}
        <SimpleTimeline dreamer={dreamer} />
      </div>
    </Room>
  );
}
