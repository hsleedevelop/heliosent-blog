import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Post } from "@/lib/content"

interface PostNavigationProps {
  prev: Post | null
  next: Post | null
}

export function PostNavigation({ prev, next }: PostNavigationProps) {
  if (!prev && !next) return null

  return (
    <nav
      aria-label="Post navigation"
      className="flex items-stretch gap-4 border-t pt-6"
    >
      {prev ? (
        <Link
          href={prev.permalink}
          className="group flex flex-1 items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="size-4 shrink-0" />
          <span className="line-clamp-1">{prev.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.permalink}
          className="group flex flex-1 items-center justify-end gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
        >
          <span className="line-clamp-1">{next.title}</span>
          <ChevronRight className="size-4 shrink-0" />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}
