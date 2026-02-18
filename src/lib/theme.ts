export type ThemePref = "light" | "dark" | "system"

const STORAGE_KEY = "hs_theme"
const VALID: readonly ThemePref[] = ["light", "dark", "system"]

export function getThemePref(): ThemePref {
  if (typeof window === "undefined") return "system"
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw && (VALID as readonly string[]).includes(raw)) {
      return raw as ThemePref
    }
  } catch {
    // localStorage unavailable (e.g. Safari private browsing)
  }
  return "system"
}

export function setThemePref(pref: ThemePref): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, pref)
  } catch {
    // localStorage unavailable
  }
}

export function getEffectiveTheme(pref?: ThemePref): "light" | "dark" {
  const p = pref ?? getThemePref()
  if (p === "light" || p === "dark") return p
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function applyTheme(pref?: ThemePref): void {
  if (typeof window === "undefined") return
  const effective = getEffectiveTheme(pref)
  const el = document.documentElement

  el.classList.toggle("dark", effective === "dark")
  el.setAttribute("data-theme", effective)

  let meta = document.querySelector<HTMLMetaElement>(
    'meta[name="color-scheme"]',
  )
  if (!meta) {
    meta = document.createElement("meta")
    meta.name = "color-scheme"
    document.head.appendChild(meta)
  }
  meta.content = effective
}

export function onSystemThemeChange(
  cb: (effective: "light" | "dark") => void,
): () => void {
  if (typeof window === "undefined") return () => {}
  const mql = window.matchMedia("(prefers-color-scheme: dark)")
  const handler = () => cb(mql.matches ? "dark" : "light")
  mql.addEventListener("change", handler)
  return () => mql.removeEventListener("change", handler)
}
