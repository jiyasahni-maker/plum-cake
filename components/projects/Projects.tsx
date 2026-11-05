"use client";

import { useRef } from "react";
import clsx from "clsx";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { projects, type Project } from "@/data";
import { useTheme } from "@/contexts/ThemeContext";
import Room from "@/components/rooms/Room";
import RoomHeading from "@/components/rooms/RoomHeading";
import Reveal from "@/components/rooms/Reveal";

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const { mode } = useTheme();
  const dreamer = mode === "dreamer";
  const ref = useRef<HTMLDivElement>(null);

  // Gentle 3D tilt toward the pointer, plus a lantern-lit edge that follows it.
  const rx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !dreamer) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 9);
    rx.set(-(py - 0.5) * 9);
    el.style.setProperty("--px", `${e.clientX - r.left}px`);
    el.style.setProperty("--py", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  const links = project.links?.length ? (
    <div className="mt-6 flex flex-wrap gap-5">
      {project.links.map((l) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          className={clsx(
            "text-sm font-medium transition-colors",
            dreamer
              ? "text-[#ffd9a0] hover:text-white"
              : "text-[var(--accent)] hover:underline"
          )}
        >
          {l.label} ↗
        </a>
      ))}
    </div>
  ) : null;

  if (!dreamer) {
    return (
      <div
        className={clsx(
          "group flex h-full flex-col rounded-3xl bg-neutral-50 p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.10)] md:p-10"
        )}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          {project.category}
        </p>
        <h3 className={clsx("font-semibold tracking-tight", featured ? "text-4xl" : "text-2xl")}>
          {project.title}
        </h3>
        {project.highlight && (
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-6xl font-semibold tracking-tight">{project.highlight.value}</span>
            <span className="max-w-[14rem] text-sm leading-5 text-neutral-500">
              {project.highlight.label}
            </span>
          </div>
        )}
        <p className="mt-5 text-base leading-7 text-neutral-600">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="rounded-full bg-black/5 px-3 py-1 text-xs text-neutral-600">
              {t}
            </span>
          ))}
        </div>
        {links}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group relative h-full rounded-3xl p-px"
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1000,
        background:
          "linear-gradient(135deg, rgba(255,217,160,0.4), rgba(124,58,237,0.25) 55%, rgba(255,217,160,0.25))",
      }}
    >
      {/* Edge glow that follows the pointer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle 240px at var(--px, 50%) var(--py, 50%), rgba(255,200,120,0.75), transparent 65%)",
        }}
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[23px] bg-[#0b0820]/85 p-7 backdrop-blur-md md:p-9">
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle 220px at var(--px, 50%) var(--py, 50%), rgba(255,217,160,0.09), transparent 70%)",
          }}
        />
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#ffd9a0]">
          {project.category}
        </p>
        <h3 className={clsx("leading-tight", featured ? "text-3xl md:text-4xl" : "text-2xl")}>
          {project.title}
        </h3>

        {project.highlight && (
          <div className="mt-6 flex items-center gap-4">
            <span
              className="text-6xl font-black text-[#ffd9a0]"
              style={{
                fontFamily: "var(--font-heading)",
                textShadow: "0 0 30px rgba(255,190,100,0.55)",
              }}
            >
              {project.highlight.value}
            </span>
            <span className="max-w-[14rem] text-sm leading-5 text-[#e4dcff]/75">
              {project.highlight.label}
            </span>
          </div>
        )}

        <p className="mt-5 text-sm leading-7 text-[#e4dcff]/80">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-[#c084fc]/30 bg-[#7C3AED]/15 px-3 py-1 text-[11px] tracking-wide text-[#d8c4ff]"
            >
              {t}
            </span>
          ))}
        </div>
        {links}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { mode } = useTheme();
  const dreamer = mode === "dreamer";

  return (
    <Room id="projects" image="/rooms/projects.webp" veil={0.62}>
      <div>
        <Reveal>
          <RoomHeading
            eyebrow={dreamer ? "The Workshop" : "Work"}
            title={dreamer ? "Things built after dark." : "Selected projects."}
            description={
              dreamer
                ? "From research to prototypes: each one started as a question and ended as something you can open."
                : undefined
            }
          />
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal
              key={p.id}
              delay={0.08 * (i % 3)}
              className={clsx(i === 0 && "lg:col-span-2")}
            >
              <ProjectCard project={p} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </Room>
  );
}
