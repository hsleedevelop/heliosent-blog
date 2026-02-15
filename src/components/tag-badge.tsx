import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { normalizeTag } from "@/lib/content"

interface TagBadgeProps {
  tag: string
  linked?: boolean
  className?: string
}

export function TagBadge({ tag, linked = true, className }: TagBadgeProps) {
  if (linked) {
    return (
      <Badge variant="secondary" asChild className={className}>
        <Link href={`/tags/${normalizeTag(tag)}`}>{tag}</Link>
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className={className}>
      {tag}
    </Badge>
  )
}
