import { MetadataRoute } from "next";
import { ORUPOS_CONFIG } from "@/data/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${ORUPOS_CONFIG.urls.website}/sitemap.xml`,
  };
}
