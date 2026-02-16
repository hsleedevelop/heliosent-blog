import type { Metadata } from "next"
import Link from "next/link"
import { getFeaturedPost, getLatestBySection } from "@/lib/content"
import { PostCard } from "@/components/post-card"
import { ThinkingModesStrip } from "@/components/thinking-modes-strip"
import { siteConfig } from "@/lib/site/config"
import { type as t } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
}

export default function Home() {
  const featured = getFeaturedPost()
  const sections = getLatestBySection(3)

  return (
    <div className="flex flex-col gap-10">
      {featured && (
        <PostCard
          title={featured.title}
          href={featured.permalink}
          summary={featured.description}
          date={featured.date}
          readingTime={featured.metadata.readingTime}
          tags={featured.tags}
          featured
        />
      )}

      <ThinkingModesStrip />

      {sections.map((group) => (
        <section key={group.section} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">{group.label}</h2>
            <Link
              href={`/${group.section}`}
              className={cn(t.meta, "hover:text-foreground transition-colors")}
            >
              전체 보기 &rarr;
            </Link>
          </div>
          <ul className="space-y-4">
            {group.posts.map((post) => (
              <li key={post.slug}>
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
        </section>
      ))}

      {sections.length === 0 && !featured && (
        <p className={t.meta}>아직 글이 없습니다.</p>
      )}
    </div>
  )
}
