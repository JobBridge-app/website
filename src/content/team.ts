export type TeamMember = {
    slug: string;
    name: string;
    displayName: string;
    shortName: string;
    role: string;
    description: string;
    profileIntro: string;
    location: string;
    profilePath: string;
    profileImage?: {
        src: string;
        alt: string;
        position?: string;
    };
    focus: string[];
    contactLinks: {
        kind: "direct-email" | "team-email" | "instagram" | "phone" | "website" | "external-profile";
        label: string;
        value: string;
        description: string;
        href: string;
    }[];
    profileLinks: {
        label: string;
        value: string;
        description: string;
        href?: string;
    }[];
    knowsAbout: string[];
    sameAs?: string[];
};

export const teamMembers = [
    {
        slug: "rezan",
        name: "Rezan Yalcin",
        displayName: "Rezan Yalcin",
        shortName: "Rezan",
        role: "Gründer von JobBridge",
        description:
            "Rezan entwickelt JobBridge aus der eigenen Erfahrung heraus: Jugendliche sollen lokale Taschengeldjobs fairer, transparenter und sicherer finden können.",
        profileIntro:
            "Viele Jugendliche möchten sich lokal etwas dazuverdienen, finden aber kaum einen einfachen, sicheren und nachvollziehbaren Weg. Gleichzeitig suchen ältere Menschen, Familien und Nachbarn Unterstützung im Alltag, ohne direkt zu wissen, wen sie vertrauensvoll fragen können. Aus dieser Lücke entsteht JobBridge: eine Plattform, die lokale Hilfe einfacher macht und beide Seiten sicherer zusammenbringt.",
        location: "Rheinbach, Deutschland",
        profilePath: "/team/rezan-yalcin",
        profileImage: {
            src: "/insights/wdr-studiogespraech-rezan-yalcin-clean.png",
            alt: "Porträt von Rezan Yalcin.",
            position: "47% 50%",
        },
        focus: [
            "Produktentwicklung und Nutzerführung",
            "Jugendschutz, Sicherheit und klare Freigaben",
            "Lokale Taschengeldjobs für Jugendliche und Auftraggeber",
        ],
        contactLinks: [
            {
                kind: "direct-email",
                label: "Direkt",
                value: "rezan.yalcin@jobbridge.team",
                description: "Persönlicher Kontakt zu Rezan.",
                href: "mailto:rezan.yalcin@jobbridge.team",
            },
            {
                kind: "team-email",
                label: "JobBridge Team",
                value: "kontakt@jobbridge.team",
                description: "Für Medien, Kooperationen und organisatorische Rückfragen.",
                href: "mailto:kontakt@jobbridge.team",
            },
            {
                kind: "instagram",
                label: "Instagram",
                value: "@rezanycn",
                description: "Öffentliche Updates und kurze Einblicke.",
                href: "https://www.instagram.com/rezanycn/",
            },
            {
                kind: "external-profile",
                label: "Jugend forscht",
                value: "Offizielles Profil",
                description: "Projekteintrag zu JobBridge beim Bundeswettbewerb 2026.",
                href: "https://www.jugend-forscht.de/index.php?id=262&tx_smsjufoprojects_smsjufprojectdb%5Bproject%5D=7820&tx_smsjufoprojects_smsjufprojectdb%5Baction%5D=show&tx_smsjufoprojects_smsjufprojectdb%5Bcontroller%5D=Project&cHash=e139c32f72277b9b127908cdb4f044db",
            },
        ],
        profileLinks: [
            {
                label: "Einblicke",
                value: "Beiträge und Medienberichte",
                description: "Gesammelte Berichte, eigene Texte und Updates rund um JobBridge.",
                href: "/einblicke/alle",
            },
            {
                label: "Jugend forscht",
                value: "4. Preis Arbeitswelt",
                description: "Offizieller Projekteintrag zu JobBridge beim Bundeswettbewerb 2026.",
                href: "https://www.jugend-forscht.de/index.php?id=262&tx_smsjufoprojects_smsjufprojectdb%5Bproject%5D=7820&tx_smsjufoprojects_smsjufprojectdb%5Baction%5D=show&tx_smsjufoprojects_smsjufprojectdb%5Bcontroller%5D=Project&cHash=e139c32f72277b9b127908cdb4f044db",
            },
            {
                label: "WDR",
                value: "Studiogespräch und Beitrag",
                description: "Öffentliche Berichterstattung über Rezan Yalcin und JobBridge.",
                href: "https://www1.wdr.de/mediathek/video/sendungen/lokalzeit-bonn/studiogespraech-rezan-yalin-app-entwickler-100.html",
            },
            {
                label: "Kontakt",
                value: "kontakt@jobbridge.team",
                description: "Für Medien, Kooperationen und offizielle Rückfragen zu JobBridge.",
                href: "mailto:kontakt@jobbridge.team",
            },
        ],
        knowsAbout: [
            "JobBridge",
            "sichere Taschengeldjobs",
            "Jugendschutz",
            "digitale Plattformen",
            "Rheinbach",
        ],
        sameAs: [
            "https://jobbridge.app",
            "https://ray-group.eu",
            "https://www.instagram.com/rezanycn/",
            "https://www1.wdr.de/nrw/rheinland/rhein-sieg-kreis/rezan-job-app-rheinbach-100.html",
            "https://www.jugend-forscht.de/index.php?id=262&tx_smsjufoprojects_smsjufprojectdb%5Bproject%5D=7820&tx_smsjufoprojects_smsjufprojectdb%5Baction%5D=show&tx_smsjufoprojects_smsjufprojectdb%5Bcontroller%5D=Project&cHash=e139c32f72277b9b127908cdb4f044db",
        ],
    },
] as const satisfies TeamMember[];

export type TeamMemberSlug = (typeof teamMembers)[number]["slug"];

export function getTeamMember(slug: string): TeamMember | undefined {
    return teamMembers.find((member) => member.slug === slug);
}

export function getTeamProfileSlug(member: Pick<TeamMember, "profilePath">): string {
    return member.profilePath.replace(/^\/team\//, "");
}

export function getTeamMemberByProfileSlug(profileSlug: string): TeamMember | undefined {
    return teamMembers.find((member) => getTeamProfileSlug(member) === profileSlug);
}
