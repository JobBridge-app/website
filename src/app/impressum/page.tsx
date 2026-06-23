import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteMenuButton } from "@/components/SiteMenu";
import { siteConfig } from "@/config/site";

const updatedAt = "23. Juni 2026";
const platformImprintUrl = "https://app.jobbridge.app/legal/impressum";

export const metadata: Metadata = {
    title: "Impressum",
    description:
        "Impressum und Anbieterkennzeichnung für jobbridge.app: verantwortliche Angaben, Kontakt und Abgrenzung zur JobBridge-Plattform.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/impressum",
    },
    openGraph: {
        title: `Impressum | ${siteConfig.name}`,
        description:
            "Anbieterkennzeichnung, Kontakt und rechtliche Abgrenzung der JobBridge-Landingpage.",
        url: "/impressum",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: `Impressum | ${siteConfig.name}`,
        description:
            "Anbieterkennzeichnung, Kontakt und rechtliche Abgrenzung der JobBridge-Landingpage.",
        images: ["/og-image.png"],
    },
};

const essentials = [
    "Anbieterkennzeichnung für die Landingpage jobbridge.app.",
    "Kontakt zur Website erfolgt direkt per E-Mail.",
    "Für app.jobbridge.app gelten eigene rechtliche Angaben der Plattform.",
];

function ImprintIllustration() {
    return (
        <div
            aria-hidden="true"
            data-imprint-illustration
            className="pointer-events-none absolute bottom-10 right-[-8rem] z-0 hidden w-[min(36vw,34rem)] opacity-[0.5] lg:block xl:right-[-1rem]"
        >
            <svg
                viewBox="0 0 720 500"
                className="h-auto w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <radialGradient id="imprint-glow" cx="50%" cy="50%" r="52%">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.22" />
                        <stop offset="62%" stopColor="#1d4ed8" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#02040b" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="imprint-paper" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="58%" stopColor="#cbd5e1" />
                        <stop offset="100%" stopColor="#94a3b8" />
                    </linearGradient>
                </defs>

                <circle cx="382" cy="258" r="222" fill="url(#imprint-glow)" />

                <g stroke="white" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M106 300c28-126 132-205 264-205 116 0 211 57 263 157" strokeOpacity="0.24" strokeWidth="2.5" />
                    <path d="M172 405c84 54 205 55 293 1 82-50 124-139 105-235" strokeOpacity="0.2" strokeWidth="2.5" />
                    <path d="M148 370c-35-77-19-169 42-230 58-58 145-76 224-47" strokeDasharray="13 13" strokeOpacity="0.26" strokeWidth="2.5" />
                </g>

                <g transform="translate(190 82)">
                    <rect x="0" y="0" width="274" height="324" rx="34" fill="url(#imprint-paper)" opacity="0.94" />
                    <rect x="25" y="28" width="224" height="268" rx="26" fill="#050505" opacity="0.9" />
                    <rect x="55" y="62" width="98" height="13" rx="6.5" fill="white" opacity="0.88" />
                    <rect x="55" y="100" width="160" height="12" rx="6" fill="#60a5fa" opacity="0.62" />
                    <rect x="55" y="136" width="126" height="12" rx="6" fill="white" opacity="0.24" />
                    <rect x="55" y="172" width="154" height="12" rx="6" fill="white" opacity="0.18" />
                    <rect x="55" y="208" width="96" height="12" rx="6" fill="white" opacity="0.28" />
                    <rect x="55" y="244" width="138" height="12" rx="6" fill="white" opacity="0.2" />
                </g>

                <g transform="translate(418 260)">
                    <circle cx="74" cy="74" r="74" fill="white" opacity="0.94" />
                    <path d="M39 78c0-22 16-39 38-39s38 17 38 39-16 39-38 39-38-17-38-39Z" fill="#050505" />
                    <path d="M50 78c0-16 11-28 27-28s27 12 27 28-11 28-27 28-27-12-27-28Z" fill="#cbd5e1" />
                    <path d="M32 128c9-30 25-44 45-44s36 14 45 44" fill="#94a3b8" />
                </g>

                <g transform="translate(90 294)">
                    <rect x="0" y="0" width="128" height="108" rx="22" fill="#f8fafc" opacity="0.9" />
                    <rect x="25" y="31" width="78" height="10" rx="5" fill="#050505" />
                    <rect x="25" y="58" width="56" height="10" rx="5" fill="#9ca3af" />
                    <rect x="25" y="84" width="72" height="10" rx="5" fill="#1d4ed8" opacity="0.72" />
                </g>

                <g fill="white" opacity="0.78">
                    <circle cx="136" cy="188" r="15" />
                    <circle cx="598" cy="188" r="22" />
                    <rect x="540" y="94" width="22" height="22" rx="3" />
                    <rect x="628" y="318" width="18" height="18" rx="3" />
                </g>
            </svg>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,#050505_24%,transparent_56%),linear-gradient(180deg,transparent_62%,#050505_100%)]" />
        </div>
    );
}

