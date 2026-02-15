import type { SectionKey } from "@/lib/sections"

export interface ThinkingMode {
  label: string
  definition: string
  classes: string
  icon?: string
}

export const THINKING_MODES: Record<SectionKey, ThinkingMode> = {
  essays: {
    label: "Philosophical Mode",
    definition:
      "Long-term thinking, first principles, structural insight.",
    classes:
      "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/40",
    icon: "BookOpen",
  },
  labs: {
    label: "Experimental Mode",
    definition:
      "Applied systems, workflow experiments, AI integration.",
    classes:
      "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-900/40",
    icon: "FlaskConical",
  },
  architecture: {
    label: "System Mode",
    definition:
      "Architecture decisions, trade-offs, system records.",
    classes:
      "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
    icon: "Layers",
  },
  apps: {
    label: "Product Mode",
    definition: "Execution, shipping, iteration.",
    classes:
      "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-900/40",
    icon: "Package",
  },
  blog: {
    label: "Update Mode",
    definition:
      "Signals, small learnings, incremental change.",
    classes:
      "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
    icon: "Rss",
  },
} as const

export function getThinkingMode(section: SectionKey): ThinkingMode {
  return THINKING_MODES[section]
}

export function getAllThinkingModes(): (ThinkingMode & { section: SectionKey; href: string })[] {
  const order: SectionKey[] = ["essays", "labs", "architecture", "apps", "blog"]
  return order.map((key) => ({
    ...THINKING_MODES[key],
    section: key,
    href: `/${key}`,
  }))
}
