import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { SectionNav } from "@/components/section-nav"
import { Separator } from "@/components/ui/separator"

export function SiteHeader() {
  return (
    <header className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg font-medium tracking-tight">
          Heliosent
        </Link>
        <ThemeToggle />
      </div>
      <SectionNav />
      <Separator />
    </header>
  )
}
