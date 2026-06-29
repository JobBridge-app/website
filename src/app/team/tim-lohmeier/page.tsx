import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Building2, Mail, type LucideIcon } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { PixelShaderBackdrop } from "@/components/TrustNarrative";
import { ProfilePortraitPlaceholder } from "@/components/team/ProfilePortraitPlaceholder";
import { siteConfig } from "@/config/site";
import {
    allInsights,
    formatInsightDate,
    getInsightAbsoluteUrl,
    getInsightUrl,
    type Insight,
} from "@/content/insights";
import { getTeamMember, type TeamMember } from "@/content/team";
import { serializeJsonLd } from "@/lib/json-ld";

const member = getTeamMember("tim-lohmeier");

const contactIcons = {
    "direct-email": Mail,
    "team-email": Building2,
    instagram: ArrowUpRight,
    phone: ArrowUpRight,
    website: ArrowUpRight,
    "external-profile": ArrowUpRight,
} satisfies Record<TeamMember["contactLinks"][number]["kind"], LucideIcon>;

function getProfileInsightKey(insight: Insight) {
    return insight.kind === "own" ? insight.slug : insight.id;
}

function getOwnInsightBodyText(insight: Insight) {
    if (insight.kind === "external") {
        return "";
    }

    return insight.body
        .map((block) => (block.type === "list" ? block.items.join(" ") : block.text))
        .join(" ");
}

function getInsightSearchText(insight: Insight) {
    return [
        insight.title,
        insight.excerpt,
        insight.category,
        ...insight.tags,
        insight.kind === "own" ? insight.description : insight.sourceName,
        getOwnInsightBodyText(insight),
    ]
        .join(" ")
        .toLocaleLowerCase("de-DE");
}

function getTimRelatedInsights(profileMember: TeamMember) {
    const searchTerms = [
        profileMember.name,
        profileMember.displayName,
        "lohmeier",
        profileMember.slug.replaceAll("-", " "),
        "jobbridge edu",
        "jobbridge lab",
    ].map((term) => term.toLocaleLowerCase("de-DE"));

    return allInsights.filter((insight) => {
        if (insight.kind === "own" && insight.authorSlug === profileMember.slug) {
            return true;
        }

        const searchText = getInsightSearchText(insight);
        return searchTerms.some((term) => searchText.includes(term));
    });
}

export const metadata: Metadata = {
    title: member ? `${member.displayName} - ${member.role}` : "Tim Lohmeier",
    description: member
        ? "Profil von Tim Lohmeier im JobBridge Lab: Produktentwicklung von JobBridge Edu, einer digitalen Lernplattform für bezahlbare Nachhilfe durch Jugendliche in Rheinbach."
        : undefined,
    alternates: {
        canonical: "/team/tim-lohmeier",
    },
    openGraph: {
        title: member ? `${member.displayName} | ${siteConfig.name}` : `Tim Lohmeier | ${siteConfig.name}`,
        description:
            "Tim Lohmeier arbeitet im JobBridge Lab an JobBridge Edu, einer Lernplattform für bezahlbare Nachhilfe und Wissensvermittlung unter Jugendlichen.",
        url: "/team/tim-lohmeier",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: member?.displayName ?? siteConfig.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: member ? `${member.displayName} | ${siteConfig.name}` : `Tim Lohmeier | ${siteConfig.name}`,
        description:
            "Profil von Tim Lohmeier im JobBridge Lab mit Fokus auf JobBridge Edu.",
        images: ["/og-image.png"],
    },
};

