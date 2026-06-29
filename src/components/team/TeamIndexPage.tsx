import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { PixelShaderBackdrop } from "@/components/TrustNarrative";
import { TeamOverviewSection } from "@/components/team/TeamOverviewSection";

export function TeamIndexPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
            <section className="relative isolate overflow-hidden bg-[#02040b]">
                <PixelShaderBackdrop />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#02040b] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[28rem] bg-gradient-to-t from-[#02040b] via-[#02040b]/88 to-transparent" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
                    <SiteHeader />

                    <div className="pt-16 sm:pt-20 lg:pt-24">
                        <Link
                            href="/einblicke"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            Einblicke
                        </Link>
                    </div>

                    <TeamOverviewSection />
                </div>
            </section>

            <Footer showChat={false} />
        </main>
    );
}
