"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Blocks,
    ChevronDown,
    Fan,
    Flower2,
    Origami,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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

type SafetyGlyphName = "nodes" | "split" | "fold" | "spark";

const safetySlides: Array<{
    title: string;
    description: string;
    accent: string;
    glyph: SafetyGlyphName;
}> = [
    {
        title: "Moderierter Zugang",
        description:
            "JobBridge ist als digitale Taschengeldbörse für Jugendliche ab 14 gedacht: nicht offen, laut und beliebig, sondern geführt, transparent und mit klaren Rollen.",
        accent: "bg-[radial-gradient(circle_at_50%_48%,#35ff6b_0%,#22e56b_45%,#18a88e_100%)]",
        glyph: "nodes",
    },
    {
        title: "Wenige Daten",
        description:
            "Sensible Informationen sollen nicht unnötig sichtbar werden. Erst wenn ein Job wirklich relevant wird, entstehen die nächsten Schritte.",
        accent: "bg-[radial-gradient(circle_at_48%_46%,#fff68c_0%,#ecef74_52%,#b6bd71_100%)]",
        glyph: "split",
    },
    {
        title: "Eltern im Blick",
        description:
            "Eltern sollen nachvollziehen können, wo ihr Kind arbeitet und mit wem Kontakt entsteht, ohne jeden kleinen Schritt künstlich zu verkomplizieren.",
        accent: "bg-[radial-gradient(circle_at_50%_48%,#ff6fae_0%,#ef61a4_48%,#a66ad2_100%)]",
        glyph: "fold",
    },
    {
        title: "Auffälliges prüfen",
        description:
            "Wenn Profile, Nachrichten oder Abläufe nicht plausibel wirken, soll das System nicht wegsehen. Auffällige Vorgänge werden markiert und überprüfbar.",
        accent: "bg-[radial-gradient(circle_at_50%_50%,#24e9d2_0%,#16cbd8_48%,#238bbb_100%)]",
        glyph: "spark",
    },
];