function Header() {
    return (
        <header className="relative z-30 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
            <Link href="/" aria-label="JobBridge Startseite" className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.04] shadow-[0_16px_44px_rgba(2,6,23,0.22)]">
                    <Image
                        src="/favicon.ico"
                        alt=""
                        width={38}
                        height={38}
                        unoptimized
                        className="h-10 w-10 scale-[1.08] object-cover"
                    />
                </span>
                <span className="text-sm font-semibold tracking-[-0.01em] text-white">JobBridge</span>
            </Link>
            <SiteMenuButton />
        </header>
    );
}

function LegalRow({
    eyebrow,
    title,
    children,
}: {
    eyebrow: string;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="grid gap-6 border-t border-white/10 py-12 md:grid-cols-[18rem_minmax(0,1fr)] md:gap-14 md:py-16">
            <div>
                <p className="text-xs font-medium uppercase tracking-[0.24em] text-blue-200/60">{eyebrow}</p>
                <h2 className="mt-4 max-w-[12rem] text-2xl font-semibold leading-[1.08] tracking-[-0.035em] text-white md:text-3xl">
                    {title}
                </h2>
            </div>
            <div className="max-w-[47rem] space-y-5 text-[1rem] leading-7 text-slate-300 md:text-[1.08rem] md:leading-8">
                {children}
            </div>
        </section>
    );
}

function DefinitionRows({
    items,
}: {
    items: Array<{ term: string; description: React.ReactNode }>;
}) {
    return (
        <dl className="mt-7 divide-y divide-white/10 border-y border-white/10">
            {items.map((item) => (
                <div key={item.term} className="grid gap-2 py-4 sm:grid-cols-[11rem_1fr]">
                    <dt className="text-sm font-medium text-slate-500">{item.term}</dt>
                    <dd className="text-slate-100">{item.description}</dd>
                </div>
            ))}
        </dl>
    );
}

