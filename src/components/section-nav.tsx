"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SECTIONS } from "@/lib/sections"
import { cn } from "@/lib/utils"

export function SectionNav() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-4">
      {SECTIONS.map((section) => {
        const isActive =
          pathname === section.href || pathname.startsWith(`${section.href}/`)

        return (
          <Link
            key={section.key}
            href={section.href}
            className={cn(
              "text-sm transition-colors",
              isActive
                ? "text-foreground font-medium"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {section.label}
          </Link>
        )
      })}
    </nav>
  )
}
