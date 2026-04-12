"use client";

import React from "react";
import { motion, type MotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import {
    ArrowRight,
    CalendarDays,
    Coins,
    MapPin,
    PawPrint,
    ShoppingBag,
    Smartphone,
    Wrench,
} from "lucide-react";
import { StickyScrollTablet } from "@/components/ui/sticky-scroll-tablet";

type JobAccent = "amber" | "blue" | "violet";
type JobIcon = "tech" | "shopping" | "pets" | "assembly";

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
        date: "25.3.2026",
        author: "Rezan Yalcin",
        authorInitial: "R",
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
        date: "31.3.2026",
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
        date: "30.3.2026",
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
        date: "22.2.2026",
        author: "Max Mustermann",
        authorInitial: "M",
        accent: "amber",
        icon: "shopping",
    },
];

const selectedJob = jobs[0];

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
} satisfies Record<JobIcon, typeof Smartphone>;

function SurfaceChip({ job }: { job: JobItem }) {
    const Icon = ICONS[job.icon];

    return (
        <span
            className={`inline-flex items-center gap-2 rounded-[15px] border px-3 py-1.5 text-[0.74rem] font-medium ${CHIP_STYLES[job.accent]}`}
        >
            <Icon className="h-3.5 w-3.5" />
            {job.category}
        </span>
    );
}

function FeedMetaRow({ job }: { job: JobItem }) {
    return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.76rem] text-slate-300 sm:text-[0.82rem]">
            <span className="inline-flex items-center gap-2 text-white">
                <Coins className="h-3.5 w-3.5 text-emerald-300" />
                <span className="font-semibold tracking-[-0.02em]">{job.price}</span>
            </span>
            <span className="inline-flex items-center gap-2 text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-indigo-300" />
                <span>{job.distance}</span>
            </span>
            <span className="hidden items-center gap-2 text-slate-400 md:inline-flex">
                <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
                <span>{job.date}</span>
            </span>
        </div>
    );
}

function DetailMetaRow({ job }: { job: JobItem }) {
    return (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[0.92rem] text-slate-300">
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
    progress,
    index,
    selected = false,
}: {
    job: JobItem;
    progress: MotionValue<number>;
    index: number;
    selected?: boolean;
}) {
    const start = 0.08 + index * 0.035;
    const end = 0.18 + index * 0.035;
    const fadeOutStart = selected ? 0.36 : 0.39;
    const fadeOutEnd = selected ? 0.43 : 0.47;
    const opacity = useTransform(progress, [start, end, fadeOutStart, fadeOutEnd], [0, 1, 1, 0]);
    const y = useTransform(progress, [start, end], [34, 0]);
    const scale = useTransform(progress, [start, end], [0.95, 1]);
    const borderOpacity = useTransform(progress, [0.22, 0.32], selected ? [0.26, 1] : [0, 0]);

    return (
        <motion.article
            style={{ opacity, y, scale }}
            className="relative h-full min-h-0 overflow-hidden rounded-[2.15rem] border border-white/10 bg-[linear-gradient(180deg,rgba(25,36,64,0.97),rgba(13,20,37,0.98))] shadow-[0_28px_88px_rgba(2,6,23,0.32)]"
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(255,255,255,0.06),transparent_44%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(255,255,255,0.024),transparent)]" />
            {selected ? (
                <motion.div
                    style={{ opacity: borderOpacity }}
                    className="pointer-events-none absolute inset-0 rounded-[2.08rem] border border-[#a8c1ef]/34"
                />
            ) : null}

            <div className="relative flex h-full flex-col px-6 py-6 sm:px-7 sm:py-7">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <SurfaceChip job={job} />
                    <span className="hidden h-1 w-1 rounded-full bg-slate-500/90 sm:block" />
                    <span className="text-[0.86rem] text-slate-400">{job.requester}</span>
                </div>

                <h3 className="mt-5 min-h-[5.9rem] max-w-[12ch] text-pretty text-[1.56rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:min-h-[6.2rem] sm:text-[1.7rem]">
                    {job.title}
                </h3>

                <p className="mt-4 line-clamp-2 max-w-[31ch] text-[0.92rem] leading-[1.58] text-slate-300 sm:text-[0.96rem]">
                    {job.description}
                </p>

                <div className="mt-auto pt-6">
                    <div className="h-px bg-white/8" />
                    <div className="pt-4.5">
                        <FeedMetaRow job={job} />
                    </div>
                </div>
            </div>
        </motion.article>
    );
}

