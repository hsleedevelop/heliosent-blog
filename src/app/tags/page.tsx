import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { getAllTags } from "@/lib/content"
import { type as t } from "@/lib/ui/tokens"

const description = "Browse all tags across HelioSent."

export const metadata: Metadata = {
  title: "Tags",
  description,
  alternates: {
    canonical: "/tags",
  },
  openGraph: {
    title: "Tags",
    description,
    type: "website",
    images: [
      {
        url: "/api/og?title=Tags",
        width: 1200,
        height: 630,
        alt: "HelioSent Tags",
      },
    ],
  },
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div>
      <h1 className={t.h1}>Tags</h1>
      <p className={t.lead}>{tags.length}개의 태그</p>

      {tags.length === 0 ? (
        <p className={t.meta}>아직 태그가 없습니다.</p>
      ) : (
        <div className="mt-8 flex flex-wrap gap-2">
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
