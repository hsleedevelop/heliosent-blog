import Link from "next/link"
import { formatDate, formatReadingTime, type Post } from "@/lib/content"
import { TagBadge } from "@/components/tag-badge"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={post.permalink} className="group flex flex-col gap-1.5">
      <span className="font-medium group-hover:underline">{post.title}</span>
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
