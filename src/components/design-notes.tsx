import { cn } from "@/lib/utils"

interface DesignNotesProps {
  html: string
  className?: string
}

export function DesignNotes({ html, className }: DesignNotesProps) {
  return (
    <details
      className={cn(
        "design-notes mt-10 rounded-lg border border-border/60 bg-muted/30",
        className,
      )}
    >
      <summary className="cursor-pointer select-none px-5 py-3 text-sm font-medium text-muted-foreground hover:text-foreground">
        Design Notes
      </summary>
      <div
        className="border-t border-border/40 px-5 py-4 text-sm leading-7 text-muted-foreground prose prose-sm prose-neutral dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </details>
  )
}
