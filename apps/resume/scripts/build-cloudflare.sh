#!/usr/bin/env bash
set -euo pipefail

readonly TINYTEX_VERSION="2026.05"
readonly TINYTEX_ARCHIVE="TinyTeX-1-linux-x86_64-v${TINYTEX_VERSION}.tar.xz"
readonly TINYTEX_SHA256="ef6c552b2959744f449213fb124e58954a235e7d41ad191e48080869728ae451"
readonly TINYTEX_URL="https://github.com/rstudio/tinytex-releases/releases/download/v${TINYTEX_VERSION}/${TINYTEX_ARCHIVE}"

cache_root="${XDG_CACHE_HOME:-${HOME}/.cache}/atqamz_pub/tinytex-${TINYTEX_VERSION}"
archive="${cache_root}/${TINYTEX_ARCHIVE}"
install_dir="${cache_root}/install"

mkdir -p "${cache_root}"

if [[ ! -f "${archive}" ]]; then
	curl --fail --location --retry 3 --output "${archive}" "${TINYTEX_URL}"
fi

printf '%s  %s\n' "${TINYTEX_SHA256}" "${archive}" | sha256sum --check -

if [[ ! -d "${install_dir}" ]]; then
	mkdir -p "${install_dir}"
	tar -xJf "${archive}" -C "${install_dir}"
fi

pdflatex_path="$(find "${install_dir}" -path '*/bin/*/pdflatex' -print -quit)"
tlmgr_path="$(find "${install_dir}" -path '*/bin/*/tlmgr' -print -quit)"

if [[ -z "${pdflatex_path}" || -z "${tlmgr_path}" ]]; then
	echo "TinyTeX executables were not found after extraction" >&2
	exit 1
fi

tex_bin="$(dirname "${pdflatex_path}")"
export PATH="${tex_bin}:${PATH}"

# TinyTeX releases can lag behind the rolling TeX Live package repository.
# Update tlmgr itself first so package installation does not abort on that mismatch.
"${tlmgr_path}" update --self

# TinyTeX-1 is intentionally small. Keep the resume's explicit package set
# available without depending on whatever happens to be preinstalled by the CI image.
"${tlmgr_path}" install geometry enumitem hyperref tools titlesec xcolor lm

build_dir="$(mktemp -d)"
trap 'rm -rf "${build_dir}"' EXIT

for _ in 1 2; do
	pdflatex \
		-interaction=nonstopmode \
		-halt-on-error \
		-output-directory="${build_dir}" \
		resume.tex
done

rm -rf dist
mkdir -p dist
cp "${build_dir}/resume.pdf" dist/resume.pdf
cp public/index.html dist/index.html
