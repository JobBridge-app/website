import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const SITE_URL = "https://www.jobbridge.app";

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
        default: "JobBridge – Die digitale Taschengeldbörse für Rheinbach",
        template: "%s | JobBridge",
    },
    description:
        "JobBridge verbindet Jugendliche, Eltern und Auftraggeber in Rheinbach. Sichere Taschengeldjobs mit Verifizierung, Jugendschutz und TrustScore.",
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
        title: "JobBridge – Die digitale Taschengeldbörse für Rheinbach",
        description:
            "Sichere Taschengeldjobs für Jugendliche in Rheinbach. Eltern behalten den Überblick, Auftraggeber finden geprüfte Unterstützung.",
        url: SITE_URL,
        images: [
            {
                url: "/og-image.png",
                width: 1024,
                height: 1024,
                alt: "JobBridge – Die digitale Taschengeldbörse",
                type: "image/png",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "JobBridge – Die digitale Taschengeldbörse",
        description:
            "Sichere Taschengeldjobs für Jugendliche in Rheinbach. Verifizierung, Jugendschutz und Transparenz.",
        images: ["/og-image.png"],
    },
    alternates: {
        canonical: "/",
    },
    icons: {
        icon: "/favicon.ico",
    },
    other: {
        "google-site-verification": "",
    },
};

const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "JobBridge",
    alternateName: ["JobBridge Taschengeldbörse", "JobBridge Rheinbach"],
    url: SITE_URL,
    description:
        "Die digitale Taschengeldbörse – sichere Vermittlung von Taschengeldjobs für Jugendliche, Eltern und Auftraggeber in Rheinbach.",
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
        "JobBridge ist die sichere digitale Taschengeldbörse für Jugendliche, Eltern und Auftraggeber. Gestartet in Rheinbach – mit Verifizierung, Jugendschutz und TrustScore.",
    email: "rezan@jobbridge.app",
    foundingLocation: {
        "@type": "City",
        name: "Rheinbach",
    },
    areaServed: {
        "@type": "City",
        name: "Rheinbach",
        containedInPlace: {
            "@type": "AdministrativeArea",
            name: "Rhein-Sieg-Kreis, Nordrhein-Westfalen, Deutschland",
        },
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
    name: "JobBridge – Sichere Taschengeldjobs in Rheinbach",
    description:
        "JobBridge ist die digitale Taschengeldbörse für Rheinbach: Jugendliche finden sichere Taschengeldjobs, Eltern behalten den Überblick und Auftraggeber erhalten geprüfte Unterstützung.",
    isPartOf: {
        "@id": `${SITE_URL}/#website`,
    },
    about: {
        "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "de-DE",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="de"
            className={`${instrumentSerif.variable} ${geistSans.variable} ${geistMono.variable} dark`}
        >
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(websiteJsonLd),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationJsonLd),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(webPageJsonLd),
                    }}
                />
            </head>
            <body className="min-h-screen bg-background font-sans antialiased">
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=AW-17814899877"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17814899877');
          `}
                </Script>
                {children}
            </body>
        </html>
    );
}
