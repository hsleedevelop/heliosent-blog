import Link from "next/link"
import type { Post } from "@/lib/content"
import { cn } from "@/lib/utils"

interface SeriesNavProps {
  seriesName: string
  posts: Post[]
  currentSlug: string
}

export function SeriesNav({ seriesName, posts, currentSlug }: SeriesNavProps) {
  if (posts.length <= 1) return null

  return (
    <div className="rounded-md border px-4 py-3">
      <p className="text-sm font-medium">
        시리즈: {seriesName}
      </p>
      <ol className="mt-2 space-y-1 text-sm">
        {posts.map((post, i) => {
          const isCurrent = post.slug === currentSlug
          return (
            <li key={post.slug} className="flex items-baseline gap-2">
              <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                {i + 1}.
              </span>
              {isCurrent ? (
                <span className="font-medium">{post.title}</span>
              ) : (
                <Link
                  href={post.permalink}
                  className={cn(
                    "text-muted-foreground hover:text-foreground transition-colors",
                    "line-clamp-1",
                  )}
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
