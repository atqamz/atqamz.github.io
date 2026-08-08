.PHONY: web short resume build clean

web:
	$(MAKE) -C apps/web build

short:
	$(MAKE) -C apps/short build

resume:
	$(MAKE) -C apps/resume build

build: web short resume

clean:
	$(MAKE) -C apps/web clean
	$(MAKE) -C apps/short clean
	$(MAKE) -C apps/resume clean
