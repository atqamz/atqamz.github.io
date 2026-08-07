ELM ?= elm
PYTHON ?= python3
DIST := dist

.PHONY: build clean

build: clean
	mkdir -p $(DIST)
	$(ELM) make src/Main.elm --optimize --output=$(DIST)/app.js
	cp public/index.html public/style.css $(DIST)/
	$(PYTHON) scripts/generate_shortlinks.py ../../data/links.json $(DIST)

clean:
	rm -rf $(DIST) elm-stuff
