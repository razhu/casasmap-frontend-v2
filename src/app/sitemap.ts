import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://casasmap.com";

  // Static pages
  const staticPages = [
    "",
    "/properties",
    "/login",
    "/register",
    "/forgot-password",
  ];

  const staticRoutes = staticPages.flatMap((page) => [
    {
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: page === "" ? 1 : 0.8,
    },
    {
      url: `${baseUrl}/en${page}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: page === "" ? 1 : 0.8,
    },
  ]);

  // TODO: Fetch properties from API and add to sitemap
  // For now, return static routes
  // In production, you would:
  // 1. Fetch all published properties from GraphQL API
  // 2. Generate URLs for each property in both languages
  // 3. Add them to the sitemap with appropriate priority

  return staticRoutes;
}
