import type { MetadataRoute } from "next";

const SITE_URL = "https://imrnes.team";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/achievement", "/cve", "/leaderboard"].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "daily",
    priority: path === "" ? 1 : 0.8,
  }));
}
