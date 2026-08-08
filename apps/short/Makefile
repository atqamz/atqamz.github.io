PYTHON ?= python3
DIST := dist

.PHONY: build clean

build: clean
	mkdir -p $(DIST)
	cp public/index.html public/_headers $(DIST)/
	$(PYTHON) scripts/generate_shortlinks.py ../../data/links.json $(DIST)

clean:
	rm -rf $(DIST)
