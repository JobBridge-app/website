import type { Metadata } from "next";
import { InsightsIndexPage } from "@/components/insights/InsightsIndexPage";
import { allInsights, insightsPage } from "@/content/insights";
import { siteConfig } from "@/config/site";
import { serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
    title: insightsPage.label,
    description: insightsPage.metaDescription,
    alternates: {
        canonical: insightsPage.path,
        types: {
            "application/rss+xml": "/feed.xml",
        },
    },
    openGraph: {
        title: `${insightsPage.label} | ${siteConfig.name}`,
        description: insightsPage.metaDescription,
        url: insightsPage.path,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: `${insightsPage.label} | ${siteConfig.name}`,
        description: insightsPage.metaDescription,
        images: ["/og-image.png"],
    },
};

const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}${insightsPage.path}#collection`,
    url: `${siteConfig.url}${insightsPage.path}`,
    name: `${insightsPage.label} | ${siteConfig.name}`,
    description: insightsPage.metaDescription,
    inLanguage: "de-DE",
    isPartOf: {
        "@id": `${siteConfig.url}/#website`,
    },
    hasPart: allInsights.map((insight) => ({
        "@type": insight.kind === "own" ? "BlogPosting" : "CreativeWork",
        name: insight.title,
        url: insight.kind === "own" ? `${siteConfig.url}${insightsPage.path}/${insight.slug}` : insight.externalUrl,
        datePublished: insight.publishedAt,
    })),
};

export default function EinblickePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
            />
            <InsightsIndexPage />
        </>
    );
}
