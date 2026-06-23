import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
    title: "Blog",
    description: "Aktuelle Nachrichten und Beiträge zu JobBridge.",
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Blog | JobBridge",
        description: "Aktuelle Nachrichten und Beiträge zu JobBridge.",
        url: "/blog",
    },
};

export default function BlogPage() {
    return (
        <PlaceholderPage
            eyebrow="Blog"
            title="Blog"
            description="Aktuelle Nachrichten und eigene Beiträge zu JobBridge werden hier gesammelt."
        />
    );
}
