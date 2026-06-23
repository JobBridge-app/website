import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/PlaceholderPage";

export const metadata: Metadata = {
    title: "Demnächst",
    description: "Platzhalterbereich von JobBridge.",
    alternates: {
        canonical: "/demnaechst",
    },
    openGraph: {
        title: "Demnächst | JobBridge",
        description: "Platzhalterbereich von JobBridge.",
        url: "/demnaechst",
    },
};

export default function DemnaechstPage() {
    return (
        <PlaceholderPage
            eyebrow="Platzhalter"
            title="Demnächst"
            description="Dieser Bereich ist als Platzhalter vorgesehen."
        />
    );
}
