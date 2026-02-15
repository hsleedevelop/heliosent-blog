"use client"

import { useEffect, useState } from "react"
import { toc as tocTokens } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

interface TocActiveListProps {
  items: TocItem[]
}

export function TocActiveList({ items }: TocActiveListProps) {
  const [activeId, setActiveId] = useState<string | undefined>(undefined)

  useEffect(() => {
    const ids = items.map((i) => i.id)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
            break
          }
        }
      },
      { rootMargin: "-80px 0px -80% 0px", threshold: 0 },
    )

    for (const el of elements) {
      observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  return (
    <ul className={tocTokens.list}>
      {items.map((item) => {
        const isActive = activeId === item.id
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                isActive ? tocTokens.itemActive : tocTokens.item,
                item.level === 3 && !isActive && tocTokens.itemH3,
                item.level === 3 && isActive && "pl-6",
              )}
            >
              {item.text}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
