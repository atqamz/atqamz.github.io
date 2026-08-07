.PHONY: web resume build clean infra-format

web:
	$(MAKE) -C apps/web build

resume:
	$(MAKE) -C apps/resume build

build: web resume

clean:
	$(MAKE) -C apps/web clean
	$(MAKE) -C apps/resume clean

infra-format:
	gofmt -w infra/cloudflare/*.go
