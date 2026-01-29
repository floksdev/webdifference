import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";

const staticRoutes = [
  { path: "", priority: 1.0, changeFrequency: "daily" as const },
  { path: "offres", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "projets", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "guides", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "faq", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "politique-de-confidentialite", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "cgv", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "cgu", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.webdifference.fr";
  const now = new Date().toISOString();

  // Pages statiques
  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}/${route.path}`.replace(/\/$/, ""),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Pages d'articles (guides)
  const articlePages = articles.map((article) => ({
    url: `${baseUrl}/guides/${article.slug}`,
    lastModified: article.publishedAt || now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...articlePages];
}
