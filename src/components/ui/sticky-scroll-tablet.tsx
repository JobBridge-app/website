"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

type StickyScrollTabletProps = {
    titleComponent?: React.ReactNode;
    children: React.ReactNode | ((scrollYProgress: MotionValue<number>) => React.ReactNode);
};

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

export const StickyScrollTablet = ({ titleComponent, children }: StickyScrollTabletProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion() ?? false;
    const isDesktopFrame = useIsDesktopFrame();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });
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
    const contentOpacity = useTransform(animationProgress, [0, 0.08, 0.16], [0.82, 0.96, 1]);
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
            className="relative h-[340svh] overflow-clip bg-[radial-gradient(circle_at_50%_-8%,#0d1a2c_0%,#070d19_42%,#02040b_100%)] md:h-[520vh]"
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,11,0.85)_0%,rgba(2,4,11,0.5)_50%,rgba(2,4,11,0.9)_100%)]" />

            <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-0 pb-0 md:px-8 md:pb-10">
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
                        scale: isDesktopFrame && !reduceMotion ? scale : 1,
                        x: isDesktopFrame && !reduceMotion ? x : 0,
                        y: isDesktopFrame && !reduceMotion ? y : 0,
                        opacity: isDesktopFrame && !reduceMotion ? opacity : 1,
                        perspective: "1900px",
                        transformStyle: "preserve-3d",
                    }}
                    className="relative z-10 w-full max-w-[30rem] px-4 md:w-[min(98vw,90rem)] md:max-w-none md:px-0"
                >
                    <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,27,0.99),rgba(7,10,17,0.99))] shadow-[0_38px_96px_-44px_rgba(2,5,15,1),0_12px_26px_rgba(2,5,15,0.38)] md:rounded-[3rem] md:p-4 md:shadow-[0_56px_124px_-46px_rgba(2,5,15,1),0_12px_26px_rgba(2,5,15,0.45)]">
                        <div className="relative h-[82svh] min-h-[540px] max-h-[720px] overflow-hidden rounded-[1.85rem] border border-white/[0.025] bg-[#030817] md:h-[79svh] md:min-h-[620px] md:max-h-[86svh] md:rounded-[2.5rem]">
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
                                    opacity: isDesktopFrame ? contentOpacity : 1,
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