export default function ImpressumPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-400/30 selection:text-blue-100">
            <section className="relative isolate overflow-hidden bg-[#050505]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_22%_8%,rgba(148,163,184,0.08),transparent_24%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
                <Header />

                <ImprintIllustration />

                <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl items-center px-5 pb-20 pt-12 sm:px-8 lg:px-10 lg:pb-24 lg:pt-16">
                    <div className="relative z-10 max-w-[68rem]">
                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-blue-200/64">Impressum</p>
                        <h1
                            aria-label="Offen. Direkt. Verantwortlich."
                            className="mt-7 max-w-[10.8ch] font-sans text-[clamp(2.55rem,10vw,3.35rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-white sm:text-[clamp(4rem,7.7vw,7.35rem)] sm:leading-[0.95] sm:tracking-[-0.045em]"
                        >
                            <span aria-hidden="true" className="block">
                                Offen. Direkt.
                            </span>
                            <span aria-hidden="true" className="block">
                                Verantwortlich.
                            </span>
                        </h1>
                        <p className="mt-8 max-w-[39rem] text-pretty text-[clamp(1.05rem,1.45vw,1.32rem)] font-medium leading-[1.42] tracking-[-0.012em] text-slate-300">
                            Die Anbieterkennzeichnung für jobbridge.app. Kurz auffindbar, klar getrennt von der
                            Plattform und ohne Angaben, die hier keinen Zweck erfüllen.
                        </p>
                        <p className="mt-6 text-sm text-slate-500">
                            Stand: <span className="text-slate-300">{updatedAt}</span> · gilt für jobbridge.app
                        </p>
                    </div>
                </div>
            </section>

            <section className="relative bg-[#050505] px-5 pb-24 sm:px-8 lg:px-10">
                <div className="mx-auto w-full max-w-6xl">
                    <div className="grid gap-4 border-y border-white/10 py-7 md:grid-cols-3">
                        {essentials.map((item) => (
                            <p key={item} className="max-w-[24rem] text-sm leading-6 text-slate-300 md:text-[0.95rem]">
                                {item}
                            </p>
                        ))}
                    </div>

                    <LegalRow eyebrow="01" title="Anbieter">
                        <p>
                            Angaben nach § 5 Digitale-Dienste-Gesetz und, soweit einschlägig, nach § 18
                            Medienstaatsvertrag.
                        </p>
                        <DefinitionRows
                            items={[
                                {
                                    term: "Diensteanbieter",
                                    description: (
                                        <>
                                            Rezan Aaron Yalçin
                                            <br />
                                            JobBridge
                                        </>
                                    ),
                                },
                                {
                                    term: "Anschrift",
                                    description: (
                                        <>
                                            Am Neuen Wasserwerk 3
                                            <br />
                                            53359 Rheinbach
                                            <br />
                                            Deutschland
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </LegalRow>

                    <LegalRow eyebrow="02" title="Kontakt">
                        <p>
                            Für Anfragen zur Website, Hinweise zu Inhalten oder allgemeine Kontaktaufnahme erreichen Sie
                            uns per E-Mail.
                        </p>
                        <p>
                            <a
                                href="mailto:kontakt@jobbridge.team"
                                className="inline-flex items-center gap-2 text-blue-200 transition hover:text-white"
                            >
                                <Mail className="h-4 w-4" />
                                kontakt@jobbridge.team
                            </a>
                        </p>
                    </LegalRow>

                    <LegalRow eyebrow="03" title="Redaktionelle Verantwortung">
                        <p>
                            Verantwortlich für journalistisch-redaktionelle Inhalte im Sinne des § 18 Abs. 2
                            Medienstaatsvertrag, soweit solche Inhalte auf dieser Landingpage vorliegen:
                        </p>
                        <DefinitionRows
                            items={[
                                {
                                    term: "Name",
                                    description: "Rezan Aaron Yalçin",
                                },
                                {
                                    term: "Anschrift",
                                    description: (
                                        <>
                                            Am Neuen Wasserwerk 3
                                            <br />
                                            53359 Rheinbach
                                            <br />
                                            Deutschland
                                        </>
                                    ),
                                },
                            ]}
                        />
                    </LegalRow>

                    <LegalRow eyebrow="04" title="Abgrenzung zur Plattform">
                        <p>
                            Dieses Impressum gilt für die Landingpage <strong className="text-white">jobbridge.app</strong>.
                            Die Plattform unter{" "}
                            <a href="https://app.jobbridge.app" className="text-blue-200 transition hover:text-white">
                                app.jobbridge.app
                            </a>{" "}
                            ist ein eigener Bereich mit separaten rechtlichen Angaben.
                        </p>
                        <p>
                            Das Impressum der Plattform finden Sie unter{" "}
                            <a
                                href={platformImprintUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-200 transition hover:text-white"
                            >
                                app.jobbridge.app/legal/impressum <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                            .
                        </p>
                    </LegalRow>

                    <LegalRow eyebrow="05" title="Streitbeilegung">
                        <p>
                            Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
                            Verbraucherschlichtungsstelle teilzunehmen.
                        </p>
                        <p className="text-sm leading-6 text-slate-500">
                            Die frühere EU-Plattform zur Online-Streitbeilegung ist seit dem 20. Juli 2025 eingestellt.
                        </p>
                    </LegalRow>

                    <LegalRow eyebrow="06" title="Inhalte und Rechte">
                        <p>
                            Die Inhalte dieser Landingpage wurden sorgfältig erstellt. Für Inhalte externer Websites,
                            auf die wir verlinken, ist der jeweilige Anbieter verantwortlich. Bei konkreten Hinweisen
                            auf rechtswidrige Inhalte prüfen wir den betroffenen Link.
                        </p>
                        <p>
                            Texte, Gestaltung, Markenbestandteile und sonstige Inhalte dieser Landingpage sind
                            urheberrechtlich geschützt, soweit sie nicht anders gekennzeichnet sind. Eine Nutzung
                            außerhalb der gesetzlichen Grenzen bedarf der vorherigen Zustimmung des jeweiligen
                            Rechteinhabers.
                        </p>
                        <p className="text-sm leading-6 text-slate-500">
                            Die Datenschutzhinweise zur Landingpage finden Sie unter{" "}
                            <Link href="/datenschutz" className="text-blue-200 transition hover:text-white">
                                Datenschutz
                            </Link>
                            .
                        </p>
                    </LegalRow>
                </div>
            </section>

            <Footer />
        </main>
    );
}
