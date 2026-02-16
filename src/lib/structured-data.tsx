import { siteConfig } from "@/lib/site/config"

interface ArticlePost {
  title: string
  description?: string
  date: string
  updated?: string
  tags: string[]
  section: string
  permalink: string
}

interface ArticleJsonLdData {
  "@context": string
  "@type": string
  headline: string
  datePublished: string
  dateModified?: string
  author: { "@type": string; name: string }
  publisher: { "@type": string; name: string }
  keywords: string[]
  articleSection: string
  description?: string
  url: string
  mainEntityOfPage: { "@type": string; "@id": string }
  image?: { "@type": string; url: string; width: number; height: number }
}

export function generateArticleJsonLd(post: ArticlePost): ArticleJsonLdData {
  const postUrl = siteConfig.url + post.permalink
  const ogUrl = `${siteConfig.url}/api/og?title=${encodeURIComponent(post.title)}&section=${post.section}`

  const data: ArticleJsonLdData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.author.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    keywords: post.tags,
    articleSection: post.section,
    url: postUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    image: { "@type": "ImageObject", url: ogUrl, width: 1200, height: 630 },
  }

  if (post.updated) {
    data.dateModified = post.updated
  }

  if (post.description) {
    data.description = post.description
  }

  return data
}

export function ArticleJsonLd({ post }: { post: ArticlePost }) {
  const jsonLdData = generateArticleJsonLd(post)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  )
}
