import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import {
    LegalDefinitionList,
    LegalNotice,
    LegalPage,
    LegalSection,
    PLATFORM_IMPRINT_URL,
    type LegalNavItem,
} from "@/components/legal/LegalPage";

const updatedAt = "17. Mai 2026";

const navItems: LegalNavItem[] = [
    { id: "geltungsbereich", label: "Geltungsbereich" },
    { id: "anbieter", label: "Anbieter" },
    { id: "kontakt", label: "Kontakt" },
    { id: "redaktion", label: "Redaktion" },
    { id: "plattform", label: "Plattform" },
    { id: "streitbeilegung", label: "Streitbeilegung" },
    { id: "rechte", label: "Inhalte & Rechte" },
];

export const metadata: Metadata = {
    title: "Impressum",
    description:
        "Impressum und Anbieterkennzeichnung für die JobBridge-Landingpage unter jobbridge.app.",
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "/impressum",
    },
};

export default function ImpressumPage() {
    return (
        <LegalPage
            title="Impressum"
            updatedAt={updatedAt}
            navItems={navItems}
        >
            <LegalSection id="geltungsbereich" title="Geltungsbereich">
                <LegalNotice>
                    Dieses Impressum gilt nur für <strong className="text-white">jobbridge.app</strong>. Für die
                    Plattform unter <strong className="text-white">app.jobbridge.app</strong> gelten die Unterlagen im{" "}
                    <a
                        href={PLATFORM_IMPRINT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-100 underline decoration-cyan-200/40 underline-offset-4 transition hover:text-white"
                    >
                        Impressum der Plattform.
                    </a>
                </LegalNotice>
            </LegalSection>

            <LegalSection id="anbieter" title="Anbieter nach § 5 DDG">
                <LegalDefinitionList
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
            </LegalSection>

            <LegalSection id="kontakt" title="Kontakt">
                <p>
                    Für Anfragen zur Landingpage, Hinweise zu Inhalten oder allgemeine Kontaktaufnahme erreichen Sie uns
                    per E-Mail.
                </p>
                <p>
                    <a
                        href="mailto:rezan@jobbridge.app"
                        className="inline-flex items-center gap-2 text-cyan-200 transition hover:text-cyan-100"
                    >
                        <Mail className="h-4 w-4" />
                        rezan@jobbridge.app
                    </a>
                </p>
                <LegalDefinitionList
                    items={[
                        {
                            term: "USt-ID / W-ID",
                            description: "—",
                        },
                        {
                            term: "Aufsichtsbehörde",
                            description: "Es besteht keine besondere behördliche Zulassungspflicht für diese Landingpage.",
                        },
                    ]}
                />
            </LegalSection>

            <LegalSection id="redaktion" title="Redaktionell verantwortlich">
                <p>
                    Verantwortlich für journalistisch-redaktionelle Inhalte im Sinne des § 18 Abs. 2 MStV, soweit solche
                    Inhalte auf dieser Landingpage vorliegen:
                </p>
                <LegalDefinitionList
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
            </LegalSection>

            <LegalSection id="plattform" title="Abgrenzung zur Plattform">
                <p>
                    Diese Landingpage informiert über JobBridge und verlinkt auf die Plattform. Sie stellt selbst keine
                    Nutzerkonten, keine Jobvermittlung, keine Zahlungsfunktion, keine Verifizierung und keine
                    Vertragsabwicklung bereit.
                </p>
                <p>
                    Sobald Sie die Plattform unter{" "}
                    <a
                        href="https://app.jobbridge.app"
                        className="text-cyan-200 transition hover:text-cyan-100"
                    >
                        app.jobbridge.app
                    </a>{" "}
                    oder die rechtlichen Hinweise der Plattform öffnen, gelten die dort bereitgestellten
                    rechtlichen Hinweise.
                </p>
            </LegalSection>

            <LegalSection id="streitbeilegung" title="Streitbeilegung">
                <p>
                    Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen.
                </p>
                <p className="text-sm text-slate-400">
                    Die frühere EU-Plattform zur Online-Streitbeilegung ist seit dem 20. Juli 2025 eingestellt.
                </p>
            </LegalSection>

            <LegalSection id="rechte" title="Inhalte, Links und Rechte">
                <p>
                    Die Inhalte dieser Landingpage wurden sorgfältig erstellt. Für Inhalte externer Websites, auf die wir
                    verlinken, ist der jeweilige Anbieter verantwortlich. Bei konkreten Hinweisen auf rechtswidrige
                    Inhalte prüfen wir den betroffenen Link.
                </p>
                <p>
                    Texte, Gestaltung, Markenbestandteile und sonstige Inhalte dieser Landingpage sind urheberrechtlich
                    geschützt, soweit sie nicht anders gekennzeichnet sind. Eine Nutzung außerhalb der gesetzlichen
                    Grenzen bedarf der vorherigen Zustimmung des jeweiligen Rechteinhabers.
                </p>
                <p className="text-sm text-slate-400">
                    Weitere Datenschutzhinweise zur Landingpage finden Sie unter{" "}
                    <Link href="/datenschutz" className="text-cyan-200 transition hover:text-cyan-100">
                        Datenschutz
                    </Link>
                    .
                </p>
            </LegalSection>
        </LegalPage>
    );
}
