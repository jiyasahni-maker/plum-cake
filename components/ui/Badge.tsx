import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center",
        "rounded-full",
        "bg-[var(--primary)]/10",
        "px-3 py-1",
        "text-sm font-medium",
        "text-[var(--primary)]",
        className
      )}
    >
      {children}
    </span>
  );
}