import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { allInsights, getInsightLastModified, getInsightPath } from "@/content/insights";
import { teamMembers } from "@/content/team";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = siteConfig.url;
    const lastModified = new Date("2026-06-29");

    const staticRoutes = [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/plattform`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.75,
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
            url: `${baseUrl}/einblicke`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/einblicke/alle`,
            lastModified,
            changeFrequency: "weekly",
            priority: 0.58,
        },
        {
            url: `${baseUrl}/einblicke/team`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.54,
        },
        {
            url: `${baseUrl}/kontakt`,
            lastModified,
            changeFrequency: "monthly",
            priority: 0.4,
        },
    ] satisfies MetadataRoute.Sitemap;

    const insightRoutes = allInsights.map((insight) => ({
        url: `${baseUrl}${getInsightPath(insight)}`,
        lastModified: new Date(getInsightLastModified(insight)),
        changeFrequency: "monthly" as const,
        priority: "featured" in insight && insight.featured ? 0.72 : 0.55,
    }));

    const teamRoutes = teamMembers.map((member) => ({
        url: `${baseUrl}${member.profilePath}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.45,
    }));

    return [...staticRoutes, ...insightRoutes, ...teamRoutes];
}
