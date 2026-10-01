import type { MetadataRoute } from "next";
import { posts } from "./content";

/** Change this to your real domain before deploying. */
const BASE = "https://example.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { path: "", priority: 1 },
    { path: "/writing", priority: 0.9 },
    { path: "/work", priority: 0.8 },
    { path: "/interests", priority: 0.6 },
    { path: "/about", priority: 0.6 },
    { path: "/now", priority: 0.5 },
    { path: "/contact", priority: 0.5 },
  ].map((page) => ({
    url: `${BASE}${page.path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: page.priority,
  }));

  const essays = posts.map((post) => ({
    url: `${BASE}/writing/${post.slug}`,
    lastModified: new Date(post.iso),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...pages, ...essays];
}
