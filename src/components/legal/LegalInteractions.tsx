"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";

type LegalNavItem = {
    id: string;
    label: string;
};

const headingHighlightClass = "legal-heading-highlight";
const legalHighlightEventName = "jobbridge:legal-section-highlight";
let activeScrollFrame: number | null = null;

function easeOutCubic(progress: number) {
    return 1 - Math.pow(1 - progress, 3);
}

function scrollToSection(section: HTMLElement, reducedMotion: boolean) {
    const scrollMargin = 96;
    const targetY = Math.max(0, window.scrollY + section.getBoundingClientRect().top - scrollMargin);

    if (reducedMotion) {
        window.scrollTo({ left: 0, top: targetY, behavior: "auto" });
        return;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = Math.min(950, Math.max(520, Math.abs(distance) * 0.45));
    const startTime = window.performance.now();

    if (activeScrollFrame) {
        window.cancelAnimationFrame(activeScrollFrame);
    }

    const animate = (time: number) => {
        const progress = Math.min(1, (time - startTime) / duration);
        window.scrollTo(0, startY + distance * easeOutCubic(progress));

        if (progress < 1) {
            activeScrollFrame = window.requestAnimationFrame(animate);
            return;
        }

        activeScrollFrame = null;
    };

    activeScrollFrame = window.requestAnimationFrame(animate);
}

export function LegalBackButton() {
    const router = useRouter();

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back();
            return;
        }

        router.push("/");
    };

    return (
        <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-sm font-medium text-slate-300 shadow-[0_16px_44px_rgba(2,6,23,0.28)] backdrop-blur transition hover:border-blue-200/25 hover:bg-blue-400/[0.07] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200/70"
        >
            <ArrowLeft className="h-4 w-4" />
            Zurück
        </button>
    );
}

export function LegalScrollReset() {
    useEffect(() => {
        if (window.location.hash) {
            return;
        }

        const frameId = window.requestAnimationFrame(() => {
            window.scrollTo({ left: 0, top: 0, behavior: "auto" });
        });

        return () => window.cancelAnimationFrame(frameId);
    }, []);

    return null;
}

export function LegalSectionFrame({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: ReactNode;
}) {
    const [isHighlighted, setIsHighlighted] = useState(false);
    const highlightTimerRef = useRef<number | null>(null);

    const triggerHighlight = useCallback(() => {
        if (highlightTimerRef.current) {
            window.clearTimeout(highlightTimerRef.current);
        }

        setIsHighlighted(true);
        highlightTimerRef.current = window.setTimeout(() => {
            setIsHighlighted(false);
        }, 2200);
    }, []);

    useEffect(() => {
        const handleHighlight = (event: Event) => {
            const highlightEvent = event as CustomEvent<{ id?: string }>;

            if (highlightEvent.detail?.id === id) {
                triggerHighlight();
            }
        };

        window.addEventListener(legalHighlightEventName, handleHighlight);

        return () => {
            window.removeEventListener(legalHighlightEventName, handleHighlight);

            if (highlightTimerRef.current) {
                window.clearTimeout(highlightTimerRef.current);
            }
        };
    }, [id, triggerHighlight]);

    useEffect(() => {
        if (window.location.hash !== `#${id}`) {
            return;
        }

        const frameId = window.requestAnimationFrame(triggerHighlight);

        return () => window.cancelAnimationFrame(frameId);
    }, [id, triggerHighlight]);

    return (
        <section
            id={id}
            data-legal-section
            tabIndex={-1}
            className="-mx-3 scroll-mt-24 rounded-2xl border-b border-white/10 px-3 py-8 outline-none transition-[background-color,box-shadow,transform] duration-500 first:pt-0 last:border-b-0 last:pb-0 md:-mx-4 md:px-4 md:py-10"
        >
            <h2
                className={[
                    "text-[1.65rem] font-semibold leading-tight text-white md:text-[2rem]",
                    isHighlighted ? headingHighlightClass : "",
                ].join(" ")}
            >
                {title}
            </h2>
            <div className="mt-5 max-w-[74ch] space-y-4 text-base leading-7 text-slate-300">{children}</div>
        </section>
    );
}

