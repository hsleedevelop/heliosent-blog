import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getAllTags } from "@/lib/content"

export const metadata: Metadata = {
  title: "Tags — Heliosent",
  description: "모든 태그 목록",
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-lg font-medium tracking-tight">Tags</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {tags.length}개의 태그
        </p>
      </header>

      {tags.length === 0 ? (
        <p className="text-muted-foreground">아직 태그가 없습니다.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <Badge key={tag} variant="secondary" asChild>
              <Link href={`/tags/${tag}`}>
                {tag} ({count})
              </Link>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
