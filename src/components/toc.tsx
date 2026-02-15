import type { TocItem } from "@/lib/content"
import { cn } from "@/lib/utils"

interface TocProps {
  items: TocItem[]
  className?: string
}

export function TableOfContents({ items, className }: TocProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Table of contents" className={className}>
      <ul className="space-y-1.5 text-sm">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "block text-muted-foreground hover:text-foreground transition-colors leading-snug",
                item.level === 3 && "pl-3 text-xs",
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export function MobileToc({ items }: TocProps) {
  if (items.length === 0) return null

  return (
    <details className="xl:hidden rounded-md border px-4 py-3">
      <summary className="text-sm font-medium cursor-pointer select-none">
        목차
      </summary>
      <div className="pt-3 pb-1">
        <TableOfContents items={items} />
      </div>
    </details>
  )
}
