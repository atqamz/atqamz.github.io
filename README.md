# atqamz_pub

Personal public monorepo for `atqamz.com` and `resume.atqamz.com`.

## Layout

```text
apps/
  web/        # Elm homepage + static shortlinks
  resume/     # LaTeX source + tiny PDF viewer page
infra/
  cloudflare/ # Pulumi (Go): Pages projects, domains, DNS, and Pages Git integration
data/
  links.json  # shared shortlink source
```

The previous Next.js/MDX implementation is archived under `legacy/next/` during the migration. It is not used by any build or deployment. Delete that directory after the new sites have been verified.

## Local development

With Nix, enter the repository development environment with:

```sh
nix develop
```

The shell includes Elm, `elm-format`, Python, TeX Live, Go, Node.js, Pulumi, Git, and Make. The first `nix develop` creates `flake.lock` if it is not present; commit that generated lock file to pin the exact nixpkgs revision for future development.

Without Nix, install Elm 0.19.1, Python 3, `latexmk`/TeX Live, Go, Node.js, Pulumi, Git, and Make yourself.

Build everything:

```sh
make build
```

Build only the homepage or resume:

```sh
make web
make resume
```

The outputs are `apps/web/dist/` and `apps/resume/dist/`.

## Shortlinks

Edit `data/links.json`, then rebuild the homepage. `redirect` entries become static HTML redirects; `shell` entries preserve the existing shell-wrapper behavior.

## Cloudflare Pages

Pulumi creates two Git-integrated Cloudflare Pages projects:

- `atqamz-web` → `atqamz.com`
- `atqamz-resume` → `resume.atqamz.com`

Both projects use `main` as the production branch and enable preview deployments plus PR comments.

Cloudflare owns application build and deployment:

- `atqamz-web` watches `apps/web/*` and `data/links.json`, installs Elm, then runs the existing web Makefile.
- `atqamz-resume` watches `apps/resume/*` and runs `apps/resume/scripts/build-cloudflare.sh`.
- The resume build pins TinyTeX 2026.05 and verifies the downloaded archive before compiling the PDF.

Pulumi also owns the proxied CNAME records and both Pages custom domains.

## Pulumi Deployments

Infrastructure is applied only by Pulumi Deployments. Do not run `pulumi preview`, `pulumi up`, or `pulumi refresh` from a developer machine.

Configure stack `atqamz/atqamz_pub/prod` in Pulumi Cloud under **Settings → Deploy**:

- source: GitHub repository `atqamz/atqamz_pub`
- branch: `main`
- Pulumi working directory: `infra/cloudflare`
- deploy pushed commits: enabled
- path filter: `infra/cloudflare/**`
- Cloudflare credential: `CLOUDFLARE_API_TOKEN` in the deployment environment or ESC

The Cloudflare account and zone IDs remain stack configuration values (`cloudflareAccountId` and `cloudflareZoneId`).

### First run after the Direct Upload cutover

The old Direct Upload Pages projects were removed outside Pulumi. Before the first update with this configuration, trigger a **Refresh** for `atqamz/atqamz_pub/prod` from Pulumi Cloud so its state records those deletions. Then trigger or allow the normal Pulumi Deployment update.

The update recreates `atqamz-web` and `atqamz-resume` as Git-integrated Pages projects and re-registers their custom domains. The existing DNS records remain Pulumi-owned.

## GitHub Actions

`.github/workflows/ci.yml` is validation-only:

- builds the Elm homepage,
- builds the resume with the same Cloudflare-compatible build path,
- formats and compiles the Pulumi Go program.

GitHub Actions has no Cloudflare or Pulumi production credentials and performs no deployment. Application delivery is handled by Cloudflare Pages; infrastructure delivery is handled by Pulumi Deployments.
