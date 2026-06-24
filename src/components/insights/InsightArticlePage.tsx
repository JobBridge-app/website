import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { PixelShaderBackdrop } from "@/components/TrustNarrative";
import { SiteHeader } from "@/components/SiteHeader";
import { formatInsightDate, type OwnInsight } from "@/content/insights";
import { getTeamMember } from "@/content/team";

type InsightArticlePageProps = {
    article: OwnInsight;
};

export function InsightArticlePage({ article }: InsightArticlePageProps) {
    const author = getTeamMember(article.authorSlug);

    return (
        <main className="min-h-screen overflow-hidden bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
            <section className="relative isolate overflow-hidden bg-[#02040b]">
                <PixelShaderBackdrop />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#02040b] to-transparent" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] bg-gradient-to-t from-[#02040b] via-[#02040b]/92 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(2,4,11,0.02)_0%,rgba(2,4,11,0.16)_60%,rgba(2,4,11,0.42)_100%)]" />

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

                        <header className="mt-9 lg:mt-10">
                            {article.image ? (
                                <figure className="relative mb-10 overflow-hidden rounded-[1.05rem] border border-white/[0.08] bg-[#050912] shadow-[0_22px_70px_rgba(0,0,0,0.24)] lg:hidden">
                                    <div className="relative aspect-[16/9]">
                                        <Image
                                            src={article.image.src}
                                            alt={article.image.alt}
                                            fill
                                            priority
                                            sizes="(min-width: 1024px) 40vw, 100vw"
                                            className="object-cover"
                                            style={{ objectPosition: article.image.position ?? "center" }}
                                        />
                                    </div>
                                </figure>
                            ) : null}

                            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.96fr)_minmax(27rem,0.8fr)] lg:items-center lg:gap-14">
                                <div className="min-w-0">
                                    <h1 className="max-w-[12.8ch] text-pretty text-[clamp(3.1rem,4.85vw,5.55rem)] font-semibold leading-[0.91] tracking-[-0.055em] text-white">
                                        {article.title}
                                    </h1>

                                    <p className="mt-7 max-w-[40rem] text-pretty text-[clamp(1.1rem,1.45vw,1.42rem)] font-medium leading-[1.34] tracking-[-0.024em] text-[#a5adba] lg:mt-8">
                                        {article.heroLine}
                                    </p>

                                    <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.96rem] font-medium tracking-[-0.01em] text-slate-400">
                                        {author ? (
                                            <Link
                                                href={author.profilePath}
                                                className="text-white/86 underline decoration-white/18 underline-offset-4 transition hover:text-white"
                                            >
                                                {author.displayName}
                                            </Link>
                                        ) : (
                                            <span>JobBridge</span>
                                        )}
                                        <span className="h-1 w-1 rounded-full bg-slate-600" />
                                        <time dateTime={article.publishedAt}>{formatInsightDate(article.publishedAt)}</time>
                                    </div>
                                </div>

                                {article.image ? (
                                    <figure className="relative hidden overflow-hidden rounded-[1.15rem] border border-white/[0.08] bg-[#050912] shadow-[0_28px_90px_rgba(0,0,0,0.28)] lg:block">
                                        <div className="relative aspect-[16/10]">
                                            <Image
                                                src={article.image.src}
                                                alt={article.image.alt}
                                                fill
                                                priority
                                                sizes="(min-width: 1024px) 40vw, 100vw"
                                                className="object-cover"
                                                style={{ objectPosition: article.image.position ?? "center" }}
                                            />
                                        </div>
                                    </figure>
                                ) : null}
                            </div>
                        </header>
                    </article>
                </div>
            </section>

            <section className="relative bg-[#02040b]">
                <article className="mx-auto w-full max-w-7xl px-5 pb-24 sm:px-8 sm:pb-28 lg:px-10">
                    <div className="max-w-[47rem] space-y-8 text-[1.08rem] font-medium leading-8 tracking-[-0.013em] text-slate-300/86 sm:text-[1.14rem] sm:leading-9">
                        {article.body.map((block, index) => {
                            if (block.type === "heading") {
                                return (
                                    <h2
                                        key={`${block.type}-${index}`}
                                        className="max-w-[13ch] pt-7 text-[clamp(2rem,4vw,3.35rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-white"
                                    >
                                        {block.text}
                                    </h2>
                                );
                            }

                            if (block.type === "list") {
                                return (
                                    <ul key={`${block.type}-${index}`} className="space-y-4 pt-1">
                                        {block.items.map((item) => (
                                            <li key={item} className="flex gap-4">
                                                <span className="mt-[0.78rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                );
                            }

                            return <p key={`${block.type}-${index}`}>{block.text}</p>;
                        })}

                        <div className="!mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-7 text-sm font-medium">
                            <Link
                                href="/einblicke"
                                className="group inline-flex items-center gap-2 text-white transition hover:text-blue-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                            >
                                Alle Einblicke
                                <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                            </Link>
                            {author ? (
                                <Link
                                    href={author.profilePath}
                                    className="text-slate-400 underline decoration-white/15 underline-offset-4 transition hover:text-white"
                                >
                                    Zum Autorprofil
                                </Link>
                            ) : null}
                        </div>
                    </div>
                </article>
            </section>
            <Footer showChat={false} />
        </main>
    );
}
