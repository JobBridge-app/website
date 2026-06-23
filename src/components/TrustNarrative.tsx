"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, type PointerEvent, type ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

type Dot = {
    x: number;
    y: number;
    phase: number;
    alpha: number;
    size: number;
    accent: boolean;
    columnBias: number;
    flickerMs: number;
};

type PointerState = {
    x: number;
    y: number;
    active: boolean;
};

function JobBridgeMark() {
    return (
        <div aria-hidden="true" className="relative h-11 w-[5.8rem] sm:h-[3.25rem] sm:w-[7rem]">
            <div className="absolute -inset-4 rounded-full bg-blue-300/10 blur-2xl" />
            <Image
                src="/jobbridge-bridge-logo-white.png"
                alt=""
                fill
                sizes="112px"
                className="object-contain object-left drop-shadow-[0_0_24px_rgba(255,255,255,0.12)]"
            />
        </div>
    );
}

function DotField() {
    const hostRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const targetPointerRef = useRef<PointerState>({ x: -1000, y: -1000, active: false });
    const smoothPointerRef = useRef<PointerState>({ x: -1000, y: -1000, active: false });
    const reducedMotion = useReducedMotion() ?? false;

    useEffect(() => {
        const host = hostRef.current;
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d", { alpha: true });

        if (!host || !canvas || !context) return;

        let width = 0;
        let height = 0;
        let pixelRatio = 1;
        let dots: Dot[] = [];
        let animationFrame = 0;
        let running = false;
        let isVisible = true;

        const buildDots = () => {
            const rect = host.getBoundingClientRect();
            width = Math.max(Math.floor(rect.width), 1);
            height = Math.max(Math.floor(rect.height), 1);
            pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

            canvas.width = Math.floor(width * pixelRatio);
            canvas.height = Math.floor(height * pixelRatio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

            const gap = width < 680 ? 16 : width < 1100 ? 14 : 13;
            const margin = gap * 0.4;
            const nextDots: Dot[] = [];

            for (let y = margin; y < height - margin; y += gap) {
                for (let x = margin; x < width - margin; x += gap) {
                    const noise = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
                    const normalized = noise - Math.floor(noise);
                    const edgeFadeX = Math.min(x / 180, (width - x) / 220, 1);
                    const edgeFadeY = Math.min(y / 140, (height - y) / 190, 1);
                    const textFalloff = x < width * 0.53 && y > height * 0.16 && y < height * 0.83 ? 0.72 : 1;
                    const emphasis = (0.22 + Math.pow(Math.max(0, edgeFadeX * edgeFadeY), 0.76) * 0.55) * textFalloff;

                    nextDots.push({
                        x,
                        y,
                        phase: normalized * Math.PI * 2,
                        alpha: emphasis * (0.48 + normalized * 0.46),
                        size: normalized > 0.97 ? 4.4 : normalized > 0.72 ? 3.55 : 2.85,
                        accent: normalized > 0.985,
                        columnBias: Math.max(0, x / width),
                        flickerMs: 260 + Math.floor(normalized * 430),
                    });
                }
            }

            dots = nextDots;
        };

        const start = () => {
            if (!running) {
                running = true;
                animationFrame = window.requestAnimationFrame(draw);
            }
        };

        const draw = (time: number) => {
            running = false;
            context.clearRect(0, 0, width, height);
            const pointer = smoothPointerRef.current;
            const target = targetPointerRef.current;
            const pointerEase = target.active ? 0.18 : 0.1;

            pointer.x += (target.x - pointer.x) * pointerEase;
            pointer.y += (target.y - pointer.y) * pointerEase;
            pointer.active = target.active || Math.hypot(pointer.x - target.x, pointer.y - target.y) > 0.8;

            const slowWaveX = Math.sin(time * 0.000165) * 5;
            const slowWaveY = Math.cos(time * 0.000145) * 4;
            const pointerRadius = Math.min(width < 760 ? 116 : 168, Math.max(width, height) * 0.27);

            for (const dot of dots) {
                const wave = reducedMotion ? 0 : Math.sin(time * 0.000275 + dot.x * 0.012 + dot.y * 0.007 + dot.phase);
                const diagonal = reducedMotion ? 0 : Math.sin(time * 0.00024 + (dot.x - dot.y) * 0.007 + dot.phase * 0.55);
                const idle = reducedMotion ? 0 : wave * 0.48 + diagonal * 0.32;

                let x = dot.x + Math.cos(dot.phase) * idle;
                let y = dot.y + Math.sin(dot.phase * 0.82) * idle;
                let alpha = dot.alpha;
                let size = dot.size;
                let pointerBoost = 0;
                let pointerClear = 0;

                if (!reducedMotion) {
                    const rightDrift = Math.max(0, dot.columnBias - 0.34);
                    x += slowWaveX * rightDrift * 0.42;
                    y += slowWaveY * rightDrift * 0.28;
                    alpha += Math.max(0, wave) * 0.035;
                }

                if (pointer.active) {
                    const dx = x - pointer.x;
                    const dy = y - pointer.y;
                    const distance = Math.hypot(dx, dy);
                    const force = Math.max(0, 1 - distance / pointerRadius);

                    if (force > 0) {
                        const angle = Math.atan2(dy, dx);
                        const strength = force * force * 0.62;
                        const ring = Math.max(0, 1 - Math.abs(distance - pointerRadius * 0.62) / (pointerRadius * 0.34));
                        const tangent = (1 - force) * ring * (width < 760 ? 7 : 11);
                        x += Math.cos(angle) * strength * (width < 760 ? 34 : 52) - Math.sin(angle) * tangent;
                        y += Math.sin(angle) * strength * (width < 760 ? 34 : 52) + Math.cos(angle) * tangent;
                        pointerClear = force * 0.26;
                        alpha = alpha * (1 - pointerClear) + ring * 0.25;
                        size += ring * 0.45;
                        pointerBoost = Math.max(strength * 0.75, ring * 0.44);
                    }
                }

                const tick = reducedMotion ? 0 : Math.floor((time + dot.phase * 997) / dot.flickerMs);
                const flickerSeed = Math.sin(dot.x * 0.073 + dot.y * 0.119 + tick * 9.71 + dot.phase * 3.2) * 43758.5453;
                const flicker = flickerSeed - Math.floor(flickerSeed);
                const flickerLevel = reducedMotion ? 0.12 : flicker > 0.94 ? 0.82 : flicker > 0.8 ? 0.46 : flicker > 0.58 ? 0.22 : 0.035;
                const blueMix = Math.min(1, flickerLevel * 0.34 + pointerBoost * 0.46 + (dot.accent ? 0.38 : 0));
                const whiteMix = Math.min(1, flickerLevel * 0.16 + pointerBoost * 0.2 + (dot.accent ? 0.08 : 0));
                const r = Math.round(40 + (96 - 40) * blueMix + 54 * whiteMix);
                const g = Math.round(45 + (142 - 45) * blueMix + 58 * whiteMix);
                const b = Math.round(54 + (224 - 54) * blueMix + 46 * whiteMix);
                const pixelAlpha = Math.min(alpha + flickerLevel * 0.16 + 0.03 - pointerClear * 0.08, 0.84);

                context.fillStyle = `rgba(${r}, ${g}, ${b}, ${pixelAlpha})`;
                context.fillRect(Math.round(x - size / 2), Math.round(y - size / 2), size, size);
            }

            if (isVisible || pointer.active || target.active) {
                running = true;
                animationFrame = window.requestAnimationFrame(draw);
            } else {
                animationFrame = 0;
            }
        };

        const handlePointerMove = (event: globalThis.PointerEvent) => {
            const rect = host.getBoundingClientRect();
            const inside =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;

            targetPointerRef.current = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
                active: inside,
            };

            if (inside) {
                start();
            }
        };

        const handlePointerLeave = () => {
            targetPointerRef.current.active = false;
            start();
        };

        const resizeObserver = new ResizeObserver(() => {
            buildDots();
        });
        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;

                if (isVisible) {
                    start();
                }
            },
            { rootMargin: "160px 0px", threshold: 0.02 }
        );

        buildDots();
        resizeObserver.observe(host);
        visibilityObserver.observe(host);
        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        window.addEventListener("pointerleave", handlePointerLeave);
        start();

        return () => {
            resizeObserver.disconnect();
            visibilityObserver.disconnect();
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerleave", handlePointerLeave);
            window.cancelAnimationFrame(animationFrame);
            animationFrame = 0;
            running = false;
        };
    }, [reducedMotion]);

    return (
        <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-100" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_35%,rgba(37,99,235,0.1),transparent_42%),linear-gradient(90deg,rgba(2,4,11,0.2)_0%,rgba(2,4,11,0.02)_48%,rgba(2,4,11,0.24)_100%)]" />
        </div>
    );
}

