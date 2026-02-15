import Link from "next/link"
import type { SectionMeta } from "@/lib/content"
import { cn } from "@/lib/utils"

interface SystemContextProps {
  section: SectionMeta
  tags: string[]
  className?: string
}

export function SystemContext({ section, tags, className }: SystemContextProps) {
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
          <dt className="text-muted-foreground">Section:</dt>
          <dd>
            <Link
              href={section.href}
              className="underline underline-offset-4 decoration-border hover:decoration-foreground"
            >
              {section.label}
            </Link>
          </dd>
        </div>

        <div>
          <dd className="text-muted-foreground leading-relaxed">
            This post is part of the {section.thinkingMode} in HelioSent.{" "}
            {section.layerDescription}
          </dd>
        </div>

        {tags.length > 0 && (
          <div className="flex gap-2">
            <dt className="text-muted-foreground">Tags:</dt>
            <dd className="text-muted-foreground">
              {tags.join(" · ")}
            </dd>
          </div>
        )}
      </dl>
    </aside>
  )
}
