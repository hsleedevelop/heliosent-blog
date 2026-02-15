const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://heliosent.com"

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
}

export function generateArticleJsonLd(post: ArticlePost): ArticleJsonLdData {
  const data: ArticleJsonLdData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Person", name: "HelioSent" },
    publisher: { "@type": "Organization", name: "HelioSent" },
    keywords: post.tags,
    articleSection: post.section,
    url: SITE_URL + post.permalink,
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
