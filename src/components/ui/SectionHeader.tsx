import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
  light?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={cn(centered && "text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "text-xs font-semibold tracking-[0.2em] uppercase mb-3",
            light ? "text-white/60" : "text-[var(--muted)]"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight",
          light ? "text-white" : "text-[var(--foreground)]"
        )}
      >
        {title}
      </h2>
      <div
        className={cn(
          "elegant-divider mt-4",
          centered && "mx-auto",
          light && "bg-white/40"
        )}
      />
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed max-w-2xl",
            centered && "mx-auto",
            light ? "text-white/70" : "text-[var(--muted)]"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
