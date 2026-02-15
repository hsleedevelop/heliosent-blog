import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  SECTIONS,
  isValidSection,
  getPostsBySection,
  getPostBySlug,
  getAdjacentPosts,
  getSeriesPosts,
  extractToc,
  extractDesignNotes,
  formatDate,
  formatReadingTime,
} from "@/lib/content"
import { getThinkingMode } from "@/lib/thinking-modes"
import { getRelatedPosts } from "@/lib/related"
import { ArticleJsonLd } from "@/lib/structured-data"
import { Badge } from "@/components/ui/badge"
import { TableOfContents, MobileToc } from "@/components/toc"
import { ProseContent } from "@/components/prose-content"
import { PrevNext } from "@/components/prev-next"
import { SeriesBlock } from "@/components/series-block"
import { ThinkingModeBadge } from "@/components/thinking-mode-badge"
import { RelatedPosts } from "@/components/related-posts"
import { SystemContext } from "@/components/system-context"
import { DesignNotes } from "@/components/design-notes"
import { layout, type as t, prose } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"

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

  const mode = getThinkingMode(section)
  const ogUrl = `/api/og?title=${encodeURIComponent(post.title)}&section=${section}&mode=${encodeURIComponent(mode.label)}`

  return {
    title: `${post.title} — Heliosent`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      images: [{ url: ogUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogUrl],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { section, slug } = await params
  if (!isValidSection(section)) notFound()

  const post = getPostBySlug(section, slug)
  if (!post) notFound()

  const { main: mainContent, notes: designNotesHtml } = post.designNotes
    ? extractDesignNotes(post.content)
    : { main: post.content, notes: null }

  const tocItems = extractToc(mainContent)
  const { prev, next } = getAdjacentPosts(section, slug)
  const seriesPosts = post.series
    ? getSeriesPosts(section, post.series)
    : []
  const relatedPosts = getRelatedPosts(slug, section, post.tags)

  return (
    <div className={layout.mainWithTocGrid}>
      <article>
        <ArticleJsonLd post={post} />
        <h1 className={t.h1}>{post.title}</h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <ThinkingModeBadge section={section} />
          {post.version && (
            <span className="text-xs text-muted-foreground">
              Version: {post.version}
            </span>
          )}
          {post.updated && (
            <span className="text-xs text-muted-foreground">
              Last updated: {formatDate(post.updated)}
            </span>
          )}
        </div>

        <div className={cn(t.meta, "mt-3 flex flex-wrap gap-x-4 gap-y-2")}>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.metadata.readingTime > 0 && (
            <span>{formatReadingTime(post.metadata.readingTime)}</span>
          )}
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>

        {post.series && seriesPosts.length > 1 && (
          <div className="mt-6">
            <SeriesBlock
              seriesName={post.series}
              posts={seriesPosts.map((p) => ({
                title: p.title,
                href: p.permalink,
                slug: p.slug,
              }))}
              currentSlug={post.slug}
            />
          </div>
        )}

        <MobileToc items={tocItems} />

        <ProseContent
          html={mainContent}
          className={cn(
            "mt-8",
            prose.wrap,
            prose.calm,
            prose.a,
            prose.codeInline,
            prose.pre,
          )}
        />

        {designNotesHtml && <DesignNotes html={designNotesHtml} />}

        <RelatedPosts posts={relatedPosts} />

        <SystemContext section={section} tags={post.tags} />

        <div className="mt-10">
          <PrevNext
            prev={prev ? { title: prev.title, href: prev.permalink } : null}
            next={next ? { title: next.title, href: next.permalink } : null}
          />
        </div>
      </article>

      <TableOfContents items={tocItems} />
    </div>
  )
}
