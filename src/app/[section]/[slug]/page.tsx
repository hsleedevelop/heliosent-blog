import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  SECTIONS,
  isValidSection,
  getSectionByKey,
  getPostsBySection,
  getPostBySlug,
  getAdjacentPosts,
  getSeriesPosts,
  extractToc,
  formatDate,
  formatReadingTime,
} from "@/lib/content"
import { TagBadge } from "@/components/tag-badge"
import { TableOfContents, MobileToc } from "@/components/toc"
import { ProseContent } from "@/components/prose-content"
import { PostNavigation } from "@/components/post-navigation"
import { SeriesNav } from "@/components/series-nav"

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
  const toc = extractToc(post.content)
  const { prev, next } = getAdjacentPosts(section, slug)
  const seriesPosts = post.series
    ? getSeriesPosts(section, post.series)
    : []

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

      <div className="relative">
        <MobileToc items={toc} />

        {post.series && seriesPosts.length > 1 && (
          <div className="mt-4">
            <SeriesNav
              seriesName={post.series}
              posts={seriesPosts}
              currentSlug={post.slug}
            />
          </div>
        )}

        <ProseContent
          html={post.content}
          className="mt-6 prose prose-neutral dark:prose-invert max-w-none"
        />

        {toc.length > 0 && (
          <aside className="hidden xl:block absolute left-full top-0 bottom-0 ml-8 w-48">
            <nav className="sticky top-24">
              <p className="text-xs font-medium text-muted-foreground mb-3">
                목차
              </p>
              <TableOfContents items={toc} />
            </nav>
          </aside>
        )}
      </div>

      <PostNavigation prev={prev} next={next} />
    </article>
  )
}
