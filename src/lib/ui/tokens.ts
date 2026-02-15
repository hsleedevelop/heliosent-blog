// HelioSent Design System v1.1 — Locked Tokens
// DO NOT modify class strings. This is the single source of truth.

/** B1) Layout tokens */
export const layout = {
  shell: "min-h-dvh bg-background text-foreground",
  container: "mx-auto w-full max-w-6xl px-4 sm:px-6",
  header:
    "sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur",
  main: "mx-auto w-full max-w-3xl",
  mainWithTocGrid:
    "grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12",
  tocCol: "hidden lg:block",
  tocSticky: "sticky top-24",
  sectionY: "py-10 sm:py-12",
}

/** B2) Typography tokens */
export const type = {
  h1: "text-3xl font-semibold tracking-tight sm:text-4xl",
  h2: "mt-10 text-2xl font-semibold tracking-tight",
  h3: "mt-8 text-xl font-semibold tracking-tight",
  lead: "text-base leading-8 text-muted-foreground",
  body: "text-base leading-8",
  small: "text-sm leading-6",
  meta: "text-sm text-muted-foreground",
  link: "underline underline-offset-4 decoration-border hover:decoration-foreground",
  kbd: "rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground",
}

/** B3) Prose tokens (Tailwind Typography) */
export const prose = {
  wrap: "prose prose-neutral dark:prose-invert max-w-none",
  calm: "prose-headings:tracking-tight prose-headings:font-semibold prose-p:leading-8 prose-li:leading-8 prose-hr:border-border/60",
  a: "prose-a:underline prose-a:underline-offset-4 prose-a:decoration-border hover:prose-a:decoration-foreground",
  codeInline:
    "prose-code:rounded prose-code:bg-muted/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none",
  pre: "prose-pre:rounded-xl prose-pre:border prose-pre:border-border/60 prose-pre:bg-muted/30 prose-pre:p-0",
}

/** B4) Card + list spacing tokens */
export const ui = {
  card: "rounded-2xl border border-border/60 bg-background",
  cardP: "p-5 sm:p-6",
  cardHover: "transition-colors hover:bg-muted/20",
  rowGap: "space-y-2",
  tagWrap: "mt-3 flex flex-wrap gap-2",
  divider: "border-t border-border/60",
}

/** B5) TOC tokens */
export const toc = {
  title:
    "mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground",
  list: "space-y-2 text-sm",
  item: "text-muted-foreground hover:text-foreground",
  itemActive:
    "border-l-2 border-foreground pl-3 font-medium text-foreground",
  itemH3: "pl-6 text-muted-foreground/80",
}

/** B6) Code tokens (Shiki wrapper) */
export const code = {
  wrap: "relative overflow-hidden rounded-xl border border-border/60 bg-muted/30",
  header:
    "flex items-center justify-between border-b border-border/60 bg-background/40 px-3 py-2",
  filename: "text-xs text-muted-foreground",
  pre: "overflow-x-auto p-4 text-sm leading-6",
  copyBtn: "h-7 px-2 text-xs",
}
