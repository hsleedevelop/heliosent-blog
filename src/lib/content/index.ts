import { blogs, essays, labs, architectures, apps } from "#content"
import { SECTIONS } from "@/lib/sections"
import type { Section } from "@/lib/sections"
import type { Post, VelitePost } from "./types"

export { SECTIONS, isValidSection, getSectionByKey } from "@/lib/sections"
export type { Section, SectionKey } from "@/lib/sections"
export type { Post } from "./types"
export { extractToc, type TocItem } from "./toc"

const COLLECTION_MAP: Record<Section, VelitePost[]> = {
  blog: blogs,
  essays: essays,
  labs: labs,
  architecture: architectures,
  apps: apps,
}

function isPublished(post: { draft: boolean }): boolean {
  if (process.env.SHOW_DRAFTS === "true") return true
  return process.env.NODE_ENV !== "production" || !post.draft
}

function byDateDesc(a: { date: string }, b: { date: string }): number {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
}

function toPost(raw: VelitePost, section: Section): Post {
  return { ...raw, section } as Post
}

export function normalizeTag(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9가-힣\-]/g, "")
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatReadingTime(minutes: number): string {
  const rounded = Math.ceil(minutes)
  return `${rounded}분 읽기`
}

export function getPostsBySection(section: Section): Post[] {
  const collection = COLLECTION_MAP[section]
  return collection
    .filter(isPublished)
    .sort(byDateDesc)
    .map((p) => toPost(p, section))
}

export function getPostBySlug(section: Section, slug: string): Post | undefined {
  const collection = COLLECTION_MAP[section]
  const found = collection.find((p) => p.slug === slug && isPublished(p))
  return found ? toPost(found, section) : undefined
}

export function getAllPosts(): Post[] {
  return SECTIONS.flatMap((s) => getPostsBySection(s.key)).sort(byDateDesc)
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const normalized = normalizeTag(tag)
      counts.set(normalized, (counts.get(normalized) ?? 0) + 1)
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

export function getPostsByTag(tag: string): Post[] {
  const normalized = normalizeTag(tag)
  return getAllPosts().filter((post) =>
    post.tags.some((t) => normalizeTag(t) === normalized)
  )
}

export function getAdjacentPosts(
  section: Section,
  slug: string,
): { prev: Post | null; next: Post | null } {
  const posts = getPostsBySection(section)
  const index = posts.findIndex((p) => p.slug === slug)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  }
}

export function getSeriesPosts(section: Section, series: string): Post[] {
  return getPostsBySection(section)
    .filter((p) => p.series === series)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0))
}

export function getFeaturedPost(): Post | undefined {
  return getAllPosts().find((p) => p.featured)
}

export function getLatestBySection(limit = 3): { section: Section; label: string; posts: Post[] }[] {
  return SECTIONS.map((s) => ({
    section: s.key,
    label: s.label,
    posts: getPostsBySection(s.key).slice(0, limit),
  })).filter((g) => g.posts.length > 0)
}
