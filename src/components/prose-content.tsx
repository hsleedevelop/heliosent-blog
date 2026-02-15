"use client"

import { useRef, useEffect } from "react"

interface ProseContentProps {
  html: string
  className?: string
}

export function ProseContent({ html, className }: ProseContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const pres = container.querySelectorAll<HTMLPreElement>("pre:has(> code)")

    pres.forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return

      pre.style.position = "relative"

      const btn = document.createElement("button")
      btn.className = "copy-btn"
      btn.type = "button"
      btn.textContent = "Copy"
      btn.setAttribute("aria-label", "Copy code")

      btn.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.textContent ?? ""
        try {
          await navigator.clipboard.writeText(code)
          btn.textContent = "Copied!"
          setTimeout(() => {
            btn.textContent = "Copy"
          }, 2000)
        } catch {
          btn.textContent = "Failed"
          setTimeout(() => {
            btn.textContent = "Copy"
          }, 2000)
        }
      })

      pre.appendChild(btn)
    })
  }, [html])

  return (
    <div
      ref={ref}
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
