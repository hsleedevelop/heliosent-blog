import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { TopNav } from "@/components/top-nav"
import { layout } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/site/config"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [
      {
        url: "/api/og?title=HelioSent+blog",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
}

// Pre-hydration inline script: reads hs_theme from localStorage and applies
// the effective theme class/attribute before first paint (prevents FOUC).
// This MUST stay in sync with the storage key and logic in src/lib/theme.ts.
const themeScript = `(function(){var d=document.documentElement,t="system";try{t=localStorage.getItem("hs_theme")||"system"}catch(e){}var e=t;if(t!=="light"&&t!=="dark"){e=matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"}if(e==="dark")d.classList.add("dark");d.setAttribute("data-theme",e);var m=document.querySelector('meta[name="color-scheme"]');if(!m){m=document.createElement("meta");m.name="color-scheme";document.head.appendChild(m)}m.content=e})()`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <TooltipProvider delayDuration={300}>
            <div className={layout.shell}>
              <TopNav />
              <main className={cn(layout.container, layout.sectionY)}>
                {children}
              </main>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
