import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin/login", "/admin/dashboard", "/admin/messages", "/admin/settings", "/admin/guest-book"],
      },
    ],
    sitemap: "https://tktailors.lk/sitemap.xml",
  };
}
