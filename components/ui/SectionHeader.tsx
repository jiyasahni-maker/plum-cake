import clsx from "clsx";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={clsx("mb-16", {
        "text-left": align === "left",
        "text-center": align === "center",
      })}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.35em] text-[var(--accent)]">
          {eyebrow}
        </p>
      )}

      <h2 className="text-4xl font-black leading-tight md:text-5xl lg:text-6xl">
        {title}
      </h2>

      {description && (
        <p
          className={clsx(
            "mt-5 text-base leading-8 opacity-80 md:text-lg",
            {
              "mx-auto max-w-2xl": align === "center",
              "max-w-3xl": align === "left",
            }
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}