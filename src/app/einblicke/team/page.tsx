import type { Metadata } from "next";
import { TeamIndexPage } from "@/components/team/TeamIndexPage";
import { insightsPage } from "@/content/insights";
import { teamMembers } from "@/content/team";
import { siteConfig } from "@/config/site";
import { serializeJsonLd } from "@/lib/json-ld";

const path = `${insightsPage.path}/team`;
const description =
    "Das JobBridge-Team: öffentliche Profile, Verantwortlichkeiten und Kontaktwege der Menschen hinter der digitalen Taschengeldbörse.";

export const metadata: Metadata = {
    title: `Team | ${siteConfig.name}`,
    description,
    alternates: {
        canonical: path,
    },
    openGraph: {
        title: `Team | ${siteConfig.name}`,
        description,
        url: path,
        type: "website",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: `Team | ${siteConfig.name}`,
        description,
        images: ["/og-image.png"],
    },
};

const teamCollectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}${path}#collection`,
    url: `${siteConfig.url}${path}`,
    name: `Team | ${siteConfig.name}`,
    description,
    inLanguage: "de-DE",
    isPartOf: {
        "@id": `${siteConfig.url}/#website`,
    },
    hasPart: teamMembers.map((member) => ({
        "@type": "ProfilePage",
        name: `${member.displayName} | ${siteConfig.name}`,
        url: `${siteConfig.url}${member.profilePath}`,
    })),
};

export default function EinblickeTeamPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(teamCollectionJsonLd) }}
            />
            <TeamIndexPage />
        </>
    );
}
