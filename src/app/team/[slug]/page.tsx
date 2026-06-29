import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { PixelShaderBackdrop } from "@/components/TrustNarrative";
import { siteConfig } from "@/config/site";
import { getTeamMemberByProfileSlug, getTeamProfileSlug, teamMembers } from "@/content/team";
import { serializeJsonLd } from "@/lib/json-ld";

type TeamProfileRouteProps = {
    params: Promise<{
        slug: string;
    }>;
};

const customTeamSlugs = new Set(["rezan", "resan-yalcin", "rezan-yalcin"]);

export const dynamicParams = false;

export function generateStaticParams() {
    return teamMembers
        .map((member) => getTeamProfileSlug(member))
        .filter((slug) => !customTeamSlugs.has(slug))
        .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TeamProfileRouteProps): Promise<Metadata> {
    const { slug } = await params;
    const member = getTeamMemberByProfileSlug(slug);

    if (!member || customTeamSlugs.has(slug)) {
        return {};
    }

    const imageUrl = member.profileImage?.src ?? "/og-image.png";

    return {
        title: `${member.displayName} - ${member.role}`,
        description: member.description,
        alternates: {
            canonical: member.profilePath,
        },
        openGraph: {
            title: `${member.displayName} | ${siteConfig.name}`,
            description: member.description,
            url: member.profilePath,
            type: "profile",
            images: [{ url: imageUrl, width: 1200, height: 630, alt: member.profileImage?.alt ?? member.displayName }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${member.displayName} | ${siteConfig.name}`,
            description: member.description,
            images: [imageUrl],
        },
    };
}

export default async function TeamProfilePage({ params }: TeamProfileRouteProps) {
    const { slug } = await params;
    const member = getTeamMemberByProfileSlug(slug);

    if (!member || customTeamSlugs.has(slug)) {
        notFound();
    }

    const profileUrl = `${siteConfig.url}${member.profilePath}`;
    const imageUrl = member.profileImage?.src ? `${siteConfig.url}${member.profileImage.src}` : `${siteConfig.url}/og-image.png`;
    const profileJsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${profileUrl}#profile`,
        url: profileUrl,
        name: `${member.displayName} | ${siteConfig.name}`,
        description: member.description,
        inLanguage: "de-DE",
        isPartOf: {
            "@id": `${siteConfig.url}/#website`,
        },
        mainEntity: {
            "@type": "Person",
            "@id": `${profileUrl}#person`,
            name: member.name,
            alternateName: [member.displayName, member.shortName],
            jobTitle: member.role,
            description: member.profileIntro,
            url: profileUrl,
            image: imageUrl,
            sameAs: member.sameAs,
            knowsAbout: member.knowsAbout,
            worksFor: {
                "@type": "Organization",
                "@id": `${siteConfig.url}/#organization`,
                name: siteConfig.name,
                url: siteConfig.url,
            },
            homeLocation: {
                "@type": "Place",
                name: member.location,
            },
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
                    <PixelShaderBackdrop />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#02040b] to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] bg-gradient-to-t from-[#02040b] via-[#02040b]/92 to-transparent" />

                    <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
                        <SiteHeader />

                        <article className="grid gap-10 py-20 sm:py-24 lg:grid-cols-[minmax(0,0.9fr)_minmax(19rem,0.48fr)] lg:items-center lg:py-28">
                            <div>
                                <Link
                                    href="/einblicke#team"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                >
                                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                    Einblicke
                                </Link>
                                <h1 className="mt-9 text-[clamp(3.35rem,6.4vw,5.9rem)] font-semibold leading-[0.91] tracking-[-0.058em] text-white">
                                    {member.displayName}
                                </h1>
                                <p className="mt-2 text-xl font-semibold tracking-[-0.035em] text-blue-100/84 sm:text-2xl">
                                    {member.role}
                                </p>
                                <p className="mt-6 max-w-2xl text-[1.02rem] font-medium leading-8 tracking-[-0.02em] text-slate-300 sm:text-[1.14rem]">
                                    {member.profileIntro}
                                </p>
                            </div>

                            <aside className="relative overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#070b13] p-1.5 shadow-[0_18px_48px_rgba(0,0,0,0.24)]">
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[0.85rem] bg-[#050912]">
                                    {member.profileImage ? (
                                        <Image
                                            src={member.profileImage.src}
                                            alt={member.profileImage.alt}
                                            fill
                                            sizes="(min-width: 1024px) 28vw, 100vw"
                                            className="object-cover"
                                            style={{ objectPosition: member.profileImage.position ?? "center center" }}
                                            priority
                                        />
                                    ) : (
                                        <span className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.56))] text-5xl font-semibold tracking-[-0.06em] text-white/80">
                                            {member.shortName.slice(0, 1)}
                                        </span>
                                    )}
                                </div>
                            </aside>
                        </article>
                    </div>
                </section>

                <section className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-5 pb-24 sm:px-8 sm:pb-28 lg:grid-cols-[minmax(0,0.8fr)_minmax(20rem,0.4fr)] lg:px-10">
                    <div>
                        <h2 className="text-[clamp(2rem,3.2vw,3.35rem)] font-semibold leading-[0.96] tracking-[-0.058em] text-white">
                            Schwerpunkte
                        </h2>
                        <ul className="mt-7 space-y-4 text-[1rem] font-medium leading-7 tracking-[-0.02em] text-slate-400 sm:text-[1.08rem]">
                            {member.focus.map((focus) => (
                                <li key={focus} className="flex gap-4">
                                    <span className="mt-[0.72rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-500" />
                                    <span>{focus}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <aside className="h-fit rounded-[1.1rem] border border-white/10 bg-white/[0.035] p-5 text-sm font-medium text-slate-400">
                        <h2 className="text-lg font-semibold tracking-[-0.03em] text-white">Links</h2>
                        <div className="mt-5 grid gap-3">
                            {member.profileLinks.map((link) =>
                                link.href ? (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        className="group rounded-[0.85rem] bg-white/[0.035] p-4 ring-1 ring-white/[0.07] transition hover:bg-white/[0.055] hover:ring-white/[0.13]"
                                    >
                                        <span className="flex items-center justify-between gap-3 text-sm font-semibold text-slate-200">
                                            {link.label}
                                            <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                                        </span>
                                        <span className="mt-1 block text-xs leading-5 text-slate-500">{link.description}</span>
                                    </a>
                                ) : null,
                            )}
                        </div>
                    </aside>
                </section>

                <Footer showChat={false} />
            </main>
        </>
    );
}
