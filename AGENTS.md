# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Sharp edges

- Resume `@media print` ATS packing and dark-mode override gotcha: see `app/resume/resume.module.css` (print block starts ~line 411, `.roleBlock`/`.page .list li` comment ~line 507). Global theme selectors in `app/globals.css` (`html.dark[data-layout="terminal"][data-palette="..."]`) outrank plain module-scoped selectors, so resume overrides need `:global(.dark)` combinators or `!important` to win.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
