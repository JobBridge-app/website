import { siteConfig } from "@/config/site";
import { getTeamMember, type TeamMemberSlug } from "@/content/team";

type ArticleBlock =
    | {
          type: "paragraph";
          text: string;
      }
    | {
          type: "heading";
          text: string;
      }
    | {
          type: "list";
          items: string[];
      };

export type OwnInsight = {
    kind: "own";
    slug: string;
    title: string;
    excerpt: string;
    description: string;
    category: string;
    publishedAt: string;
    updatedAt: string;
    readingTime: string;
    authorSlug: TeamMemberSlug;
    tags: string[];
    heroLine: string;
    image?: {
        src: string;
        alt: string;
        position?: string;
    };
    body: ArticleBlock[];
    featured?: boolean;
    newsEligible?: boolean;
};

export type ExternalInsight = {
    kind: "external";
    id: string;
    title: string;
    excerpt: string;
    category: string;
    publishedAt: string;
    sourceName: string;
    sourceUrl: string;
    authorName?: string;
    externalUrl: string;
    image?: {
        src: string;
        alt: string;
        position?: string;
    };
    tags: string[];
    featured?: boolean;
};

export type Insight = OwnInsight | ExternalInsight;

export const insightsPage = {
    label: "Einblicke",
    path: "/einblicke",
    title: "Einblicke",
    eyebrow: "Journal",
    description:
        "Beiträge, Medienberichte und Notizen über JobBridge, sichere Taschengeldjobs und die Arbeit hinter der Plattform.",
    metaDescription:
        "Einblicke in JobBridge: eigene Beiträge, Medienberichte und Updates zu sicheren Taschengeldjobs, Rezan Yalcin und der digitalen Taschengeldbörse.",
} as const;

export const ownInsights = [
    {
        kind: "own",
        slug: "warum-jobbridge-entstanden-ist",
        title: "Warum JobBridge entstanden ist",
        excerpt:
            "Eine kurze Einordnung, weshalb JobBridge mehr sein soll als eine digitale Jobliste und warum Sicherheit von Anfang an mitgedacht wird.",
        description:
            "Rezan Yalcin erklärt, aus welchem Problem JobBridge entstanden ist und warum Jugendliche, Eltern und Auftraggeber klare Rollen brauchen.",
        category: "Hintergrund",
        publishedAt: "2026-06-23T09:00:00+02:00",
        updatedAt: "2026-06-23T09:00:00+02:00",
        readingTime: "3 Min.",
        authorSlug: "rezan",
        tags: ["JobBridge", "Rezan Yalcin", "Taschengeldjobs", "Jugendschutz"],
        heroLine: "Aus einer einfachen Frage wurde eine Plattform: Wie können Jugendliche sicherer lokale Jobs finden?",
        image: {
            src: "/insights/jobbridge-author-article-cover.png",
            alt: "JobBridge Logo auf blauem Hintergrund.",
            position: "center center",
        },
        featured: true,
        newsEligible: true,
        body: [
            {
                type: "paragraph",
                text:
                    "JobBridge ist aus einem sehr konkreten Problem entstanden: Viele Jugendliche möchten sich etwas dazuverdienen, finden aber keine einfache, faire und sichere Möglichkeit, lokale Hilfe anzubieten oder passende Aufgaben zu finden.",
            },
            {
                type: "paragraph",
                text:
                    "Die klassische Taschengeldbörse zeigt, dass der Bedarf da ist. Gleichzeitig wirkt der Ablauf oft langsam, schwer nachvollziehbar und zu wenig digital. JobBridge übersetzt diese Idee in eine moderne Plattform, ohne den wichtigen Schutzrahmen zu verlieren.",
            },
            {
                type: "heading",
                text: "Sicherheit ist kein Zusatz",
            },
            {
                type: "paragraph",
                text:
                    "Bei JobBridge geht es nicht nur darum, Jobs sichtbar zu machen. Jugendliche, Eltern und Auftraggeber brauchen klare Rollen. Eltern sollen nachvollziehen können, welche Kontakte und Aufgaben entstehen. Auftraggeber sollen wissen, wie sie Unterstützung sicher anfragen. Jugendliche sollen nicht in unklare Situationen geraten.",
            },
            {
                type: "list",
                items: [
                    "Jugendliche finden lokale Taschengeldjobs in einem klaren Rahmen.",
                    "Eltern behalten wichtige Freigaben und Informationen im Blick.",
                    "Auftraggeber stellen Aufgaben so ein, dass Erwartungen, Ort und Kontakt sauber nachvollziehbar sind.",
                ],
            },
            {
                type: "heading",
                text: "Warum eigene Einblicke wichtig sind",
            },
            {
                type: "paragraph",
                text:
                    "Diese Einblicke-Seite soll zeigen, wie JobBridge entsteht: mit Berichten aus Medien, eigenen Updates und Hintergrundtexten. So bleibt nachvollziehbar, woran gearbeitet wird, welche Entscheidungen getroffen werden und warum das Projekt für Rheinbach und später weitere Orte relevant sein kann.",
            },
        ],
    },
] as const satisfies OwnInsight[];

