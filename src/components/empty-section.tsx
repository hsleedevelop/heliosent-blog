import Link from "next/link"

export function EmptySection() {
  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <p className="text-muted-foreground">아직 글이 없습니다.</p>
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        &larr; 홈으로
      </Link>
    </div>
  )
}
