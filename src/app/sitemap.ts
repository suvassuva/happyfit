import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://happyfitclubblr.com";
  
  const routes = ["", "/about", "/programs", "/gallery", "/connect", "/team"];
  
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route === "/programs" ? 0.9 : 0.8,
  }));
}
