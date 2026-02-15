import Link from "next/link"
import { ui, type as t } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"

interface PrevNextItem {
  title: string
  href: string
}

interface PrevNextProps {
  prev: PrevNextItem | null
  next: PrevNextItem | null
}

export function PrevNext({ prev, next }: PrevNextProps) {
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Post navigation"
      className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {prev ? (
        <Link href={prev.href} className={cn(ui.card, "p-4 sm:p-5")}>
          <span className={t.meta}>Prev</span>
          <span className="mt-1 line-clamp-2 text-sm font-medium text-foreground hover:underline">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className={cn(ui.card, "p-4 sm:p-5 text-right")}
        >
          <span className={t.meta}>Next</span>
          <span className="mt-1 line-clamp-2 text-sm font-medium text-foreground hover:underline">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
