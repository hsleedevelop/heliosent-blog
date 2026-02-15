import Link from "next/link"
import { getAllThinkingModes } from "@/lib/thinking-modes"
import { cn } from "@/lib/utils"

export function ThinkingModesStrip() {
  const modes = getAllThinkingModes()

  return (
    <section>
      <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Thinking Modes
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border/60 sm:grid-cols-5">
        {modes.map((mode) => (
          <Link
            key={mode.section}
            href={mode.href}
            className={cn(
              "flex flex-col gap-1 px-4 py-3 text-left transition-colors hover:bg-muted/40",
              "border-b border-border/60 sm:border-b-0 sm:border-r last:border-0",
            )}
          >
            <span className="text-sm font-medium">{mode.label}</span>
            <span className="text-xs leading-relaxed text-muted-foreground">
              {mode.definition}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
