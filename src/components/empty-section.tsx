import Link from "next/link"
import { ui, type as t } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"

export function EmptySection() {
  return (
    <div className={cn(ui.card, ui.cardP, "mt-8 text-center")}>
      <p className={t.meta}>아직 글이 없습니다.</p>
      <Link href="/" className={cn(t.link, "mt-2 inline-block text-sm")}>
        &larr; 홈으로
      </Link>
    </div>
  )
}
