import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools/registry";

export const dynamic = "force-static";

const BASE_URL = "https://sudheertools.github.io";
// Build-time date so sitemap freshness tracks each deployment.
const LAST_MODIFIED = new Date().toISOString().split("T")[0];

const guideSlugs = [
  "base64-encoding",
  "cron-expressions",
  "css-gradients",
  "hash-functions",
  "html-entities",
  "json-formatting",
  "json-to-code",
  "jwt-decoding",
  "password-security",
  "regex-testing",
  "subnetting",
  "unix-timestamps",
  "url-encoding",
  "uuid-generation",
];

const staticPages: { slug: string; priority: number }[] = [
  { slug: "", priority: 1 },
  { slug: "about", priority: 0.6 },
  { slug: "changelog", priority: 0.5 },
  { slug: "contact", priority: 0.5 },
  { slug: "privacy", priority: 0.5 },
  { slug: "terms", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls: MetadataRoute.Sitemap = staticPages.map((page) => ({
    url: page.slug ? `${BASE_URL}/${page.slug}` : `${BASE_URL}/`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: page.priority,
  }));

  const guideUrls: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${BASE_URL}/guides/${slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const toolUrls: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}${tool.href}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticUrls, ...guideUrls, ...toolUrls];
}
