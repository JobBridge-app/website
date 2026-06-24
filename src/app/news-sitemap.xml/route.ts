import { insightsPage, ownInsights } from "@/content/insights";
import { siteConfig } from "@/config/site";

export const dynamic = "force-dynamic";

function escapeXml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export function GET() {
    const now = Date.now();
    const twoDays = 1000 * 60 * 60 * 24 * 2;
    const articles = ownInsights.filter(
        (article) => article.newsEligible && now - new Date(article.publishedAt).getTime() <= twoDays,
    );

    const urls = articles
        .map(
            (article) => `<url>
  <loc>${escapeXml(`${siteConfig.url}${insightsPage.path}/${article.slug}`)}</loc>
  <news:news>
    <news:publication>
      <news:name>${escapeXml(siteConfig.name)}</news:name>
      <news:language>de</news:language>
    </news:publication>
    <news:publication_date>${escapeXml(article.publishedAt)}</news:publication_date>
    <news:title>${escapeXml(article.title)}</news:title>
  </news:news>
</url>`,
        )
        .join("");

    return new Response(
        `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`,
        {
            headers: {
                "Content-Type": "application/xml; charset=utf-8",
                "Cache-Control": "public, max-age=900, stale-while-revalidate=3600",
            },
        },
    );
}
