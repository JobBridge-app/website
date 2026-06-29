import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { formatInsightDate, getInsightUrl, type Insight } from "@/content/insights";
import { getTeamMember } from "@/content/team";

type InsightCardProps = {
    insight: Insight;
};

function InsightVisual({ insight }: { insight: Insight }) {
    return (
        <div className="relative aspect-[16/9] overflow-hidden rounded-[1rem] border border-white/[0.075] bg-[#050912]">
            {insight.image ? (
                <Image
                    src={insight.image.src}
                    alt={insight.image.alt}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: insight.image.position ?? "center" }}
                />
            ) : (
                <>
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.075)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.075)_1px,transparent_1px)] bg-[size:18px_18px] opacity-42" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,4,11,0.08)_0%,rgba(2,4,11,0.58)_72%,rgba(2,4,11,0.86)_100%)]" />
                </>
            )}
        </div>
    );
}

export function InsightCard({ insight }: InsightCardProps) {
    const href = getInsightUrl(insight);
    const author = insight.kind === "own" ? getTeamMember(insight.authorSlug) : undefined;

    return (
        <article className="group relative overflow-hidden rounded-[1.22rem] border border-white/10 bg-[#070a10] p-3 shadow-[0_24px_72px_rgba(0,0,0,0.2)] transition duration-500 hover:border-white/18 hover:bg-[#090d15]">
            <Link
                href={href}
                className="relative flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
                <InsightVisual insight={insight} />

                <div className="flex min-h-0 flex-1 flex-col px-2 pb-3 pt-5 sm:px-3 sm:pb-4">
                    <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0 text-sm font-medium text-slate-400">
                            <time dateTime={insight.publishedAt}>{formatInsightDate(insight.publishedAt)}</time>
                            <span className="mx-2 text-slate-600">/</span>
                            <span className="text-slate-300">
                                {insight.kind === "external" ? insight.sourceName : (author?.displayName ?? "JobBridge")}
                            </span>
                        </div>
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/74 transition duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-white group-hover:text-black">
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </span>
                    </div>

                    <h2
                        className="mt-6 max-w-[20ch] text-pretty text-[clamp(1.72rem,2.8vw,2.55rem)] font-semibold leading-[1] tracking-[-0.045em] text-white"
                    >
                        {insight.title}
                    </h2>

                    <p className="mt-5 max-w-xl text-[0.98rem] font-medium leading-7 tracking-[-0.012em] text-slate-300/74">
                        {insight.excerpt}
                    </p>
                </div>
            </Link>
        </article>
    );
}
