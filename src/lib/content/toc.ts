export interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

const HEADING_RE = /<h([23])\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/h[23]>/gi
const HTML_TAG_RE = /<[^>]+>/g

export function extractToc(html: string): TocItem[] {
  const items: TocItem[] = []
  let match: RegExpExecArray | null

  while ((match = HEADING_RE.exec(html)) !== null) {
    items.push({
      level: parseInt(match[1], 10) as 2 | 3,
      id: match[2],
      text: match[3].replace(HTML_TAG_RE, "").trim(),
    })
  }

  HEADING_RE.lastIndex = 0
  return items
}
