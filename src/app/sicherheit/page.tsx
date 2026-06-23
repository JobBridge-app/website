import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";
import { placeholderPages } from "@/config/site";

const page = placeholderPages.sicherheit;

export const metadata: Metadata = {
    title: page.navLabel,
    description: page.metaDescription,
    alternates: {
        canonical: page.path,
    },
    openGraph: {
        title: `${page.navLabel} | JobBridge`,
        description: page.metaDescription,
        url: page.path,
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "JobBridge" }],
    },
    twitter: {
        card: "summary_large_image",
        title: `${page.navLabel} | JobBridge`,
        description: page.metaDescription,
        images: ["/og-image.png"],
    },
};

export default function SicherheitPage() {
    return (
        <PlaceholderPage
            eyebrow={page.eyebrow}
            title={page.title}
            description={page.description}
        />
    );
}
