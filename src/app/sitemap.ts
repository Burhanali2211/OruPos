import { MetadataRoute } from "next";
import { ORUPOS_CONFIG } from "@/data/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = ORUPOS_CONFIG.urls.website;
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/demo`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
