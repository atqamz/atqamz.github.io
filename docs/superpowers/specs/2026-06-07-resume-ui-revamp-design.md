# Resume page UI revamp — design spec

Date: 2026-06-07
Route: `/resume` — `app/resume/`
Files in scope: `ResumeRenderer.tsx`, `resume.module.css`, `data/base.ts` (layout-driven only), `types.ts`
Reference only (do not restyle the whole site): `app/globals.css`

## Goal

Make every surface of the resume — dark, light, and ATS print — genuinely clean.
Kill the timeline-rail overlap bug structurally, not with another hardcoded offset.
Sharpen the terminal/IDE register the site already owns: an IDE file-tree for
multi-role companies, a prompt-style header, command-line section dividers — all
decoration drawn as pseudo-elements so copy/paste and ATS extraction stay text-clean.

This is a layout + craft revamp. Resume data content/wording is NOT changed beyond
what layout needs.

## Locked aesthetic (preserve, do not introduce a new lane)

- Fira Code monospace (`font-family: inherit` from globals). No new fonts.
- `data-layout="terminal"`, `--radius: 0` (square corners), `data-palette` accent
  via `--accent`. Scanline + noise overlays stay (they live on `body`, untouched).
- Left-aligned text. No `text-align: justify` (monospace stretches word gaps).
- Name keeps its accent glow + blinking block cursor (screen only).

## Root cause of the current bug (what we are fixing)

`.roleBlock::before` (the node dot) is absolutely positioned at `left ≈ 0.03rem`
relative to `.roleBlock`. But `.roleBlock`'s left edge already sits at the content
start, because the `padding-left: 1.5rem` gutter lives on the *parent* `.roles`, not
on `.roleBlock`. So the dot renders ~0.03rem INTO the text column → "●enior Programmer".

The vertical position also relies on a hardcoded `--node-center-y: 0.69rem` guessed
from font-size × line-height. Any wrap or metric drift moves the dot off the line.

**Fix class:** position markers by grid-cell alignment, never by guessed rem offsets.
A marker that lives in its own gutter grid column physically cannot enter the text
column, and `align-items: center` on the title row centers the tick on the title line
regardless of font metrics or wrapping.

## Layout

### Structure (DOM, in `ResumeRenderer.tsx`)

```
section.page
  header.header
    span.prompt            > whoami        (pseudo decoration; screen only)
    h1.name                ATQA MUNZIR▮    (glow + cursor)
    p.role                 Coder
    p.contact              email | linkedin | github
  section.section (Summary)
    h2.sectionTitle        Summary
    p.summary
  section.section (Experience | Education | Organization)
    h2.sectionTitle
    article.entry
      div.entryHeader      > ORG            Location
      div.roles[data-multi]
        div.roleBlock[data-current]
          div.roleHeader   Role title       date
          ul.list          - bullet
```

The DOM stays essentially as today. New: a `.prompt` span in the header for the
`> whoami` flourish (its text is a pseudo-element `content`, so it is never copied
or extracted). `data-multi` on `.roles` already flags multi-role companies; `data-current`
on the first `.roleBlock` flags the current role.

### Header — prompt-style (bolder)

A shell-session read, complementing (not duplicating) the existing `/resume` hero above:

```
> whoami            <- small, muted, accent ">"; pseudo decoration, screen only
ATQA MUNZIR▮        <- accent + glow + blinking block cursor (locked)
Coder
atqamz@gmail.com | linkedin.com/in/atqamunzir | github.com/atqamz
```

- `> whoami` is a `::before`/`content` flourish on a `.prompt` element — stripped in
  print, absent from copy/ATS text. It reads as "ran whoami, got the identity below."
- Name, role, contact otherwise unchanged from today (glow, cursor, accent links,
  accent-tinted ` | ` separators at 0.55 opacity).

### Section dividers — command-line (bolder)

Three distinct terminal glyph levels give clear hierarchy:

- **Section** title: prompt prefix `$ ` (pseudo `::before`), uppercase + letter-spacing
  as today, followed by a full-width 1px rule. The `$ ` and the rule are decoration;
  the heading text from data ("Experience") stays intact for ATS.
- **Company**: `> ORG` — the existing `>` prompt marker (pseudo `::before`), accent-muted.
- **Role**: IDE tree branch `├─ / └─` (drawn lines, see below).

Divider stays quieter than the name in the visual hierarchy: rule uses `--border-strong`,
title uses `--accent` but no glow. The name keeps the only glow on the page.

### Experience — IDE file-tree for multi-role companies

Chosen pattern: tree markers. Multi-role companies render their roles as a file tree;
single-role companies get no tree marker (just the role under the company prompt).

```
> YES2GAMES                          Singapore
  ├─ Senior Programmer               May 2026 - Present
  │    - Lead online and infra scaling...
  │    - Migrated to GitOps CI/CD...
  └─ Junior Programmer               Jul 2025 - Apr 2026
       - Ported racing title to web/H5...

> BlankOn Linux                      Indonesia
   Open Source Contributor           Dec 2025 - Present   <- single role, no tree
     - Contribute to build toolchain...
```

**Geometry (bulletproof):**

- `.roleBlock` is a grid: `grid-template-columns: var(--tree-gutter) minmax(0, 1fr)`.
  `--tree-gutter` ≈ `1.6rem`. The tree column is ALWAYS reserved (constant width) so
  every role title shares one clean left edge — single-role and multi-role alike.
