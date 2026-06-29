import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { teamMembers, type TeamMember } from "@/content/team";

type TeamOverviewSectionProps = {
    showAllLink?: boolean;
};

type PlaceholderMember = {
    role: string;
    title: string;
    description: string;
};

type SecondaryTeamItem =
    | {
          kind: "member";
          member: TeamMember;
      }
    | {
          kind: "placeholder";
          member: PlaceholderMember;
      };

const typedTeamMembers: readonly TeamMember[] = teamMembers;
const primaryTeamMember = typedTeamMembers[0];
const secondaryTeamMembers = typedTeamMembers.slice(1);
const teamMemberPlaceholders: PlaceholderMember[] = [
    {
        role: "Teammitglied",
        title: "Profil folgt",
        description: "Dieses Teamprofil wird ergänzt, sobald die Person öffentlich vorgestellt wird.",
    },
    {
        role: "Teammitglied",
        title: "Profil folgt",
        description: "Weitere Informationen zu Aufgaben und Verantwortungsbereich folgen.",
    },
    {
        role: "Teammitglied",
        title: "Profil folgt",
        description: "Das Profil wird vorbereitet und später in diesem Bereich veröffentlicht.",
    },
];

const secondaryTeamItems: SecondaryTeamItem[] = [
    ...secondaryTeamMembers.map((member) => ({ kind: "member" as const, member })),
    ...teamMemberPlaceholders
        .slice(0, Math.max(0, 4 - typedTeamMembers.length))
        .map((member) => ({ kind: "placeholder" as const, member })),
];

function ProfileImageSlot({
    member,
    minHeight = "md:min-h-[19rem]",
    className = "",
}: {
    member?: TeamMember;
    minHeight?: string;
    className?: string;
}) {
    return (
        <span
            className={`relative block aspect-[16/9] overflow-hidden rounded-[1rem] border border-white/[0.075] bg-[#050912] md:aspect-auto ${minHeight} ${className}`}
        >
            {member?.profileImage ? (
                <Image
                    src={member.profileImage.src}
                    alt={member.profileImage.alt}
                    fill
                    sizes="(min-width: 768px) 18rem, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.025]"
                    style={{ objectPosition: member.profileImage.position ?? "center center" }}
                />
            ) : (
                <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,4,11,0.08)_0%,rgba(2,4,11,0.42)_100%)]">
                    <span className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.032)_1px,transparent_1px)] bg-[size:18px_18px] opacity-60" />
                    <span className="absolute bottom-5 left-5 text-sm font-semibold tracking-[-0.02em] text-slate-500">
                        Profilbild folgt
                    </span>
                </span>
            )}
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(2,4,11,0.32))]" />
        </span>
    );
}

function PrimaryTeamCard({ member }: { member: TeamMember }) {
    return (
        <Link
            href={member.profilePath}
            className="group grid overflow-hidden rounded-[1.22rem] border border-white/10 bg-[#070a10] p-3 shadow-[0_24px_72px_rgba(0,0,0,0.2)] outline-none ring-0 transition duration-500 hover:border-white/18 hover:bg-[#090d15] focus-visible:ring-2 focus-visible:ring-white/70 md:grid-cols-[minmax(14rem,18rem)_minmax(0,1fr)] md:gap-3"
        >
            <ProfileImageSlot member={member} />

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
    );
}

function SecondaryTeamCard({ item, index }: { item: SecondaryTeamItem; index: number }) {
    const alignRight = index % 2 === 1;
    const cardClassName = `overflow-hidden rounded-[1.22rem] border border-white/10 bg-[#070a10] p-3 shadow-[0_24px_72px_rgba(0,0,0,0.2)] md:w-[min(100%,58rem)] ${
        alignRight ? "md:justify-self-end" : "md:justify-self-start"
    }`;
    const contentGridClassName = alignRight
        ? "grid gap-3 md:grid-cols-[minmax(0,1fr)_minmax(11rem,15rem)]"
        : "grid gap-3 md:grid-cols-[minmax(11rem,15rem)_minmax(0,1fr)]";
    const imageClassName = alignRight ? "md:order-2" : "";

    if (item.kind === "member") {
        const member = item.member;

        return (
            <Link
                href={member.profilePath}
                className={`group grid outline-none ring-0 transition duration-500 hover:border-white/18 hover:bg-[#090d15] focus-visible:ring-2 focus-visible:ring-white/70 ${cardClassName}`}
            >
                <div className={contentGridClassName}>
                    <ProfileImageSlot member={member} minHeight="md:min-h-[11.75rem]" className={imageClassName} />
                    <span className="flex min-h-[11.75rem] flex-col justify-between px-2 pb-3 pt-4 sm:px-3 sm:py-4 md:px-4 lg:px-5">
                        <span>
                            <span className="text-sm font-semibold tracking-[-0.02em] text-slate-500">
                                {member.role}
                            </span>
                            <span className="mt-3 block text-[1.6rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[1.8rem]">
                                {member.displayName}
                            </span>
                            <span className="mt-3 block max-w-xl text-[0.96rem] font-medium leading-6 tracking-[-0.02em] text-slate-500">
                                {member.description}
                            </span>
                        </span>

                        <span className="mt-5 flex flex-wrap items-center justify-between gap-3">
                            <span className="text-sm font-medium text-slate-600">{member.location}</span>
                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition group-hover:text-white">
                                Profil öffnen
                                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                            </span>
                        </span>
                    </span>
                </div>
            </Link>
        );
    }

    return (
        <article className={cardClassName}>
            <div className={contentGridClassName}>
                <ProfileImageSlot minHeight="md:min-h-[11.75rem]" className={imageClassName} />
                <div className="flex min-h-[11.75rem] flex-col justify-between px-2 pb-3 pt-4 sm:px-3 sm:py-4 md:px-4 lg:px-5">
                    <div>
                        <p className="text-sm font-semibold tracking-[-0.02em] text-slate-500">
                            {item.member.role}
                        </p>
                        <h3 className="mt-3 text-[1.6rem] font-semibold leading-[0.98] tracking-[-0.055em] text-white sm:text-[1.8rem]">
                            {item.member.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-[0.96rem] font-medium leading-6 tracking-[-0.02em] text-slate-500">
                            {item.member.description}
                        </p>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-sm font-medium text-slate-600">Infos folgen</span>
                        <span className="text-sm font-semibold text-slate-600">Profil folgt</span>
                    </div>
                </div>
            </div>
        </article>
    );
}

export function TeamOverviewSection({ showAllLink = false }: TeamOverviewSectionProps) {
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
                {showAllLink ? (
                    <Link
                        href="/einblicke/team"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                    >
                        Alle anzeigen
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                ) : null}
            </div>

            <div className="mt-9 grid gap-5">
                {primaryTeamMember ? <PrimaryTeamCard member={primaryTeamMember} /> : null}

                {secondaryTeamItems.length > 0 ? (
                    <div className="grid gap-4" aria-label="Weitere Teammitglieder">
                        {secondaryTeamItems.map((item, index) => (
                            <SecondaryTeamCard
                                key={item.kind === "member" ? item.member.slug : `${item.member.title}-${index}`}
                                item={item}
                                index={index}
                            />
                        ))}
                    </div>
                ) : null}
            </div>
        </section>
    );
}
