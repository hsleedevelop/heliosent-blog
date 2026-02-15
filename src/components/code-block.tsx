import { code } from "@/lib/ui/tokens"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"

interface CodeBlockProps {
  html: string
  filename?: string
  raw: string
}

export function CodeBlock({ html, filename, raw }: CodeBlockProps) {
  return (
    <div className={code.wrap}>
      {filename ? (
        <div className={code.header}>
          <span className={code.filename}>{filename}</span>
          <CopyButton text={raw} />
        </div>
      ) : (
        <div className="absolute right-2 top-2 z-10">
          <CopyButton text={raw} />
        </div>
      )}
      <div
        className={cn(code.pre, "font-mono [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!m-0")}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
