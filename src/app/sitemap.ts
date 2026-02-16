import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/site/config"
import { SECTIONS, getAllPosts, getAllTags } from "@/lib/content"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/tags`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ]

  const sectionPages: MetadataRoute.Sitemap = SECTIONS.map((s) => ({
    url: `${siteConfig.url}${s.href}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  const postPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteConfig.url}${post.permalink}`,
    lastModified: new Date(post.updated || post.date),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.9 : 0.6,
  }))

  const tagPages: MetadataRoute.Sitemap = getAllTags().map(({ tag }) => ({
    url: `${siteConfig.url}/tags/${tag}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }))

  return [...staticPages, ...sectionPages, ...postPages, ...tagPages]
}
