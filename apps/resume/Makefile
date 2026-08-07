LATEXMK ?= latexmk
DIST := dist

.PHONY: build build-ci clean

build: clean
	mkdir -p $(DIST)
	$(LATEXMK) -pdf -interaction=nonstopmode -halt-on-error -outdir=$(DIST) resume.tex
	cp public/index.html $(DIST)/index.html

build-ci:
	./scripts/build-cloudflare.sh

clean:
	rm -rf $(DIST)
	$(LATEXMK) -C resume.tex >/dev/null 2>&1 || true
	rm -f resume.pdf
