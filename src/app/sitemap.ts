import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;
    const lastModified = new Date("2026-06-23");

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/impressum`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${baseUrl}/datenschutz`,
            lastModified,
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${baseUrl}/sicherheit`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${baseUrl}/demnaechst`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.45,
        },
        {
            url: `${baseUrl}/kontakt`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.4,
        },
    ];
}