function SceneCursor({
    progress,
    reducedMotion,
}: {
    progress: MotionValue<number>;
    reducedMotion: boolean;
}) {
    const opacity = useTransform(progress, [0.18, 0.22, 0.34, 0.41], [0, 1, 1, 0]);
    const left = useTransform(progress, [0.18, 0.29, 0.33, 0.41], ["76%", "26.4%", "26.4%", "29.6%"]);
    const top = useTransform(progress, [0.18, 0.29, 0.33, 0.41], ["76%", "43.2%", "43.2%", "47.8%"]);
    const scale = useTransform(progress, [0.31, 0.33, 0.36], [1, 0.9, 1]);
    const clickOpacity = useTransform(progress, [0.31, 0.33, 0.36], [0, 0.42, 0]);
    const clickScale = useTransform(progress, [0.31, 0.33, 0.36], [0.72, 1.08, 1.44]);
    const clickCoreScale = useTransform(progress, [0.31, 0.33, 0.36], [0.55, 1, 0.44]);
    const clickCoreOpacity = useTransform(progress, [0.31, 0.33, 0.36], [0, 0.96, 0]);

    if (reducedMotion) return null;

    return (
        <motion.div style={{ opacity, left, top, scale }} className="pointer-events-none absolute left-0 top-0 z-50">
            <motion.span
                style={{ opacity: clickOpacity, scale: clickScale }}
                className="absolute left-0 top-0 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 bg-white/8"
            />
            <motion.span
                style={{ opacity: clickCoreOpacity, scale: clickCoreScale }}
                className="absolute left-0 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/92 shadow-[0_0_14px_rgba(255,255,255,0.32)]"
            />
            <div className="absolute left-0 top-0 h-10 w-8 -translate-x-[5px] -translate-y-[6px] drop-shadow-[0_8px_18px_rgba(2,6,23,0.46)] sm:h-11 sm:w-9">
                <svg viewBox="0 0 38 46" fill="none" className="h-full w-full" aria-hidden>
                    <path
                        d="M7.4 3.6L29.4 25.2L18.6 26.4L23.1 40.9C23.7 42.8 22.6 44.6 20.8 45.1L18.7 45.8C16.8 46.4 14.9 45.3 14.4 43.5L9.8 28.9L1.7 36.1L0.3 5.4C0.2 3.7 1.9 2.4 3.5 3L7.4 3.6Z"
                        fill="white"
                    />
                    <path
                        d="M7.4 3.6L29.4 25.2L18.6 26.4L23.1 40.9C23.7 42.8 22.6 44.6 20.8 45.1L18.7 45.8C16.8 46.4 14.9 45.3 14.4 43.5L9.8 28.9L1.7 36.1L0.3 5.4C0.2 3.7 1.9 2.4 3.5 3L7.4 3.6Z"
                        stroke="rgba(2,6,23,0.74)"
                        strokeWidth="1.5"
                    />
                </svg>
            </div>
        </motion.div>
    );
}

