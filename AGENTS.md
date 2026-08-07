# Project agent memory

This repository is a small public monorepo. Keep it boring and avoid introducing framework or workspace machinery unless the apps actually need shared orchestration.

## Architecture

- `apps/web`: Elm 0.19.1 static homepage. No blog/router/CMS. `data/links.json` remains the single source for shortlinks.
- `apps/resume`: ATS-friendly LaTeX resume. `make -C apps/resume build` must produce `dist/resume.pdf` plus the static viewer page.
- `infra/cloudflare`: Pulumi Go owns Cloudflare Pages projects, custom domains, and DNS. Application bytes are uploaded separately.
- `legacy/next`: archived pre-migration Next.js implementation; no active build may depend on it.

## Deployment

Cloudflare Pages uses Direct Upload. Infrastructure and deploy workflows are manual during migration so merging code cannot cut over DNS unexpectedly.

## Maintaining this file

Keep only durable project-specific knowledge here. Prefer updating an existing note over appending historical detail.
