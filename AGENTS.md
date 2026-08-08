# Project agent memory

This repository is a small public monorepo. Keep it boring and avoid introducing framework or workspace machinery unless the apps actually need shared orchestration.

## Architecture

- `apps/web`: Elm 0.19.1 static homepage. No blog/router/CMS. `data/links.json` remains the single source for shortlinks.
- `apps/resume`: ATS-friendly LaTeX resume. `make -C apps/resume build` must produce `dist/resume.pdf` plus the static viewer page. CI/Cloudflare builds use the pinned TinyTeX script under `apps/resume/scripts/`.
- `infra/cloudflare`: Pulumi TypeScript owns Git-integrated Cloudflare Pages projects, build/source configuration, custom domains, and DNS.
- `legacy/pulumi-go`: archived pre-TypeScript Pulumi implementation; no deployment may depend on it.
- `legacy/next`: archived pre-migration Next.js implementation; no active build may depend on it.

## Deployment

Cloudflare Pages Git integration builds and deploys both applications from GitHub. Pulumi Deployments is the only path that applies infrastructure changes. GitHub Actions is validation-only and must not hold production deployment credentials.

## Maintaining this file

Keep only durable project-specific knowledge here. Prefer updating an existing note over appending historical detail.
