# atqamz_pub

Personal public monorepo for `atqamz.com` and `resume.atqamz.com`.

## Layout

```text
apps/
  web/       # Elm homepage + static shortlinks
  resume/    # LaTeX source + tiny PDF viewer page
infra/
  cloudflare/ # Pulumi (Go): Pages projects, domains, and DNS
data/
  links.json # shared shortlink source
```

The previous Next.js/MDX implementation is archived under `legacy/next/` during the migration. It is not used by any build or deployment. Delete that directory after the new sites have been verified.

## Local development

Requirements: Elm 0.19.1, Python 3, `latexmk`/TeX Live, Go, and Pulumi for infrastructure work.

On NixOS, an ad-hoc environment is enough:

```sh
nix shell nixpkgs#elmPackages.elm nixpkgs#python3 nixpkgs#texliveFull nixpkgs#go nixpkgs#pulumi
```

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

## Cloudflare infrastructure

The Pulumi project creates two Direct Upload Pages projects:

- `atqamz-web` → `atqamz.com`
- `atqamz-resume` → `resume.atqamz.com`

It also creates proxied CNAME records to each project's `pages.dev` hostname and registers both Pages custom domains.

Bootstrap a stack locally:

```sh
cd infra/cloudflare
pulumi stack init prod
cp Pulumi.example.yaml Pulumi.prod.yaml
# fill in the Cloudflare account and zone IDs
pulumi preview
pulumi up
```

Do not commit real credentials. The Cloudflare provider reads `CLOUDFLARE_API_TOKEN` from the environment.

If the zone already contains DNS records for `atqamz.com` or `resume.atqamz.com`, import those records into the Pulumi stack (or remove them as part of the cutover) before the first `pulumi up`. The program intentionally treats DNS as owned infrastructure and will not silently adopt pre-existing records.

## GitHub Actions

`ci.yml` validates/builds all three parts. The two write workflows are intentionally manual while migrating:

- `infra.yml` applies Pulumi.
- `deploy-cloudflare.yml` builds and uploads both Pages projects.

Repository configuration required for those workflows:

- secret `CLOUDFLARE_API_TOKEN`
- variable `CLOUDFLARE_ACCOUNT_ID`
- secret `PULUMI_ACCESS_TOKEN`
- variable `PULUMI_STACK` (for example `atqamz/prod`)

Apply infrastructure before the first Pages deployment. Once the cutover is stable, the deploy workflow can be changed from `workflow_dispatch` to pushes on `main` with path filters.
