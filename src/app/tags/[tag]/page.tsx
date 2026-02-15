import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllTags, getPostsByTag } from "@/lib/content"
import { PostCard } from "@/components/post-card"

interface TagPageProps {
  params: Promise<{ tag: string }>
}

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }))
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { tag } = await params
  return {
    title: `#${tag} — Heliosent`,
    description: `"${tag}" 태그가 포함된 글 목록`,
  }
}

export default async function TagDetailPage({ params }: TagPageProps) {
  const { tag } = await params
  const posts = getPostsByTag(tag)

  if (posts.length === 0) notFound()

  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="text-lg font-medium tracking-tight">#{tag}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {posts.length}개의 글
        </p>
      </header>

      <ul className="flex flex-col gap-6">
        {posts.map((post) => (
          <li key={`${post.section}-${post.slug}`}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}
