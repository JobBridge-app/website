import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { PixelShaderBackdrop } from "@/components/TrustNarrative";
import { SiteHeader } from "@/components/SiteHeader";
import { InsightCard } from "@/components/insights/InsightCard";
import { TeamOverviewSection } from "@/components/team/TeamOverviewSection";
import { allInsights, ownInsights, externalInsights } from "@/content/insights";

const visibleInsights = allInsights.slice(0, 6);

export function InsightsIndexPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
            <section className="relative isolate overflow-hidden bg-[#02040b]">
                <PixelShaderBackdrop />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#02040b] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[34rem] bg-gradient-to-t from-[#02040b] via-[#02040b]/88 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,11,0.02)_0%,rgba(2,4,11,0.1)_52%,rgba(2,4,11,0.32)_100%)]" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
                    <SiteHeader />

                    <div className="flex min-h-[76svh] items-center py-20 sm:py-24 lg:py-28">
                        <div className="w-full max-w-[52rem]">
                            <Image
                                src="/jobbridge-bridge-logo-white.png"
                                alt=""
                                width={118}
                                height={60}
                                className="h-auto w-[5.9rem] object-contain opacity-95"
                                priority
                            />

                            <h1 className="mt-12 max-w-[10.5ch] text-pretty text-[clamp(3.8rem,8.8vw,8.7rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-white">
                                Einblicke.
                                <span className="block text-[#737b87]">Berichte.</span>
                                Hintergründe.
                            </h1>

                            <p className="mt-8 max-w-[37rem] text-pretty text-[clamp(1.08rem,1.45vw,1.48rem)] font-medium leading-[1.32] tracking-[-0.02em] text-[#8c94a1]">
                                <span className="text-white">JobBridge sammelt, was über die Plattform entsteht:</span>{" "}
                                eigene Beiträge, Medienberichte und Updates aus der Arbeit dahinter.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
                                <span>{ownInsights.length} eigener Text</span>
                                <span className="h-1 w-1 rounded-full bg-slate-600" />
                                <span>{externalInsights.length} Medienberichte</span>
                            </div>
                        </div>
                    </div>

                    <section className="pb-16 pt-2 sm:pb-20" aria-labelledby="latest-insights-heading">
                        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                            <div>
                                <h2
                                    id="latest-insights-heading"
                                    className="text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl"
                                >
                                    Neueste Einblicke
                                </h2>
                            </div>
                            <Link
                                href="/einblicke/alle"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                            >
                                Alle anzeigen
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                        </div>

                        <div className="grid gap-5 lg:grid-cols-2" aria-label="Neueste Einblicke">
                            {visibleInsights.map((insight) => (
                                <InsightCard key={insight.kind === "own" ? insight.slug : insight.id} insight={insight} />
                            ))}
                        </div>
                    </section>

                    <TeamOverviewSection showAllLink />
                </div>
            </section>

            <Footer showChat={false} />
        </main>
    );
}
