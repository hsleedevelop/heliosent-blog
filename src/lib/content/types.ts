import type { Blog, Essay, Lab, Architecture, App } from "#content"
import type { Section } from "@/lib/sections"

export { SECTIONS, isValidSection, getSectionByKey } from "@/lib/sections"
export type { Section, SectionKey } from "@/lib/sections"

export interface Post {
  title: string
  description?: string
  date: string
  updated?: string
  draft: boolean
  tags: string[]
  slug: string
  metadata: { readingTime: number; wordCount: number }
  excerpt: string
  content: string
  permalink: string
  section: Section
  featured: boolean
  series?: string
  seriesOrder?: number
  cover?: Blog["cover"]
  url?: string
  repo?: string
}

export type VelitePost = Blog | Essay | Lab | Architecture | App
