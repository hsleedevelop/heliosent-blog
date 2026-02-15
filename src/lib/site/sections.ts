export const SECTIONS = [
  { key: "essays", label: "Essays", href: "/essays" },
  { key: "blog", label: "Blog", href: "/blog" },
  { key: "labs", label: "Labs", href: "/labs" },
  { key: "architecture", label: "Architecture", href: "/architecture" },
  { key: "apps", label: "Apps", href: "/apps" },
] as const

export type SectionKey = (typeof SECTIONS)[number]["key"]

export type Section = SectionKey

export function isValidSection(value: string): value is SectionKey {
  return SECTIONS.some((s) => s.key === value)
}

export function getSectionByKey(key: SectionKey) {
  return SECTIONS.find((s) => s.key === key)!
}
