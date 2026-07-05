import type { MetadataRoute } from "next";
import { getAllTerms } from "@/lib/queries";
import { categories } from "@/data/categories";

const BASE_URL = "https://slanguage.local";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const terms = await getAllTerms();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/submit`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const termRoutes: MetadataRoute.Sitemap = terms.map((term) => ({
    url: `${BASE_URL}/terms/${term.slug}`,
    lastModified: term.updatedAt ? new Date(term.updatedAt) : new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${BASE_URL}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...termRoutes, ...categoryRoutes];
}
