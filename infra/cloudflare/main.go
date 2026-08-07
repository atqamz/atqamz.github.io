package main

import (
	"fmt"

	"github.com/pulumi/pulumi-cloudflare/sdk/v6/go/cloudflare"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		cfg := config.New(ctx, "")

		accountID := cfg.Require("cloudflareAccountId")
		zoneID := cfg.Require("cloudflareZoneId")

		rootDomain := cfg.Get("rootDomain")
		if rootDomain == "" {
			rootDomain = "atqamz.com"
		}

		webProjectName := cfg.Get("webProjectName")
		if webProjectName == "" {
			webProjectName = "atqamz-web"
		}

		resumeProjectName := cfg.Get("resumeProjectName")
		if resumeProjectName == "" {
			resumeProjectName = "atqamz-resume"
		}

		webProject, err := cloudflare.NewPagesProject(ctx, "web", &cloudflare.PagesProjectArgs{
			AccountId:        pulumi.String(accountID),
			Name:             pulumi.String(webProjectName),
			ProductionBranch: pulumi.String("main"),
		})
		if err != nil {
			return err
		}

		resumeProject, err := cloudflare.NewPagesProject(ctx, "resume", &cloudflare.PagesProjectArgs{
			AccountId:        pulumi.String(accountID),
			Name:             pulumi.String(resumeProjectName),
			ProductionBranch: pulumi.String("main"),
		})
		if err != nil {
			return err
		}

		webDNS, err := cloudflare.NewDnsRecord(ctx, "web-dns", &cloudflare.DnsRecordArgs{
			ZoneId:  pulumi.String(zoneID),
			Name:    pulumi.String(rootDomain),
			Type:    pulumi.String("CNAME"),
			Content: pulumi.String(fmt.Sprintf("%s.pages.dev", webProjectName)),
			Proxied: pulumi.Bool(true),
			Ttl:     pulumi.Float64(1),
		})
		if err != nil {
			return err
		}

		resumeDomain := "resume." + rootDomain
		resumeDNS, err := cloudflare.NewDnsRecord(ctx, "resume-dns", &cloudflare.DnsRecordArgs{
			ZoneId:  pulumi.String(zoneID),
			Name:    pulumi.String(resumeDomain),
			Type:    pulumi.String("CNAME"),
			Content: pulumi.String(fmt.Sprintf("%s.pages.dev", resumeProjectName)),
			Proxied: pulumi.Bool(true),
			Ttl:     pulumi.Float64(1),
		})
		if err != nil {
			return err
		}

		_, err = cloudflare.NewPagesDomain(ctx, "web-domain", &cloudflare.PagesDomainArgs{
			AccountId:   pulumi.String(accountID),
			ProjectName: pulumi.String(webProjectName),
			Name:        pulumi.String(rootDomain),
		}, pulumi.DependsOn([]pulumi.Resource{webProject, webDNS}))
		if err != nil {
			return err
		}

		_, err = cloudflare.NewPagesDomain(ctx, "resume-domain", &cloudflare.PagesDomainArgs{
			AccountId:   pulumi.String(accountID),
			ProjectName: pulumi.String(resumeProjectName),
			Name:        pulumi.String(resumeDomain),
		}, pulumi.DependsOn([]pulumi.Resource{resumeProject, resumeDNS}))
		if err != nil {
			return err
		}

		ctx.Export("webUrl", pulumi.String("https://"+rootDomain))
		ctx.Export("resumeUrl", pulumi.String("https://"+resumeDomain))
		ctx.Export("webPagesDev", pulumi.String("https://"+webProjectName+".pages.dev"))
		ctx.Export("resumePagesDev", pulumi.String("https://"+resumeProjectName+".pages.dev"))

		return nil
	})
}
