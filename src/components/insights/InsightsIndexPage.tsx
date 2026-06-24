import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { PixelShaderBackdrop } from "@/components/TrustNarrative";
import { SiteHeader } from "@/components/SiteHeader";
import { InsightCard } from "@/components/insights/InsightCard";
import { allInsights, ownInsights, externalInsights } from "@/content/insights";
import { teamMembers } from "@/content/team";

const visibleInsights = allInsights.slice(0, 6);
const hasSingleTeamMember = teamMembers.length === 1;
const teamMemberPlaceholders = [
    {
        slot: "01",
        title: "Profil folgt",
        description: "Dieses Teamprofil wird ergänzt, sobald die Person öffentlich vorgestellt wird.",
    },
    {
        slot: "02",
        title: "Profil folgt",
        description: "Weitere Informationen zu Aufgaben und Verantwortungsbereich folgen.",
    },
    {
        slot: "03",
        title: "Profil folgt",
        description: "Das Profil wird vorbereitet und später in diesem Bereich veröffentlicht.",
    },
] as const;

function TeamPreview() {
    return (
        <section id="team" className="border-t border-white/10 pb-24 pt-12 sm:pb-28 sm:pt-14">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl">
                        Team
                    </h2>
                    <p className="mt-4 max-w-2xl text-[1rem] font-medium leading-7 tracking-[-0.02em] text-slate-500 sm:text-[1.08rem]">
                        Personen, die JobBridge entwickeln, erklären und verantworten.
                    </p>
                </div>
            </div>

            <div className={hasSingleTeamMember ? "mt-9 grid gap-5" : "mt-9 grid gap-5 lg:grid-cols-2"}>
                {teamMembers.map((member) => (
                    <Link
                        key={member.slug}
                        href={member.profilePath}
                        className={`group overflow-hidden rounded-[1.2rem] border border-white/[0.09] bg-white/[0.032] outline-none ring-0 transition duration-300 hover:border-white/[0.16] hover:bg-white/[0.052] focus-visible:ring-2 focus-visible:ring-white/70 ${
                            hasSingleTeamMember
                                ? "grid md:grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)]"
                                : "flex min-h-full flex-col"
                        }`}
                    >
                        <span
                            className={`relative block overflow-hidden bg-[#050912] ${
                                hasSingleTeamMember ? "aspect-[16/9] md:aspect-auto md:min-h-[18rem]" : "aspect-[4/3]"
                            }`}
                        >
                            {member.profileImage ? (
                                <Image
                                    src={member.profileImage.src}
                                    alt={member.profileImage.alt}
                                    fill
                                    sizes={
                                        hasSingleTeamMember
                                            ? "(min-width: 768px) 16rem, 100vw"
                                            : "(min-width: 1024px) 42vw, 100vw"
                                    }
                                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                                    style={{ objectPosition: member.profileImage.position ?? "center center" }}
                                />
                            ) : (
                                <span className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.56))] text-4xl font-semibold tracking-[-0.06em] text-white/80">
                                    {member.shortName.slice(0, 1)}
                                </span>
                            )}
                            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(2,4,11,0.42))]" />
                        </span>

                        <span className="flex min-h-[18rem] flex-col justify-between p-5 sm:p-6 lg:p-7">
                            <span>
                                <span className="text-sm font-semibold tracking-[-0.02em] text-slate-500">
                                    {member.role}
                                </span>
                                <span className="mt-3 block text-[2rem] font-semibold leading-[0.96] tracking-[-0.058em] text-white sm:text-[2.35rem]">
                                    {member.displayName}
                                </span>
                                <span className="mt-5 block max-w-2xl text-[0.98rem] font-medium leading-7 tracking-[-0.02em] text-slate-400">
                                    {member.description}
                                </span>
                            </span>

                            <span className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                                <span className="text-sm font-medium text-slate-500">{member.location}</span>
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100/82 transition group-hover:text-white">
                                    Profil öffnen
                                    <ArrowUpRight
                                        className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                        aria-hidden="true"
                                    />
                                </span>
                            </span>
                        </span>
                    </Link>
                ))}
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3" aria-label="Weitere Teammitglieder">
                {teamMemberPlaceholders.map((member) => (
                    <article
                        key={member.slot}
                        className="flex min-h-[13.5rem] flex-col justify-between rounded-[1rem] border border-white/[0.08] bg-white/[0.024] p-5 sm:p-6"
                    >
                        <div>
                            <div className="flex items-center justify-between gap-4">
                                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-[#050912] text-sm font-semibold tracking-[-0.02em] text-slate-500">
                                    {member.slot}
                                </span>
                                <span className="text-sm font-semibold tracking-[-0.02em] text-slate-600">
                                    Teammitglied
                                </span>
                            </div>

                            <h3 className="mt-7 text-[1.7rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white">
                                {member.title}
                            </h3>
                            <p className="mt-4 max-w-sm text-[0.96rem] font-medium leading-6 tracking-[-0.02em] text-slate-500">
                                {member.description}
                            </p>
                        </div>

                        <p className="mt-8 border-t border-white/[0.07] pt-4 text-sm font-medium text-slate-600">
                            Infos folgen
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}

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

                    <TeamPreview />
                </div>
            </section>

            <Footer showChat={false} />
        </main>
    );
}
