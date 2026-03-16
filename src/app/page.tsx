import type { Metadata } from "next";
import { Hero } from "@/components/ui/animated-hero";
import { HeroScrollDemo } from "@/components/ui/hero-scroll-demo";
import { FeatureSections } from "@/components/FeatureSections";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
    title: "JobBridge – Sichere Taschengeldjobs in Rheinbach",
    description:
        "JobBridge ist die digitale Taschengeldbörse für Rheinbach: Jugendliche finden sichere Taschengeldjobs, Eltern behalten den Überblick und Auftraggeber erhalten geprüfte Unterstützung. Mit Verifizierung und Jugendschutz.",
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "JobBridge – Sichere Taschengeldjobs in Rheinbach",
        description:
            "Die digitale Taschengeldbörse: sichere Jobs für Jugendliche, volle Transparenz für Eltern, geprüfte Hilfe für Auftraggeber. Jetzt in Rheinbach.",
        url: "/",
        images: [
            {
                url: "/og-image.png",
                width: 1024,
                height: 1024,
                alt: "JobBridge – Die digitale Taschengeldbörse",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "JobBridge – Sichere Taschengeldjobs in Rheinbach",
        description:
            "Die digitale Taschengeldbörse: sichere Jobs für Jugendliche, volle Transparenz für Eltern, geprüfte Hilfe für Auftraggeber.",
        images: ["/og-image.png"],
    },
};

export default function HomePage() {
    return (
        <main className="min-h-screen bg-[#02040b] text-white font-sans selection:bg-blue-400/30 selection:text-blue-100">
            <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_-22%,#0b1c31_0%,#060d1a_45%,#02040b_100%)]">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,11,0.6)_0%,rgba(2,4,11,0.28)_45%,rgba(2,4,11,0.8)_100%)]" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(148,163,184,0.08),transparent_48%)]" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-40 bg-gradient-to-t from-[#02040b] to-transparent" />

                <div className="relative z-10 flex h-full w-full items-center justify-center px-4 pb-4 pt-[max(0.75rem,env(safe-area-inset-top))]">
                    <Hero />
                </div>
            </section>

            <section id="how-it-works" className="relative z-20">
                <HeroScrollDemo />
            </section>

            <FeatureSections />

            <Footer />
        </main>
    );
}
