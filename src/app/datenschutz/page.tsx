import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import {
    LegalDefinitionList,
    LegalNotice,
    LegalPage,
    LegalSection,
    PLATFORM_LEGAL_URL,
    Placeholder,
    type LegalNavItem,
} from "@/components/legal/LegalPage";

const updatedAt = "17. Mai 2026";

const navItems: LegalNavItem[] = [
    { id: "geltungsbereich", label: "Geltungsbereich" },
    { id: "allgemeines", label: "Allgemeines" },
    { id: "verantwortlicher", label: "Verantwortlicher" },
    { id: "aufruf", label: "Seitenaufruf" },
    { id: "links", label: "Externe Links" },
    { id: "kontakt", label: "Kontakt" },
    { id: "empfaenger", label: "Empfänger" },
    { id: "rechte", label: "Ihre Rechte" },
    { id: "aktualisierung", label: "Aktualisierung" },
];

export const metadata: Metadata = {
    title: "Datenschutz",
    description:
        "Datenschutzhinweise für die JobBridge-Landingpage unter jobbridge.app.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/datenschutz",
    },
};

export default function DatenschutzPage() {
    return (
        <LegalPage
            title="Datenschutz"
            updatedAt={updatedAt}
            navItems={navItems}
        >
            <LegalSection id="geltungsbereich" title="Geltungsbereich">
                <LegalNotice>
                    Diese Hinweise gelten nur für <strong className="text-white">jobbridge.app</strong>. Für die
                    Plattform unter <strong className="text-white">app.jobbridge.app</strong> gelten die Unterlagen im{" "}
                    <a
                        href={PLATFORM_LEGAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-100 underline decoration-cyan-200/40 underline-offset-4 transition hover:text-white"
                    >
                        Trustcenter unter app.jobbridge.app/legal.
                    </a>
                </LegalNotice>
            </LegalSection>

            <LegalSection id="allgemeines" title="Allgemeines">
                <p>
                    Diese Landingpage informiert über JobBridge. Sie stellt selbst keine Registrierung, keine
                    Jobvermittlung, keine Zahlungsfunktion und keine Profilverwaltung bereit.
                </p>
                <p>
                    Auf dieser Seite setzen wir keine Analyse- oder Marketing-Skripte ein und verwenden keine
                    Tracking-Cookies. Personenbezogene Daten entstehen hier vor allem beim technischen Seitenaufruf und
                    wenn Sie uns freiwillig per E-Mail kontaktieren.
                </p>
            </LegalSection>

            <LegalSection id="verantwortlicher" title="Verantwortlicher">
                <LegalDefinitionList
                    items={[
                        {
                            term: "Verantwortlich",
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
                        {
                            term: "E-Mail",
                            description: (
                                <a
                                    href="mailto:rezan@jobbridge.app"
                                    className="inline-flex items-center gap-2 text-cyan-200 transition hover:text-cyan-100"
                                >
                                    <Mail className="h-4 w-4" />
                                    rezan@jobbridge.app
                                </a>
                            ),
                        },
                        {
                            term: "Datenschutzbeauftragter",
                            description: <Placeholder>wird ergänzt</Placeholder>,
                        },
                    ]}
                />
            </LegalSection>

            <LegalSection id="aufruf" title="Daten beim Seitenaufruf">
                <p>
                    Beim Aufruf der Landingpage werden technisch notwendige Zugriffsdaten verarbeitet. Dazu können
                    IP-Adresse, Datum und Uhrzeit des Abrufs, angeforderte URL, Referrer, Browser- und
                    Geräteinformationen, übertragene Datenmenge sowie Status- und Fehlermeldungen gehören.
                </p>
                <p>
                    Zweck ist die sichere Auslieferung der Website, die Stabilität des Betriebs, die Fehleranalyse und
                    die Abwehr von Missbrauch. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes
                    Interesse liegt im sicheren und funktionsfähigen Betrieb dieser Landingpage.
                </p>
                <LegalDefinitionList
                    items={[
                        {
                            term: "Hosting",
                            description: (
                                <>
                                    Hetzner Online GmbH
                                    <br />
                                    Industriestr. 25, 91710 Gunzenhausen, Deutschland
                                </>
                            ),
                        },
                        {
                            term: "Log-Speicherdauer",
                            description:
                                "Server-Logs werden in der Regel nach 7 Tagen gelöscht. Eine längere Speicherung erfolgt nur, wenn sie zur Aufklärung von Sicherheits- oder Missbrauchsfällen erforderlich ist.",
                        },
                    ]}
                />
            </LegalSection>

            <LegalSection id="links" title="Externe Links und Plattformwechsel">
                <p>
                    Wenn Sie einen externen Link öffnen, verlassen Sie diese Landingpage. Das betrifft insbesondere die
                    Plattform unter{" "}
                    <a
                        href="https://app.jobbridge.app"
                        className="text-cyan-200 transition hover:text-cyan-100"
                    >
                        app.jobbridge.app
                    </a>
                    , das{" "}
                    <a
                        href={PLATFORM_LEGAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-200 transition hover:text-cyan-100"
                    >
                        Trustcenter unter app.jobbridge.app/legal
                    </a>{" "}
                    und externe Seiten wie Stripe Climate.
                </p>
                <p>
                    Für die Datenverarbeitung auf externen Seiten gelten die Datenschutzhinweise des jeweiligen
                    Anbieters. Die Plattform verarbeitet andere Daten als diese Landingpage, insbesondere wenn dort
                    Konten, Jobs, Kommunikation, Verifizierungen oder Zahlungen genutzt werden.
                </p>
            </LegalSection>

            <LegalSection id="kontakt" title="Kontaktaufnahme per E-Mail">
                <p>
                    Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre E-Mail-Adresse, den Inhalt Ihrer Nachricht
                    und die für die E-Mail-Übermittlung üblichen Metadaten. Wenn Sie freiwillig weitere Angaben machen,
                    werden auch diese verarbeitet.
                </p>
                <p>
                    Zweck ist die Bearbeitung Ihrer Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Wenn Ihre
                    Anfrage auf eine vorvertragliche Kommunikation gerichtet ist, kann zusätzlich Art. 6 Abs. 1 lit. b
                    DSGVO einschlägig sein.
                </p>
                <LegalDefinitionList
                    items={[
                        {
                            term: "E-Mail-Anbieter",
                            description: "Microsoft Ireland Operations Limited (Microsoft 365 / Exchange Online)",
                        },
                        {
                            term: "Speicherdauer",
                            description:
                                "Kontaktanfragen werden spätestens 6 Monate nach Abschluss der Bearbeitung gelöscht, sofern keine gesetzlichen Aufbewahrungspflichten oder berechtigten Nachweisinteressen entgegenstehen.",
                        },
                    ]}
                />
            </LegalSection>

            <LegalSection id="empfaenger" title="Empfänger und Übermittlungen">
                <p>
                    Empfänger personenbezogener Daten können technische Dienstleister sein, die wir für Hosting,
                    Sicherheit, Auslieferung der Website oder E-Mail-Kommunikation einsetzen. Dazu gehören insbesondere
                    Hetzner Online GmbH und Microsoft Ireland Operations Limited. Eine Weitergabe zu Analyse- oder
                    Marketingzwecken findet auf dieser Landingpage nicht statt.
                </p>
                <p>
                    Sofern Dienstleister Daten außerhalb der EU oder des EWR verarbeiten, erfolgt dies nur auf Grundlage
                    geeigneter Schutzmechanismen, etwa eines Angemessenheitsbeschlusses oder EU-Standardvertragsklauseln.
                </p>
            </LegalSection>

            <LegalSection id="rechte" title="Ihre Rechte">
                <p>
                    Sie haben nach Maßgabe der DSGVO das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der
                    Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen Verarbeitungen auf Grundlage berechtigter
                    Interessen.
                </p>
                <p>
                    Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren. Für
                    Nordrhein-Westfalen ist dies die Landesbeauftragte für Datenschutz und Informationsfreiheit
                    Nordrhein-Westfalen, erreichbar unter{" "}
                    <a
                        href="https://www.ldi.nrw.de/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-200 transition hover:text-cyan-100"
                    >
                        www.ldi.nrw.de
                    </a>
                    .
                </p>
            </LegalSection>

            <LegalSection id="aktualisierung" title="Aktualisierung">
                <p>
                    Wir passen diese Datenschutzhinweise an, wenn sich die Landingpage, eingesetzte Dienstleister oder
                    rechtliche Anforderungen ändern. Maßgeblich ist die jeweils hier veröffentlichte Fassung.
                </p>
                <p className="text-sm text-slate-400">
                    Direkt zum{" "}
                    <Link href="/impressum" className="text-cyan-200 transition hover:text-cyan-100">
                        Impressum
                    </Link>
                    .
                </p>
            </LegalSection>
        </LegalPage>
    );
}
