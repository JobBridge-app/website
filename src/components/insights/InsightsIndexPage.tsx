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
        align: "left",
        role: "Teammitglied",
        title: "Profil folgt",
        description: "Dieses Teamprofil wird ergänzt, sobald die Person öffentlich vorgestellt wird.",
    },
    {
        align: "right",
        role: "Teammitglied",
        title: "Profil folgt",
        description: "Weitere Informationen zu Aufgaben und Verantwortungsbereich folgen.",
    },
    {
        align: "left",
        role: "Teammitglied",
        title: "Profil folgt",
        description: "Das Profil wird vorbereitet und später in diesem Bereich veröffentlicht.",
    },
] as const;

function TeamPreview() {
    return (
        <section id="team" className="pb-24 pt-8 sm:pb-28 sm:pt-10">
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
                        className={`group overflow-hidden rounded-[1.22rem] border border-white/10 bg-[#070a10] p-3 shadow-[0_24px_72px_rgba(0,0,0,0.2)] outline-none ring-0 transition duration-500 hover:border-white/18 hover:bg-[#090d15] focus-visible:ring-2 focus-visible:ring-white/70 ${
                            hasSingleTeamMember
                                ? "grid md:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)] md:gap-3"
                                : "flex min-h-full flex-col"
                        }`}
                    >
                        <span
                            className={`relative block overflow-hidden rounded-[1rem] border border-white/[0.075] bg-[#050912] ${
                                hasSingleTeamMember ? "aspect-[16/9] md:aspect-auto md:min-h-[19rem]" : "aspect-[4/3]"
                            }`}
                        >
                            {member.profileImage ? (
                                <Image
                                    src={member.profileImage.src}
                                    alt={member.profileImage.alt}
                                    fill
                                    sizes={
                                        hasSingleTeamMember
                                            ? "(min-width: 768px) 18rem, 100vw"
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
                            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(2,4,11,0.32))]" />
                        </span>

                        <span className="flex min-h-[19rem] flex-col justify-between px-2 pb-3 pt-5 sm:px-3 sm:pb-4 md:p-6 lg:p-7">
                            <span>
                                <span className="text-sm font-semibold tracking-[-0.02em] text-slate-400">
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
                                <span className="text-sm font-medium text-slate-400">{member.location}</span>
                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/74 transition group-hover:text-white">
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

            <div className="mt-5 grid gap-4" aria-label="Weitere Teammitglieder">
                {teamMemberPlaceholders.map((member) => (
                    <article
                        key={`${member.align}-${member.description}`}
                        className={`overflow-hidden rounded-[1.22rem] border border-white/10 bg-[#070a10] p-3 shadow-[0_24px_72px_rgba(0,0,0,0.2)] ${
                            member.align === "right" ? "md:justify-self-end" : "md:justify-self-start"
                        } md:w-[min(100%,58rem)]`}
                    >
                        <div
                            className={`grid gap-3 ${
                                member.align === "right"
                                    ? "md:grid-cols-[minmax(0,1fr)_minmax(11rem,15rem)]"
                                    : "md:grid-cols-[minmax(11rem,15rem)_minmax(0,1fr)]"
                            }`}
                        >
                            <div
                                className={`relative aspect-[16/10] overflow-hidden rounded-[1rem] border border-white/[0.075] bg-[#050912] md:aspect-auto md:min-h-[11.75rem] ${
                                    member.align === "right" ? "md:order-2" : ""
                                }`}
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.032)_1px,transparent_1px)] bg-[size:18px_18px] opacity-60" />
                                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,4,11,0.08)_0%,rgba(2,4,11,0.42)_100%)]" />
                                <span className="absolute bottom-5 left-5 text-sm font-semibold tracking-[-0.02em] text-slate-500">
                                    Bild folgt
                                </span>
                            </div>

                            <div className="flex min-h-[11.75rem] flex-col justify-between px-2 pb-3 pt-4 sm:px-3 sm:py-4 md:px-4 lg:px-5">
                                <div>
                                    <p className="text-sm font-semibold tracking-[-0.02em] text-slate-500">
                                        {member.role}
                                    </p>
                                    <h3 className="mt-3 text-[1.6rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[1.8rem]">
                                        {member.title}
                                    </h3>
                                    <p className="mt-3 max-w-xl text-[0.96rem] font-medium leading-6 tracking-[-0.02em] text-slate-500">
                                        {member.description}
                                    </p>
                                </div>

                                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                                    <span className="text-sm font-medium text-slate-600">Infos folgen</span>
                                    <span className="text-sm font-semibold text-slate-600">Profil folgt</span>
                                </div>
                            </div>
                        </div>
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
