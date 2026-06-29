import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { PixelShaderBackdrop } from "@/components/TrustNarrative";
import { InsightCard } from "@/components/insights/InsightCard";
import { allInsights, getInsightAbsoluteUrl, insightsPage } from "@/content/insights";
import { siteConfig } from "@/config/site";
import { serializeJsonLd } from "@/lib/json-ld";

export const metadata: Metadata = {
    title: `Alle Einblicke | ${siteConfig.name}`,
    description:
        "Alle JobBridge-Einblicke an einem Ort: eigene Beiträge, Medienberichte und Updates zur Plattform.",
    alternates: {
        canonical: `${insightsPage.path}/alle`,
    },
    openGraph: {
        title: `Alle Einblicke | ${siteConfig.name}`,
        description:
            "Alle JobBridge-Einblicke an einem Ort: eigene Beiträge, Medienberichte und Updates zur Plattform.",
        url: `${insightsPage.path}/alle`,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: `Alle Einblicke | ${siteConfig.name}`,
        description:
            "Alle JobBridge-Einblicke an einem Ort: eigene Beiträge, Medienberichte und Updates zur Plattform.",
        images: ["/og-image.png"],
    },
};

const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}${insightsPage.path}/alle#collection`,
    url: `${siteConfig.url}${insightsPage.path}/alle`,
    name: `Alle Einblicke | ${siteConfig.name}`,
    description: metadata.description,
    inLanguage: "de-DE",
    hasPart: allInsights.map((insight) => ({
        "@type": insight.kind === "own" ? "BlogPosting" : "CreativeWork",
        name: insight.title,
        url: getInsightAbsoluteUrl(insight),
        datePublished: insight.publishedAt,
        sameAs: insight.kind === "external" ? insight.externalUrl : undefined,
    })),
};

export default function AllInsightsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(collectionJsonLd) }}
            />
            <main className="min-h-screen overflow-hidden bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
                <section className="relative isolate overflow-hidden bg-[#02040b]">
                    <PixelShaderBackdrop />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#02040b] to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28rem] bg-gradient-to-t from-[#02040b] via-[#02040b]/88 to-transparent" />
                    <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
                        <SiteHeader />

                        <section className="py-20 sm:py-24 lg:py-28">
                            <Link
                                href={insightsPage.path}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                            >
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                Einblicke
                            </Link>

                            <h1 className="mt-12 max-w-5xl text-[clamp(4rem,10vw,9rem)] font-semibold leading-[0.82] tracking-[-0.075em] text-white">
                                Alle Einblicke.
                            </h1>
                            <p className="mt-8 max-w-2xl text-xl font-medium leading-8 tracking-[-0.03em] text-slate-300">
                                Alle Beiträge, Medienberichte und eigenen Texte zu JobBridge gesammelt an einem Ort.
                            </p>
                        </section>

                        <section className="grid gap-5 pb-24 sm:pb-28 lg:grid-cols-2" aria-label="Alle Einblicke">
                            {allInsights.map((insight) => (
                                <InsightCard key={insight.kind === "own" ? insight.slug : insight.id} insight={insight} />
                            ))}
                        </section>
                    </div>
                </section>

                <Footer showChat={false} />
            </main>
        </>
    );
}
