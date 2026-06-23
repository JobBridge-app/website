import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
    title: "Kontakt",
    description: "Kontaktseite von JobBridge.",
    alternates: {
        canonical: "/kontakt",
    },
    openGraph: {
        title: "Kontakt | JobBridge",
        description: "Kontaktseite von JobBridge.",
        url: "/kontakt",
    },
};

export default function KontaktPage() {
    return (
        <PlaceholderPage
            eyebrow="Kontakt"
            title="Kontakt"
            description="Diese Seite wird gerade vorbereitet."
        />
    );
}
