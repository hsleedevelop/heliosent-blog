import Link from "next/link"
import { ui, type as t, toc } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"

interface SeriesItem {
  title: string
  href: string
  slug: string
}

interface SeriesBlockProps {
  seriesName: string
  posts: SeriesItem[]
  currentSlug: string
}

export function SeriesBlock({
  seriesName,
  posts,
  currentSlug,
}: SeriesBlockProps) {
  if (posts.length <= 1) return null

  return (
    <div className={cn(ui.card, "p-4 sm:p-5")}>
      <p className={cn(t.meta, "mb-3")}>시리즈: {seriesName}</p>
      <ol className="space-y-1">
        {posts.map((post) => {
          const isCurrent = post.slug === currentSlug
          return (
            <li key={post.slug}>
              {isCurrent ? (
                <span className={toc.itemActive}>{post.title}</span>
              ) : (
                <Link
                  href={post.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {post.title}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
