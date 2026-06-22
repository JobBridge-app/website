import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const SITE_URL = "https://jobbridge.app";

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    weight: "400",
    display: "swap",
    variable: "--font-serif",
});

const geistSans = Geist({
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
    variable: "--font-sans",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    weight: ["400", "500"],
    display: "swap",
    variable: "--font-mono",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#02040b" },
        { media: "(prefers-color-scheme: light)", color: "#02040b" },
    ],
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: "JobBridge – Sichere Taschengeldjobs für Jugendliche",
        template: "%s | JobBridge",
    },
    description:
        "JobBridge verbindet Jugendliche, Eltern und Auftraggeber in Deutschland. Sichere Taschengeldjobs mit Verifizierung, Jugendschutz und klaren Freigaben.",
    applicationName: "JobBridge",
    authors: [{ name: "JobBridge" }],
    creator: "JobBridge",
    publisher: "JobBridge",
    formatDetection: {
        telephone: false,
        email: false,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "de_DE",
        siteName: "JobBridge",
        title: "JobBridge – Sichere Taschengeldjobs für Jugendliche",
        description:
            "Die digitale Taschengeldbörse für Deutschland: Jugendliche finden sichere Jobs, Eltern behalten den Überblick und Auftraggeber erhalten geprüfte Unterstützung.",
        url: SITE_URL,
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "JobBridge – Die digitale Taschengeldbörse",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "JobBridge – Sichere Taschengeldjobs für Jugendliche",
        description:
            "Sichere Taschengeldjobs für Jugendliche. Mit Verifizierung, Jugendschutz und transparenter Freigabe für Eltern.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/",
    },
    icons: {
        icon: "/favicon.ico",
    },
};

const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "JobBridge",
    alternateName: ["JobBridge Taschengeldbörse", "Digitale Taschengeldbörse"],
    url: SITE_URL,
    description:
        "Die digitale Taschengeldbörse – sichere Vermittlung von Taschengeldjobs für Jugendliche, Eltern und Auftraggeber in Deutschland.",
    inLanguage: "de-DE",
    publisher: {
        "@id": `${SITE_URL}/#organization`,
    },
};

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "JobBridge",
    url: SITE_URL,
    logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.png`,
        width: 1024,
        height: 1024,
    },
    image: `${SITE_URL}/og-image.png`,
    description:
        "JobBridge ist die sichere digitale Taschengeldbörse für Jugendliche, Eltern und Auftraggeber in Deutschland – mit Verifizierung, Jugendschutz und klaren Freigaben.",
    email: "rezan@jobbridge.app",
    areaServed: {
        "@type": "Country",
        name: "Deutschland",
    },
    knowsAbout: [
        "Taschengeldjobs",
        "Jugendschutz",
        "Sichere Jobvermittlung für Jugendliche",
        "Digitale Taschengeldbörse",
        "Taschengeldbörse",
    ],
};

const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: "JobBridge – Sichere Taschengeldjobs für Jugendliche",
    description:
        "JobBridge ist die digitale Taschengeldbörse für Deutschland: Jugendliche finden sichere Taschengeldjobs, Eltern behalten den Überblick und Auftraggeber erhalten geprüfte Unterstützung.",
    isPartOf: {
        "@id": `${SITE_URL}/#website`,
    },
    about: {
        "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "de-DE",
};

const serializeJsonLd = (data: unknown) =>
    JSON.stringify(data).replace(/[<>&\u2028\u2029]/g, (character) => {
        switch (character) {
            case "<":
                return "\\u003c";
            case ">":
                return "\\u003e";
            case "&":
                return "\\u0026";
            case "\u2028":
                return "\\u2028";
            case "\u2029":
                return "\\u2029";
            default:
                return character;
        }
    });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="de"
            data-scroll-behavior="smooth"
            className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} dark`}
        >
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: serializeJsonLd(websiteJsonLd),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: serializeJsonLd(organizationJsonLd),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: serializeJsonLd(webPageJsonLd),
                    }}
                />
            </head>
            <body className="min-h-screen bg-background font-sans antialiased">
                {children}
            </body>
        </html>
    );
}
