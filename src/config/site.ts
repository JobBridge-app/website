export const homePageConfig = {
    // Keep disabled by default. Set to true to show Ray Group branding on the homepage again.
    showRayGroupBadgeInHero: false,
    showRayGroupTextInFooter: false,
} as const;

export const siteConfig = {
    name: "JobBridge",
    url: "https://jobbridge.app",
    appUrl: "https://app.jobbridge.app",
    contactEmail: "kontakt@jobbridge.team",
    defaultTitle: "Sichere Taschengeldjobs für Jugendliche",
    defaultDescription:
        "JobBridge verbindet Jugendliche, Eltern und Auftraggeber in Deutschland: sichere Taschengeldjobs, klare Rollen, Verifizierung und transparente Freigaben.",
} as const;

export const mainNavItems = [
    { label: "Startseite", href: "/" },
    { label: "Sicherheit", href: "/sicherheit" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" },
] as const;

export const menuMetaLinks = [
    { label: "Plattform", href: siteConfig.appUrl },
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
    { label: "E-Mail", href: `mailto:${siteConfig.contactEmail}` },
] as const;

export const placeholderPages = {
    sicherheit: {
        path: "/sicherheit",
        navLabel: "Sicherheit",
        eyebrow: "Sicherheit",
        title: "Sicher arbeiten",
        description:
            "Wie JobBridge Jugendliche, Eltern und Auftraggeber schützt: klare Rollen, geprüfte Kontakte und ein Ablauf, der nicht auf Zufall gebaut ist.",
        metaDescription:
            "Sicherheit bei JobBridge: klare Rollen, geprüfte Kontakte, Jugendschutz und transparente Freigaben für sichere Taschengeldjobs.",
    },
    blog: {
        path: "/blog",
        navLabel: "Blog",
        eyebrow: "Blog",
        title: "Einblicke",
        description:
            "Gedanken, Fortschritte und Beiträge rund um sichere Taschengeldjobs, lokale Unterstützung und den Aufbau von JobBridge.",
        metaDescription:
            "Aktuelle Einblicke, Nachrichten und Beiträge zu JobBridge, sicheren Taschengeldjobs und lokaler Unterstützung.",
    },
    kontakt: {
        path: "/kontakt",
        navLabel: "Kontakt",
        eyebrow: "Kontakt",
        title: "Direkter Kontakt",
        description:
            "Für Fragen zur Website, zur Plattform oder zu JobBridge. Kurz schreiben, wir melden uns sauber und nachvollziehbar zurück.",
        metaDescription:
            "Kontakt zu JobBridge für Fragen zur Website, Plattform, sicheren Taschengeldjobs und lokalen Auftraggebern.",
    },
    demnaechst: {
        path: "/demnaechst",
        navLabel: "In Planung",
        eyebrow: "In Planung",
        title: "Wird vorbereitet",
        description:
            "Dieser Bereich bleibt bewusst reduziert, bis Inhalt und Funktion feststehen. Keine leere Seite, kein künstliches Versprechen.",
        metaDescription:
            "Ein vorbereiteter JobBridge-Bereich für kommende Inhalte und Funktionen.",
    },
} as const;
