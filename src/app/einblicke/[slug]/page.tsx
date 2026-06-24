import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InsightArticlePage } from "@/components/insights/InsightArticlePage";
import { getOwnInsight, insightsPage, ownInsights } from "@/content/insights";
import { getTeamMember } from "@/content/team";
import { siteConfig } from "@/config/site";
import { serializeJsonLd } from "@/lib/json-ld";

type InsightArticleRouteProps = {
    params: Promise<{
        slug: string;
    }>;
};

export function generateStaticParams() {
    return ownInsights.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: InsightArticleRouteProps): Promise<Metadata> {
    const { slug } = await params;
    const article = getOwnInsight(slug);

    if (!article) {
        return {};
    }

    const author = getTeamMember(article.authorSlug);
    const path = `${insightsPage.path}/${article.slug}`;
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

export default async function InsightArticleRoute({ params }: InsightArticleRouteProps) {
    const { slug } = await params;
    const article = getOwnInsight(slug);

    if (!article) {
        notFound();
    }

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
