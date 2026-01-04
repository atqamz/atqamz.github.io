"use client";

import * as React from "react";

const PALETTES = [
  { value: "amber", label: "Amber" },
  { value: "blue", label: "Blue" },
  { value: "cyan", label: "Cyan" },
  { value: "green", label: "Green" },
  { value: "magenta", label: "Magenta" },
  { value: "red", label: "Red" },
] as const;

const DEFAULT_PALETTE = "blue";
const STORAGE_KEY = "terminal-palette";

export function PaletteSelect() {
  const [palette, setPalette] = React.useState<string | null>(null);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const isValid = stored && PALETTES.some((option) => option.value === stored);
    const initial = isValid ? stored! : DEFAULT_PALETTE;
    setPalette(initial);
    document.documentElement.dataset.palette = initial;
  }, []);

  React.useEffect(() => {
    if (!palette) return;
    document.documentElement.dataset.palette = palette;
    window.localStorage.setItem(STORAGE_KEY, palette);
  }, [palette]);

  if (!palette) {
    return (
      <label className="site-palette" aria-label="Palette">
        <span className="site-palette__label">Palette</span>
        <select className="terminal-select" disabled>
          <option>Loading</option>
        </select>
      </label>
    );
  }

  return (
    <label className="site-palette">
      <span className="site-palette__label">Palette</span>
      <select
        className="terminal-select"
        value={palette}
        onChange={(event) => setPalette(event.target.value)}
        aria-label="Palette"
      >
        {PALETTES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
