# atqamz_pub

Personal public monorepo for `atqamz.com` and its public subdomains.

## Layout

```text
apps/
  web/        # Elm homepage
  short/      # static shortlinks generated from data/links.json
  meet/       # static redirect for meet.atqamz.com
  resume/     # LaTeX source + tiny PDF viewer page
infra/
  cloudflare/ # Pulumi (TypeScript): Pages projects, domains, DNS, and Pages Git integration
data/
  links.json  # shared shortlink source
```

The previous Go Pulumi implementation is archived under `legacy/pulumi-go/`, and the previous Next.js/MDX implementation is archived under `legacy/next/` during the migration. It is not used by any build or deployment. Delete that directory after the new sites have been verified.

## Local development

With Nix, enter the repository development environment with:

```sh
nix develop
```

The shell includes Elm, `elm-format`, Python, TeX Live, Node.js, Pulumi, Git, and Make. The first `nix develop` creates `flake.lock` if it is not present; commit that generated lock file to pin the exact nixpkgs revision for future development.

Without Nix, install Elm 0.19.1, Python 3, `latexmk`/TeX Live, Node.js, Pulumi, Git, and Make yourself.

Build everything:

```sh
make build
```

Build individual applications:

```sh
make web
make short
make meet
make resume
```

Each application writes its output to its own `apps/<name>/dist/` directory.

## Shortlinks

Edit `data/links.json`, then rebuild `apps/short`. Entries are served from `short.atqamz.com/<filename>`: `redirect` entries become static HTML redirects, while `shell` entries preserve the existing shell-wrapper behavior.

`meet.atqamz.com` is intentionally separate from `data/links.json` and redirects to the booking calendar from `apps/meet/public/_redirects`.

## Cloudflare Pages

The Pulumi TypeScript program creates four Git-integrated Cloudflare Pages projects:

- `atqamz-web` → `atqamz.com`
- `atqamz-short` → `short.atqamz.com`
- `atqamz-meet` → `meet.atqamz.com`
- `atqamz-resume` → `resume.atqamz.com`

All four projects use `main` as the production branch and enable preview deployments plus PR comments.

Cloudflare owns application build and deployment:

- `atqamz-web` watches `apps/web/*`, installs Elm, then runs the existing web Makefile.
- `atqamz-short` watches `apps/short/*` and `data/links.json`, then generates the static shortlinks.
- `atqamz-meet` watches `apps/meet/*` and publishes the static booking redirect.
- `atqamz-resume` watches `apps/resume/*` and runs `apps/resume/scripts/build-cloudflare.sh`.
- The resume build pins TinyTeX 2026.05 and verifies the downloaded archive before compiling the PDF.

Pulumi also owns the proxied CNAME records and all four Pages custom domains.

## Pulumi Deployments

Infrastructure is applied only by Pulumi Deployments. Do not run `pulumi preview`, `pulumi up`, or `pulumi refresh` from a developer machine.

Configure stack `atqamz/atqamz_pub/prod` in Pulumi Cloud under **Settings → Deploy**:

- source: GitHub repository `atqamz/atqamz_pub`
- branch: `main`
- Pulumi working directory: `infra/cloudflare`
- deploy pushed commits: enabled
- path filter: `infra/cloudflare/**`
- Cloudflare credential: `CLOUDFLARE_API_TOKEN` in the deployment environment or ESC

Pulumi Deployments installs the Node.js dependencies from `infra/cloudflare/package.json` automatically. No Go toolchain or Go-specific pre-run command is required.

The Cloudflare account and zone IDs remain stack configuration values (`cloudflareAccountId` and `cloudflareZoneId`).

### First run after the Direct Upload cutover

The old Direct Upload Pages projects were removed outside Pulumi. Before the first update with this configuration, trigger a **Refresh** for `atqamz/atqamz_pub/prod` from Pulumi Cloud so its state records those deletions. Then trigger or allow the normal Pulumi Deployment update.

The update keeps `atqamz-web` and `atqamz-resume` Git-integrated and adds `atqamz-short` plus `atqamz-meet` with their custom domains. All related DNS records remain Pulumi-owned.

## GitHub Actions

`.github/workflows/ci.yml` is validation-only:

- builds the Elm homepage,
- builds the shortlink site,
- builds the meeting redirect,
- builds the resume with the same Cloudflare-compatible build path,
- type-checks the Pulumi TypeScript program.

GitHub Actions has no Cloudflare or Pulumi production credentials and performs no deployment. Application delivery is handled by Cloudflare Pages; infrastructure delivery is handled by Pulumi Deployments.
