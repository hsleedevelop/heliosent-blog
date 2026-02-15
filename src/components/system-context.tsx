import Link from "next/link"
import type { SectionKey } from "@/lib/sections"
import { getSectionByKey } from "@/lib/sections"
import { getThinkingMode } from "@/lib/thinking-modes"
import { TagBadge } from "@/components/tag-badge"
import { cn } from "@/lib/utils"

interface SystemContextProps {
  section: SectionKey
  tags: string[]
  className?: string
}

export function SystemContext({ section, tags, className }: SystemContextProps) {
  const meta = getSectionByKey(section)
  const mode = getThinkingMode(section)

  return (
    <aside
      className={cn(
        "mt-12 border-t border-border/60 pt-8",
        className,
      )}
    >
      <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        System Context
      </p>

      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex gap-2">
          <dt className="shrink-0 text-muted-foreground">Mode:</dt>
          <dd className="font-medium">{mode.label}</dd>
        </div>

        <div>
          <dd className="text-muted-foreground leading-relaxed">
            {mode.definition}
          </dd>
        </div>

        <div className="flex gap-2">
          <dt className="shrink-0 text-muted-foreground">Section:</dt>
          <dd>
            <Link
              href={meta.href}
              className="underline underline-offset-4 decoration-border hover:decoration-foreground"
            >
              {meta.label}
            </Link>
          </dd>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap items-baseline gap-2">
            <dt className="shrink-0 text-muted-foreground">Tags:</dt>
            <dd className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </dd>
          </div>
        )}
      </dl>
    </aside>
  )
}
