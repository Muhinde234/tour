import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [],
    },
    sitemap: "https://www.emmatourtravel.com/sitemap.xml",
    host: "https://www.emmatourtravel.com",
  };
}
