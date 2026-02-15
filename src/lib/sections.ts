// Zero runtime dependencies — safe for both client & server components.

export interface SectionDef {
  key: string
  label: string
  href: string
  description: string
}

export const SECTIONS = [
  { key: "essays", label: "Essays", href: "/essays", description: "깊이 있는 글" },
  { key: "blog", label: "Blog", href: "/blog", description: "생각과 기록" },
  { key: "labs", label: "Labs", href: "/labs", description: "실험과 프로토타입" },
  { key: "architecture", label: "Architecture", href: "/architecture", description: "설계와 구조" },
  { key: "apps", label: "Apps", href: "/apps", description: "만든 것들" },
] as const satisfies readonly SectionDef[]

export type Section = (typeof SECTIONS)[number]["key"]

export function isValidSection(value: string): value is Section {
  return SECTIONS.some((s) => s.key === value)
}

export function getSectionByKey(key: Section) {
  return SECTIONS.find((s) => s.key === key)!
}
