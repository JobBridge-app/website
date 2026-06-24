import { allInsights, getInsightUrl, insightsPage } from "@/content/insights";
import { siteConfig } from "@/config/site";

function escapeXml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export function GET() {
    const items = allInsights
        .map((insight) => {
            const href = insight.kind === "own" ? `${siteConfig.url}${getInsightUrl(insight)}` : getInsightUrl(insight);
            const guid = insight.kind === "own" ? `${siteConfig.url}${getInsightUrl(insight)}` : insight.externalUrl;

            return `<item>
  <title>${escapeXml(insight.title)}</title>
  <link>${escapeXml(href)}</link>
  <guid>${escapeXml(guid)}</guid>
  <pubDate>${new Date(insight.publishedAt).toUTCString()}</pubDate>
  <description>${escapeXml(insight.excerpt)}</description>
</item>`;
        })
        .join("");

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(`${siteConfig.name} ${insightsPage.label}`)}</title>
    <link>${escapeXml(`${siteConfig.url}${insightsPage.path}`)}</link>
    <description>${escapeXml(insightsPage.metaDescription)}</description>
    <language>de-DE</language>
${items}
  </channel>
</rss>`,
        {
            headers: {
                "Content-Type": "application/rss+xml; charset=utf-8",
                "Cache-Control": "public, max-age=1800, stale-while-revalidate=86400",
            },
        },
    );
}
