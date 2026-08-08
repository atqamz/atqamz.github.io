# atqamz_pub

Personal public monorepo for `atqamz.com` and its public subdomains.

## Layout

```text
apps/
  web/        # Elm homepage
  short/      # static shortlinks generated from data/links.json
  resume/     # LaTeX source + tiny PDF viewer page
infra/
  cloudflare/ # Pulumi (TypeScript): Pages, DNS, domains, and redirect rules
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
make resume
```

Each application writes its output to its own `apps/<name>/dist/` directory.

## Shortlinks

Edit `data/links.json`, then rebuild `apps/short`. Entries are served from `short.atqamz.com/<filename>`: `redirect` entries become static HTML redirects, while `shell` entries preserve the existing shell-wrapper behavior.

`short.atqamz.com/` itself serves a tiny noindex landing page. The `atqamz-short` Pages project watches `apps/short/*` and `data/links.json`, so either kind of change triggers a new Cloudflare Pages build.

`meet.atqamz.com` is intentionally separate from `data/links.json`. Pulumi configures it as a Cloudflare Single Redirect to the booking calendar; it does not use a Pages project or application build.

## Cloudflare Pages

The Pulumi TypeScript program creates three Git-integrated Cloudflare Pages projects:

- `atqamz-web` → `atqamz.com`
- `atqamz-short` → `short.atqamz.com`
- `atqamz-resume` → `resume.atqamz.com`

All three projects use `main` as the production branch and enable preview deployments plus PR comments.

Cloudflare owns application build and deployment:

- `atqamz-web` watches `apps/web/*`, installs Elm, then runs the existing web Makefile.
- `atqamz-short` watches `apps/short/*` and `data/links.json`, then generates the static shortlinks.
- `atqamz-resume` watches `apps/resume/*` and runs `apps/resume/scripts/build-cloudflare.sh`.
- The resume build pins TinyTeX 2026.05 and verifies the downloaded archive before compiling the PDF.

Pulumi also owns the proxied DNS records and Pages custom domains. For `meet.atqamz.com`, Pulumi owns a proxied placeholder A record plus the zone-level `http_request_dynamic_redirect` ruleset. The placeholder address is never contacted because the redirect executes at Cloudflare's edge first.

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

The Cloudflare account and zone IDs remain stack configuration values (`cloudflareAccountId` and `cloudflareZoneId`). The Cloudflare API token also needs permission to manage zone redirect rules in addition to the existing Pages and DNS permissions.

### Pages migration cleanup

Pulumi state owns the Pages resources it creates. Removing a Pages project and its `PagesDomain` from `infra/cloudflare/index.ts` therefore removes them from Cloudflare on the next Pulumi Deployment; do not delete them manually in the dashboard.

The `meet` Pages resources were temporary during the subdomain bootstrap. This configuration removes `atqamz-meet` and its Pages custom-domain binding automatically, then serves `meet.atqamz.com` through the redirect ruleset instead.

## GitHub Actions

`.github/workflows/ci.yml` is validation-only:

- builds the Elm homepage,
- builds the shortlink site,
- builds the resume with the same Cloudflare-compatible build path,
- type-checks the Pulumi TypeScript program.

GitHub Actions has no Cloudflare or Pulumi production credentials and performs no deployment. Application delivery is handled by Cloudflare Pages; infrastructure delivery is handled by Pulumi Deployments.
