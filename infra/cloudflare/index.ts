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
const shortProjectName = config.get("shortProjectName") ?? "atqamz-short";
const meetProjectName = config.get("meetProjectName") ?? "atqamz-meet";
const resumeProjectName = config.get("resumeProjectName") ?? "atqamz-resume";
const shortDomain = `short.${rootDomain}`;
const meetDomain = `meet.${rootDomain}`;
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
            pathIncludes: ["apps/web/*"],
            prCommentsEnabled: true,
            previewDeploymentSetting: "all",
            productionBranch: "main",
            productionDeploymentsEnabled: true,
        },
    },
}, {
    replaceOnChanges: ["source.type"],
    deleteBeforeReplace: true,
});

const shortProject = new cloudflare.PagesProject("short", {
    accountId,
    name: shortProjectName,
    productionBranch: "main",
    buildConfig: {
        buildCaching: true,
        buildCommand: "make build",
        destinationDir: "dist",
        rootDir: "apps/short",
    },
    source: {
        type: "github",
        config: {
            owner: githubOwner,
            ownerId: githubOwnerId,
            repoName: githubRepoName,
            repoId: githubRepoId,
            pathIncludes: [
                "apps/short/*",
                "data/links.json",
            ],
            prCommentsEnabled: true,
            previewDeploymentSetting: "all",
            productionBranch: "main",
            productionDeploymentsEnabled: true,
        },
    },
}, {
    // One-time Direct Upload -> Git migration: the old state has no source object,
    // so Pulumi observes +source rather than a change to source.type.
    replaceOnChanges: ["source"],
    deleteBeforeReplace: true,
});

const meetProject = new cloudflare.PagesProject("meet", {
    accountId,
    name: meetProjectName,
    productionBranch: "main",
    buildConfig: {
        buildCaching: true,
        buildCommand: "make build",
        destinationDir: "dist",
        rootDir: "apps/meet",
    },
    source: {
        type: "github",
        config: {
            owner: githubOwner,
            ownerId: githubOwnerId,
            repoName: githubRepoName,
            repoId: githubRepoId,
            pathIncludes: ["apps/meet/*"],
            prCommentsEnabled: true,
            previewDeploymentSetting: "all",
            productionBranch: "main",
            productionDeploymentsEnabled: true,
        },
    },
}, {
    replaceOnChanges: ["source.type"],
    deleteBeforeReplace: true,
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
}, {
    replaceOnChanges: ["source.type"],
    deleteBeforeReplace: true,
});

const webDns = new cloudflare.DnsRecord("web-dns", {
    zoneId,
    name: rootDomain,
    type: "CNAME",
    content: `${webProjectName}.pages.dev`,
    proxied: true,
    ttl: 1,
});

const shortDns = new cloudflare.DnsRecord("short-dns", {
    zoneId,
    name: shortDomain,
    type: "CNAME",
    content: `${shortProjectName}.pages.dev`,
    proxied: true,
    ttl: 1,
});

const meetDns = new cloudflare.DnsRecord("meet-dns", {
    zoneId,
    name: meetDomain,
    type: "CNAME",
    content: `${meetProjectName}.pages.dev`,
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
    replaceWith: [webProject],
    deleteBeforeReplace: true,
});

new cloudflare.PagesDomain("short-domain", {
    accountId,
    projectName: shortProjectName,
    name: shortDomain,
}, {
    dependsOn: [shortProject, shortDns],
    replaceWith: [shortProject],
    deleteBeforeReplace: true,
});

new cloudflare.PagesDomain("meet-domain", {
    accountId,
    projectName: meetProjectName,
    name: meetDomain,
}, {
    dependsOn: [meetProject, meetDns],
    replaceWith: [meetProject],
    deleteBeforeReplace: true,
});

new cloudflare.PagesDomain("resume-domain", {
    accountId,
    projectName: resumeProjectName,
    name: resumeDomain,
}, {
    dependsOn: [resumeProject, resumeDns],
    replaceWith: [resumeProject],
    deleteBeforeReplace: true,
});

export const webUrl = `https://${rootDomain}`;
export const shortUrl = `https://${shortDomain}`;
export const meetUrl = `https://${meetDomain}`;
export const resumeUrl = `https://${resumeDomain}`;
export const webPagesDev = `https://${webProjectName}.pages.dev`;
export const shortPagesDev = `https://${shortProjectName}.pages.dev`;
export const meetPagesDev = `https://${meetProjectName}.pages.dev`;
export const resumePagesDev = `https://${resumeProjectName}.pages.dev`;
