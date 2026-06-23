"use client";

import React, { useEffect, useState } from "react";
import { motion, type MotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, CalendarDays, Check, CircleCheck, Clock3, Coins, Leaf, ListFilter, MapPin, PawPrint, ShieldCheck, ShoppingBag, Smartphone, Wrench } from "lucide-react";
import { StickyScrollTablet } from "@/components/ui/sticky-scroll-tablet";

type JobAccent = "amber" | "blue" | "violet";
type JobIcon = "tech" | "shopping" | "pets" | "assembly" | "garden";

type JobItem = {
    title: string;
    price: string;
    description: string;
    category: string;
    requester: string;
    distance: string;
    date: string;
    author: string;
    authorInitial: string;
    accent: JobAccent;
    icon: JobIcon;
};

const jobs: JobItem[] = [
    {
        title: "Hilfe bei der Einrichtung meines Handys",
        price: "20 EUR / Std.",
        description: "Neues iPhone einrichten, Apps übertragen und WLAN verbinden.",
        category: "IT-Hilfe",
        requester: "Privater Auftraggeber",
        distance: "0,8 km entfernt",
        date: "Diese Woche",
        author: "Lina Weber",
        authorInitial: "L",
        accent: "amber",
        icon: "tech",
    },
    {
        title: "Kleines Regal gemeinsam aufbauen",
        price: "19 EUR / Std.",
        description: "Werkzeug ist da, gebraucht wird eine zweite Hand und Ruhe.",
        category: "Montagehilfe",
        requester: "Privater Auftraggeber",
        distance: "1,7 km entfernt",
        date: "Nächste Woche",
        author: "Jan Berger",
        authorInitial: "J",
        accent: "blue",
        icon: "assembly",
    },
    {
        title: "Hundespaziergang nach der Schule",
        price: "14 EUR / Std.",
        description: "45 Minuten Spaziergang mit ruhigem Familienhund im Viertel.",
        category: "Tierbetreuung",
        requester: "Privater Auftraggeber",
        distance: "1,2 km entfernt",
        date: "Nach der Schule",
        author: "Nora Becker",
        authorInitial: "N",
        accent: "violet",
        icon: "pets",
    },
    {
        title: "Nachhilfe gesucht",
        price: "16.5 EUR / Std.",
        description: "Einmal pro Woche Mathematik und Englisch für zwei Stunden.",
        category: "Sonstiges",
        requester: "Privater Auftraggeber",
        distance: "5,2 km entfernt",
        date: "Freitag",
        author: "Max Mustermann",
        authorInitial: "M",
        accent: "amber",
        icon: "shopping",
    },
    {
        title: "Einkaufshilfe am Freitag",
        price: "16 EUR / Std.",
        description: "Wocheneinkauf begleiten und Taschen bis zur Haustür tragen.",
        category: "Alltagshilfe",
        requester: "Privater Auftraggeber",
        distance: "0,9 km entfernt",
        date: "Freitag",
        author: "Helga Mohr",
        authorInitial: "H",
        accent: "blue",
        icon: "shopping",
    },
    {
        title: "Laptop und Drucker verbinden",
        price: "18 EUR / Std.",
        description: "WLAN prüfen, Drucker koppeln und E-Mail am Laptop einrichten.",
        category: "Technik",
        requester: "Privater Auftraggeber",
        distance: "1,4 km entfernt",
        date: "Diese Woche",
        author: "Mira Klein",
        authorInitial: "M",
        accent: "violet",
        icon: "tech",
    },
    {
        title: "Hecke schneiden am Samstag",
        price: "17 EUR / Std.",
        description: "Hecke sauber schneiden und Grünschnitt ordentlich zusammenlegen.",
        category: "Gartenhilfe",
        requester: "Familie",
        distance: "2,1 km entfernt",
        date: "Samstag",
        author: "Familie Schmitt",
        authorInitial: "S",
        accent: "blue",
        icon: "garden",
    },
    {
        title: "Haustier füttern",
        price: "10 EUR / Std.",
        description: "Futter und Wasser auffüllen, kurz nach dem Rechten sehen.",
        category: "Sonstiges",
        requester: "Privater Auftraggeber",
        distance: "0,8 km entfernt",
        date: "Heute",
        author: "Max Mustermann",
        authorInitial: "M",
        accent: "violet",
        icon: "pets",
    },
];

