import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { insightsPage, ownInsights } from "@/content/insights";
import { teamMembers } from "@/content/team";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;
    const lastModified = new Date("2026-06-23");

    const staticRoutes = [
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
            url: `${baseUrl}${insightsPage.path}`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}${insightsPage.path}/alle`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.58,
        },
        {
            url: `${baseUrl}/kontakt`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.4,
        },
    ] satisfies MetadataRoute.Sitemap;

    const articleRoutes = ownInsights.map((article) => ({
        url: `${baseUrl}${insightsPage.path}/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: "monthly" as const,
        priority: article.featured ? 0.72 : 0.55,
    }));

    const teamRoutes = teamMembers.map((member) => ({
        url: `${baseUrl}${member.profilePath}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.45,
    }));

    return [...staticRoutes, ...articleRoutes, ...teamRoutes];
}
