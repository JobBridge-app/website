import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export const metadata: Metadata = {
    title: "Datenschutz",
    description:
        "Datenschutzhinweise der JobBridge-Plattform. Informationen zum Umgang mit personenbezogenen Daten.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "/datenschutz",
    },
};

export default function DatenschutzPage() {
    return (
        <main className="min-h-screen bg-neutral-950 text-neutral-50 flex items-center justify-center px-4 py-24 md:py-32 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-full h-96 bg-cyan-900/10 blur-[130px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-96 bg-purple-900/10 blur-[130px] pointer-events-none" />

            <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 px-6 py-8 md:px-10 md:py-12 backdrop-blur-xl shadow-2xl relative z-10">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Zurück zur Startseite
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                        Datenschutz
                    </h1>
                </div>

                {/* Disclaimer Box */}
                <div className="mb-10 p-5 rounded-2xl bg-cyan-900/20 border border-cyan-500/30 flex gap-4 items-start">
                    <Lock className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                        <h3 className="font-semibold text-cyan-200">Entwurf / Status der Plattform</h3>
                        <p className="text-sm text-cyan-100/80 leading-relaxed">
                            Hinweis: Diese Datenschutzhinweise sind ein Entwurf und wurden noch nicht geprüft.
                            Vor einem offiziellen Start von JobBridge in Deutschland wird eine vollständige, rechtskonforme Datenschutzerklärung ergänzt.
                        </p>
                    </div>
                </div>

                <div className="space-y-10 text-neutral-300 font-light leading-relaxed">

                    {/* 1. Wer wir sind */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">1. Wer wir sind</h2>
                        <p className="mb-2"><strong>JobBridge</strong> ist ein Projekt der Ray Group.</p>
                        <div className="mt-4">
                            <span className="block text-sm text-neutral-400 mb-1">Kontakt für Datenschutzanfragen:</span>
                            <a href="mailto:rezan@jobbridge.app" className="text-cyan-400 hover:text-cyan-300 transition-colors">rezan@jobbridge.app</a>
                        </div>
                    </section>

                    <hr className="border-white/10" />

                    {/* 2. Aktueller Status */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">2. Aktueller Status der Plattform</h2>
                        <p className="mb-4">
                            Bei dieser Website handelt es sich aktuell um eine Informations- und Testseite („Landingpage“).
                            Es findet noch kein öffentlicher Produktivbetrieb der Vermittlungsplattform statt.
                        </p>
                        <p>
                            Derzeit werden personenbezogene Daten lediglich im technisch notwendigen Umfang verarbeitet,
                            um die Auslieferung der Webseite zu gewährleisten (z.B. Server-Logfiles, IP-Adressen zur Gefahrenabwehr).
                            Es werden keine Tracking-Cookies für Werbezwecke eingesetzt.
                        </p>
                    </section>

                    <hr className="border-white/10" />

                    {/* 3. Geplante Verarbeitung */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">3. Geplante Datenverarbeitung (Vorschau)</h2>
                        <p className="mb-4 text-sm text-neutral-400">
                            Zum offiziellen Start der Plattform werden wir folgende Datenverarbeitungen einführen und hier detailliert beschreiben:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-neutral-300">
                            <li><strong>Registrierung von Nutzerkonten:</strong> Verarbeitung von Stammdaten (Name, Vorname) für Jugendliche, Eltern und Auftraggeber.</li>
                            <li><strong>Standortdaten:</strong> Zur Anzeige von Jobs in der relevanten Region (z.B. PLZ-basiert).</li>
                            <li><strong>Verifikation:</strong> Maßnahmen zur Sicherheitsprüfung (z.B. E-Mail-Bestätigung, Altersprüfung).</li>
                            <li><strong>Kommunikation:</strong> Verarbeitung von Nachrichten zwischen Nutzern zur Jobvermittlung.</li>
                        </ul>
                        <p className="mt-4">
                            Alle genannten Prozesse werden streng nach den Vorgaben der DSGVO umgesetzt.
                        </p>
                    </section>

                    <hr className="border-white/10" />

                    {/* 4. Betroffenenrechte */}
                    <section>
                        <h2 className="text-xl font-semibold text-white mb-4">4. Ihre Rechte</h2>
                        <p className="mb-4">
                            Grundsätzlich haben Sie im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.
                        </p>
                        <p>
                            Genauere Informationen hierzu werden mit dem Start der Plattform ergänzt.
                        </p>
                    </section>

                    <div className="pt-6 text-xs text-neutral-500 text-center">
                        <p>Zuletzt aktualisiert: Dezember 2025</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
