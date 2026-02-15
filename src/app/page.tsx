import Link from "next/link"
import { getFeaturedPost, getLatestBySection } from "@/lib/content"
import { FeaturedCard } from "@/components/featured-card"
import { PostCard } from "@/components/post-card"

export default function Home() {
  const featured = getFeaturedPost()
  const sections = getLatestBySection(3)

  return (
    <div className="flex flex-col gap-10">
      {featured && <FeaturedCard post={featured} />}

      {sections.map((group) => (
        <section key={group.section} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">{group.label}</h2>
            <Link
              href={`/${group.section}`}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              전체 보기 &rarr;
            </Link>
          </div>
          <ul className="flex flex-col gap-4">
            {group.posts.map((post) => (
              <li key={post.slug}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      {sections.length === 0 && !featured && (
        <p className="text-muted-foreground">아직 글이 없습니다.</p>
      )}
    </div>
  )
}