function FlowCard({
    progress,
    reducedMotion,
}: {
    progress: MotionValue<number>;
    reducedMotion: boolean;
}) {
    const cardOpacity = useTransform(progress, [0.36, 0.5, 0.62, 0.7], [0, 1, 1, 0]);
    const cardScale = useTransform(progress, [0.36, 0.5, 0.62, 0.7], [0.985, 1, 1, 0.97]);
    const cardY = useTransform(progress, [0.36, 0.5, 0.62, 0.7], [28, 0, 0, -18]);

    const detailOpacity = useTransform(progress, [0.48, 0.62, 0.72], [1, 1, 0.08]);
    const detailY = useTransform(progress, [0.62, 0.74], [0, -26]);
    const detailBlur = useTransform(progress, [0.64, 0.74], ["blur(0px)", "blur(10px)"]);
    const detailHeaderOpacity = useTransform(progress, [0.47, 0.56], [0, 1]);
    const detailHeaderY = useTransform(progress, [0.47, 0.56], [18, 0]);
    const detailMetaOpacity = useTransform(progress, [0.52, 0.62], [0, 1]);
    const detailMetaY = useTransform(progress, [0.52, 0.62], [18, 0]);
    const detailButtonPressScale = useTransform(progress, [0.58, 0.61, 0.64], [1, 0.952, 1]);
    const detailButtonPressOpacity = useTransform(progress, [0.58, 0.61, 0.64], [1, 0.92, 1]);
    const detailButtonFocusOpacity = useTransform(progress, [0.54, 0.58, 0.62], [0, 0.22, 0]);
    const applyFocusOpacity = useTransform(progress, [0.6, 0.7, 0.92], [0, 0.82, 0.9]);

    const sheetOpacity = useTransform(progress, [0.62, 0.7, 0.92], [0, 1, 1]);
    const sheetY = useTransform(progress, [0.62, 0.7], [52, 0]);
    const sheetScale = useTransform(progress, [0.62, 0.67, 0.7], [0.9, 1.018, 1]);
    const sheetBlur = useTransform(progress, [0.62, 0.7], ["blur(10px)", "blur(0px)"]);
    const sheetRotateX = useTransform(progress, [0.62, 0.7], [16, 0]);
    const sheetClipPath = useTransform(
        progress,
        [0.62, 0.7],
        ["inset(22% 10% 0% 10% round 2.1rem)", "inset(0% 0% 0% 0% round 2.1rem)"]
    );
    const sheetShadowScale = useTransform(progress, [0.62, 0.68, 0.74], [0.88, 1.06, 1]);
    const sheetShadowOpacity = useTransform(progress, [0.62, 0.68, 0.74], [0.12, 0.28, 0.2]);
    const lineOneOpacity = useTransform(progress, [0.71, 0.76], [0, 1]);
    const lineTwoOpacity = useTransform(progress, [0.75, 0.8], [0, 1]);
    const lineThreeOpacity = useTransform(progress, [0.79, 0.84], [0, 1]);
    const lineOneY = useTransform(progress, [0.71, 0.76], [18, 0]);
    const lineTwoY = useTransform(progress, [0.75, 0.8], [18, 0]);
    const lineThreeY = useTransform(progress, [0.79, 0.84], [18, 0]);
    const lineOneBlur = useTransform(progress, [0.71, 0.76], ["blur(10px)", "blur(0px)"]);
    const lineTwoBlur = useTransform(progress, [0.75, 0.8], ["blur(10px)", "blur(0px)"]);
    const lineThreeBlur = useTransform(progress, [0.79, 0.84], ["blur(10px)", "blur(0px)"]);
    const sendButtonOpacity = useTransform(progress, [0.82, 0.86], [0, 1]);
    const sendButtonPressScale = useTransform(progress, [0.9, 0.93, 0.965], [1, 0.968, 1]);
    const sendButtonPressOpacity = useTransform(progress, [0.9, 0.93, 0.965], [1, 0.9, 1]);
    const sendButtonSheenX = useTransform(progress, [0.84, 0.92], ["-120%", "165%"]);
    const sendLoadingOpacity = useTransform(progress, [0.91, 0.97], [0, 1]);
    const sendLoadingScaleX = useTransform(progress, [0.915, 0.975], [0.08, 1]);

    const successBackdropOpacity = useTransform(progress, [0.86, 0.9], [0, 1]);
    const successOpacity = useTransform(progress, [0.9, 0.935], [0, 1]);
    const successScale = useTransform(progress, [0.9, 0.935], [0.9, 1]);
    const successTextY = useTransform(progress, [0.9, 0.935], [24, 0]);
    const checkPathLength = useTransform(progress, [0.92, 0.975], [0, 1]);

    return (
        <>
            <motion.article
                style={{
                    opacity: cardOpacity,
                    scale: cardScale,
                    y: reducedMotion ? 0 : cardY,
                }}
                className="pointer-events-none absolute inset-[5.3%_2.8%_4.8%] z-20 overflow-hidden rounded-[2.45rem] border border-white/12 bg-[#0f1730]/97 shadow-[0_44px_130px_rgba(2,6,23,0.48)]"
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_0%,rgba(151,172,209,0.18),transparent_44%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_40%)]" />

                <motion.div
                    style={{
                        opacity: detailOpacity,
                        y: reducedMotion ? 0 : detailY,
                        filter: reducedMotion ? "none" : detailBlur,
                    }}
                    className="absolute inset-0"
                >
                    <div className="relative flex h-full flex-col px-6 pb-6 pt-7 sm:px-7 sm:pb-7 sm:pt-8">
                        <motion.div
                            style={{ opacity: detailHeaderOpacity, y: reducedMotion ? 0 : detailHeaderY }}
                            className="flex-1"
                        >
                            <div className="flex items-center gap-3">
                                <SurfaceChip job={selectedJob} />
                                <span className="hidden h-1 w-1 rounded-full bg-slate-500/90 sm:block" />
                                <span className="text-[0.95rem] text-slate-400 sm:text-[1rem]">{selectedJob.requester}</span>
                            </div>

                            <h4 className="mt-5 max-w-[13ch] text-pretty text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.048em] text-white md:text-[2.9rem]">
                                {selectedJob.title}
                            </h4>
                            <p className="mt-5 max-w-[34ch] text-[1.08rem] leading-[1.62] text-slate-300 md:text-[1.14rem]">
                                {selectedJob.description}
                            </p>
                        </motion.div>

                        <motion.div
                            style={{ opacity: detailMetaOpacity, y: reducedMotion ? 0 : detailMetaY }}
                            className="mt-auto"
                        >
                            <div className="mt-7">
                                <div className="h-px bg-white/8" />
                                <div className="pt-5">
                                    <DetailMetaRow job={selectedJob} />
                                </div>
                            </div>

                            <div className="mt-6 flex items-end justify-between gap-5 border-t border-white/8 pt-6">
                                <div className="hidden max-w-[24rem] text-[0.95rem] leading-relaxed text-white/48 sm:block">
                                    Antwort und Rückfragen bleiben direkt in JobBridge.
                                </div>
                                <div className="relative overflow-hidden rounded-[1.15rem]">
                                    <motion.div
                                        style={{ opacity: detailButtonFocusOpacity }}
                                        className="pointer-events-none absolute inset-0 rounded-[1.15rem] bg-white/10"
                                    />
                                    <motion.button
                                        type="button"
                                        style={{ scale: detailButtonPressScale, opacity: detailButtonPressOpacity }}
                                        className="inline-flex items-center gap-2 rounded-[1.15rem] bg-[#4368a9] px-6 py-3.5 text-[0.96rem] font-semibold text-white shadow-[0_18px_44px_rgba(67,104,169,0.3)]"
                                    >
                                        Bewerben
                                        <ArrowRight className="h-4 w-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </motion.article>

            <motion.div
                style={{ opacity: applyFocusOpacity }}
                className="pointer-events-none absolute inset-0 z-24 bg-[radial-gradient(circle_at_50%_58%,rgba(5,9,18,0.1),rgba(2,4,11,0.94)_68%)]"
            />

            <motion.div
                style={{
                    opacity: sheetOpacity,
                    y: reducedMotion ? 0 : sheetY,
                    scale: sheetScale,
                    filter: reducedMotion ? "none" : sheetBlur,
                    rotateX: reducedMotion ? 0 : sheetRotateX,
                    clipPath: reducedMotion ? "inset(0% 0% 0% 0% round 2.1rem)" : sheetClipPath,
                }}
                className="absolute inset-0 z-30 flex items-center justify-center p-7 sm:p-8"
            >
                <div className="relative flex w-full max-w-[44rem] flex-col overflow-hidden rounded-[2.1rem] border border-white/12 bg-[linear-gradient(180deg,rgba(21,30,52,0.988),rgba(11,17,32,0.995))] px-7 pb-7 pt-7 shadow-[0_34px_90px_rgba(2,6,23,0.42)] sm:px-8 sm:pb-8">
                    <motion.div
                        style={{ opacity: sheetShadowOpacity, scale: sheetShadowScale }}
                        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(118,150,214,0.18),transparent_42%)]"
                    />
                    <div className="mx-auto h-1 w-14 rounded-full bg-white/10" />
                    <h5 className="mt-5 text-[1.65rem] font-semibold tracking-[-0.035em] text-white sm:text-[2rem]">
                        Bewerbung schreiben
                    </h5>
                    <p className="mt-2 text-[1rem] leading-relaxed text-white/56">Für: {selectedJob.title}</p>

                    <div className="mt-6 rounded-[1.45rem] border border-white/10 bg-black/26 px-5 py-5 sm:px-6 sm:py-6">
                        <div className="space-y-2.5 text-[1.08rem] leading-[1.62] text-neutral-200 sm:text-[1.12rem]">
                            <motion.div
                                style={{
                                    opacity: lineOneOpacity,
                                    y: reducedMotion ? 0 : lineOneY,
                                    filter: reducedMotion ? "none" : lineOneBlur,
                                }}
                            >
                                Hallo, ich könnte am Freitag helfen
                            </motion.div>
                            <motion.div
                                style={{
                                    opacity: lineTwoOpacity,
                                    y: reducedMotion ? 0 : lineTwoY,
                                    filter: reducedMotion ? "none" : lineTwoBlur,
                                }}
                            >
                                und habe Erfahrung mit iPhones
                            </motion.div>
                            <motion.div
                                style={{
                                    opacity: lineThreeOpacity,
                                    y: reducedMotion ? 0 : lineThreeY,
                                    filter: reducedMotion ? "none" : lineThreeBlur,
                                }}
                            >
                                und WLAN-Einrichtung.
                            </motion.div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4 border-t border-white/8 pt-5 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
                        <p className="hidden max-w-[15rem] text-[0.9rem] leading-relaxed text-white/42 sm:block">
                            Deine Nachricht wird direkt an den Auftraggeber in JobBridge gesendet.
                        </p>
                        <motion.div
                            style={{ opacity: sendButtonOpacity }}
                            className="relative w-full shrink-0 overflow-hidden rounded-[1.15rem] sm:w-auto"
                        >
                            <motion.span
                                style={{ x: sendButtonSheenX }}
                                className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]"
                            />
                            <motion.button
                                type="button"
                                style={{ scale: sendButtonPressScale, opacity: sendButtonPressOpacity }}
                                className="inline-flex w-full items-center justify-center gap-2 rounded-[1.15rem] bg-[#4767a4] px-6 py-3.5 text-[0.98rem] font-semibold text-white shadow-[0_18px_42px_rgba(53,88,143,0.28)] sm:min-w-[15rem] sm:w-auto"
                            >
                                Anfrage senden
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                            <motion.span
                                style={{
                                    opacity: sendLoadingOpacity,
                                    scaleX: sendLoadingScaleX,
                                    transformOrigin: "left",
                                }}
                                className="pointer-events-none absolute inset-x-7 bottom-2 h-px bg-[linear-gradient(90deg,rgba(255,255,255,0.1),rgba(255,255,255,0.76),rgba(255,255,255,0.1))]"
                            />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                style={{ opacity: successBackdropOpacity }}
                className="pointer-events-none absolute inset-0 z-30 bg-[#02040b]"
            />

            <motion.div
                style={{
                    opacity: successOpacity,
                    scale: successScale,
                    y: reducedMotion ? 0 : successTextY,
                }}
                className="pointer-events-none absolute inset-0 z-40 flex flex-col items-center justify-center text-center"
            >
                <div className="inline-flex h-28 w-28 items-center justify-center rounded-full bg-emerald-300/[0.06] shadow-[0_0_70px_rgba(110,231,183,0.08)]">
                    <motion.svg viewBox="0 0 96 96" className="h-[4.6rem] w-[4.6rem]" fill="none" aria-hidden>
                        <motion.circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="rgba(134,239,172,0.38)"
                            strokeWidth="3.5"
                            style={{ pathLength: checkPathLength, opacity: checkPathLength }}
                        />
                        <motion.path
                            d="M30 50 L42 62 L67 36"
                            stroke="#86efac"
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ pathLength: checkPathLength }}
                        />
                    </motion.svg>
                </div>
                <p className="mt-6 text-[1.55rem] font-semibold tracking-[-0.035em] text-emerald-100 md:text-[1.9rem]">
                    Anfrage gesendet
                </p>
            </motion.div>
        </>
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
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        mass: 0.42,
        restDelta: 0.001,
    });

    const feedOpacity = useTransform(smoothProgress, [0, 0.4, 0.5, 1], [1, 1, 0, 0]);
    const feedScale = useTransform(smoothProgress, [0.34, 0.5], [1, 0.985]);
    const feedY = useTransform(smoothProgress, [0.24, 0.46], [0, -10]);
    const selectedCardOpacity = useTransform(smoothProgress, [0.18, 0.3, 0.42], [0.74, 1, 0.82]);
    const cardPressScale = useTransform(smoothProgress, [0.31, 0.33, 0.36], [1, 0.972, 1]);
    const stageBackdropOpacity = useTransform(smoothProgress, [0.38, 0.5, 0.88, 1], [0, 0.56, 0.7, 0.72]);

    return (
        <div className="relative h-full overflow-hidden px-4 py-4 sm:px-6 md:px-8 md:py-6">
            <motion.div
                style={{
                    opacity: feedOpacity,
                    scale: feedScale,
                    y: reduceMotion ? 0 : feedY,
                }}
                className="absolute inset-0"
            >
                <div className="flex h-full flex-col px-2 pb-5 pt-4 sm:px-3 md:px-5 md:pb-7 md:pt-6">
                    <div className="px-0.5">
                        <h3 className="text-[2.05rem] font-semibold tracking-[-0.04em] text-white md:text-[2.35rem]">
                            Finde deinen Job
                        </h3>
                        <p className="mt-2 text-[0.98rem] leading-relaxed text-white/48 md:text-[1.04rem]">
                            Aktuelle Taschengeldjobs in deiner Nähe.
                        </p>
                        <div className="mt-6 h-px bg-white/8" />
                    </div>

                    <div className="mt-12 grid flex-1 grid-cols-1 grid-rows-2 gap-5 sm:grid-cols-2 sm:grid-rows-2 md:mt-14 md:gap-6">
                        {jobs.map((job, index) => (
                            <motion.div
                                key={job.title}
                                style={index === 0 ? { scale: cardPressScale, opacity: selectedCardOpacity } : undefined}
                                className={index > 1 ? "hidden sm:block" : ""}
                            >
                                <FeedJobCard job={job} progress={smoothProgress} index={index} selected={index === 0} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <SceneCursor progress={smoothProgress} reducedMotion={reduceMotion} />

            <motion.div
                style={{ opacity: stageBackdropOpacity }}
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(3,8,23,0.12),rgba(2,4,11,0.82)_74%)] backdrop-blur-[8px]"
            />

            <FlowCard progress={smoothProgress} reducedMotion={reduceMotion} />
        </div>
    );
}
