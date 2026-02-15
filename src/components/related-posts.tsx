import Link from "next/link"
import { formatDate } from "@/lib/content"
import { getSectionByKey } from "@/lib/sections"
import type { Post } from "@/lib/content/types"

interface RelatedPostsProps {
  posts: Post[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <aside className="mt-10 border-t border-border/60 pt-8">
      <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Related Posts
      </h2>
      <ul className="mt-4 space-y-3">
        {posts.map((post) => {
          const sectionMeta = getSectionByKey(post.section)
          const formattedDate = formatDate(post.date)

          return (
            <li key={post.permalink}>
              <Link href={post.permalink} className="group block">
                <span className="text-sm font-medium group-hover:underline underline-offset-4 decoration-border">
                  {post.title}
                </span>
                <div className="mt-0.5 flex gap-2 text-xs text-muted-foreground">
                  <span>{sectionMeta.label}</span>
                  <span>·</span>
                  <time>{formattedDate}</time>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
