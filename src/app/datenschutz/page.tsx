import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SiteMenuButton } from "@/components/SiteMenu";
import { siteConfig } from "@/config/site";

const updatedAt = "23. Juni 2026";
const platformPrivacyUrl = "https://app.jobbridge.app/legal/datenschutz";

export const metadata: Metadata = {
    title: "Datenschutz",
    description:
        "Datenschutzhinweise für jobbridge.app: welche Daten auf der JobBridge-Landingpage entstehen, wofür sie genutzt werden und welche Rechte bestehen.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/datenschutz",
    },
    openGraph: {
        title: `Datenschutz | ${siteConfig.name}`,
        description:
            "Klarer Überblick über Datenverarbeitung, Kontakt, Chat, Hosting und Rechte auf der JobBridge-Landingpage.",
        url: "/datenschutz",
        images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
        card: "summary_large_image",
        title: `Datenschutz | ${siteConfig.name}`,
        description:
            "Klarer Überblick über Datenverarbeitung, Kontakt, Chat, Hosting und Rechte auf der JobBridge-Landingpage.",
        images: ["/og-image.png"],
    },
};

const essentials = [
    "Keine Analyse- oder Marketing-Cookies auf dieser Landingpage.",
    "Technische Serverdaten werden für Auslieferung, Stabilität und Sicherheit verarbeitet.",
    "Für app.jobbridge.app gelten eigene Datenschutzhinweise der Plattform.",
];

const rights = [
    "Auskunft",
    "Berichtigung",
    "Löschung",
    "Einschränkung",
    "Datenübertragbarkeit",
    "Widerspruch",
    "Beschwerde bei einer Aufsichtsbehörde",
];