- The tree marks are **drawn 1px lines** (pseudo-elements), not text glyphs:
  - vertical connector `│`: a 1px-wide pseudo in the gutter column, spanning the
    `.roleBlock` height; for the last role it stops at the tick (a `└`, not a through `│`).
  - horizontal tick `─`: a short 1px-high pseudo from the vertical line to the content,
    vertically centered on the `.roleHeader` row via grid `align-items: center` —
    no hardcoded rem offset, robust to title wrapping.
- Tree only draws when `.roles[data-multi]`. Single-role companies leave the gutter empty.
- Drawn lines (vs literal box-drawing characters) connect perfectly across any number
  of bullet lines and never depend on glyph metrics. Visually identical to `├─└│` at 1px.

**Current vs past role:** the current role (`[data-current]`) gets its title in `--accent`;
past roles in `--foreground`. No filled/hollow dot (that dot was the bug source). The
distinction is carried by title color weight, which also survives as bold-ish emphasis
in print if desired (kept subtle).

**Company header:** `> ORG` left, `Location` right (existing 2-col grid, `auto` date col).
`break-after: avoid` keeps the header attached to its first role.

### Education

Same renderer. Both entries are single-role with no bullets:

```
> EEPIS (full name)                  Surabaya, Indonesia
   Bachelor of Applied Science - BASc, Game Technology   Aug 2021 - Aug 2025
```

No tree (single role). Degree title + date on the role row. Reads as a compact two-line
block per school.

### Organization

`EEPIS ... Students' Association` has two roles, no bullets — so it DOES get a tree, with
the connector spanning the two title rows even though there are no bullets between them
(the drawn vertical line spans `.roleBlock` height, so it works with zero bullets):

```
> EEPIS ... Students' Association    Surabaya, Indonesia
  ├─ Head of Research and Technology Division     Aug 2023 - Aug 2024
  └─ Staff of Research and Technology Division     Aug 2022 - Aug 2023
```

## Dark / light

- All colors via tokens: `--accent`, `--foreground`, `--muted`, `--border-strong`,
  `--background`. No literal colors in screen styles.
- Tree lines: `color-mix(in srgb, var(--accent) ~55%, transparent)`, current node/tick
  brighter. Verify visibility in BOTH light (e.g. blue `#245a9e`, amber `#8a6200`) and
  dark (`#6aa8ff`, `#eec35e`) palettes — light palettes are lower-contrast lines, must
  still read.
- Name glow `text-shadow ... var(--accent) 35%`; contact separators accent at 0.55.

## ATS print (Ctrl+P must be excellent)

Strip ALL decoration; produce a plain, selectable, correctly-ordered sans-serif doc.

- `font-family: "Calibri", "Arial", "Helvetica Neue", sans-serif`, black `#111827`
  on white `#ffffff`, `print-color-adjust: exact`.
- `display: none !important` for: `.prompt` (`> whoami`), name glow (`text-shadow: none`),
  name cursor (`.name::after`), section prompt (`$ `), company prompt (`.entryOrg::before` `>`),
  all tree lines (`.roleBlock` vertical + tick pseudo-elements), scanline/noise (site
  chrome already hidden via existing `:global(header/footer/.terminal-hero/...) { display:none }`).
- Reading order (top to bottom): NAME, Coder, contacts, then each section: TITLE, then
  per company: ORG, Location, role title, date, bullets. Tree gutter collapses to a small
  indent; bullets stay hyphen-prefixed (pseudo `-`, ATS-safe).
- **Page packing (locked technique):** `break-inside: avoid` on `.roleBlock` AND `li`
  (keep each role + its bullets intact); `.entry` flows freely; `break-after: avoid` on
  `.entryHeader` (no orphaned company header). No split bullet lists, no big bottom gaps.
- **pdftotext verification:** extracted text must contain NONE of these glyphs:
  `> $ ├ └ │ ─ ● ○ ▮` and no literal `whoami`. Bullet hyphens are pseudo-elements so they
  do not appear in extracted text either. Confirm reading order and content are intact.

## Mobile (≤767px)

- `.entryHeader` and `.roleHeader` collapse to single column (date drops below title) —
  existing behavior, preserved. Tree gutter narrows but stays; lines still align via grid.

## Content constraints (must not violate)

- NEVER name the project. Say "cross-platform racing title" (data already complies).
- HAGE Games entry stays mentor/advisor only — no implied hands-on project work (complies).
- Do not change resume data content/wording beyond layout needs. Data lives in `base.ts`.

## Verification plan (playwright-cli, every iteration)

1. `npm run dev`, load `/resume`.
2. Screenshot dark + light (toggle theme) at desktop width; spot-check a narrow width.
   Read the screenshots critically — confirm no marker touches any title, clean left edge,
   hierarchy reads (name wins), dividers and tree look intentional.
3. `emulateMedia({ media: 'print' })` + `page.pdf()` → save PDF.
4. `pdftotext` the PDF → assert none of the prohibited glyphs / `whoami` appear; confirm
   reading order and that all content is present and selectable.
5. Iterate until each surface is genuinely clean before claiming done.

## Out of scope

- No restyle of the rest of the site (globals, header/hero chrome beyond print-hiding).
- No new dependencies, no new fonts, no new aesthetic lane.
- No data rewording.
