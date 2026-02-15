import Link from "next/link"
import { formatDate, formatReadingTime, type Post } from "@/lib/content"
import { TagBadge } from "@/components/tag-badge"

interface FeaturedCardProps {
  post: Post
}

export function FeaturedCard({ post }: FeaturedCardProps) {
  return (
    <Link
      href={post.permalink}
      className="group flex flex-col gap-2 rounded-lg border p-5 transition-colors hover:bg-accent/50"
    >
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Featured
      </span>
      <span className="text-lg font-medium group-hover:underline">
        {post.title}
      </span>
      {post.description && (
        <span className="text-sm text-muted-foreground line-clamp-2">
          {post.description}
        </span>
      )}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        {post.metadata.readingTime > 0 && (
          <span>{formatReadingTime(post.metadata.readingTime)}</span>
        )}
      </div>
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} linked={false} />
          ))}
        </div>
      )}
    </Link>
  )
}
