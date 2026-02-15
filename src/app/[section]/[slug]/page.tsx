import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  SECTIONS,
  isValidSection,
  getSectionByKey,
  getPostsBySection,
  getPostBySlug,
  formatDate,
  formatReadingTime,
} from "@/lib/content"
import { TagBadge } from "@/components/tag-badge"

interface PostPageProps {
  params: Promise<{ section: string; slug: string }>
}

export function generateStaticParams() {
  return SECTIONS.flatMap((s) =>
    getPostsBySection(s.key).map((post) => ({
      section: s.key,
      slug: post.slug,
    }))
  )
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { section, slug } = await params
  if (!isValidSection(section)) return {}
  const post = getPostBySlug(section, slug)
  if (!post) return {}
  return {
    title: `${post.title} — Heliosent`,
    description: post.description,
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { section, slug } = await params
  if (!isValidSection(section)) notFound()

  const post = getPostBySlug(section, slug)
  if (!post) notFound()

  const meta = getSectionByKey(section)

  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <Link
          href={`/${section}`}
          className="text-sm text-muted-foreground hover:underline"
        >
          &larr; {meta.label}
        </Link>
        <h1 className="text-xl font-medium tracking-tight">{post.title}</h1>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.metadata.readingTime > 0 && (
            <span>{formatReadingTime(post.metadata.readingTime)}</span>
          )}
        </div>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>
        )}
      </header>

      <div
        className="prose prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}