export default function TimLohmeierProfilePage() {
    if (!member) {
        return null;
    }

    const profileUrl = `${siteConfig.url}${member.profilePath}`;
    const directEmail = member.contactLinks.find((link) => link.kind === "direct-email")?.value;
    const publicContactLinks = member.contactLinks.filter((link) => link.kind === "direct-email");
    const relatedInsights = getTimRelatedInsights(member);
    const subjectOfItems = [
        {
            "@type": "SoftwareApplication",
            name: "JobBridge Edu",
            applicationCategory: "EducationalApplication",
            description:
                "Digitale Lernplattform in der Anfangsphase, die Jugendliche für bezahlbare Nachhilfe vernetzen soll.",
            creator: {
                "@id": `${siteConfig.url}/#organization`,
            },
        },
        ...relatedInsights.map((insight) => ({
            "@type": insight.kind === "own" ? "BlogPosting" : "CreativeWork",
            "@id": `${getInsightAbsoluteUrl(insight)}#profile-mention`,
            name: insight.title,
            url: getInsightAbsoluteUrl(insight),
            datePublished: insight.publishedAt,
            description: insight.excerpt,
            ...(insight.kind === "own"
                ? {
                      author: {
                          "@type": "Person",
                          "@id": `${profileUrl}#person`,
                          name: member.name,
                          url: profileUrl,
                      },
                      publisher: {
                          "@type": "Organization",
                          "@id": `${siteConfig.url}/#organization`,
                          name: siteConfig.name,
                          url: siteConfig.url,
                      },
                  }
                : {
                      publisher: {
                          "@type": "Organization",
                          name: insight.sourceName,
                          url: insight.sourceUrl,
                      },
                  }),
        })),
    ];
    const profileJsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${profileUrl}#profile`,
        url: profileUrl,
        name: `${member.displayName} | ${siteConfig.name}`,
        description: member.description,
        inLanguage: "de-DE",
        mainEntity: {
            "@type": "Person",
            "@id": `${profileUrl}#person`,
            name: member.name,
            alternateName: [member.displayName, member.shortName],
            jobTitle: member.role,
            description: member.profileIntro,
            url: profileUrl,
            ...(directEmail ? { email: directEmail } : {}),
            sameAs: member.sameAs,
            knowsAbout: member.knowsAbout,
            worksFor: {
                "@type": "Organization",
                "@id": `${siteConfig.url}/#organization`,
                name: siteConfig.name,
                url: siteConfig.url,
                department: {
                    "@type": "Organization",
                    name: "JobBridge Lab",
                },
            },
            homeLocation: {
                "@type": "Place",
                name: member.location,
            },
            subjectOf: subjectOfItems,
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(profileJsonLd) }}
            />
            <main className="min-h-screen overflow-hidden bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
                <section className="relative isolate overflow-hidden bg-[#02040b]">
                    <PixelShaderBackdrop className="absolute inset-0 opacity-90" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,11,0.03),#02040b_92%)]" />
                    <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:min-h-[70svh] lg:px-10">
                        <SiteHeader />

                        <div className="grid flex-1 items-center gap-10 pb-8 pt-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(19rem,0.52fr)] lg:pb-10 lg:pt-12">
                            <div>
                                <Link
                                    href="/einblicke#team"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                >
                                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                    Einblicke
                                </Link>

                                <div className="mt-9 max-w-3xl">
                                    <aside className="relative mb-6 w-[clamp(6.35rem,20vw,8.25rem)] overflow-visible lg:hidden">
                                        <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_45%,rgba(226,232,240,0.13),rgba(59,130,246,0.035)_42%,transparent_72%)]" />
                                        <div className="relative overflow-hidden rounded-[0.95rem] border border-white/10 bg-[#070b13] p-1 shadow-[0_18px_48px_rgba(0,0,0,0.24)]">
                                            <ProfilePortraitPlaceholder compact />
                                        </div>
                                    </aside>

                                    <h1 className="text-[clamp(3.35rem,6.4vw,5.9rem)] font-semibold leading-[0.91] tracking-[-0.058em] text-white">
                                        {member.displayName}
                                    </h1>
                                </div>
                                <p className="mt-1 text-xl font-semibold tracking-[-0.035em] text-blue-100/84 sm:text-2xl">
                                    {member.role}
                                </p>
                                <p className="mt-6 max-w-2xl text-[1.02rem] font-medium leading-8 tracking-[-0.02em] text-slate-300 sm:text-[1.14rem]">
                                    {member.description}
                                </p>

                                <div className="mt-7 flex max-w-2xl flex-wrap gap-2.5">
                                    {publicContactLinks.map((link) => {
                                        const Icon = contactIcons[link.kind];

                                        return (
                                            <a
                                                key={link.href}
                                                href={link.href}
                                                aria-label={`${link.label}: ${link.value}`}
                                                className="group inline-flex min-h-11 max-w-full items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2.5 text-sm font-semibold text-slate-200 backdrop-blur transition duration-300 hover:border-blue-200/24 hover:bg-blue-400/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                            >
                                                <Icon className="h-4 w-4 shrink-0 text-blue-100/78" aria-hidden="true" />
                                                <span className="min-w-0 break-all">{link.value}</span>
                                                <ArrowUpRight
                                                    className="h-3.5 w-3.5 shrink-0 text-slate-500 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>

                            <aside className="relative hidden overflow-visible lg:block">
                                <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.2rem] bg-[radial-gradient(circle_at_50%_42%,rgba(226,232,240,0.115),rgba(59,130,246,0.032)_44%,transparent_74%)]" />
                                <div className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#070b13] p-1.5 shadow-[0_18px_48px_rgba(0,0,0,0.24)]">
                                    <ProfilePortraitPlaceholder />
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                <section className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-8 sm:px-8 lg:px-10 lg:pb-[6.5rem] lg:pt-10">
                    <div className="max-w-4xl">
                        <h2 className="max-w-3xl text-[clamp(2.15rem,3.7vw,3.85rem)] font-semibold leading-[0.96] tracking-[-0.058em] text-white">
                            Nachhilfe muss einfacher erreichbar werden.
                        </h2>
                        <p className="mt-6 max-w-3xl text-[1.02rem] font-medium leading-8 tracking-[-0.02em] text-slate-400 sm:text-[1.12rem] sm:leading-9">
                            {member.profileIntro}
                        </p>
                    </div>
                </section>

                <section className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-18 sm:px-8 lg:px-10 lg:pb-24">
                    <div className="space-y-8 border-t border-white/[0.07] pt-10">
                        <div className="max-w-3xl">
                            <h2 className="text-[clamp(2rem,3.2vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.058em] text-white">
                                Beiträge von Tim
                            </h2>
                        </div>

                        {relatedInsights.length > 0 ? (
                            <div className="grid gap-3">
                                {relatedInsights.map((insight) => {
                                    const href = getInsightUrl(insight);

                                    return (
                                        <Link
                                            key={getProfileInsightKey(insight)}
                                            href={href}
                                            className="group grid overflow-hidden rounded-[1rem] bg-white/[0.03] outline-none ring-1 ring-white/[0.07] transition duration-300 hover:bg-white/[0.052] hover:ring-white/[0.13] focus-visible:ring-2 focus-visible:ring-white/70 md:grid-cols-[minmax(10rem,13rem)_minmax(0,1fr)]"
                                        >
                                            <span className="relative block aspect-[16/7] overflow-hidden bg-[#050912] md:aspect-auto md:min-h-[9.5rem]">
                                                {insight.image ? (
                                                    <Image
                                                        src={insight.image.src}
                                                        alt={insight.image.alt}
                                                        fill
                                                        sizes="(min-width: 768px) 13rem, 100vw"
                                                        className="object-cover transition duration-700 group-hover:scale-[1.025]"
                                                        style={{ objectPosition: insight.image.position ?? "center center" }}
                                                    />
                                                ) : (
                                                    <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.52))]" />
                                                )}
                                            </span>
                                            <span className="flex min-h-[9.5rem] flex-1 flex-col justify-center p-4 sm:p-5 md:py-4">
                                                <span className="text-[0.82rem] font-semibold tracking-[-0.02em] text-slate-500">
                                                    {formatInsightDate(insight.publishedAt)}
                                                </span>
                                                <span className="mt-2 block max-w-3xl text-[1.15rem] font-semibold leading-[1.08] tracking-[-0.045em] text-white transition group-hover:text-blue-100 sm:text-[1.3rem]">
                                                    {insight.title}
                                                </span>
                                                <span className="mt-2 line-clamp-2 max-w-4xl text-[0.92rem] font-medium leading-6 tracking-[-0.018em] text-slate-500 sm:text-[0.98rem]">
                                                    {insight.excerpt}
                                                </span>
                                                <span className="inline-flex items-center gap-2 pt-4 text-sm font-semibold text-blue-100/78 transition group-hover:text-white">
                                                    Artikel lesen
                                                    <ArrowUpRight
                                                        className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="flex min-h-[9.5rem] items-center rounded-[1rem] bg-white/[0.03] p-4 ring-1 ring-white/[0.07] sm:p-5">
                                <p className="text-[1rem] font-semibold tracking-[-0.025em] text-slate-500">
                                    Noch keine Beiträge.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <Footer showChat={false} />
            </main>
        </>
    );
}
