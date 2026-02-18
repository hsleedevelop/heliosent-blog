"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { SECTIONS } from "@/lib/site/sections"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { layout } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"

export function TopNav() {
  const pathname = usePathname()

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className={layout.header}>
      <div className={cn(layout.container, "flex h-14 items-center justify-between")}>
        <div className="flex items-baseline gap-1 text-base font-semibold tracking-tight">
          <a
            href="https://heliosent.com"
            className="hover:text-muted-foreground transition-colors"
          >
            HelioAent
          </a>
          <Link href="/" className="text-[#707070] hover:text-muted-foreground transition-colors">
            Blog
          </Link>
        </div>

        <nav className="hidden items-center gap-6 sm:flex">
          {SECTIONS.map((s) => (
            <Link
              key={s.key}
              href={s.href}
              className={cn(
                "text-sm text-muted-foreground hover:text-foreground",
                isActive(s.href) &&
                  "text-foreground border-b-2 border-foreground pb-1",
              )}
            >
              {s.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 sm:hidden">
          <ThemeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="size-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {SECTIONS.map((s) => (
                <DropdownMenuItem key={s.key} asChild>
                  <Link
                    href={s.href}
                    className={cn(
                      isActive(s.href) && "font-medium",
                    )}
                  >
                    {s.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
