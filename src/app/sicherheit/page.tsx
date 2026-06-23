import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
    title: "Sicherheit",
    description: "Sicherheitsbereich von JobBridge.",
    alternates: {
        canonical: "/sicherheit",
    },
    openGraph: {
        title: "Sicherheit | JobBridge",
        description: "Sicherheitsbereich von JobBridge.",
        url: "/sicherheit",
    },
};

export default function SicherheitPage() {
    return (
        <PlaceholderPage
            eyebrow="Sicherheit"
            title="Sicherheit"
            description="Diese Seite wird gerade vorbereitet."
        />
    );
}
