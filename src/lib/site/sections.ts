export const SECTIONS = [
  {
    key: "essays",
    label: "Essays",
    href: "/essays",
    thinkingMode: "Philosophical Mode",
    layerDescription:
      "It captures structured thinking and long-form technical philosophy.",
  },
  {
    key: "blog",
    label: "Blog",
    href: "/blog",
    thinkingMode: "Update Mode",
    layerDescription: "It shares updates, insights, and engineering notes.",
  },
  {
    key: "labs",
    label: "Labs",
    href: "/labs",
    thinkingMode: "Experimental Mode",
    layerDescription:
      "It documents applied systems and workflow experiments.",
  },
  {
    key: "architecture",
    label: "Architecture",
    href: "/architecture",
    thinkingMode: "System Mode",
    layerDescription:
      "It records system design decisions and structural patterns.",
  },
  {
    key: "apps",
    label: "Apps",
    href: "/apps",
    thinkingMode: "Product Mode",
    layerDescription:
      "It showcases products and tools built with intention.",
  },
] as const

export type SectionKey = (typeof SECTIONS)[number]["key"]

export type Section = SectionKey

export type SectionMeta = (typeof SECTIONS)[number]

export function isValidSection(value: string): value is SectionKey {
  return SECTIONS.some((s) => s.key === value)
}

export function getSectionByKey(key: SectionKey): SectionMeta {
  return SECTIONS.find((s) => s.key === key)!
}
