"use client";

import { Shield, UserCheck, Users, Lock, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { reportConversion } from "@/lib/gtag";

export function FeatureSections() {
    return (
        <div className="relative z-10 w-full bg-neutral-950">

            {/* --- Sektion: Für wen ist JobBridge? --- */}
            <motion.section
                id="fuer-wen"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container mx-auto px-5 pb-24 pt-12 md:px-6 md:pt-14"
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Für wen ist JobBridge?</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Eine Plattform, drei Perspektiven. Wir bringen zusammen, was zusammengehört –
                        mit klaren Regeln und Vorteilen für alle Beteiligten.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Card
                        icon={<Users className="w-8 h-8 text-cyan-400" />}
                        title="Jugendliche"
                        description="Finde coole Taschengeldjobs in deiner Nähe. Besseres Taschengeld, erste Arbeitserfahrung und volle Flexibilität."
                        points={["Sicher & legal dazuverdienen", "Jobs in deiner Nachbarschaft", "Schnelle Auszahlung"]}
                    />
                    <Card
                        icon={<UserCheck className="w-8 h-8 text-purple-400" />}
                        title="Eltern"
                        description="Volle Transparenz und Sicherheit. Sie wissen immer, wo Ihr Kind arbeitet und dass die Rahmenbedingungen stimmen."
                        points={["Jugendschutz garantiert", "Eltern-Dashboard zur Einsicht", "Verifizierte Auftraggeber"]}
                    />
                    <Card
                        icon={<Shield className="w-8 h-8 text-emerald-400" />}
                        title="Auftraggeber & Organisationen"
                        description="Für Haushalte, Vereine, kleine Unternehmen und andere Organisationen, die verlässliche Unterstützung suchen."
                        points={["Geprüfte Profile", "Rechtlich sicherer Rahmen", "Einfache Abwicklung", "Für privat & gewerblich"]}
                    />
                </div>
            </motion.section>

            {/* --- Sektion: Sicherheit & Vertrauen --- */}
            <section id="sicherheit" className="py-24 border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-900/5 pointer-events-none" />
                <div className="container mx-auto grid items-start gap-16 px-5 md:grid-cols-2 md:px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm mb-6">
                            <Lock className="w-4 h-4" /> Sicherheit zuerst
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Vertrauen ist gut, <br /> Sicherheit ist JobBridge.
                        </h2>
                        <p className="text-neutral-400 mb-6 leading-relaxed">
                            Wir wissen, dass Taschengeldjobs ein sensibles Thema sind. Deshalb haben wir JobBridge
                            um den Jugendschutz herum gebaut. Wir fragen nur Daten ab, die wirklich notwendig sind,
                            und validieren Nutzer, bevor sie aktiv werden können.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Verifizierung aller Auftraggeber via ID-Check",
                                "Altersgerechte Jobsatelliten (keine schweren Arbeiten)",
                                "Eltern-Bestätigung für unter 16-Jährige",
                                "Datensparsamkeit und deutsche Server"
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-neutral-300">
                                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-full">
                            Mehr zum Sicherheitskonzept
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="grid gap-4 w-full"
                    >
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm w-full">
                            <h3 className="text-xl font-bold text-white mb-2">Klare Rollen</h3>
                            <p className="text-neutral-400 text-sm">Jeder Nutzer hat eine definierte Rolle. Jugendliche können keine Jobs einstellen, Auftraggeber können nicht suchen. Das verhindert Missbrauch.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm w-full">
                            <h3 className="text-xl font-bold text-white mb-2">Datenschutz</h3>
                            <p className="text-neutral-400 text-sm">Deine Daten gehören dir. Wir verkaufen nichts weiter und zeigen Profilbilder/Namen erst nach bestätigtem Job-Match an.</p>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm w-full">
                            <h3 className="text-xl font-bold text-white mb-2">Support & Mediation</h3>
                            <p className="text-neutral-400 text-sm">Sollte mal etwas nicht klappen, steht unser Support bereit. Wir vermitteln fair zwischen Jugendlichen und Auftraggebern.</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- Sektion: So startest du (Stepper) --- */}
            <motion.section
                id="so-gehts"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="container mx-auto border-t border-white/5 px-5 py-24 md:px-6"
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">So startest du durch</h2>
                    <p className="text-neutral-400">In 3 einfachen Schritten zum Ziel.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop only) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-0" />

                    <Step
                        number="01"
                        title="Rolle wählen & Konto erstellen"
                        desc="Entscheide dich: Willst du Jobs erledigen oder vergeben? Registriere dich kostenlos."
                    />
                    <Step
                        number="02"
                        title="Profil vervollständigen"
                        desc="Erzähl uns kurz von dir (oder deinem Jobangebot). Wir prüfen die Angaben zur Sicherheit."
                    />
                    <Step
                        number="03"
                        title="Loslegen & Verdienen"
                        desc="Finde passende Jobs in der Umgebung oder erhalte Hilfsangebote. Einfach, schnell, fair."
                    />
                </div>

                <div className="text-center mt-16">
                    <Button size="lg" className="rounded-full px-8 bg-cyan-600 hover:bg-cyan-500 text-white" asChild>
                        <a
                            href="https://app.jobbridge.app"
                            onClick={() => reportConversion()}
                        >
                            Jetzt kostenlos registrieren
                        </a>
                    </Button>
                </div>
            </motion.section>
        </div>
    );
}

function Card({ icon, title, description, points }: { icon: React.ReactNode, title: string, description: string, points: string[] }) {
    return (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm hover:bg-white/10 transition-colors group">
            <div className="mb-6 p-4 rounded-2xl bg-black/40 w-fit border border-white/5 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
            <p className="text-neutral-400 mb-6 leading-relaxed text-sm">
                {description}
            </p>
            <ul className="space-y-2">
                {points.map((p, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        {p}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function Step({ number, title, desc }: { number: string, title: string, desc: string }) {
    return (
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-neutral-900 border-4 border-neutral-950 shadow-[0_0_0_8px_rgba(255,255,255,0.05)] flex items-center justify-center text-2xl font-bold text-cyan-400 mb-6">
                {number}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-neutral-400 text-sm max-w-xs">{desc}</p>
        </div>
    )
}
