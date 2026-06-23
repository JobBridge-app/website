"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, type MotionValue, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

type StickyScrollTabletProps = {
    titleComponent?: React.ReactNode;
    children: React.ReactNode | ((scrollYProgress: MotionValue<number>) => React.ReactNode);
};

const MOBILE_SECTION_LENGTH = 3.4;
const MOBILE_TABLET_HEIGHT_RATIO = 0.82;

function useIsDesktopFrame() {
    const [isDesktopFrame, setIsDesktopFrame] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        const update = () => setIsDesktopFrame(mediaQuery.matches);

        update();
        mediaQuery.addEventListener("change", update);

        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    return isDesktopFrame;
}

function clampProgress(value: number) {
    return Math.min(Math.max(value, 0), 1);
}

function readLayoutViewportHeight() {
    return Math.max(560, Math.round(window.innerHeight || document.documentElement.clientHeight || 0));
}

function useStableSectionProgress(containerRef: React.RefObject<HTMLDivElement | null>) {
    const progress = useMotionValue(0);
    const metricsRef = useRef({
        sectionTop: 0,
        travelDistance: 1,
        viewportHeight: 0,
        viewportWidth: 0,
    });

    useEffect(() => {
        const section = containerRef.current;

        if (!section) {
            return;
        }

        let frameId = 0;
        let resizeTimer = 0;

        const updateProgress = () => {
            frameId = 0;
            const { sectionTop, travelDistance } = metricsRef.current;
            progress.set(clampProgress((window.scrollY - sectionTop) / travelDistance));
        };

        const scheduleProgressUpdate = () => {
            if (frameId) {
                return;
            }

            frameId = window.requestAnimationFrame(updateProgress);
        };

        const syncMetrics = (resetViewportHeight: boolean) => {
            const viewportWidth = window.innerWidth;
            const isDesktop = viewportWidth >= 768;
            const previousViewportHeight = metricsRef.current.viewportHeight;
            const stableViewportHeight = isDesktop || resetViewportHeight || !previousViewportHeight
                ? readLayoutViewportHeight()
                : previousViewportHeight;
            const mobileSectionHeight = Math.round(stableViewportHeight * MOBILE_SECTION_LENGTH);
            const mobileTabletHeight = Math.round(stableViewportHeight * MOBILE_TABLET_HEIGHT_RATIO);

            section.style.setProperty("--jobbridge-stable-vh", `${stableViewportHeight}px`);
            section.style.setProperty("--jobbridge-section-height", `${mobileSectionHeight}px`);
            section.style.setProperty("--jobbridge-tablet-height", `${mobileTabletHeight}px`);

            window.requestAnimationFrame(() => {
                const sectionTop = section.getBoundingClientRect().top + window.scrollY;
                const sectionHeight = section.offsetHeight;

                metricsRef.current = {
                    sectionTop,
                    travelDistance: Math.max(sectionHeight - stableViewportHeight, 1),
                    viewportHeight: stableViewportHeight,
                    viewportWidth,
                };

                updateProgress();
            });
        };

        const handleViewportResize = () => {
            const viewportWidth = window.innerWidth;
            const previousViewportWidth = metricsRef.current.viewportWidth;
            const breakpointChanged = (viewportWidth >= 768) !== (previousViewportWidth >= 768);
            const widthChanged = Math.abs(viewportWidth - previousViewportWidth) > 24;
            // Instagram and other in-app browsers resize only the visual height when toolbars appear.
            // Re-measuring that case would shift the scroll timeline mid-gesture.
            const shouldResetViewport = viewportWidth >= 768 || breakpointChanged || widthChanged;

            if (shouldResetViewport) {
                window.clearTimeout(resizeTimer);
                resizeTimer = window.setTimeout(() => syncMetrics(true), 120);
                return;
            }

            scheduleProgressUpdate();
        };

        syncMetrics(true);

        window.addEventListener("scroll", scheduleProgressUpdate, { passive: true });
        window.addEventListener("resize", handleViewportResize, { passive: true });
        window.visualViewport?.addEventListener("resize", handleViewportResize, { passive: true });
        window.addEventListener("orientationchange", handleViewportResize, { passive: true });
        document.fonts?.ready.then(() => syncMetrics(false)).catch(() => undefined);

        return () => {
            if (frameId) {
                window.cancelAnimationFrame(frameId);
            }

            window.clearTimeout(resizeTimer);
            window.removeEventListener("scroll", scheduleProgressUpdate);
            window.removeEventListener("resize", handleViewportResize);
            window.visualViewport?.removeEventListener("resize", handleViewportResize);
            window.removeEventListener("orientationchange", handleViewportResize);
        };
    }, [containerRef, progress]);

    return progress;
}

