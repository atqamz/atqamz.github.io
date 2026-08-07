import type { MetadataRoute } from "next";
import { posts } from "./blog/posts";

export const dynamic = "force-static";

const siteUrl = "https://atqamz.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
  }));

  return [
    { url: `${siteUrl}/`, lastModified: new Date() },
    { url: `${siteUrl}/blog/`, lastModified: new Date() },
    { url: `${siteUrl}/resume/`, lastModified: new Date() },
    ...blogEntries,
  ];
}
