import type { Metadata } from "next"
import Link from "next/link"
import { getAllThinkingModes } from "@/lib/thinking-modes"
import { type as t } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "About — Heliosent",
  description: "What HelioSent is and how it thinks.",
}

export default function AboutPage() {
  const modes = getAllThinkingModes()

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className={t.h1}>About</h1>

      <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground">
        <p>
          HelioSent is an engineering space for structured thinking and applied
          systems. It exists to document decisions, experiments, and reasoning
          over time — not as content, but as records of how things are built.
        </p>
        <p>
          Every post belongs to a thinking mode. Each mode represents a different
          pace and intent: long-form philosophy, rapid experimentation, system
          architecture, product execution, or incremental learning.
        </p>
        <p>
          The structure is deliberate. Writing here is not for audience — it is
          for clarity, accountability, and compounding knowledge.
        </p>
      </div>

      <h2 className={cn(t.h2, "mt-12")}>Thinking Modes</h2>

      <ul className="mt-6 space-y-4">
        {modes.map((mode) => (
          <li key={mode.section} className="flex flex-col gap-1">
            <Link
              href={mode.href}
              className="text-sm font-medium underline underline-offset-4 decoration-border hover:decoration-foreground"
            >
              {mode.label}
            </Link>
            <span className="text-sm text-muted-foreground">
              {mode.definition}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-16 text-xs text-muted-foreground/60">
        Brand Layer v1
      </p>
    </div>
  )
}
