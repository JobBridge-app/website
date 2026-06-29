import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalInsightPage } from "@/components/insights/ExternalInsightPage";
import { InsightArticlePage } from "@/components/insights/InsightArticlePage";
import {
    allInsights,
    getInsightAbsoluteUrl,
    getInsightBySlug,
    getInsightCanonicalPath,
    getInsightSlug,
    getInsightSourceUrl,
    insightsPage,
    type ExternalInsight,
    type OwnInsight,
} from "@/content/insights";
import { getTeamMember } from "@/content/team";
import { siteConfig } from "@/config/site";
import { serializeJsonLd } from "@/lib/json-ld";

type InsightArticleRouteProps = {
    params: Promise<{
        slug: string;
    }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
    return allInsights.map((insight) => ({ slug: getInsightSlug(insight) }));
}

function getOwnInsightMetadata(article: OwnInsight): Metadata {
    const author = getTeamMember(article.authorSlug);
    const path = getInsightCanonicalPath(article);
    const imageUrl = article.image?.src ?? "/og-image.png";

    return {
        title: article.title,
        description: article.description,
        authors: [
            {
                name: author?.displayName ?? siteConfig.name,
                url: author ? `${siteConfig.url}${author.profilePath}` : siteConfig.url,
            },
        ],
        alternates: {
            canonical: path,
        },
        openGraph: {
            title: `${article.title} | ${siteConfig.name}`,
            description: article.description,
            url: path,
            type: "article",
            publishedTime: article.publishedAt,
            modifiedTime: article.updatedAt,
            authors: author ? [author.displayName] : [siteConfig.name],
            tags: article.tags,
            images: [{ url: imageUrl, width: 1200, height: 630, alt: article.image?.alt ?? article.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${article.title} | ${siteConfig.name}`,
            description: article.description,
            images: [imageUrl],
        },
    };
}

function getExternalInsightMetadata(insight: ExternalInsight): Metadata {
    const path = getInsightCanonicalPath(insight);
    const imageUrl = insight.image?.src ?? "/og-image.png";

    return {
        title: insight.title,
        description: insight.excerpt,
        alternates: {
            canonical: path,
        },
        openGraph: {
            title: `${insight.title} | ${siteConfig.name}`,
            description: insight.excerpt,
            url: path,
            type: "article",
            publishedTime: insight.publishedAt,
            authors: insight.authorName ? [insight.authorName] : [insight.sourceName],
            tags: insight.tags,
            images: [{ url: imageUrl, width: 1200, height: 630, alt: insight.image?.alt ?? insight.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${insight.title} | ${siteConfig.name}`,
            description: insight.excerpt,
            images: [imageUrl],
        },
    };
}

export async function generateMetadata({ params }: InsightArticleRouteProps): Promise<Metadata> {
    const { slug } = await params;
    const insight = getInsightBySlug(slug);

    if (!insight) {
        return {};
    }

    return insight.kind === "own" ? getOwnInsightMetadata(insight) : getExternalInsightMetadata(insight);
}

export default async function InsightArticleRoute({ params }: InsightArticleRouteProps) {
    const { slug } = await params;
    const insight = getInsightBySlug(slug);

    if (!insight) {
        notFound();
    }

    if (insight.kind === "external") {
        const insightUrl = getInsightAbsoluteUrl(insight);
        const imageUrl = insight.image?.src ? `${siteConfig.url}${insight.image.src}` : `${siteConfig.url}/og-image.png`;
        const externalJsonLd = {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${insightUrl}#webpage`,
            url: insightUrl,
            name: `${insight.title} | ${siteConfig.name}`,
            description: insight.excerpt,
            inLanguage: "de-DE",
            isPartOf: {
                "@id": `${siteConfig.url}/#website`,
            },
            about: {
                "@type": "CreativeWork",
                name: insight.title,
                url: getInsightSourceUrl(insight),
                sameAs: insight.externalUrl,
                datePublished: insight.publishedAt,
                publisher: {
                    "@type": "Organization",
                    name: insight.sourceName,
                    url: insight.sourceUrl,
                },
                ...(insight.authorName
                    ? {
                          author: {
                              "@type": "Person",
                              name: insight.authorName,
                          },
                      }
                    : {}),
            },
            publisher: {
                "@id": `${siteConfig.url}/#organization`,
            },
            image: [imageUrl],
            keywords: insight.tags.join(", "),
        };

        return (
            <>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: serializeJsonLd(externalJsonLd) }}
                />
                <ExternalInsightPage insight={insight} />
            </>
        );
    }

    const article = insight;
    const author = getTeamMember(article.authorSlug);
    const articleUrl = `${siteConfig.url}${insightsPage.path}/${article.slug}`;
    const articleImageUrl = article.image?.src ? `${siteConfig.url}${article.image.src}` : `${siteConfig.url}/og-image.png`;

    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${articleUrl}#article`,
        headline: article.title,
        description: article.description,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        mainEntityOfPage: articleUrl,
        url: articleUrl,
        inLanguage: "de-DE",
        image: [articleImageUrl],
        author: {
            "@type": "Person",
            name: author?.displayName ?? siteConfig.name,
            url: author ? `${siteConfig.url}${author.profilePath}` : siteConfig.url,
        },
        publisher: {
            "@id": `${siteConfig.url}/#organization`,
        },
        keywords: article.tags.join(", "),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
            />
            <InsightArticlePage article={article} />
        </>
    );
}
