"use client"

import type { SectionKey } from "@/lib/sections"
import { getThinkingMode } from "@/lib/thinking-modes"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface ThinkingModeBadgeProps {
  section: SectionKey
  className?: string
}

export function ThinkingModeBadge({
  section,
  className,
}: ThinkingModeBadgeProps) {
  const mode = getThinkingMode(section)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium tracking-wide",
            mode.classes,
            className,
          )}
        >
          {mode.label}
        </span>
      </TooltipTrigger>
      <TooltipContent side="bottom" sideOffset={6}>
        {mode.definition}
      </TooltipContent>
    </Tooltip>
  )
}
