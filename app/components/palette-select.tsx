"use client";

import * as React from "react";

const PALETTES = [
  { value: "amber", label: "Amber" },
  { value: "green", label: "Green" },
  { value: "cyan", label: "Cyan" },
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "magenta", label: "Magenta" },
] as const;

const DEFAULT_PALETTE = "amber";
const STORAGE_KEY = "terminal-palette";

export function PaletteSelect() {
  const [palette, setPalette] = React.useState(DEFAULT_PALETTE);

  React.useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const isValid = stored && PALETTES.some((option) => option.value === stored);
    const initial = isValid ? stored! : DEFAULT_PALETTE;
    setPalette(initial);
    document.documentElement.dataset.palette = initial;
  }, []);

  React.useEffect(() => {
    document.documentElement.dataset.palette = palette;
    window.localStorage.setItem(STORAGE_KEY, palette);
  }, [palette]);

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
