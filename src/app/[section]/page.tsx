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
    description: meta.description,
  }
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section } = await params
  if (!isValidSection(section)) notFound()

  const meta = getSectionByKey(section)
  const posts = getPostsBySection(section)

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-lg font-medium tracking-tight">{meta.label}</h1>
        {posts.length > 0 && (
          <p className="mt-1 text-sm text-muted-foreground">
            {posts.length}개의 글
          </p>
        )}
      </header>

      {posts.length === 0 ? (
        <EmptySection />
      ) : (
        <ul className="flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