function PrivacyIllustration() {
    return (
        <div
            aria-hidden="true"
            data-privacy-illustration
            className="pointer-events-none absolute bottom-8 right-[-9rem] z-0 hidden w-[min(38vw,36rem)] opacity-[0.58] lg:block xl:right-[-2rem]"
        >
            <svg
                viewBox="0 0 760 520"
                className="h-auto w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <radialGradient id="privacy-orbit-glow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.28" />
                        <stop offset="62%" stopColor="#1d4ed8" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="#02040b" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="privacy-panel" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0%" stopColor="#f8fafc" />
                        <stop offset="52%" stopColor="#cbd5e1" />
                        <stop offset="100%" stopColor="#8ea4c4" />
                    </linearGradient>
                    <pattern id="privacy-dots" width="10" height="10" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="1.25" fill="white" opacity="0.72" />
                    </pattern>
                </defs>

                <circle cx="380" cy="260" r="238" fill="url(#privacy-orbit-glow)" />

                <g stroke="white" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M102 285C120 148 238 60 386 71c137 11 245 102 277 233" strokeOpacity="0.26" strokeWidth="2.5" />
                    <path d="M146 382c-50-105-17-229 76-297 91-66 218-58 309 20" strokeDasharray="14 13" strokeOpacity="0.3" strokeWidth="2.5" />
                    <path d="M222 430c92 58 229 54 319-16 70-54 104-136 92-219" strokeOpacity="0.22" strokeWidth="2.5" />
                </g>

                <g fill="white" opacity="0.88">
                    <circle cx="142" cy="286" r="13" />
                    <circle cx="604" cy="202" r="17" />
                    <circle cx="595" cy="356" r="28" />
                    <rect x="238" y="78" width="18" height="18" rx="2" />
                    <rect x="642" y="284" width="22" height="22" rx="3" />
                </g>

                <g transform="translate(220 116)">
                    <rect x="0" y="0" width="286" height="246" rx="34" fill="#f8fafc" opacity="0.96" />
                    <rect x="22" y="24" width="242" height="198" rx="24" fill="#050505" opacity="0.92" />
                    <rect x="48" y="52" width="72" height="12" rx="6" fill="white" opacity="0.9" />
                    <rect x="48" y="84" width="128" height="12" rx="6" fill="#60a5fa" opacity="0.64" />
                    <rect x="48" y="116" width="102" height="12" rx="6" fill="white" opacity="0.28" />
                    <rect x="48" y="148" width="156" height="12" rx="6" fill="white" opacity="0.18" />
                    <rect x="48" y="180" width="92" height="12" rx="6" fill="white" opacity="0.26" />

                    <g transform="translate(178 52)">
                        <circle cx="42" cy="42" r="42" fill="#1d4ed8" opacity="0.24" />
                        <path d="M20 44c22-26 55-26 78 0-23 25-56 25-78 0Z" fill="#f8fafc" />
                        <circle cx="59" cy="44" r="20" fill="#050505" />
                        <circle cx="59" cy="44" r="9" fill="white" />
                    </g>
                </g>

                <g transform="translate(486 58)">
                    <circle cx="74" cy="74" r="74" fill="white" opacity="0.96" />
                    <rect x="45" y="70" width="58" height="52" rx="5" fill="#050505" />
                    <path d="M55 70V50c0-27 38-27 38 0v20" stroke="#050505" strokeWidth="9" />
                    <circle cx="74" cy="92" r="6" fill="white" />
                    <path d="M74 99v12" stroke="white" strokeLinecap="round" strokeWidth="5" />
                </g>

                <g transform="translate(96 338)">
                    <rect x="0" y="0" width="164" height="122" rx="24" fill="#f8fafc" opacity="0.94" />
                    <circle cx="52" cy="47" r="22" fill="#9ca3af" />
                    <path d="M24 96c5-31 22-45 43-45s38 14 43 45" fill="#9ca3af" />
                    <rect x="100" y="36" width="38" height="9" rx="4.5" fill="#050505" opacity="0.78" />
                    <rect x="100" y="58" width="48" height="9" rx="4.5" fill="#050505" opacity="0.22" />
                    <rect x="100" y="80" width="30" height="9" rx="4.5" fill="#050505" opacity="0.3" />
                </g>

                <g transform="translate(520 318)">
                    <rect x="0" y="0" width="108" height="128" rx="20" fill="#f8fafc" opacity="0.92" />
                    <rect x="24" y="28" width="60" height="10" rx="5" fill="#050505" />
                    <rect x="24" y="54" width="48" height="10" rx="5" fill="#9ca3af" />
                    <rect x="24" y="80" width="62" height="10" rx="5" fill="#050505" opacity="0.72" />
                    <rect x="24" y="106" width="34" height="10" rx="5" fill="#60a5fa" opacity="0.72" />
                </g>
            </svg>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#050505_0%,#050505_22%,transparent_52%),linear-gradient(180deg,transparent_62%,#050505_100%)]" />
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

export default function DatenschutzPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-400/30 selection:text-blue-100">
            <section className="relative isolate overflow-hidden bg-[#050505]">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(59,130,246,0.14),transparent_28%),radial-gradient(circle_at_22%_8%,rgba(148,163,184,0.08),transparent_24%)]" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent" />
                <Header />

                <PrivacyIllustration />

                <div className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-7xl items-center px-5 pb-20 pt-12 sm:px-8 lg:px-10 lg:pb-24 lg:pt-16">
                    <div className="relative z-10 max-w-[68rem]">
                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-blue-200/64">Datenschutz</p>
                        <h1
                            aria-label="Klar. Ruhig. Nachvollziehbar."
                            className="mt-7 max-w-[10.8ch] font-sans text-[clamp(2.55rem,10vw,3.35rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-white sm:text-[clamp(4rem,7.7vw,7.35rem)] sm:leading-[0.95] sm:tracking-[-0.045em]"
                        >
                            <span aria-hidden="true" className="block">
                                Klar. Ruhig.
                            </span>
                            <span aria-hidden="true" className="block">
                                Nachvollziehbar.
                            </span>
                        </h1>
                        <p className="mt-8 max-w-[39rem] text-pretty text-[clamp(1.05rem,1.45vw,1.32rem)] font-medium leading-[1.42] tracking-[-0.012em] text-slate-300">
                            Diese Hinweise erklären, welche Daten auf der JobBridge-Landingpage entstehen, wofür sie
                            genutzt werden und welche Rechte Sie haben.
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

                    <LegalRow eyebrow="01" title="Geltungsbereich">
                        <p>
                            Diese Datenschutzhinweise gelten für die Website <strong className="text-white">jobbridge.app</strong>.
                            Die Plattform unter{" "}
                            <a href="https://app.jobbridge.app" className="text-blue-200 transition hover:text-white">
                                app.jobbridge.app
                            </a>{" "}
                            ist ein eigener Bereich und verarbeitet andere Daten, etwa wenn dort Konten, Jobs,
                            Kommunikation, Verifizierungen oder Zahlungen genutzt werden.
                        </p>
                        <p>
                            Für die Plattform gelten die dort veröffentlichten{" "}
                            <a
                                href={platformPrivacyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-200 transition hover:text-white"
                            >
                                Datenschutzhinweise <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                            .
                        </p>
                    </LegalRow>

                    <LegalRow eyebrow="02" title="Verantwortlicher">
                        <p>
                            Verantwortlich für diese Landingpage ist Rezan Aaron Yalçin, JobBridge, Am Neuen Wasserwerk
                            3, 53359 Rheinbach, Deutschland.
                        </p>
                        <DefinitionRows
                            items={[
                                {
                                    term: "E-Mail",
                                    description: (
                                        <a
                                            href="mailto:rezan.yalcin@jobbridge.team"
                                            className="inline-flex items-center gap-2 text-blue-200 transition hover:text-white"
                                        >
                                            <Mail className="h-4 w-4" />
                                            rezan.yalcin@jobbridge.team
                                        </a>
                                    ),
                                },
                                {
                                    term: "Datenschutz",
                                    description:
                                        "Ein Datenschutzbeauftragter ist für diese Landingpage derzeit nicht gesondert benannt.",
                                },
                            ]}
                        />
                    </LegalRow>

                    <LegalRow eyebrow="03" title="Seitenaufruf und Betrieb">
                        <p>
                            Beim Aufruf der Website werden technisch notwendige Zugriffsdaten verarbeitet. Dazu können
                            IP-Adresse, Datum und Uhrzeit, angeforderte URL, Referrer, Browser- und Geräteinformationen,
                            übertragene Datenmenge sowie Status- und Fehlermeldungen gehören.
                        </p>
                        <p>
                            Zweck ist die sichere Auslieferung der Website, die Stabilität des Betriebs, die
                            Fehleranalyse und die Abwehr von Missbrauch. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
                            Unser berechtigtes Interesse liegt im sicheren und funktionsfähigen Betrieb dieser Website.
                        </p>
                        <DefinitionRows
                            items={[
                                {
                                    term: "Hosting",
                                    description: "Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland.",
                                },
                                {
                                    term: "Logdaten",
                                    description:
                                        "Server-Logs werden in der Regel nach 7 Tagen gelöscht. Eine längere Speicherung erfolgt nur, wenn sie zur Aufklärung von Sicherheits- oder Missbrauchsfällen erforderlich ist.",
                                },
                            ]}
                        />
                    </LegalRow>

                    <LegalRow eyebrow="04" title="Kontakt und Chat">
                        <p>
                            Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre E-Mail-Adresse, den Inhalt Ihrer
                            Nachricht und die für die E-Mail-Übermittlung üblichen Metadaten. Zweck ist die Bearbeitung
                            Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO, bei vorvertraglichen
                            Anfragen zusätzlich Art. 6 Abs. 1 lit. b DSGVO.
                        </p>
                        <p>
                            Der Chat im Footer wird erst geladen, wenn Sie <span className="text-white">Chat öffnen</span>{" "}
                            auswählen. Dann wird das Microsoft/Teams-Customer-Connect-Widget eingebunden. Für diese
                            Kommunikation können Daten durch Microsoft Ireland Operations Limited verarbeitet werden.
                        </p>
                        <DefinitionRows
                            items={[
                                {
                                    term: "E-Mail",
                                    description: "Microsoft Ireland Operations Limited (Microsoft 365 / Exchange Online).",
                                },
                                {
                                    term: "Speicherdauer",
                                    description:
                                        "Kontaktanfragen werden spätestens 6 Monate nach Abschluss der Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten oder berechtigten Nachweisinteressen entgegenstehen.",
                                },
                            ]}
                        />
                    </LegalRow>

                    <LegalRow eyebrow="05" title="Cookies, Tracking und externe Links">
                        <p>
                            Auf dieser Landingpage setzen wir keine Analyse- oder Marketing-Skripte ein und verwenden
                            keine Tracking-Cookies. Technisch notwendige Funktionen können verarbeitet werden, soweit sie
                            für die Bereitstellung der Seite erforderlich sind.
                        </p>
                        <p>
                            Wenn Sie externe Links öffnen, verlassen Sie diese Website. Für externe Angebote, die
                            Plattform und eingebundene Dienste gelten die Datenschutzhinweise des jeweiligen Anbieters.
                        </p>
                    </LegalRow>

                    <LegalRow eyebrow="06" title="Empfänger und Übermittlungen">
                        <p>
                            Empfänger personenbezogener Daten können technische Dienstleister sein, die wir für Hosting,
                            Sicherheit, Auslieferung der Website, E-Mail-Kommunikation oder den Chat einsetzen. Dazu
                            gehören insbesondere Hetzner Online GmbH und Microsoft Ireland Operations Limited.
                        </p>
                        <p>
                            Sofern Dienstleister Daten außerhalb der EU oder des EWR verarbeiten, erfolgt dies nur auf
                            Grundlage geeigneter Schutzmechanismen, etwa eines Angemessenheitsbeschlusses oder
                            EU-Standardvertragsklauseln.
                        </p>
                    </LegalRow>

                    <LegalRow eyebrow="07" title="Ihre Rechte">
                        <p>
                            Sie können nach Maßgabe der DSGVO Rechte gegenüber dem Verantwortlichen geltend machen.
                            Dazu gehören:
                        </p>
                        <ul className="grid gap-x-8 gap-y-2 text-slate-200 sm:grid-cols-2">
                            {rights.map((right) => (
                                <li key={right} className="border-t border-white/10 pt-3">
                                    {right}
                                </li>
                            ))}
                        </ul>
                        <p>
                            Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für
                            Nordrhein-Westfalen ist dies die Landesbeauftragte für Datenschutz und Informationsfreiheit
                            Nordrhein-Westfalen.
                        </p>
                    </LegalRow>

                    <LegalRow eyebrow="08" title="Aktualisierung">
                        <p>
                            Wir passen diese Hinweise an, wenn sich die Website, eingesetzte Dienstleister oder
                            rechtliche Anforderungen ändern. Maßgeblich ist die jeweils hier veröffentlichte Fassung.
                        </p>
                        <p className="text-sm text-slate-500">
                            Weitere rechtliche Angaben finden Sie im{" "}
                            <Link href="/impressum" className="text-blue-200 transition hover:text-white">
                                Impressum
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