export function FeatureSections() {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const reducedMotion = useReducedMotion() ?? false;
    const [hasRevealed, setHasRevealed] = useState(false);
    const [activeSafetyIndex, setActiveSafetyIndex] = useState(0);
    const revealState = reducedMotion || hasRevealed ? "show" : "hidden";
    const activeSafety = safetySlides[activeSafetyIndex];
    const activeSafetyNumber = String(activeSafetyIndex + 1).padStart(2, "0");

    const showPreviousSafety = () => {
        setActiveSafetyIndex((current) => (current === 0 ? safetySlides.length - 1 : current - 1));
    };

    const showNextSafety = () => {
        setActiveSafetyIndex((current) => (current + 1) % safetySlides.length);
    };

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
            <section id="sicherheit" className="relative overflow-hidden border-t border-white/5 px-5 py-24 md:px-8 md:py-32">
                <div className="relative mx-auto w-full max-w-[92rem]">
                    <div className="mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
                        <div>
                            <h2 className="max-w-[12ch] text-[clamp(3.1rem,6.2vw,7rem)] font-semibold leading-[0.96] tracking-[-0.058em] text-white">
                                <span className="text-white/34">Wie </span>
                                Sicherheit
                                <span className="text-white/34"> entsteht</span>
                            </h2>
                            <p className="mt-6 max-w-[42rem] text-[1.05rem] leading-8 text-neutral-400 md:text-[1.2rem]">
                                JobBridge übersetzt die Idee der Taschengeldbörse in eine digitale Plattform:
                                moderiert, transparent und mit Schutz für sensible Situationen.
                            </p>
                        </div>

                        <Button
                            className="w-fit rounded-2xl bg-white px-6 py-6 text-[1rem] font-semibold text-neutral-950 hover:bg-white/88"
                            asChild
                        >
                            <Link href="/sicherheit">
                                Mehr zur Sicherheit <ArrowUpRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-white/[0.055] md:rounded-[2rem]">
                        <div className="relative min-h-[23rem] p-6 md:min-h-[28rem] md:p-12 lg:grid lg:grid-cols-[0.94fr_1.06fr] lg:gap-10">
                            <div className="absolute right-5 top-5 z-20 flex flex-col items-end gap-3 md:hidden">
                                <div className="pointer-events-none">
                                    <SafetyGlyph name={activeSafety.glyph} accent={activeSafety.accent} compact />
                                </div>
                                <div className="flex gap-2.5">
                                    <button
                                        type="button"
                                        aria-label="Vorheriger Sicherheitsaspekt"
                                        onClick={showPreviousSafety}
                                        className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/18"
                                    >
                                        <ArrowLeft className="h-3.5 w-3.5" />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Nächster Sicherheitsaspekt"
                                        onClick={showNextSafety}
                                        className="grid h-10 w-10 place-items-center rounded-full bg-white/14 text-white transition-colors duration-300 hover:bg-white/24"
                                    >
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            </div>

                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={activeSafety.title}
                                    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                                    animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
                                    exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                                    transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
                                    className="relative z-10 flex min-h-[19rem] flex-col pr-20 md:min-h-0 md:pr-0"
                                >
                                    <p className="text-[3.45rem] font-semibold leading-none tracking-[-0.055em] text-white/18 md:text-[5.2rem]">
                                        {activeSafetyNumber}
                                    </p>
                                    <div className="mt-auto max-w-[36rem] pt-12 md:pt-24 lg:pt-10">
                                        <h3 className="text-[clamp(1.9rem,3.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-white">
                                            {activeSafety.title}
                                        </h3>
                                        <p className="mt-5 line-clamp-4 text-[1rem] leading-[1.65] text-neutral-400 md:mt-6 md:line-clamp-none md:text-[1.16rem] md:leading-8">
                                            {activeSafety.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="pointer-events-none relative mt-12 hidden min-h-[17rem] overflow-hidden rounded-[1.4rem] bg-[#191919] lg:mt-0 lg:block lg:min-h-0">
                                <div
                                    className="absolute inset-0 opacity-[0.58]"
                                    style={{
                                        backgroundImage:
                                            "radial-gradient(circle, rgba(255,255,255,0.14) 1.8px, transparent 1.9px)",
                                        backgroundSize: "24px 24px",
                                    }}
                                />
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={activeSafety.title}
                                        initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: 14 }}
                                        animate={reducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                                        exit={reducedMotion ? undefined : { opacity: 0, scale: 0.98, y: -8 }}
                                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <SafetyGlyph name={activeSafety.glyph} accent={activeSafety.accent} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            <div className="absolute right-5 top-5 hidden gap-2 md:right-7 md:top-7 md:flex">
                                {safetySlides.map((slide, index) => (
                                    <button
                                        key={slide.title}
                                        type="button"
                                        aria-label={`${slide.title} anzeigen`}
                                        onClick={() => setActiveSafetyIndex(index)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${
                                            index === activeSafetyIndex ? "w-7 bg-white" : "w-1.5 bg-white/18 hover:bg-white/38"
                                        }`}
                                    />
                                ))}
                            </div>

                        </div>
                    </div>

                    <div className="mt-8 hidden justify-end gap-4 md:flex">
                        <button
                            type="button"
                            aria-label="Vorheriger Sicherheitsaspekt"
                            onClick={showPreviousSafety}
                            className="grid h-16 w-16 place-items-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/18"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            aria-label="Nächster Sicherheitsaspekt"
                            onClick={showNextSafety}
                            className="grid h-16 w-16 place-items-center rounded-full bg-white/14 text-white transition-colors duration-300 hover:bg-white/24"
                        >
                            <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* --- Sektion: Abschluss-CTA --- */}
            <motion.section
                id="so-gehts"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="relative isolate overflow-hidden border-t border-white/5 px-5 py-20 md:px-8 md:py-28"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 opacity-[0.34]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.22) 1.25px, transparent 1.35px)",
                        backgroundPosition: "center",
                        backgroundSize: "28px 28px",
                        maskImage: "radial-gradient(ellipse at center, black 0%, black 32%, rgba(0,0,0,0.48) 54%, transparent 78%)",
                        WebkitMaskImage:
                            "radial-gradient(ellipse at center, black 0%, black 32%, rgba(0,0,0,0.48) 54%, transparent 78%)",
                    }}
                />
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_48%,rgba(37,99,235,0.12),transparent_34%),linear-gradient(180deg,rgba(2,4,11,0)_0%,rgba(2,4,11,0.74)_100%)]"
                />

                <div className="mx-auto flex min-h-[28rem] max-w-[76rem] flex-col items-center justify-center text-center md:min-h-[34rem]">
                    <p className="mb-7 text-[1rem] font-medium tracking-[-0.025em] text-white/78 md:mb-8 md:text-[1.22rem]">
                        Bereit für den ersten sicheren Job?
                    </p>

                    <a
                        href="https://app.jobbridge.app"
                        className="group relative flex h-[6.25rem] w-full max-w-[42rem] items-center overflow-hidden rounded-full bg-[#202020] p-3 text-white shadow-[0_24px_80px_rgba(0,0,0,0.38)] outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-neutral-950 md:h-[8.25rem] md:p-4"
                        aria-label="Zur JobBridge Plattform"
                    >
                        <span
                            aria-hidden="true"
                            className="absolute inset-y-3 left-3 z-0 w-[4.75rem] rounded-full bg-[#f2f2f2] transition-[width,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-[calc(100%_-_1.5rem)] group-hover:shadow-[0_0_58px_rgba(255,255,255,0.16)] md:inset-y-4 md:left-4 md:w-[6.25rem] md:group-hover:w-[calc(100%_-_2rem)]"
                        />

                        <span className="absolute left-3 top-3 z-20 grid h-[4.75rem] w-[4.75rem] place-items-center text-black transition-[left,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:left-1/2 group-hover:-translate-x-1/2 md:left-4 md:top-4 md:h-[6.25rem] md:w-[6.25rem]">
                            <ChevronDown className="h-8 w-8 stroke-[3] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-90 md:h-9 md:w-9" />
                        </span>

                        <span className="relative z-10 flex min-w-0 flex-1 items-center justify-center pl-[5.25rem] pr-4 text-[clamp(2.15rem,8vw,4.7rem)] font-semibold leading-none tracking-[-0.055em] transition-opacity duration-300 ease-out group-hover:opacity-0 md:pl-[6.75rem]">
                            Zur Plattform
                        </span>
                    </a>
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

function SafetyGlyph({ name, accent, compact = false }: { name: SafetyGlyphName; accent: string; compact?: boolean }) {
    return (
        <div
            className={`relative aspect-square overflow-hidden ${accent} ${
                compact
                    ? "w-[4.75rem] rounded-[1.2rem] shadow-[0_16px_38px_rgba(0,0,0,0.18)]"
                    : "w-[13.5rem] rounded-[2.75rem] md:w-[18rem]"
            }`}
        >
            <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                {name === "nodes" ? (
                    <>
                        <circle cx="28" cy="28" r="12.5" fill="#191919" />
                        <circle cx="72" cy="28" r="12.5" fill="#191919" />
                        <circle cx="28" cy="72" r="12.5" fill="#191919" />
                        <circle cx="72" cy="72" r="12.5" fill="#191919" />
                        <path
                            d="M50 32 C46.8 43.4 43.4 46.8 32 50 C43.4 53.2 46.8 56.6 50 68 C53.2 56.6 56.6 53.2 68 50 C56.6 46.8 53.2 43.4 50 32 Z"
                            fill="#191919"
                        />
                    </>
                ) : null}

                {name === "split" ? (
                    <>
                        <path d="M50 0 C48.6 25.8 28.4 47.2 0 50 L50 50 Z" fill="#191919" />
                        <path d="M100 50 C71.6 52.8 51.4 74.2 50 100 L50 50 Z" fill="#191919" />
                    </>
                ) : null}

                {name === "fold" ? (
                    <>
                        <path d="M50 0 C47.2 27.8 27.8 48.2 0 50 L100 50 C72.2 48.2 52.8 27.8 50 0 Z" fill="#191919" />
                        <path d="M50 50 C47.2 72.2 27.8 96.5 0 100 L100 100 C72.2 96.5 52.8 72.2 50 50 Z" fill="#191919" />
                    </>
                ) : null}

                {name === "spark" ? (
                    <path
                        d="M50 4 C45.8 33.8 33.8 45.8 4 50 C33.8 54.2 45.8 66.2 50 96 C54.2 66.2 66.2 54.2 96 50 C66.2 45.8 54.2 33.8 50 4 Z"
                        fill="#191919"
                    />
                ) : null}
            </svg>
        </div>
    );
}
