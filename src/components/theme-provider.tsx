"use client"

import * as React from "react"
import {
  type ThemePref,
  getThemePref,
  setThemePref as persistPref,
  getEffectiveTheme,
  applyTheme,
  onSystemThemeChange,
} from "@/lib/theme"

interface ThemeContextValue {
  pref: ThemePref
  resolvedTheme: "light" | "dark"
  setTheme: (pref: ThemePref) => void
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
)

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>")
  return ctx
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [pref, setPrefState] = React.useState<ThemePref>("system")
  const [resolvedTheme, setResolvedTheme] = React.useState<"light" | "dark">(
    "light",
  )

  React.useEffect(() => {
    const stored = getThemePref()
    setPrefState(stored)
    const effective = getEffectiveTheme(stored)
    setResolvedTheme(effective)
    applyTheme(stored)
  }, [])

  React.useEffect(() => {
    if (pref !== "system") return
    return onSystemThemeChange((effective) => {
      setResolvedTheme(effective)
      applyTheme("system")
    })
  }, [pref])

  const setTheme = React.useCallback((next: ThemePref) => {
    setPrefState(next)
    persistPref(next)
    const effective = getEffectiveTheme(next)
    setResolvedTheme(effective)
    applyTheme(next)
  }, [])

  const value = React.useMemo(
    () => ({ pref, resolvedTheme, setTheme }),
    [pref, resolvedTheme, setTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
