import type { MetadataRoute } from "next";

const routes = [
  "",
  "devis",
  "offres",
  "contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://webdifference.app";
  const now = new Date().toISOString();

  return routes.map((route) => ({
    url: `${baseUrl}/${route}`.replace(/\/$/, ""),
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
