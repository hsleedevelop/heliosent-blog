import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { SectionNav } from "@/components/section-nav"
import { Separator } from "@/components/ui/separator"

export function SiteHeader() {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-1 text-lg font-medium tracking-tight">
          <a
            href="https://heliosent.com"
            className="hover:text-muted-foreground transition-colors"
          >
            HelioAent
          </a>
          <Link href="/" className="hover:text-muted-foreground transition-colors">
            Blog
          </Link>
        </div>
        <ThemeToggle />
      </div>
      <SectionNav />
      <Separator />
    </header>
  )
}