export const externalInsights = [
    {
        kind: "external",
        id: "wdr-studiogespraech-rezan-yalcin-app-entwickler",
        title: "Studiogespräch: Rezan Yalcin, App-Entwickler",
        excerpt:
            "Im WDR-Studiogespräch spricht Rezan Yalcin über JobBridge, seine App-Entwicklung und den Erfolg bei Jugend forscht.",
        category: "Video",
        publishedAt: "2026-06-22T09:01:00+02:00",
        sourceName: "WDR",
        sourceUrl: "https://www1.wdr.de",
        externalUrl: "https://www1.wdr.de/mediathek/video/sendungen/lokalzeit-bonn/studiogespraech-rezan-yalin-app-entwickler-100.html",
        image: {
            src: "/insights/wdr-studiogespraech-rezan-yalcin-clean.png",
            alt: "Rezan Yalcin im WDR-Studiogespräch der Lokalzeit aus Bonn.",
            position: "center center",
        },
        tags: ["WDR", "Lokalzeit", "Interview", "JobBridge"],
        featured: true,
    },
    {
        kind: "external",
        id: "wdr-lokalzeit-bonn-jobbridge-video",
        title: "Lokalzeit aus Bonn: JobBridge im WDR",
        excerpt:
            "Der WDR-Beitrag ordnet JobBridge als lokales App-Projekt aus Rheinbach ein und zeigt den Weg bis zur Auszeichnung bei Jugend forscht.",
        category: "Video",
        publishedAt: "2026-06-22T09:00:00+02:00",
        sourceName: "WDR",
        sourceUrl: "https://www1.wdr.de",
        authorName: "Paula Randerath",
        externalUrl: "https://www1.wdr.de/mediathek/rezan-15-aus-rheinbach-raeumt-mit-seiner-app-bei-jugend-forscht-ab-100.html",
        image: {
            src: "/insights/wdr-lokalzeit-bonn-sendungslogo.jpg",
            alt: "Sendungsbild der WDR Lokalzeit aus Bonn.",
            position: "center center",
        },
        tags: ["WDR", "Lokalzeit", "JobBridge", "Jugend forscht"],
        featured: true,
    },
    {
        kind: "external",
        id: "wdr-rezan-jobbridge-jugend-forscht",
        title: "15-Jähriger programmiert Job-App: Rezan räumt bei Jugend forscht ab",
        excerpt:
            "Der WDR berichtet über Rezan Yalcin, JobBridge und die Idee einer digitalen Taschengeldbörse für Jugendliche in Rheinbach.",
        category: "Medienbericht",
        publishedAt: "2026-06-16T05:02:00+02:00",
        sourceName: "WDR",
        sourceUrl: "https://www1.wdr.de",
        authorName: "Paula Randerath",
        externalUrl: "https://www1.wdr.de/nrw/rheinland/rhein-sieg-kreis/rezan-job-app-rheinbach-100.html",
        image: {
            src: "/insights/wdr-jobbridge-interview.jpg",
            alt: "Rezan Yalcin beim WDR-Dreh zu JobBridge.",
            position: "center center",
        },
        tags: ["WDR", "JobBridge", "Jugend forscht"],
        featured: true,
    },
    {
        kind: "external",
        id: "blick-aktuell-jugend-forscht-bundesfinale-4-platz",
        title: "Rezan Aaron Yalcin gewinnt 4. Platz beim Jugend-forscht-Bundesfinale",
        excerpt:
            "Blick aktuell berichtet über Rezan Yalcin, JobBridge und den 4. Platz in der Kategorie Arbeitswelt beim Bundesfinale von Jugend forscht.",
        category: "Medienbericht",
        publishedAt: "2026-06-01T09:00:00+02:00",
        sourceName: "Blick aktuell",
        sourceUrl: "https://www.blick-aktuell.de",
        authorName: "Claudia Spittel",
        externalUrl: "https://www.blick-aktuell.de/Berichte/Rezan-Aaron-Yalcin-aus-Rheinbach-gewinnt-4-Platz-beim-Jugend-forscht-Bundesfinale-665655.html",
        image: {
            src: "/insights/blick-aktuell-jugend-forscht-bundesfinale.webp",
            alt: "Rezan Yalcin mit seinen Projektbetreuern Malik Stork und Dr. Maki Oba beim Bundeswettbewerb von Jugend forscht.",
            position: "center center",
        },
        tags: ["Blick aktuell", "Bundesfinale", "Jugend forscht", "4. Platz Arbeitswelt", "JobBridge"],
    },
    {
        kind: "external",
        id: "radio-bonn-jugend-forscht-bundesfinale",
        title: "Jugend-Forscht-Sieg geht nicht nach Rheinbach",
        excerpt:
            "Radio Bonn/Rhein-Sieg berichtet über Rezan Yalcin im Bundesfinale von Jugend forscht und JobBridge als digitale Taschengeldbörse.",
        category: "Medienbericht",
        publishedAt: "2026-05-31T11:06:00+02:00",
        sourceName: "Radio Bonn / Rhein-Sieg",
        sourceUrl: "https://www.radiobonn.de",
        externalUrl: "https://www.radiobonn.de/artikel/jugend-forscht-sieg-geht-nicht-nach-rheinbach-2663104",
        image: {
            src: "/insights/radio-bonn-jugend-forscht-bundesfinale.jpg",
            alt: "Symbolbild zum Radio-Bonn-Bericht über Jugend forscht.",
            position: "center center",
        },
        tags: ["Radio Bonn", "Bundesfinale", "Jugend forscht", "JobBridge"],
    },
    {
        kind: "external",
        id: "jugend-forscht-jobbridge-offiziell-4-preis",
        title: "JobBridge – die digitale Taschengeldbörse",
        excerpt:
            "Die offizielle Jugend-forscht-Projektdatenbank führt JobBridge mit Rezan Aaron Yalcin und dem 4. Preis Arbeitswelt beim Bundeswettbewerb 2026.",
        category: "Offizieller Projekteintrag",
        publishedAt: "2026-05-31T10:00:00+02:00",
        sourceName: "Jugend forscht",
        sourceUrl: "https://www.jugend-forscht.de",
        externalUrl:
            "https://www.jugend-forscht.de/index.php?id=262&tx_smsjufoprojects_smsjufprojectdb%5Bproject%5D=7820&tx_smsjufoprojects_smsjufprojectdb%5Baction%5D=show&tx_smsjufoprojects_smsjufprojectdb%5Bcontroller%5D=Project&cHash=e139c32f72277b9b127908cdb4f044db",
        image: {
            src: "/insights/jugend-forscht-jobbridge-offiziell-4-preis.jpg",
            alt: "Offizielles Jugend-forscht-Projektbild zu JobBridge.",
            position: "center center",
        },
        tags: ["Jugend forscht", "Bundeswettbewerb", "4. Preis Arbeitswelt", "JobBridge"],
    },
    {
        kind: "external",
        id: "rheinbacher-jugend-forscht-nrw",
        title: "Jugend forscht NRW zeichnet Rezan Yalcin als Spitzenforschertalent aus",
        excerpt:
            "Der Rheinbacher ordnet den Weg von JobBridge über Regional- und Landeswettbewerb ein.",
        category: "Medienbericht",
        publishedAt: "2026-03-27T09:00:00+01:00",
        sourceName: "Der Rheinbacher",
        sourceUrl: "https://www.rheinbacher.de",
        externalUrl: "https://www.rheinbacher.de/2026/03/jugend-forscht-nrw-zeichnet-rezan.html",
        image: {
            src: "/insights/rheinbacher-jugend-forscht-nrw.jpg",
            alt: "Rezan Yalcin präsentiert JobBridge beim Jugend-forscht-Landeswettbewerb.",
            position: "center 34%",
        },
        tags: ["Rheinbach", "Jugend forscht", "JobBridge"],
    },
    {
        kind: "external",
        id: "sg-rheinbach-jugend-forscht-landesebene-2026",
        title: "Jugend forscht Landesebene 2026",
        excerpt:
            "Das Städtische Gymnasium Rheinbach berichtet über Rezan Yalcins 1. Platz beim Landeswettbewerb Jugend forscht und die Qualifikation für die Bundesebene.",
        category: "Schulbericht",
        publishedAt: "2026-03-24T10:13:17+01:00",
        sourceName: "SG Rheinbach",
        sourceUrl: "https://sg-rheinbach.de",
        authorName: "Dr. Breitbach",
        externalUrl: "https://sg-rheinbach.de/jugend-forscht-landesebene-2026/",
        image: {
            src: "/insights/sg-rheinbach-landesebene-2026.jpg",
            alt: "Rezan Yalcin beim Jugend-forscht-Landeswettbewerb 2026.",
            position: "center 40%",
        },
        tags: ["SG Rheinbach", "Jugend forscht", "Landeswettbewerb", "JobBridge"],
    },
    {
        kind: "external",
        id: "rub-jugend-forscht-nrw-spitzenforschertalente",
        title: "NRW zeichnet Spitzenforschertalente aus",
        excerpt:
            "Die Ruhr-Universität Bochum berichtet über den NRW-Landeswettbewerb Jugend forscht und JobBridge als 1. Preis in der Kategorie Arbeitswelt.",
        category: "Presseinformation",
        publishedAt: "2026-03-19T18:21:00+01:00",
        sourceName: "Ruhr-Universität Bochum",
        sourceUrl: "https://news.rub.de",
        authorName: "AKS",
        externalUrl: "https://news.rub.de/presseinformationen/vermischtes/2026-03-19-jugend-forscht-nrw-zeichnet-spitzenforschertalente-aus",
        image: {
            src: "/insights/rub-jugend-forscht-rezan-yalcin.jpg",
            alt: "Rezan Yalcin steht vor seinem JobBridge-Projektstand beim Jugend-forscht-Landeswettbewerb an der Ruhr-Universität Bochum.",
            position: "center 42%",
        },
        tags: ["Ruhr-Universität Bochum", "Jugend forscht", "Landeswettbewerb", "JobBridge"],
    },
] as const satisfies ExternalInsight[];