const selectedJob = jobs[7];
const desktopFeedJobs = [selectedJob, ...jobs.filter((job) => job !== selectedJob)];

const CHIP_STYLES: Record<JobAccent, string> = {
    amber: "border-amber-300/24 bg-amber-300/[0.08] text-amber-100/92",
    blue: "border-blue-200/24 bg-blue-200/[0.09] text-blue-50/92",
    violet: "border-violet-300/22 bg-violet-300/[0.09] text-violet-100/92",
};

const ICONS = {
    tech: Smartphone,
    shopping: ShoppingBag,
    pets: PawPrint,
    assembly: Wrench,
    garden: Leaf,
} satisfies Record<JobIcon, typeof Smartphone>;

function useIsDesktopSequence() {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        const update = () => setIsDesktop(mediaQuery.matches);

        update();
        mediaQuery.addEventListener("change", update);

        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    return isDesktop;
}

function SurfaceChip({ job, dense = false }: { job: JobItem; dense?: boolean }) {
    const Icon = ICONS[job.icon];

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-[15px] border font-medium ${
                dense ? "px-2.5 py-1.5 text-[0.68rem]" : "px-3 py-1.5 text-[0.74rem]"
            } ${CHIP_STYLES[job.accent]}`}
        >
            <Icon className={dense ? "h-3 w-3" : "h-3.5 w-3.5"} />
            {job.category}
        </span>
    );
}

function FeedMetaRow({ job, compact = false, dense = false }: { job: JobItem; compact?: boolean; dense?: boolean }) {
    return (
        <div
            className={`flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-300 ${
                dense ? "text-[0.68rem] xl:text-[0.72rem]" : compact ? "text-[0.76rem]" : "text-[0.76rem] sm:text-[0.82rem]"
            }`}
        >
            <span className="inline-flex items-center gap-2 text-white">
                <Coins className="h-3.5 w-3.5 text-emerald-300" />
                <span className="font-semibold tracking-[-0.02em]">{job.price}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-indigo-300" />
                <span>{job.distance}</span>
            </span>
            <span className={`${dense ? "hidden 2xl:inline-flex" : compact ? "inline-flex" : "hidden md:inline-flex"} items-center gap-2 text-slate-400`}>
                <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
                <span>{job.date}</span>
            </span>
        </div>
    );
}

function DetailMetaRow({ job, compact = false }: { job: JobItem; compact?: boolean }) {
    return (
        <div
            className={`flex flex-wrap items-center gap-x-5 gap-y-3 text-slate-300 ${
                compact ? "text-[0.82rem]" : "text-[1rem]"
            }`}
        >
            <span className="inline-flex items-center gap-2.5 text-white">
                <Coins className="h-4 w-4 text-emerald-300" />
                <span className="font-semibold tracking-[-0.02em]">{job.price}</span>
            </span>
            <span className="inline-flex items-center gap-2.5 text-slate-200">
                <MapPin className="h-4 w-4 text-indigo-300" />
                <span>{job.distance}</span>
            </span>
            <span className="inline-flex items-center gap-2.5 text-slate-400">
                <CalendarDays className="h-4 w-4 text-slate-500" />
                <span>{job.date}</span>
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-500/70 sm:block" />
            <span className="inline-flex items-center gap-2.5 text-slate-300">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-300/14 bg-blue-400/[0.12] text-[0.74rem] font-semibold text-blue-100">
                    {job.authorInitial}
                </span>
                <span>{job.author}</span>
            </span>
        </div>
    );
}

function FeedJobCard({
    job,
    selected = false,
    compact = false,
    dense = false,
    showCategoryChip = true,
}: {
    job: JobItem;
    selected?: boolean;
    compact?: boolean;
    dense?: boolean;
    showCategoryChip?: boolean;
}) {
    return (
        <article
            data-feed-job-card
            className={`relative flex h-full min-h-0 flex-col overflow-hidden border bg-[linear-gradient(180deg,rgba(25,36,64,0.96),rgba(12,19,35,0.985))] shadow-[0_24px_72px_rgba(2,6,23,0.26)] ${
                selected
                    ? "border-[#b8cfff]/34"
                    : "border-white/10"
            } ${dense ? "rounded-[1.55rem] px-5 py-5" : compact ? "rounded-[1.65rem] px-5 py-5" : "rounded-[1.65rem] px-6 py-6 sm:px-7 sm:py-7"}`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(255,255,255,0.065),transparent_42%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.026),transparent)]" />

            <div className="relative flex flex-wrap items-center gap-x-3 gap-y-2">
                {showCategoryChip ? (
                    <SurfaceChip job={job} dense={dense} />
                ) : (
                    <span className="text-[0.78rem] font-medium text-slate-300 md:text-[0.84rem]">{job.category}</span>
                )}
                <span className={`${dense ? "hidden xl:block" : "hidden sm:block"} h-1 w-1 rounded-full bg-slate-500/90`} />
                <span className={`${dense ? "hidden xl:inline" : ""} text-[0.8rem] text-slate-400 md:text-[0.84rem]`}>{job.requester}</span>
            </div>

            <h3
                className={`relative mt-5 text-pretty break-words font-semibold leading-[1.02] tracking-[-0.045em] text-white ${
                    dense
                        ? "max-w-[18ch] text-[1.34rem] xl:text-[1.48rem]"
                        : compact
                          ? "max-w-[15ch] text-[1.35rem] md:text-[1.48rem]"
                          : "max-w-[15ch] text-[1.55rem] xl:text-[1.78rem]"
                }`}
            >
                {job.title}
            </h3>

            <p
                className={`relative mt-4 max-w-[32ch] leading-[1.58] text-slate-300 ${
                    dense
                        ? "line-clamp-2 text-[0.88rem] text-slate-300/76"
                        : compact
                          ? "line-clamp-2 text-[0.9rem] text-slate-300/82"
                          : "line-clamp-2 text-[0.94rem] sm:text-[0.98rem]"
                }`}
            >
                {job.description}
            </p>

            <div className={`relative mt-auto ${dense ? "pt-4" : "pt-6"}`}>
                <div className="h-px bg-white/8" />
                <div className={dense ? "pt-3" : "pt-4"}>
                    <FeedMetaRow job={job} compact={compact} dense={dense} />
                </div>
            </div>
        </article>
    );
}

function ApplyPanel({ compact = false }: { compact?: boolean }) {
    return (
        <div
            data-flow-step="apply"
            className={`relative overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(21,30,52,0.988),rgba(11,17,32,0.995))] shadow-[0_34px_90px_rgba(2,6,23,0.38)] ${
                compact ? "px-5 pb-5 pt-5" : "px-7 pb-7 pt-7 sm:px-8 sm:pb-8"
            }`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(118,150,214,0.14),transparent_42%)]" />
            <div className="relative">
                <div className="mx-auto h-1 w-14 rounded-full bg-white/10" />
                <h5 className={`${compact ? "mt-5 text-[1.55rem]" : "mt-5 text-[2rem]"} font-semibold tracking-[-0.035em] text-white`}>
                    Bewerbung schreiben
                </h5>
                <p className="mt-2 text-[0.98rem] leading-relaxed text-white/56">Für: {selectedJob.title}</p>

                <div className="mt-6 rounded-[1.45rem] border border-white/10 bg-black/26 px-5 py-5">
                    <p className={`${compact ? "text-[0.98rem]" : "text-[1.1rem]"} leading-[1.62] text-neutral-200`}>
                        Hallo, ich könnte am Freitag helfen und habe Erfahrung mit iPhones und WLAN-Einrichtung.
                    </p>
                </div>

                <div className="mt-6 flex flex-col gap-4 border-t border-white/8 pt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
                    <p className="hidden max-w-[15rem] text-[0.9rem] leading-relaxed text-white/42 sm:block">
                        Die Nachricht bleibt direkt in JobBridge nachvollziehbar.
                    </p>
                    <button
                        type="button"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-[1.15rem] bg-[#4767a4] px-6 py-3.5 text-[0.98rem] font-semibold text-white shadow-[0_18px_42px_rgba(53,88,143,0.28)] sm:min-w-[15rem] sm:w-auto"
                    >
                        Anfrage senden
                        <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function SuccessPanel({ compact = false, frameless = false }: { compact?: boolean; frameless?: boolean }) {
    return (
        <div
            data-flow-step="success"
            className={`relative flex h-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_22%,rgba(52,211,153,0.07),transparent_42%),#02040b] px-6 text-center ${
                frameless ? "" : "rounded-[2rem] border border-emerald-200/10"
            }`}
        >
            <div className={`${compact ? "h-24 w-24" : "h-28 w-28"} inline-flex items-center justify-center rounded-full bg-emerald-300/[0.06] shadow-[0_0_70px_rgba(110,231,183,0.08)]`}>
                <Check className={`${compact ? "h-11 w-11" : "h-14 w-14"} text-emerald-200`} strokeWidth={2.4} />
            </div>
            <p className={`${compact ? "mt-5 text-[1.45rem]" : "mt-6 text-[1.9rem]"} font-semibold tracking-[-0.035em] text-emerald-100`}>
                Anfrage gesendet
            </p>
            <p className="mt-3 max-w-[23rem] text-[0.98rem] leading-relaxed text-white/48">
                Der Auftraggeber kann jetzt direkt in JobBridge antworten.
            </p>
        </div>
    );
}

function DesktopFlow({
    progress,
    reducedMotion,
}: {
    progress: MotionValue<number>;
    reducedMotion: boolean;
}) {
    const detailOpacity = useTransform(progress, [0.24, 0.29, 0.48, 0.56], [0, 1, 1, 0]);
    const detailY = useTransform(progress, [0.24, 0.29, 0.48, 0.56], [10, 0, 0, -10]);
    const detailContentOpacity = useTransform(progress, [0.31, 0.39, 0.48, 0.56], [0, 1, 1, 0]);
    const detailContentY = useTransform(progress, [0.31, 0.39], [10, 0]);

    const applyOpacity = useTransform(progress, [0.48, 0.58, 0.68, 0.76], [0, 1, 1, 0]);
    const applyY = useTransform(progress, [0.48, 0.58, 0.68, 0.76], [26, 0, 0, -14]);
    const applyScale = useTransform(progress, [0.48, 0.58], [0.98, 1]);

    const successBackdropOpacity = useTransform(progress, [0.72, 0.82], [0, 1]);
    const successOpacity = useTransform(progress, [0.74, 0.84], [0, 1]);
    const successY = useTransform(progress, [0.74, 0.84], [24, 0]);
    const successScale = useTransform(progress, [0.74, 0.84], [0.94, 1]);

    return (
        <>
            <motion.article
                data-flow-step="detail"
                style={{
                    opacity: detailOpacity,
                    y: reducedMotion ? 0 : detailY,
                }}
                className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#05070d] shadow-[0_44px_130px_rgba(2,6,23,0.5)]"
            >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-[44%] bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.055)_1px,transparent_1px),radial-gradient(circle_at_82%_0%,rgba(99,102,241,0.15),transparent_42%)] bg-[size:46px_46px,46px_46px,auto]" />
                <motion.div
                    style={{
                        opacity: detailContentOpacity,
                        y: reducedMotion ? 0 : detailContentY,
                    }}
                    className="relative flex h-full flex-col"
                >
                    <div className="px-8 pb-7 pt-8 xl:px-10 xl:pb-8 xl:pt-9">
                        <div className="flex flex-wrap items-center gap-3">
                            <SurfaceChip job={selectedJob} dense />
                            <span className="h-1 w-1 rounded-full bg-slate-500/80" />
                            <span className="text-[0.9rem] text-slate-400">{selectedJob.requester}</span>
                        </div>

                        <h4 className="mt-5 max-w-[16ch] text-pretty text-[3.55rem] font-semibold leading-[0.94] tracking-[-0.06em] text-white xl:text-[4.45rem]">
                            {selectedJob.title}
                        </h4>

                        <p className="mt-4 max-w-[44rem] text-[1.08rem] leading-relaxed text-slate-300 xl:text-[1.16rem]">
                            {selectedJob.description}
                        </p>

                        <div className="mt-5">
                            <DetailMetaRow job={selectedJob} />
                        </div>
                    </div>

                    <div className="flex min-h-0 flex-1 flex-col border-t border-white/8 bg-black/22">
                        <div className="grid min-h-0 flex-1 grid-cols-2 gap-4 px-8 py-5 xl:px-10">
                            <div className="flex min-h-0 flex-col">
                                <div className="flex items-center gap-3 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    <ShieldCheck className="h-4 w-4 text-slate-500" />
                                    Sicherheit
                                </div>
                                <div className="relative mt-3 flex min-h-0 flex-1 items-center gap-6 overflow-hidden rounded-[1.25rem] border border-white/8 bg-[linear-gradient(135deg,rgba(13,22,38,0.98),rgba(7,12,22,0.98))] px-7 py-5">
                                    <ShieldCheck className="pointer-events-none absolute -bottom-11 -right-8 h-44 w-44 text-white/[0.025]" />
                                    <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-400/10 text-emerald-300 shadow-[0_0_44px_rgba(52,211,153,0.08)]">
                                        <Check className="h-8 w-8" />
                                    </span>
                                    <div className="relative">
                                        <p className="text-[1.35rem] font-semibold tracking-[-0.03em] text-white">Geprüfter Job</p>
                                        <p className="mt-2 max-w-[30rem] text-[0.98rem] leading-relaxed text-slate-400">
                                            Dieser Job wurde vom JobBridge-Team geprüft und freigegeben.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex min-h-0 flex-col">
                                <div className="flex items-center gap-3 text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-slate-400">
                                    <MapPin className="h-4 w-4 text-slate-500" />
                                    Standort
                                </div>
                                <div className="relative mt-3 min-h-0 flex-1 overflow-hidden rounded-[1.25rem] border border-white/8 bg-[#080d17]">
                                    <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.07)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60" />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.28),transparent_42%)]" />
                                    <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[7px] border-white bg-indigo-400 shadow-[0_0_38px_rgba(129,140,248,0.72)]" />
                                    <span className="absolute left-5 top-4 rounded-full bg-black/40 px-3 py-1.5 text-[0.78rem] font-medium text-white/72">
                                        Ungefähre Lage
                                    </span>
                                    <span className="absolute bottom-5 right-6 text-[2rem] font-semibold tracking-[-0.04em] text-white/14">
                                        {selectedJob.distance}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 border-t border-white/8 bg-[#0c1324] px-8 py-4 xl:px-10">
                            <div>
                                <p className="text-[1.12rem] text-slate-300">Interesse geweckt?</p>
                                <p className="mt-1 text-[0.9rem] text-slate-500">Die Bewerbung läuft direkt über JobBridge.</p>
                            </div>
                            <button
                                type="button"
                                className="inline-flex min-w-[18rem] items-center justify-center gap-3 rounded-full bg-[#2563eb] px-8 py-3.5 text-[1.1rem] font-semibold text-white shadow-[0_20px_52px_rgba(37,99,235,0.36)]"
                            >
                                Jetzt bewerben
                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.article>

            <motion.div
                style={{
                    opacity: applyOpacity,
                    y: reducedMotion ? 0 : applyY,
                    scale: reducedMotion ? 1 : applyScale,
                }}
                className="absolute inset-0 z-30 flex items-center justify-center p-8"
            >
                <div className="w-full max-w-[44rem]">
                    <ApplyPanel />
                </div>
            </motion.div>

            <motion.div
                style={{ opacity: successBackdropOpacity }}
                className="pointer-events-none absolute inset-0 z-30 bg-[#02040b]"
            />

            <motion.div
                style={{
                    opacity: successOpacity,
                    y: reducedMotion ? 0 : successY,
                    scale: reducedMotion ? 1 : successScale,
                }}
                className="pointer-events-none absolute inset-0 z-40"
            >
                <SuccessPanel frameless />
            </motion.div>
        </>
    );
}

function MobileLayer({
    children,
    opacity,
    y,
    scale,
    reducedMotion,
}: {
    children: React.ReactNode;
    opacity: MotionValue<number>;
    y: MotionValue<number>;
    scale?: MotionValue<number>;
    reducedMotion: boolean;
}) {
    return (
        <motion.div
            style={{
                opacity,
                y: reducedMotion ? 0 : y,
                scale: reducedMotion || !scale ? 1 : scale,
            }}
            className="absolute inset-0 flex items-center justify-center px-4 py-5"
        >
            {children}
        </motion.div>
    );
}

function JobClickCue({
    tapOpacity,
    tapScale,
    highlightOpacity,
    reducedMotion,
    roundedClass = "rounded-[1.65rem]",
}: {
    tapOpacity: MotionValue<number>;
    tapScale: MotionValue<number>;
    highlightOpacity: MotionValue<number>;
    reducedMotion: boolean;
    roundedClass?: string;
}) {
    return (
        <>
            <motion.div
                aria-hidden
                style={{ opacity: reducedMotion ? 0 : highlightOpacity }}
                className={`pointer-events-none absolute inset-0 ${roundedClass} border border-emerald-200/24 bg-emerald-300/[0.022] shadow-[0_0_42px_rgba(52,211,153,0.1)]`}
            />
            <motion.div
                aria-hidden
                style={{ opacity: reducedMotion ? 0 : tapOpacity, scale: reducedMotion ? 1 : tapScale }}
                className="pointer-events-none absolute right-6 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-100/30 bg-slate-950/72 shadow-[0_14px_34px_rgba(2,6,23,0.32)]"
            >
                <span className="absolute h-14 w-14 rounded-full border border-emerald-200/18" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-200 shadow-[0_0_16px_rgba(167,243,208,0.72)]" />
            </motion.div>
        </>
    );
}

function MobileJobStep({
    tapOpacity,
    tapScale,
    highlightOpacity,
    reducedMotion,
}: {
    tapOpacity: MotionValue<number>;
    tapScale: MotionValue<number>;
    highlightOpacity: MotionValue<number>;
    reducedMotion: boolean;
}) {
    return (
        <div data-flow-step="mobile-job" className="relative w-full">
            <FeedJobCard job={selectedJob} selected compact showCategoryChip={false} />
            <JobClickCue
                tapOpacity={tapOpacity}
                tapScale={tapScale}
                highlightOpacity={highlightOpacity}
                reducedMotion={reducedMotion}
            />
        </div>
    );
}

function MobileDetailStep() {
    return (
        <article
            data-flow-step="mobile-detail"
            className="relative w-full overflow-hidden rounded-[2rem] border border-white/12 bg-[#0f1730]/97 px-5 pb-5 pt-5 shadow-[0_28px_82px_rgba(2,6,23,0.36)]"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,rgba(151,172,209,0.14),transparent_44%)]" />
            <div className="relative">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-[0.78rem] font-medium text-slate-300">{selectedJob.category}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-500/70" />
                    <span className="text-[0.86rem] text-slate-400">{selectedJob.requester}</span>
                </div>
                <h4 className="mt-5 max-w-[12ch] text-pretty text-[2.05rem] font-semibold leading-[1.02] tracking-[-0.048em] text-white">
                    {selectedJob.title}
                </h4>
                <p className="mt-5 max-w-[31ch] text-[0.98rem] leading-[1.62] text-slate-300">
                    {selectedJob.description}
                </p>

                <div className="mt-6 border-t border-white/8 pt-5">
                    <DetailMetaRow job={selectedJob} compact />
                </div>

                <button
                    type="button"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[1.15rem] bg-[#4368a9] px-6 py-3.5 text-[0.96rem] font-semibold text-white shadow-[0_18px_44px_rgba(67,104,169,0.3)]"
                >
                    Bewerben
                    <ArrowRight className="h-4 w-4" />
                </button>
            </div>
        </article>
    );
}

function MobileApplyStep() {
    return (
        <div className="w-full">
            <ApplyPanel compact />
        </div>
    );
}

function MobileSuccessStep() {
    return (
        <div className="h-full w-full py-2">
            <SuccessPanel compact />
        </div>
    );
}

function MobilePlatformSequence({
    progress,
    reducedMotion,
}: {
    progress: MotionValue<number>;
    reducedMotion: boolean;
}) {
    const jobOpacity = useTransform(progress, [0, 0.28, 0.38], [1, 1, 0]);
    const jobY = useTransform(progress, [0.28, 0.38], [0, -26]);
    const jobScale = useTransform(progress, [0.28, 0.38], [1, 0.98]);
    const jobTapOpacity = useTransform(progress, [0.15, 0.21, 0.31, 0.37], [0, 0.82, 0.82, 0]);
    const jobTapScale = useTransform(progress, [0.15, 0.21, 0.31, 0.37], [0.94, 1, 1.02, 0.98]);
    const jobHighlightOpacity = useTransform(progress, [0.15, 0.21, 0.31, 0.37], [0, 0.46, 0.34, 0]);

    const detailOpacity = useTransform(progress, [0.34, 0.44, 0.56, 0.64], [0, 1, 1, 0]);
    const detailY = useTransform(progress, [0.34, 0.44, 0.56, 0.64], [28, 0, 0, -18]);
    const detailScale = useTransform(progress, [0.34, 0.44, 0.56, 0.64], [0.98, 1, 1, 0.985]);

    const applyOpacity = useTransform(progress, [0.6, 0.68, 0.74, 0.82], [0, 1, 1, 0]);
    const applyY = useTransform(progress, [0.6, 0.68, 0.74, 0.82], [28, 0, 0, -12]);
    const applyScale = useTransform(progress, [0.6, 0.68], [0.98, 1]);

    const successOpacity = useTransform(progress, [0.8, 0.9], [0, 1]);
    const successY = useTransform(progress, [0.8, 0.9], [26, 0]);
    const successScale = useTransform(progress, [0.8, 0.9], [0.95, 1]);

    return (
        <div data-platform-mobile-sequence className="relative h-full overflow-hidden">
            <MobileLayer opacity={jobOpacity} y={jobY} scale={jobScale} reducedMotion={reducedMotion}>
                <MobileJobStep
                    tapOpacity={jobTapOpacity}
                    tapScale={jobTapScale}
                    highlightOpacity={jobHighlightOpacity}
                    reducedMotion={reducedMotion}
                />
            </MobileLayer>
            <MobileLayer opacity={detailOpacity} y={detailY} scale={detailScale} reducedMotion={reducedMotion}>
                <MobileDetailStep />
            </MobileLayer>
            <MobileLayer opacity={applyOpacity} y={applyY} scale={applyScale} reducedMotion={reducedMotion}>
                <MobileApplyStep />
            </MobileLayer>
            <MobileLayer opacity={successOpacity} y={successY} scale={successScale} reducedMotion={reducedMotion}>
                <MobileSuccessStep />
            </MobileLayer>
        </div>
    );
}

function DesktopPlatformSequence({
    progress,
    reducedMotion,
}: {
    progress: MotionValue<number>;
    reducedMotion: boolean;
}) {
    const feedOpacity = useTransform(progress, [0, 0.18, 0.28, 0.36], [1, 1, 0.42, 0]);
    const selectedFeedOpacity = useTransform(progress, [0.22, 0.32], [1, 0]);
    const feedScale = useTransform(progress, [0.18, 0.36], [1, 0.996]);
    const feedY = useTransform(progress, [0.18, 0.36], [0, -4]);
    const stageBackdropOpacity = useTransform(progress, [0.32, 0.44, 0.72, 0.84], [0, 0.22, 0.5, 0.72]);
    const jobTapOpacity = useTransform(progress, [0.16, 0.22, 0.3, 0.36], [0, 0.78, 0.78, 0]);
    const jobTapScale = useTransform(progress, [0.16, 0.22, 0.3, 0.36], [0.95, 1, 1.02, 0.98]);
    const jobHighlightOpacity = useTransform(progress, [0.16, 0.22, 0.32, 0.38], [0, 0.42, 0.3, 0]);
    const feedCardOpacity = [1, 0.68, 0.58, 0.38, 0.27, 0.16, 0.1, 0.05];

    return (
        <div data-platform-desktop-sequence className="relative h-full overflow-hidden px-5 py-5 md:px-7 md:py-6">
            <motion.div
                style={{
                    opacity: feedOpacity,
                    scale: reducedMotion ? 1 : feedScale,
                    y: reducedMotion ? 0 : feedY,
                }}
                className="absolute inset-0"
            >
                <div className="relative h-full px-7 pb-8 pt-7">
                    <div className="max-w-[55rem]">
                        <h3 className="text-[2.25rem] font-semibold leading-none tracking-[-0.045em] text-white xl:text-[2.55rem]">
                            Finde deinen Job
                        </h3>
                        <p className="mt-3 text-[1rem] leading-relaxed text-slate-400 xl:text-[1.08rem]">
                            Hier findest du aktuelle Taschengeldjobs in deiner Nähe.
                        </p>
                    </div>

                    <div className="mt-7 flex items-center justify-between border-b border-white/8 pb-5">
                        <div className="flex items-center gap-5 text-[0.92rem] font-medium text-slate-400 xl:gap-8 xl:text-[1rem]">
                            <div className="inline-flex items-center gap-3 rounded-[1rem] border border-indigo-300/18 bg-indigo-300/[0.075] px-4 py-3 text-white">
                                <BriefcaseBusiness className="h-4 w-4 text-indigo-300" />
                                <span>Aktuell</span>
                                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[0.78rem] text-slate-300">8</span>
                            </div>
                            <div className="inline-flex items-center gap-3">
                                <Clock3 className="h-4 w-4 text-slate-500" />
                                <span>Warteliste</span>
                                <span className="rounded-full bg-white/8 px-2 py-0.5 text-[0.78rem] text-slate-400">5</span>
                            </div>
                            <div className="hidden items-center gap-3 xl:inline-flex">
                                <CircleCheck className="h-4 w-4 text-slate-500" />
                                <span>Beworben</span>
                                <span className="rounded-full bg-white/8 px-2 py-0.5 text-[0.78rem] text-slate-400">1</span>
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-3 text-[0.96rem] font-medium text-slate-400">
                            <ListFilter className="h-4 w-4 text-slate-500" />
                            <span>Filter</span>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center gap-5">
                        <h4 className="text-[1.72rem] font-semibold tracking-[-0.04em] text-white">Lokale Angebote</h4>
                        <span className="rounded-full border border-white/8 bg-white/[0.045] px-3 py-1 text-[0.9rem] text-slate-400">
                            {desktopFeedJobs.length}
                        </span>
                        <div className="h-px flex-1 bg-white/8" />
                    </div>

                    <div
                        className="mt-6 h-[calc(100%-18.5rem)] overflow-hidden"
                        style={{
                            WebkitMaskImage:
                                "linear-gradient(132deg, black 0%, black 42%, rgba(0,0,0,0.72) 60%, rgba(0,0,0,0.22) 82%, transparent 100%)",
                            maskImage:
                                "linear-gradient(132deg, black 0%, black 42%, rgba(0,0,0,0.72) 60%, rgba(0,0,0,0.22) 82%, transparent 100%)",
                        }}
                    >
                        <div className="grid grid-cols-2 gap-5 pr-[6%] pb-16">
                            {desktopFeedJobs.map((job, index) => (
                                <motion.div
                                    key={job.title}
                                    style={{
                                        opacity: index === 0 ? selectedFeedOpacity : feedCardOpacity[index] ?? 0.05,
                                    }}
                                    className="relative min-h-[15rem]"
                                >
                                    <FeedJobCard job={job} selected={index === 0} dense />
                                    {index === 0 ? (
                                        <JobClickCue
                                            tapOpacity={jobTapOpacity}
                                            tapScale={jobTapScale}
                                            highlightOpacity={jobHighlightOpacity}
                                            reducedMotion={reducedMotion}
                                            roundedClass="rounded-[1.6rem]"
                                        />
                                    ) : null}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                style={{ opacity: stageBackdropOpacity }}
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(3,8,23,0.12),rgba(2,4,11,0.78)_74%)]"
            />

            <DesktopFlow progress={progress} reducedMotion={reducedMotion} />
        </div>
    );
}

export function HeroScrollDemo() {
    return (
        <div className="relative bg-[#02040b]">
            <StickyScrollTablet titleComponent={null}>
                {(scrollYProgress) => <PlatformSequence scrollYProgress={scrollYProgress} />}
            </StickyScrollTablet>
        </div>
    );
}

function PlatformSequence({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const reduceMotion = useReducedMotion() ?? false;
    const isDesktop = useIsDesktopSequence();

    return isDesktop ? (
        <DesktopPlatformSequence progress={scrollYProgress} reducedMotion={reduceMotion} />
    ) : (
        <MobilePlatformSequence progress={scrollYProgress} reducedMotion={reduceMotion} />
    );
}
