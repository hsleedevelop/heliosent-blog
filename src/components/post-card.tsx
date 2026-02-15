import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ui, type as t } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"

interface PostCardProps {
  title: string
  href: string
  summary?: string
  date: string
  readingTime?: number
  tags?: string[]
  section?: string
  featured?: boolean
  series?: string
}

export function PostCard({
  title,
  href,
  summary,
  date,
  readingTime,
  tags,
}: PostCardProps) {
  return (
    <div className={cn(ui.card, ui.cardP, ui.cardHover)}>
      <Link
        href={href}
        className="text-lg font-semibold tracking-tight hover:underline"
      >
        {title}
      </Link>

      {summary && <p className={cn(t.meta, "mt-2")}>{summary}</p>}

      <div className={cn(t.meta, "mt-3 flex flex-wrap gap-x-4 gap-y-1")}>
        <time dateTime={date}>{formatDate(date)}</time>
        {readingTime != null && readingTime > 0 && (
          <span>{Math.ceil(readingTime)}분 읽기</span>
        )}
      </div>

      {tags && tags.length > 0 && (
        <div className={ui.tagWrap}>
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
