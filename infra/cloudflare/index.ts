import * as cloudflare from "@pulumi/cloudflare";
import * as pulumi from "@pulumi/pulumi";

const githubOwner = "atqamz";
const githubOwnerId = "56288343";
const githubRepoName = "atqamz_pub";
const githubRepoId = "1109815267";

const config = new pulumi.Config();

const accountId = config.require("cloudflareAccountId");
const zoneId = config.require("cloudflareZoneId");

const rootDomain = config.get("rootDomain") ?? "atqamz.com";
const webProjectName = config.get("webProjectName") ?? "atqamz-web";
const resumeProjectName = config.get("resumeProjectName") ?? "atqamz-resume";
const resumeDomain = `resume.${rootDomain}`;

const webProject = new cloudflare.PagesProject("web", {
    accountId,
    name: webProjectName,
    productionBranch: "main",
    buildConfig: {
        buildCaching: true,
        buildCommand: "npm install --global elm@0.19.1-6 && make build",
        destinationDir: "dist",
        rootDir: "apps/web",
    },
    source: {
        type: "github",
        config: {
            owner: githubOwner,
            ownerId: githubOwnerId,
            repoName: githubRepoName,
            repoId: githubRepoId,
            pathIncludes: [
                "apps/web/*",
                "data/links.json",
            ],
            prCommentsEnabled: true,
            previewDeploymentSetting: "all",
            productionBranch: "main",
            productionDeploymentsEnabled: true,
        },
    },
});

const resumeProject = new cloudflare.PagesProject("resume", {
    accountId,
    name: resumeProjectName,
    productionBranch: "main",
    buildConfig: {
        buildCaching: true,
        buildCommand: "./scripts/build-cloudflare.sh",
        destinationDir: "dist",
        rootDir: "apps/resume",
    },
    source: {
        type: "github",
        config: {
            owner: githubOwner,
            ownerId: githubOwnerId,
            repoName: githubRepoName,
            repoId: githubRepoId,
            pathIncludes: ["apps/resume/*"],
            prCommentsEnabled: true,
            previewDeploymentSetting: "all",
            productionBranch: "main",
            productionDeploymentsEnabled: true,
        },
    },
});

const webDns = new cloudflare.DnsRecord("web-dns", {
    zoneId,
    name: rootDomain,
    type: "CNAME",
    content: `${webProjectName}.pages.dev`,
    proxied: true,
    ttl: 1,
});

const resumeDns = new cloudflare.DnsRecord("resume-dns", {
    zoneId,
    name: resumeDomain,
    type: "CNAME",
    content: `${resumeProjectName}.pages.dev`,
    proxied: true,
    ttl: 1,
});

new cloudflare.PagesDomain("web-domain", {
    accountId,
    projectName: webProjectName,
    name: rootDomain,
}, {
    dependsOn: [webProject, webDns],
});

new cloudflare.PagesDomain("resume-domain", {
    accountId,
    projectName: resumeProjectName,
    name: resumeDomain,
}, {
    dependsOn: [resumeProject, resumeDns],
});

export const webUrl = `https://${rootDomain}`;
export const resumeUrl = `https://${resumeDomain}`;
export const webPagesDev = `https://${webProjectName}.pages.dev`;
export const resumePagesDev = `https://${resumeProjectName}.pages.dev`;
