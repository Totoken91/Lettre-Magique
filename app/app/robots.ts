import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api", "/compte", "/mes-courriers", "/auth"],
    },
    sitemap: "https://lettre-magique.vercel.app/sitemap.xml",
  };
}
