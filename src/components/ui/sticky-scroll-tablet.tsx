"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";

type StickyScrollTabletProps = {
    titleComponent?: React.ReactNode;
    children: React.ReactNode | ((scrollYProgress: MotionValue<number>) => React.ReactNode);
};

export const StickyScrollTablet = ({ titleComponent, children }: StickyScrollTabletProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion() ?? false;
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

    const rotateX = useTransform(smoothProgress, [0, 0.08, 0.18, 0.28], [34, 18, 6, reduceMotion ? 0 : 0.8]);
    const rotateY = useTransform(smoothProgress, [0, 0.1, 0.18, 0.28], [-10, -5, -1.5, reduceMotion ? 0 : 0.35]);
    const rotateZ = useTransform(smoothProgress, [0, 0.12, 0.28], [1.25, 0.5, reduceMotion ? 0 : 0.04]);
    const scale = useTransform(smoothProgress, [0, 0.08, 0.18, 0.28], [0.72, 0.84, 0.94, 1]);
    const x = useTransform(smoothProgress, [0, 0.14, 0.28], [reduceMotion ? 0 : 18, 6, 0]);
    const y = useTransform(smoothProgress, [0, 0.1, 0.18, 0.3], [260, 132, 38, 0]);
    const opacity = useTransform(smoothProgress, [0, 0.05, 0.14], [0, 0.62, 1]);
    const contentOpacity = useTransform(smoothProgress, [0.08, 0.16, 0.28], [0, 0.74, 1]);
    const contentY = useTransform(smoothProgress, [0.08, 0.18, 0.28], [22, 8, 0]);

    const reflectionX = useTransform(smoothProgress, [0, 0.22, 1], ["-24%", "-4%", "8%"]);
    const reflectionOpacity = useTransform(smoothProgress, [0.08, 0.18, 0.34, 0.9, 1], [0.02, 0.15, 0.08, 0.05, 0.04]);
    const floorShadowOpacity = useTransform(smoothProgress, [0.04, 0.18, 0.34, 1], [0.02, 0.16, 0.32, 0.22]);
    const floorShadowScale = useTransform(smoothProgress, [0, 0.18, 0.34], [0.78, 0.92, 1]);

    const renderedChildren =
        typeof children === "function"
            ? (children as (progress: MotionValue<number>) => React.ReactNode)(smoothProgress)
            : children;

    return (
        <section
            id="how-it-works"
            ref={containerRef}
            className="relative h-[780vh] overflow-clip bg-[radial-gradient(circle_at_50%_-8%,#0d1a2c_0%,#070d19_42%,#02040b_100%)]"
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,11,0.85)_0%,rgba(2,4,11,0.5)_50%,rgba(2,4,11,0.9)_100%)]" />

            <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden px-3 pb-5 sm:px-5 sm:pb-7 md:px-8 md:pb-10">
                {titleComponent ? (
                    <div className="relative z-20 mb-3 max-w-4xl px-4 text-center md:mb-4">
                        {titleComponent}
                    </div>
                ) : null}

                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        rotateZ,
                        scale,
                        x,
                        y,
                        opacity,
                        perspective: "1900px",
                        transformStyle: "preserve-3d",
                    }}
                    className="relative z-10 w-[min(93vw,90rem)] sm:w-[min(95vw,90rem)] md:w-[min(98vw,90rem)]"
                >
                    <div className="relative rounded-[2.25rem] border border-white/10 bg-[linear-gradient(180deg,rgba(14,18,27,0.99),rgba(7,10,17,0.99))] p-3 shadow-[0_56px_124px_-46px_rgba(2,5,15,1),0_12px_26px_rgba(2,5,15,0.45)] sm:p-3.5 md:rounded-[3rem] md:p-4">
                        <div className="relative h-[79svh] min-h-[380px] max-h-[86svh] overflow-hidden rounded-[1.86rem] border border-white/[0.025] bg-[#030817] sm:min-h-[460px] md:min-h-[620px] md:rounded-[2.5rem]">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(148,163,184,0.06),transparent_42%),linear-gradient(180deg,rgba(3,8,23,0.9),rgba(3,8,23,0.86))]" />
                            <motion.div
                                aria-hidden
                                style={{ x: reflectionX, opacity: reflectionOpacity }}
                                className="pointer-events-none absolute -left-1/4 top-0 z-20 h-full w-1/2 bg-[linear-gradient(108deg,transparent_18%,rgba(255,255,255,0.11)_42%,transparent_66%)]"
                            />
                            <motion.div
                                style={{ opacity: contentOpacity, y: reduceMotion ? 0 : contentY }}
                                className="relative z-10 h-full"
                            >
                                {renderedChildren}
                            </motion.div>
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-8 bg-gradient-to-t from-[#030817]/68 to-transparent" />
                        </div>
                    </div>
                    <motion.div
                        aria-hidden
                        style={{ opacity: floorShadowOpacity, scale: floorShadowScale }}
                        className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[72%] -translate-x-1/2 rounded-[999px] bg-black/70 blur-xl"
                    />
                </motion.div>
            </div>
        </section>
    );
};
