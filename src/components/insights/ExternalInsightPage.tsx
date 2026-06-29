import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { PixelShaderBackdrop } from "@/components/TrustNarrative";
import { SiteHeader } from "@/components/SiteHeader";
import { formatInsightDate, type ExternalInsight } from "@/content/insights";
import { siteConfig } from "@/config/site";

type ExternalInsightPageProps = {
    insight: ExternalInsight;
};

export function ExternalInsightPage({ insight }: ExternalInsightPageProps) {
    return (
        <main className="min-h-screen overflow-hidden bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
            <section className="relative isolate overflow-hidden bg-[#02040b]">
                <PixelShaderBackdrop />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#02040b] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] bg-gradient-to-t from-[#02040b] via-[#02040b]/92 to-transparent" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
                    <SiteHeader />

                    <article className="pb-20 pt-16 sm:pb-24 sm:pt-22 lg:pb-28 lg:pt-28">
                        <Link
                            href="/einblicke"
                            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            Einblicke
                        </Link>

                        <header className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(26rem,0.78fr)] lg:items-center lg:gap-14">
                            <div className="min-w-0">
                                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100/62">
                                    {insight.category}
                                </p>
                                <h1 className="mt-6 max-w-[13ch] text-pretty text-[clamp(3.1rem,4.85vw,5.55rem)] font-semibold leading-[0.91] tracking-[-0.055em] text-white">
                                    {insight.title}
                                </h1>
                                <p className="mt-7 max-w-[40rem] text-pretty text-[clamp(1.1rem,1.45vw,1.42rem)] font-medium leading-[1.34] tracking-[-0.024em] text-[#a5adba] lg:mt-8">
                                    {insight.excerpt}
                                </p>

                                <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.96rem] font-medium tracking-[-0.01em] text-slate-400">
                                    <span className="text-white/86">{insight.sourceName}</span>
                                    <span className="h-1 w-1 rounded-full bg-slate-600" />
                                    <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
                                </div>

                                <div className="mt-8 flex flex-wrap items-center gap-3">
                                    <a
                                        href={insight.externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                    >
                                        Originalquelle öffnen
                                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                    </a>
                                    <Link
                                        href="/einblicke/alle"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/18 hover:bg-white/[0.065] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                    >
                                        Alle Einblicke
                                    </Link>
                                </div>
                            </div>

                            {insight.image ? (
                                <figure className="relative overflow-hidden rounded-[1.15rem] border border-white/[0.08] bg-[#050912] shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
                                    <div className="relative aspect-[16/10]">
                                        <Image
                                            src={insight.image.src}
                                            alt={insight.image.alt}
                                            fill
                                            priority
                                            sizes="(min-width: 1024px) 40vw, 100vw"
                                            className="object-cover"
                                            style={{ objectPosition: insight.image.position ?? "center" }}
                                        />
                                    </div>
                                </figure>
                            ) : null}
                        </header>
                    </article>
                </div>
            </section>

            <section className="relative bg-[#02040b]">
                <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 pb-24 sm:px-8 sm:pb-28 lg:grid-cols-[minmax(0,0.92fr)_minmax(18rem,0.42fr)] lg:px-10">
                    <article className="max-w-[47rem] space-y-8 text-[1.08rem] font-medium leading-8 tracking-[-0.013em] text-slate-300/86 sm:text-[1.14rem] sm:leading-9">
                        <h2 className="max-w-[13ch] text-[clamp(2rem,4vw,3.35rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
                            Einordnung
                        </h2>
                        <p>
                            Dieser Eintrag dokumentiert eine öffentliche Quelle über {siteConfig.name}. Die Originalquelle
                            bleibt maßgeblich; JobBridge hält hier Kontext, Fundstelle und Bezug zur Plattform auffindbar.
                        </p>
                        <p>
                            Für Nutzer und Suchmaschinen ist diese Seite der interne Einstiegspunkt zum Medienbericht. So
                            bleibt der Einblick über Navigation, XML-Sitemap und RSS-Feed dauerhaft erreichbar.
                        </p>
                    </article>

                    <aside className="h-fit rounded-[1.1rem] border border-white/10 bg-white/[0.035] p-5 text-sm font-medium text-slate-400">
                        <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">Quelle</h2>
                        <dl className="mt-5 space-y-4">
                            <div>
                                <dt className="text-slate-500">Medium</dt>
                                <dd className="mt-1 text-slate-200">{insight.sourceName}</dd>
                            </div>
                            <div>
                                <dt className="text-slate-500">Veröffentlicht</dt>
                                <dd className="mt-1 text-slate-200">{formatInsightDate(insight.publishedAt)}</dd>
                            </div>
                            {insight.authorName ? (
                                <div>
                                    <dt className="text-slate-500">Autor</dt>
                                    <dd className="mt-1 text-slate-200">{insight.authorName}</dd>
                                </div>
                            ) : null}
                        </dl>
                    </aside>
                </div>
            </section>

            <Footer showChat={false} />
        </main>
    );
}
