"use client"

import * as React from "react"
import { useTheme } from "next-themes"

type ThemeToggleProps = {
  variant?: "terminal" | "legacy"
}

export function ThemeToggle({ variant = "terminal" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-5 h-5" /> // Placeholder to prevent layout shift
  }

  const buttonClass =
    variant === "legacy"
      ? "p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      : "terminal-icon-button"

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={buttonClass}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <svg className="terminal-toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
        </svg>
      ) : (
        <svg className="terminal-toggle-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M21 12.5A8.5 8.5 0 1 1 11.5 3a7 7 0 0 0 9.5 9.5z" />
        </svg>
      )}
    </button>
  )
}