export function LegalPageNavigation({
    title,
    navItems,
    platformLegalUrl,
}: {
    title: string;
    navItems: LegalNavItem[];
    platformLegalUrl: string;
}) {
    const [activeId, setActiveId] = useState(navItems[0]?.id ?? "");
    const frameRef = useRef<number | null>(null);
    const delayedHighlightTimersRef = useRef<number[]>([]);
    const sectionIds = useMemo(() => navItems.map((item) => item.id), [navItems]);

    const highlightSection = useCallback((id: string) => {
        document.documentElement.removeAttribute("data-legal-highlight");
        void document.documentElement.offsetWidth;
        document.documentElement.setAttribute("data-legal-highlight", id);
        window.dispatchEvent(new CustomEvent(legalHighlightEventName, { detail: { id } }));
    }, []);

    const scheduleHeadingHighlight = useCallback(
        (id: string) => {
            delayedHighlightTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
            delayedHighlightTimersRef.current = [];

            highlightSection(id);

            for (const delay of [140, 360, 760]) {
                const timerId = window.setTimeout(() => highlightSection(id), delay);
                delayedHighlightTimersRef.current.push(timerId);
            }
        },
        [highlightSection],
    );

    const updateActiveSection = useCallback(() => {
        const activationLine = Math.min(window.innerHeight * 0.34, 280);
        let nextActiveId = sectionIds[0] ?? "";

        for (const id of sectionIds) {
            const section = document.getElementById(id);

            if (!section) {
                continue;
            }

            if (section.getBoundingClientRect().top <= activationLine) {
                nextActiveId = id;
            }
        }

        setActiveId((currentActiveId) => (currentActiveId === nextActiveId ? currentActiveId : nextActiveId));
    }, [sectionIds]);

    useEffect(() => {
        const scheduleUpdate = () => {
            if (frameRef.current) {
                return;
            }

            frameRef.current = window.requestAnimationFrame(() => {
                frameRef.current = null;
                updateActiveSection();
            });
        };

        scheduleUpdate();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);

        return () => {
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);

            if (frameRef.current) {
                window.cancelAnimationFrame(frameRef.current);
            }

            delayedHighlightTimersRef.current.forEach((timerId) => window.clearTimeout(timerId));
        };
    }, [updateActiveSection]);

    useEffect(() => {
        const initialId = window.location.hash.replace("#", "");

        if (initialId && sectionIds.includes(initialId)) {
            const frameId = window.requestAnimationFrame(() => {
                setActiveId(initialId);
                scheduleHeadingHighlight(initialId);
            });

            return () => window.cancelAnimationFrame(frameId);
        }
    }, [scheduleHeadingHighlight, sectionIds]);

    useEffect(() => {
        const handleHashChange = () => {
            const nextId = window.location.hash.replace("#", "");

            if (!sectionIds.includes(nextId)) {
                return;
            }

            setActiveId(nextId);
            scheduleHeadingHighlight(nextId);
        };

        window.addEventListener("hashchange", handleHashChange);

        return () => window.removeEventListener("hashchange", handleHashChange);
    }, [scheduleHeadingHighlight, sectionIds]);

    const handleSectionClick = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const section = document.getElementById(id);

        if (!section) {
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        setActiveId(id);
        window.history.replaceState(null, "", `#${id}`);
        scheduleHeadingHighlight(id);
        scrollToSection(section, prefersReducedMotion);
    };

    return (
        <aside className="hidden rounded-[1.5rem] border border-white/10 bg-[#050f1d]/88 p-5 text-sm text-slate-400 shadow-[0_24px_70px_rgba(2,6,23,0.34)] backdrop-blur-xl xl:sticky xl:top-4 xl:block xl:max-h-[calc(100dvh-2rem)] xl:overflow-auto">
            <div className="flex items-center justify-between gap-3 px-3">
                <p className="text-xs font-semibold uppercase text-slate-500">Inhalt</p>
                <span className="h-px flex-1 bg-white/10" />
            </div>
            <nav aria-label={`${title} Navigation`} className="mt-4 grid gap-1">
                {navItems.map((item, index) => {
                    const isActive = item.id === activeId;

                    return (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            aria-current={isActive ? "location" : undefined}
                            onClick={handleSectionClick(item.id)}
                            className={[
                                "group flex items-center gap-3 rounded-xl px-3 py-2.5 transition",
                                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200/70",
                                isActive
                                    ? "bg-[#0a1b2d] text-white shadow-[inset_0_0_0_1px_rgba(125,211,252,0.2),0_14px_36px_rgba(2,6,23,0.22)]"
                                    : "hover:bg-white/[0.045] hover:text-white",
                            ].join(" ")}
                        >
                            <span
                                className={[
                                    "font-mono text-[0.72rem] transition",
                                    isActive ? "text-cyan-100" : "text-cyan-200/55 group-hover:text-cyan-100",
                                ].join(" ")}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{item.label}</span>
                        </a>
                    );
                })}
            </nav>
            <div className="mt-6 border-t border-white/10 px-3 pt-6">
                <a
                    href={platformLegalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-cyan-200 transition hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200/70"
                >
                    Trustcenter
                    <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <p className="mt-3 text-xs leading-5 text-slate-500">app.jobbridge.app/legal</p>
            </div>
        </aside>
    );
}
