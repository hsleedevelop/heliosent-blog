import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllTags, getPostsByTag } from "@/lib/content"
import { PostCard } from "@/components/post-card"
import { type as t } from "@/lib/ui/tokens"

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export function generateStaticParams() {
  return getAllTags().map((entry) => ({ tag: entry.tag }))
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  const description = `Posts tagged with "${tag}" on HelioSent.`
  const ogUrl = `/api/og?title=${encodeURIComponent(`#${tag}`)}`

  return {
    title: `#${tag}`,
    description,
    alternates: {
      canonical: `/tags/${tag}`,
    },
    openGraph: {
      title: `#${tag}`,
      description,
      type: "website",
      images: [{ url: ogUrl, width: 1200, height: 630, alt: `#${tag}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `#${tag}`,
      description,
      images: [ogUrl],
    },
  }
}

export default async function TagDetailPage({ params }: TagPageProps) {
  const { tag } = await params
  const posts = getPostsByTag(tag)

  if (posts.length === 0) notFound()

  return (
    <div>
      <h1 className={t.h1}>#{tag}</h1>
      <p className={t.lead}>{posts.length}개의 글</p>

      <ul className="mt-8 space-y-4">
        {posts.map((post) => (
          <li key={`${post.section}-${post.slug}`}>
            <PostCard
              title={post.title}
              href={post.permalink}
              summary={post.description}
              date={post.date}
              readingTime={post.metadata.readingTime}
              tags={post.tags}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
