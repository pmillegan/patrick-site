import type { MetadataRoute } from "next";
import { courses } from "@/data/darkvoid";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/projects",
    "/usc",
    "/usc-undergrad",
    "/usc-grad",
    "/usc/thank-you",
    "/usc/submit",
    "/darkvoid",
    "/crokinole",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "monthly" : "weekly",
    priority: path === "" ? 1 : path === "/projects" ? 0.9 : 0.7,
  }));

  const darkvoidCourseEntries: MetadataRoute.Sitemap = courses.map((course) => ({
    url: `${siteUrl}/darkvoid/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...darkvoidCourseEntries];
}
