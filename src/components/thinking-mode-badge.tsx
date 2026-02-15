import type { SectionMeta } from "@/lib/content"
import { cn } from "@/lib/utils"

interface ThinkingModeBadgeProps {
  section: SectionMeta
  className?: string
}

export function ThinkingModeBadge({
  section,
  className,
}: ThinkingModeBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs tracking-wide text-muted-foreground",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-muted-foreground/40" />
      {section.thinkingMode}
    </span>
  )
}