export const StickyScrollTablet = ({ titleComponent, children }: StickyScrollTabletProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion() ?? false;
    const isDesktopFrame = useIsDesktopFrame();
    const scrollYProgress = useStableSectionProgress(containerRef);
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        mass: 0.35,
        restDelta: 0.001,
    });
    const animationProgress = reduceMotion ? scrollYProgress : smoothProgress;

    const rotateX = useTransform(animationProgress, [0, 0.08, 0.18, 0.28], [12, 6, 1.2, 0.35]);
    const rotateY = useTransform(animationProgress, [0, 0.1, 0.18, 0.28], [-3, -1.5, -0.35, 0.12]);
    const rotateZ = useTransform(animationProgress, [0, 0.12, 0.28], [0.35, 0.12, 0.02]);
    const scale = useTransform(animationProgress, [0, 0.08, 0.18, 0.28], [0.92, 0.96, 0.99, 1]);
    const x = useTransform(animationProgress, [0, 0.14, 0.28], [4, 2, 0]);
    const y = useTransform(animationProgress, [0, 0.1, 0.18, 0.3], [44, 24, 8, 0]);
    const opacity = useTransform(animationProgress, [0, 0.04, 0.1], [0.86, 0.96, 1]);
    const mobileScale = useTransform(animationProgress, [0, 0.08, 0.2], [0.93, 0.97, 1]);
    const mobileY = useTransform(animationProgress, [0, 0.08, 0.2], [36, 14, 0]);
    const mobileOpacity = useTransform(animationProgress, [0, 0.06, 0.16], [0.42, 0.84, 1]);
    const contentOpacity = useTransform(animationProgress, [0, 0.08, 0.16], [0.82, 0.96, 1]);
    const mobileContentOpacity = useTransform(animationProgress, [0.04, 0.14, 0.22], [0.6, 0.92, 1]);
    const contentY = useTransform(animationProgress, [0, 0.12, 0.22], [8, 2, 0]);

    const reflectionX = useTransform(animationProgress, [0, 0.22, 1], ["-24%", "-4%", "8%"]);
    const reflectionOpacity = useTransform(animationProgress, [0.08, 0.18, 0.34, 0.9, 1], [0.02, 0.15, 0.08, 0.05, 0.04]);
    const floorShadowOpacity = useTransform(animationProgress, [0.04, 0.18, 0.34, 1], [0.02, 0.16, 0.32, 0.22]);
    const floorShadowScale = useTransform(animationProgress, [0, 0.18, 0.34], [0.78, 0.92, 1]);

    const renderedChildren =
        typeof children === "function"
            ? (children as (progress: MotionValue<number>) => React.ReactNode)(animationProgress)
            : children;

    return (
        <section
            id="how-it-works"
            ref={containerRef}
            className="relative h-[var(--jobbridge-section-height,340svh)] overflow-clip bg-[radial-gradient(circle_at_50%_-8%,#0d1a2c_0%,#070d19_42%,#02040b_100%)] md:h-[520vh]"
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,11,0.85)_0%,rgba(2,4,11,0.5)_50%,rgba(2,4,11,0.9)_100%)]" />

            <div className="sticky top-0 flex h-[var(--jobbridge-stable-vh,100svh)] flex-col items-center justify-center overflow-hidden px-0 pb-0 md:h-[100vh] md:px-8 md:pb-10">
                {titleComponent ? (
                    <div className="relative z-20 mb-3 max-w-4xl px-4 text-center md:mb-4">
                        {titleComponent}
                    </div>
                ) : null}

                <motion.div
                    style={{
                        rotateX: isDesktopFrame && !reduceMotion ? rotateX : 0,
                        rotateY: isDesktopFrame && !reduceMotion ? rotateY : 0,
                        rotateZ: isDesktopFrame && !reduceMotion ? rotateZ : 0,
                        scale: reduceMotion ? 1 : isDesktopFrame ? scale : mobileScale,
                        x: isDesktopFrame && !reduceMotion ? x : 0,
                        y: reduceMotion ? 0 : isDesktopFrame ? y : mobileY,
                        opacity: reduceMotion ? 1 : isDesktopFrame ? opacity : mobileOpacity,
                        perspective: "1900px",
                        transformStyle: "preserve-3d",
                    }}
                    className="relative z-10 w-full max-w-[30rem] px-4 md:w-[min(98vw,90rem)] md:max-w-none md:px-0"
                >
                    <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,27,0.99),rgba(7,10,17,0.99))] shadow-[0_38px_96px_-44px_rgba(2,5,15,1),0_12px_26px_rgba(2,5,15,0.38)] md:rounded-[3rem] md:p-4 md:shadow-[0_56px_124px_-46px_rgba(2,5,15,1),0_12px_26px_rgba(2,5,15,0.45)]">
                        <div className="relative h-[var(--jobbridge-tablet-height,82svh)] min-h-[540px] max-h-[720px] overflow-hidden rounded-[1.85rem] border border-white/[0.025] bg-[#030817] md:h-[79vh] md:min-h-[620px] md:max-h-[86vh] md:rounded-[2.5rem]">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(148,163,184,0.06),transparent_42%),linear-gradient(180deg,rgba(3,8,23,0.9),rgba(3,8,23,0.86))]" />
                            <motion.div
                                aria-hidden
                                style={{
                                    x: reduceMotion ? 0 : reflectionX,
                                    opacity: reduceMotion ? 0.04 : reflectionOpacity,
                                }}
                                className="pointer-events-none absolute -left-1/4 top-0 z-20 hidden h-full w-1/2 bg-[linear-gradient(108deg,transparent_18%,rgba(255,255,255,0.11)_42%,transparent_66%)] md:block"
                            />
                            <motion.div
                                style={{
                                    opacity: reduceMotion ? 1 : isDesktopFrame ? contentOpacity : mobileContentOpacity,
                                    y: reduceMotion || !isDesktopFrame ? 0 : contentY,
                                }}
                                className="relative z-10 h-full"
                            >
                                {renderedChildren}
                            </motion.div>
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-8 bg-gradient-to-t from-[#030817]/68 to-transparent" />
                        </div>
                    </div>
                    <motion.div
                        aria-hidden
                        style={{
                            opacity: reduceMotion ? 0.18 : floorShadowOpacity,
                            scale: reduceMotion ? 1 : floorShadowScale,
                        }}
                        className="pointer-events-none absolute -bottom-10 left-1/2 hidden h-16 w-[72%] -translate-x-1/2 rounded-[999px] bg-black/70 blur-xl md:block"
                    />
                </motion.div>
            </div>
        </section>
    );
};
