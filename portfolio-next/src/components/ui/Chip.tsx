import { cn } from "@/lib/utils";

interface ChipProps {
  label: string;
  className?: string;
}

/**
 * Skill/tech tag pill — compact, uppercase, tracked, optimized for light-mode Tan background.
 */
export function Chip({ label, className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5",
        "font-sans font-medium text-[11px] tracking-[0.07em] uppercase",
        "border border-space-cadet/15 bg-space-cadet/[0.04] text-space-cadet/80",
        "transition-colors hover:bg-space-cadet/[0.08] hover:border-space-cadet/40 hover:text-space-cadet",
        className
      )}
    >
      {label}
    </span>
  );
}
