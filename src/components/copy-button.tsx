"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { code } from "@/lib/ui/tokens"

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // noop
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className={code.copyBtn}
      onClick={handleCopy}
      aria-label="Copy code"
    >
      {copied ? (
        <Check className="size-3" />
      ) : (
        <Copy className="size-3" />
      )}
    </Button>
  )
}
