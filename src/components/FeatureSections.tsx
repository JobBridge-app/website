"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Blocks, CheckCircle2, Fan, Flower2, Lock, Origami, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";

const audienceItems: Array<{
    title: string;
    description: string;
    Icon: LucideIcon;
    iconClassName: string;
}> = [
    {
        title: "Jugendliche & Eltern",
        description:
            "Ein gemeinsamer Einstieg: Jugendliche finden passende Aufgaben in der Nähe, Eltern behalten Freigaben, Grenzen und Sicherheit im Blick.",
        Icon: Flower2,
        iconClassName: "text-[#ff7a6f]",
    },
    {
        title: "Private Auftraggeber",
        description:
            "Für Haushalte und Nachbarschaften, die kurzfristig Unterstützung brauchen und Aufgaben sauber, nachvollziehbar und persönlich vergeben möchten.",
        Icon: Fan,
        iconClassName: "text-[#27e5cf]",
    },
    {
        title: "Gewerbliche Auftraggeber",
        description:
            "Für kleine Unternehmen, Praxen, Läden und lokale Teams, die einfache Tätigkeiten planbar besetzen wollen, ohne den Überblick zu verlieren.",
        Icon: Blocks,
        iconClassName: "text-[#6bc8ff]",
    },
    {
        title: "Vereine & Organisationen",
        description:
            "Für lokale Organisationen, die verlässliche Hilfe für Veranstaltungen, Alltag und kleine Aufgaben suchen, mit klaren Rollen für alle Seiten.",
        Icon: Origami,
        iconClassName: "text-[#f8d8cf]",
    },
];

export function FeatureSections() {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const reducedMotion = useReducedMotion() ?? false;
    const [hasRevealed, setHasRevealed] = useState(false);
    const revealState = reducedMotion || hasRevealed ? "show" : "hidden";

    useEffect(() => {
        if (reducedMotion) return;

        const element = contentRef.current;
        if (!element) return;

        const checkVisibility = () => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
            const isVisible = rect.top < viewportHeight * 0.82 && rect.bottom > viewportHeight * 0.12;

            if (isVisible) {
                setHasRevealed(true);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setHasRevealed(true);
                }
            },
            { rootMargin: "0px 0px -12% 0px", threshold: 0.18 }
        );

        const frame = window.requestAnimationFrame(checkVisibility);
        observer.observe(element);
        window.addEventListener("scroll", checkVisibility, { passive: true });
        window.addEventListener("resize", checkVisibility);

        return () => {
            observer.disconnect();
            window.cancelAnimationFrame(frame);
            window.removeEventListener("scroll", checkVisibility);
            window.removeEventListener("resize", checkVisibility);
        };
    }, [reducedMotion]);

    const revealVariants = {
        hidden: {
            opacity: reducedMotion ? 1 : 0,
            y: reducedMotion ? 0 : 22,
        },
        show: (delay = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: reducedMotion ? 0 : delay,
                duration: reducedMotion ? 0.01 : 0.82,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <div className="relative z-10 w-full bg-neutral-950">

            {/* --- Sektion: Für wen ist JobBridge? --- */}
            <section
                id="fuer-wen"
                className="relative overflow-hidden px-5 pb-24 pt-20 md:px-8 md:pb-32 md:pt-24"
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,122,111,0.12),transparent_28%),radial-gradient(circle_at_78%_26%,rgba(39,229,207,0.11),transparent_32%),radial-gradient(circle_at_45%_82%,rgba(107,200,255,0.09),transparent_34%)] opacity-70" />

                <div className="relative mx-auto w-full max-w-[86rem]">
                    <div ref={contentRef}>
                        <motion.h2
                            variants={revealVariants}
                            initial={reducedMotion ? false : "hidden"}
                            animate={reducedMotion ? undefined : revealState}
                            custom={0}
                            className="text-[clamp(2.6rem,4.4vw,4.8rem)] font-semibold leading-none tracking-[-0.045em] text-white"
                        >
                            Für wen?
                        </motion.h2>

                        <motion.div
                            initial={reducedMotion ? false : "hidden"}
                            animate={reducedMotion ? undefined : revealState}
                            variants={{
                                hidden: {
                                    opacity: reducedMotion ? 1 : 0,
                                },
                                show: {
                                    opacity: 1,
                                    transition: {
                                        delayChildren: reducedMotion ? 0 : 0.12,
                                        staggerChildren: reducedMotion ? 0 : 0.11,
                                    },
                                },
                            }}
                            className="mt-16 grid gap-x-24 gap-y-20 md:grid-cols-2 md:gap-y-24"
                        >
                            {audienceItems.map((item) => (
                                <AudienceItem key={item.title} {...item} />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

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
                                "Altersgerechte Jobangebote ohne schwere Arbeiten",
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
                        <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 rounded-full" asChild>
                            <Link href="/datenschutz">
                                Datenschutzhinweise ansehen
                            </Link>
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
                        >
                            Jetzt kostenlos registrieren
                        </a>
                    </Button>
                </div>
            </motion.section>
        </div>
    );
}

function AudienceItem({
    title,
    description,
    Icon,
    iconClassName,
}: {
    title: string;
    description: string;
    Icon: LucideIcon;
    iconClassName: string;
}) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 28 },
                show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.74,
                        ease: [0.16, 1, 0.3, 1],
                    },
                },
            }}
        >
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 10 },
                    show: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.64,
                            ease: [0.16, 1, 0.3, 1],
                        },
                    },
                }}
            >
                <Icon
                    aria-hidden="true"
                    className={`mb-9 h-14 w-14 ${iconClassName}`}
                    strokeWidth={1.85}
                />
            </motion.div>
            <h3 className="max-w-[13ch] text-[clamp(2.1rem,3.4vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-white">
                {title}
            </h3>
            <p className="mt-6 max-w-[36rem] text-[1.05rem] leading-8 text-neutral-400 md:text-[1.15rem]">
                {description}
            </p>
        </motion.div>
    );
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
