.PHONY: web short meet resume build clean

web:
	$(MAKE) -C apps/web build

short:
	$(MAKE) -C apps/short build

meet:
	$(MAKE) -C apps/meet build

resume:
	$(MAKE) -C apps/resume build

build: web short meet resume

clean:
	$(MAKE) -C apps/web clean
	$(MAKE) -C apps/short clean
	$(MAKE) -C apps/meet clean
	$(MAKE) -C apps/resume clean
