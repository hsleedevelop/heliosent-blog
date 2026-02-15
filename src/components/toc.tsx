import type { TocItem } from "@/lib/content/toc"
import { layout, toc as tocTokens } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"
import { TocActiveList } from "@/components/toc-active-tracker"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface TocProps {
  items: TocItem[]
}

function StaticTocList({ items }: { items: TocItem[] }) {
  return (
    <ul className={tocTokens.list}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            className={cn(
              tocTokens.item,
              item.level === 3 && tocTokens.itemH3,
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function TableOfContents({ items }: TocProps) {
  if (items.length === 0) return null

  return (
    <aside className={layout.tocCol}>
      <nav className={layout.tocSticky} aria-label="Table of contents">
        <p className={tocTokens.title}>On this page</p>
        <TocActiveList items={items} />
      </nav>
    </aside>
  )
}

export function MobileToc({ items }: TocProps) {
  if (items.length === 0) return null

  return (
    <div className="lg:hidden">
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between text-sm">
            On this page
            <ChevronDown className="size-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-2 pb-4">
          <StaticTocList items={items} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