export const allInsights = [...ownInsights, ...externalInsights].toSorted((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
);

export function getInsightSlug(insight: Insight): string {
    return insight.kind === "own" ? insight.slug : insight.id;
}

export function getInsightPath(insight: Insight): string {
    return `${insightsPage.path}/${getInsightSlug(insight)}`;
}

export function getInsightAbsoluteUrl(insight: Insight): string {
    return `${siteConfig.url}${getInsightPath(insight)}`;
}

export function getInsightCanonicalPath(insight: Insight): string {
    return getInsightPath(insight);
}

export function getInsightSourceUrl(insight: Insight): string {
    return insight.kind === "external" ? insight.externalUrl : getInsightAbsoluteUrl(insight);
}

export function getInsightLastModified(insight: Insight): string {
    return insight.kind === "own" ? insight.updatedAt : insight.publishedAt;
}

export function getOwnInsight(slug: string): OwnInsight | undefined {
    return ownInsights.find((insight) => insight.slug === slug);
}

export function getInsightBySlug(slug: string): Insight | undefined {
    return allInsights.find((insight) => getInsightSlug(insight) === slug);
}

export function getInsightUrl(insight: Insight): string {
    return getInsightPath(insight);
}

export function getInsightAuthorName(insight: Insight) {
    if (insight.kind === "external") {
        return insight.authorName ?? insight.sourceName;
    }

    return getTeamMember(insight.authorSlug)?.displayName ?? siteConfig.name;
}

export function formatInsightDate(value: string) {
    return new Intl.DateTimeFormat("de-DE", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(value));
}
