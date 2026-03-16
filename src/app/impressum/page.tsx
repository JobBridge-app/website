import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
    title: "Impressum",
    description:
        "Impressum und Anbieterkennzeichnung der JobBridge-Plattform.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "/impressum",
    },
};

export default function ImpressumPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center px-4 py-24 md:py-32 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-96 bg-cyan-900/20 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-full h-96 bg-blue-900/10 blur-[120px] pointer-events-none" />

            <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 px-6 py-8 md:px-10 md:py-12 backdrop-blur-xl shadow-2xl relative z-10">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Startseite
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                        Impressum
                    </h1>
                </div>

                {/* Disclaimer Box */}
                <div className="mb-10 p-5 rounded-2xl bg-cyan-900/20 border border-cyan-500/30 flex gap-4 items-start">
                    <ShieldAlert className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h3 className="font-semibold text-cyan-200">Wichtiger Hinweis</h3>
                        <p className="text-sm text-cyan-100/80 leading-relaxed">
                            Die folgenden Angaben sind ein Entwurf und wurden noch nicht geprüft.
                            Sie stellen keine Rechtsberatung dar und können unvollständig sein. Dieses Impressum wird vor dem offiziellen
                            Start von JobBridge aktualisiert.
                        </p>
                    </div>
                </div>

                <div className="space-y-10 text-neutral-300 font-light leading-relaxed">

                    {/* 1. Anbieter */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">1. Anbieter der Plattform</h2>
                        <p className="mb-2"><strong>JobBridge</strong> – ein Projekt der Ray Group.</p>
                        <p className="mb-4">Verantwortlich für Inhalt und Konzeption der Plattform JobBridge:</p>
                        <p className="text-white font-medium">Rezan Yalçin</p>
                        <div className="mt-4">
                            <span className="block text-sm text-neutral-400 mb-1">Kontakt:</span>
                            <a href="mailto:rezan@jobbridge.app" className="text-cyan-400 hover:text-cyan-300 transition-colors">rezan@jobbridge.app</a>
                        </div>
                    </section>

                    <hr className="border-white/10" />

                    {/* 2. Verantwortlich nach MStV */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">2. Verantwortlich im Sinne des § 18 Abs. 2 MStV</h2>
                        <p className="text-white font-medium mb-1">Rezan Yalçin</p>
                        <a href="mailto:rezan@jobbridge.app" className="text-cyan-400 hover:text-cyan-300 transition-colors block mb-2">rezan@jobbridge.app</a>
                        <p className="text-sm text-neutral-500 italic mt-2">Postanschrift wird vor dem offiziellen Start ergänzt.</p>
                    </section>

                    <hr className="border-white/10" />

                    {/* 3. Haftung */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">3. Haftungshinweise</h2>
                        <p className="mb-4">
                            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                        </p>
                        <p>
                            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                        </p>
                    </section>

                    <hr className="border-white/10" />

                    {/* 4. Urheberrecht */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">4. Marken- und Urheberrecht</h2>
                        <p>
                            Die Projektbezeichnungen „JobBridge“ und „Ray Group“ sowie alle erstellten Inhalte, Texte und Grafiken auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                        </p>
                    </section>

                    <div className="pt-6 text-xs text-neutral-500 text-center">
                        <p>Stand: Dezember 2025 – Version: Entwurf 0.1</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
