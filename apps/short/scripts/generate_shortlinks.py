#!/usr/bin/env python3
"""Generate static shortlinks from the repository's shared data/links.json."""

from __future__ import annotations

import html
import json
import shutil
import sys
from pathlib import Path


def redirect_html(url: str) -> str:
    escaped = html.escape(url, quote=True)
    encoded = json.dumps(url)
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex" />
    <meta http-equiv="refresh" content="0; url={escaped}" />
    <link rel="canonical" href="{escaped}" />
    <title>Redirecting…</title>
    <script>window.location.replace({encoded});</script>
  </head>
  <body>
    <p>Redirecting to <a href="{escaped}">{escaped}</a>…</p>
  </body>
</html>
"""


def shell_wrapper(url: str) -> str:
    escaped = url.replace('"', '\\"')
    return f'#!/bin/sh\ncurl -fsSL "{escaped}" | bash -s -- "$@"\n'


def remove_existing(path: Path) -> None:
    if path.is_dir():
        shutil.rmtree(path)
    elif path.exists() or path.is_symlink():
        path.unlink()


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: generate_shortlinks.py LINKS_JSON DIST_DIR", file=sys.stderr)
        return 2

    links_path = Path(sys.argv[1])
    dist = Path(sys.argv[2])
    links = json.loads(links_path.read_text(encoding="utf-8"))

    for item in links:
        name = item["filename"]
        url = item["url"]
        kind = item.get("type", "redirect")

        if not name or "/" in name or name in {".", ".."}:
            raise ValueError(f"invalid shortlink filename: {name!r}")

        destination = dist / name
        remove_existing(destination)

        if kind == "shell":
            if not name.endswith(".sh"):
                raise ValueError(
                    f"shell shortlink filename must end with .sh: {name!r}"
                )
            destination.write_text(shell_wrapper(url), encoding="utf-8")
        elif kind == "redirect":
            destination.mkdir(parents=True)
            (destination / "index.html").write_text(redirect_html(url), encoding="utf-8")
        else:
            raise ValueError(f"unsupported shortlink type: {kind!r}")

        print(f"generated {name} -> {url} ({kind})")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
