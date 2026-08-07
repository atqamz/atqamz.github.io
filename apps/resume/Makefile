LATEXMK ?= latexmk
DIST := dist

.PHONY: build stage clean

build: clean
	mkdir -p $(DIST)
	$(LATEXMK) -pdf -interaction=nonstopmode -halt-on-error -outdir=$(DIST) resume.tex
	cp public/index.html $(DIST)/index.html

# Use after an external LaTeX action has produced resume.pdf beside resume.tex.
stage:
	rm -rf $(DIST)
	mkdir -p $(DIST)
	cp resume.pdf $(DIST)/resume.pdf
	cp public/index.html $(DIST)/index.html

clean:
	rm -rf $(DIST)
	$(LATEXMK) -C resume.tex >/dev/null 2>&1 || true
	rm -f resume.pdf