function FillButton({
    href,
    children,
    variant,
    icon,
}: {
    href: string;
    children: ReactNode;
    variant: "primary" | "secondary";
    icon: ReactNode;
}) {
    const [origin, setOrigin] = useState({ x: 50, y: 50 });
    const [isPressed, setIsPressed] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const resetTimeoutRef = useRef<number | null>(null);

    const updateOrigin = (event: PointerEvent<HTMLAnchorElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setOrigin({
            x: ((event.clientX - rect.left) / rect.width) * 100,
            y: ((event.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handlePointerDown = (event: PointerEvent<HTMLAnchorElement>) => {
        updateOrigin(event);
        setIsPressed(true);

        if (resetTimeoutRef.current) {
            window.clearTimeout(resetTimeoutRef.current);
        }

        resetTimeoutRef.current = window.setTimeout(() => setIsPressed(false), 620);
    };

    useEffect(() => {
        return () => {
            if (resetTimeoutRef.current) {
                window.clearTimeout(resetTimeoutRef.current);
            }
        };
    }, []);

    const style = {
        "--fill-x": `${origin.x}%`,
        "--fill-y": `${origin.y}%`,
    } as CSSProperties;
    const isPrimary = variant === "primary";
    const activeSurface = isPressed || isHovering;
    const contentClass = isPrimary
        ? activeSurface
            ? "text-white"
            : "text-[#02040b] group-hover:text-white"
        : activeSurface
          ? "text-[#02040b]"
          : "text-white group-hover:text-[#02040b]";

    return (
        <Link
            href={href}
            style={style}
            onFocus={() => setIsHovering(true)}
            onBlur={() => {
                setIsHovering(false);
                setIsPressed(false);
            }}
            onPointerEnter={(event) => {
                updateOrigin(event);
                setIsHovering(true);
            }}
            onPointerMove={updateOrigin}
            onPointerDown={handlePointerDown}
            onPointerUp={() => setIsPressed(false)}
            onPointerLeave={() => {
                setIsHovering(false);
                setIsPressed(false);
            }}
            className={`group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[0.9rem] border px-5 text-[0.92rem] font-semibold tracking-[-0.01em] transition duration-500 ease-out active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040b] sm:min-h-[3.25rem] sm:px-6 sm:text-[0.98rem] ${
                isPrimary
                    ? `${
                          activeSurface
                              ? "border-blue-200/70 bg-blue-500 shadow-[0_22px_62px_rgba(37,99,235,0.32)]"
                              : "border-white bg-white shadow-[0_18px_54px_rgba(255,255,255,0.12)]"
                      } hover:border-blue-200/70 hover:bg-blue-500 hover:shadow-[0_22px_62px_rgba(37,99,235,0.32)]`
                    : `${
                          activeSurface
                              ? "border-white bg-white text-[#02040b]"
                              : "border-white/12 bg-[#171a22] text-white shadow-[0_16px_44px_rgba(0,0,0,0.22)]"
                      } hover:border-white hover:bg-white hover:text-[#02040b]`
            }`}
        >
            <span
                aria-hidden="true"
                className={`absolute aspect-square w-[220%] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 ${
                    activeSurface ? "scale-100" : "scale-0"
                } ${isPrimary ? "bg-blue-500" : "bg-white"}`}
                style={{ left: "var(--fill-x)", top: "var(--fill-y)" }}
            />
            <span
                aria-hidden="true"
                className={`absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                    isPrimary
                        ? "bg-[linear-gradient(135deg,rgba(147,197,253,0.26),transparent_58%)]"
                        : "bg-[linear-gradient(135deg,rgba(255,255,255,0.14),transparent_62%)]"
                }`}
            />
            <span className={`relative z-10 transition-colors duration-500 ${contentClass}`}>
                {icon}
            </span>
            <span className={`relative z-10 transition-colors duration-500 ${contentClass}`}>
                {children}
            </span>
        </Link>
    );
}

export function TrustNarrative() {
    const contentRef = useRef<HTMLDivElement | null>(null);
    const reducedMotion = useReducedMotion() ?? false;
    const [hasRevealed, setHasRevealed] = useState(false);
    const isRevealed = reducedMotion || hasRevealed;
    const revealState = isRevealed ? "show" : "hidden";

    useEffect(() => {
        if (reducedMotion) {
            return;
        }

        const element = contentRef.current;
        if (!element) return;

        const checkVisibility = () => {
            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
            const isComfortablyVisible = rect.top < viewportHeight * 0.78 && rect.bottom > viewportHeight * 0.2;

            if (isComfortablyVisible) {
                setHasRevealed(true);
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setHasRevealed(true);
                }
            },
            { rootMargin: "0px 0px -14% 0px", threshold: 0.24 }
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
            opacity: 0,
            y: reducedMotion ? 0 : 22,
        },
        show: (delay = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: reducedMotion ? 0 : delay,
                duration: reducedMotion ? 0.01 : 0.92,
                ease: [0.19, 1, 0.22, 1] as [number, number, number, number],
            },
        }),
    };

    return (
        <section
            id="vertrauen"
            data-trust-narrative
            aria-label="JobBridge Ablauf und Plattformprinzip"
            className="relative isolate min-h-[94svh] overflow-hidden bg-[#02040b] text-white"
        >
            <DotField />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#02040b] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-neutral-950 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,11,0.08)_0%,rgba(2,4,11,0)_40%,rgba(2,4,11,0.22)_100%)]" />

            <div className="relative z-10 mx-auto flex min-h-[94svh] w-full max-w-[78rem] items-center px-5 py-16 sm:px-8 md:py-20 lg:px-10">
                <div className="relative w-full max-w-[49rem]">
                    <div ref={contentRef} className="relative z-10">
                        <motion.div
                            variants={revealVariants}
                            initial="hidden"
                            animate={revealState}
                            custom={0}
                            className="will-change-transform"
                        >
                            <JobBridgeMark />
                        </motion.div>

                        <motion.h2
                            variants={revealVariants}
                            initial="hidden"
                            animate={revealState}
                            custom={0.13}
                            className="mt-14 max-w-[13.5ch] text-pretty text-[clamp(3rem,5.85vw,5.72rem)] font-semibold leading-[0.96] tracking-[-0.038em] text-[#707782] will-change-transform"
                        >
                            <span className="block text-white">Kleine Jobs.</span>
                            <span className="block">Klare Wege.</span>
                            <span className="block text-white">Direkt in deiner Nähe.</span>
                        </motion.h2>

                        <motion.p
                            variants={revealVariants}
                            initial="hidden"
                            animate={revealState}
                            custom={0.27}
                            className="mt-7 max-w-[35rem] text-pretty text-[clamp(1.08rem,1.45vw,1.54rem)] font-medium leading-[1.28] tracking-[-0.02em] text-[#808792] will-change-transform"
                        >
                            <span className="text-white">JobBridge zeigt, was gebraucht wird,</span>{" "}
                            <span>wer helfen kann und wie aus einer Anfrage ein fairer Job wird.</span>
                        </motion.p>

                        <motion.div
                            variants={revealVariants}
                            initial="hidden"
                            animate={revealState}
                            custom={0.41}
                            className="mt-7 flex flex-col gap-3 will-change-transform sm:flex-row sm:items-center"
                        >
                            <FillButton href="https://app.jobbridge.app" variant="primary" icon={<ArrowUpRight className="h-4 w-4" />}>
                                Plattform öffnen
                            </FillButton>
                            <FillButton href="#fuer-wen" variant="secondary" icon={<ArrowDown className="h-4 w-4" />}>
                                Mehr verstehen
                            </FillButton>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
