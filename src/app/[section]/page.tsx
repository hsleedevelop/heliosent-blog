import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  SECTIONS,
  isValidSection,
  getSectionByKey,
  getPostsBySection,
} from "@/lib/content"
import { PostCard } from "@/components/post-card"
import { EmptySection } from "@/components/empty-section"
import { type as t } from "@/lib/ui/tokens"

interface SectionPageProps {
  params: Promise<{ section: string }>
}

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.key }))
}

export async function generateMetadata({
  params,
}: SectionPageProps): Promise<Metadata> {
  const { section } = await params
  if (!isValidSection(section)) return {}
  const meta = getSectionByKey(section)
  return {
    title: `${meta.label} — Heliosent`,
  }
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params
  if (!isValidSection(section)) notFound()

  const meta = getSectionByKey(section)
  const posts = getPostsBySection(section)

  return (
    <div>
      <h1 className={t.h1}>{meta.label}</h1>
      {posts.length > 0 && (
        <p className={t.lead}>{posts.length}개의 글</p>
      )}

      {posts.length === 0 ? (
        <EmptySection />
      ) : (
        <ul className="mt-8 space-y-4">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard
                title={post.title}
                href={post.permalink}
                summary={post.description}
                date={post.date}
                readingTime={post.metadata.readingTime}
                tags={post.tags}
                section={post.section}
                featured={post.featured}
                series={post.series}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
