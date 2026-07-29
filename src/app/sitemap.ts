import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";
import { stories } from "@/lib/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-30T00:00:00+09:00");
  const staticPaths = [
    "",
    "/online",
    "/real",
    "/profile",
    "/publication",
    "/activities",
    "/contact",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
    })),
    ...stories.map((story) => ({
      url: `${SITE_URL}/story/${story.slug}`,
      lastModified,
    })),
  ];
}
