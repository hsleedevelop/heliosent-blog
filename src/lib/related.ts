import { getAllPosts, normalizeTag } from "@/lib/content"
import type { Post } from "@/lib/content/types"
import type { Section } from "@/lib/sections"

const NINETY_DAYS_MS = 90 * 24 * 60 * 60 * 1000

export function getRelatedPosts(
  currentSlug: string,
  section: Section,
  tags: string[],
  limit = 3,
): Post[] {
  const allPosts = getAllPosts()
  const now = Date.now()
  const normalizedCurrentTags = tags.map(normalizeTag)

  const scored = allPosts
    .filter((p) => !(p.slug === currentSlug && p.section === section))
    .map((post) => {
      let score = 0

      if (post.section === section) score += 10

      const postTags = post.tags.map(normalizeTag)
      const shared = normalizedCurrentTags.filter((t) => postTags.includes(t)).length
      score += shared * 3

      if (now - new Date(post.date).getTime() < NINETY_DAYS_MS) score += 1

      return { post, score }
    })

  scored.sort((a, b) =>
    b.score !== a.score
      ? b.score - a.score
      : new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
  )

  return scored.slice(0, limit).map((s) => s.post)
}
