package main

import (
	"fmt"

	"github.com/pulumi/pulumi-cloudflare/sdk/v6/go/cloudflare"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
)

const (
	githubOwner    = "atqamz"
	githubOwnerID  = "56288343"
	githubRepoName = "atqamz_pub"
	githubRepoID   = "1109815267"
)

func githubSource(pathIncludes ...string) *cloudflare.PagesProjectSourceArgs {
	includes := make(pulumi.StringArray, 0, len(pathIncludes))
	for _, path := range pathIncludes {
		includes = append(includes, pulumi.String(path))
	}

	return &cloudflare.PagesProjectSourceArgs{
		Type: pulumi.String("github"),
		Config: &cloudflare.PagesProjectSourceConfigArgs{
			Owner:                        pulumi.String(githubOwner),
			OwnerId:                      pulumi.String(githubOwnerID),
			RepoName:                     pulumi.String(githubRepoName),
			RepoId:                       pulumi.String(githubRepoID),
			PathIncludes:                 includes,
			PrCommentsEnabled:            pulumi.Bool(true),
			PreviewDeploymentSetting:     pulumi.String("all"),
			ProductionBranch:             pulumi.String("main"),
			ProductionDeploymentsEnabled: pulumi.Bool(true),
		},
	}
}

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
			BuildConfig: &cloudflare.PagesProjectBuildConfigArgs{
				BuildCaching:   pulumi.Bool(true),
				BuildCommand:   pulumi.String("npm install --global elm@0.19.1-6 && make build"),
				DestinationDir: pulumi.String("dist"),
				RootDir:        pulumi.String("apps/web"),
			},
			Source: githubSource(
				"apps/web/*",
				"data/links.json",
			),
		})
		if err != nil {
			return err
		}

		resumeProject, err := cloudflare.NewPagesProject(ctx, "resume", &cloudflare.PagesProjectArgs{
			AccountId:        pulumi.String(accountID),
			Name:             pulumi.String(resumeProjectName),
			ProductionBranch: pulumi.String("main"),
			BuildConfig: &cloudflare.PagesProjectBuildConfigArgs{
				BuildCaching:   pulumi.Bool(true),
				BuildCommand:   pulumi.String("./scripts/build-cloudflare.sh"),
				DestinationDir: pulumi.String("dist"),
				RootDir:        pulumi.String("apps/resume"),
			},
			Source: githubSource("apps/resume/*"),
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
