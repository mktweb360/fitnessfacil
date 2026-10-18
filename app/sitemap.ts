import type { MetadataRoute } from "next";
import { categories, products } from "@/data/products";
import { posts } from "@/data/posts";

const BASE = "https://www.fitnessfacil.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/tienda`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/sobre-nosotros`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contacto`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE}/aviso-legal`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/politica-de-privacidad`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/politica-de-cookies`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const catPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE}/tienda/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.filter((p) => !p.unavailable).map((p) => ({
    url: `${BASE}/tienda/${p.categorySlug}/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...catPages, ...productPages, ...blogPages];
}
