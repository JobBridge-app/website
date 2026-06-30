"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, memo, type MouseEvent, type MutableRefObject, useEffect, useRef, useState } from "react";
import {
    animate,
    AnimatePresence,
    motion,
    type MotionValue,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import {
    CalendarDays,
    Coins,
    Leaf,
    Menu,
    MapPin,
    PawPrint,
    ShoppingBag,
    Smartphone,
    Wrench,
    X,
} from "lucide-react";
import { mainNavItems, menuMetaLinks } from "@/config/site";

const HEADLINE_PRIMARY_LINE = "Dein erster Job.";
const HEADLINE_TYPED_LINE = "Aber sicher.";
const HEADLINE_TYPED_CHARACTERS = Array.from(HEADLINE_TYPED_LINE);
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MENU_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const MOBILE_NOISE_URL =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23noise)' opacity='0.09'/%3E%3C/svg%3E\")";

const HERO_MENU_ITEMS = mainNavItems;
const HERO_MENU_META_LINKS = menuMetaLinks;

function scrollToHowItWorksStage(reducedMotion: boolean) {
    const section = document.getElementById("how-it-works");
    if (!section) return;

    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollSpan = Math.max(section.offsetHeight - window.innerHeight, 0);
    const targetProgress = window.innerWidth < 768 ? 0.16 : 0.19;
    const targetY = sectionTop + scrollSpan * targetProgress;

    if (reducedMotion) {
        window.scrollTo(0, targetY);
        return;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1300;
    const startTime = performance.now();

    const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

    const frame = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuint(progress);

        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
            window.requestAnimationFrame(frame);
        }
    };

    window.requestAnimationFrame(frame);
}

const VERTEX_SHADER = /* glsl */ `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

uniform float uTime;
uniform float uScroll;
uniform vec2 uMouse;
uniform float uIntensity;
uniform vec2 uResolution;
varying vec2 vUv;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
    );
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }

    return value;
}

void main() {
    vec2 resolution = max(uResolution, vec2(1.0));
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(resolution.x / resolution.y, 1.0);
    vec2 mouse = (uMouse - 0.5) * 0.3;

    float time = uTime * 0.12;
    float field = fbm((p + mouse * 0.9) * 2.6 + vec2(time * 0.28, -time * 0.16));
    float fieldDetail = fbm((p - mouse * 0.45) * 5.4 - vec2(time * 0.22, time * 0.19));

    float ribbonA = smoothstep(
        0.44,
        0.0,
        abs(p.y + 0.18 * sin(p.x * 2.2 + field * 3.4 + time * 1.4) + 0.05)
    );
    float ribbonB = smoothstep(
        0.38,
        0.0,
        abs(p.y - 0.22 * sin(p.x * 1.7 - field * 2.8 - time * 1.1) - 0.24)
    );

    float glow = ribbonA * 0.65 + ribbonB * 0.55;
    glow *= 0.58 + uIntensity * 0.52 + uScroll * 0.12;

    float starField = pow(noise(uv * resolution * 0.18 + time * 0.2), 10.0) * 0.16;
    float grain = (noise(uv * resolution * 0.75 + fieldDetail * 4.0) - 0.5) * 0.035;
    float vignette = smoothstep(1.35, 0.18, length(p * vec2(1.0, 1.18)));

    vec3 base = vec3(0.012, 0.022, 0.06);
    vec3 mid = vec3(0.03, 0.078, 0.19);
    vec3 accentA = vec3(0.19, 0.39, 0.86);
    vec3 accentB = vec3(0.46, 0.7, 1.0);

    vec3 color = mix(base, mid, clamp(field * 0.58 + 0.1, 0.0, 1.0));
    color += accentA * ribbonA * (0.34 + uIntensity * 0.48);
    color += accentB * ribbonB * (0.22 + uIntensity * 0.42);
    color += vec3(0.38, 0.56, 0.92) * starField;
    color += grain;
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
}
`;

type ScrollRef = MutableRefObject<number>;

type CardTone = "amber" | "sky" | "emerald" | "violet" | "slate";
type CardKind = "tech" | "garden" | "pets" | "shopping" | "support";

type HeroCard = {
    id: string;
    title: string;
    kind: CardKind;
    tone: CardTone;
    category: string;
    clientType: string;
    description: string;
    price: string;
    distance: string;
    date: string;
    author: string;
    authorInitial: string;
};

type CardSlot = {
    className: string;
    scale: number;
    rotate: number;
    opacity: number;
    zIndex: number;
};

const HERO_CARDS: HeroCard[] = [
    {
        id: "phone-setup",
        title: "Hilfe bei der Einrichtung meines Handys",
        kind: "tech",
        tone: "amber",
        category: "IT-Hilfe",
        clientType: "Privater Auftraggeber",
        description: "Neues iPhone einrichten, Apps übertragen und WLAN verbinden.",
        price: "20 € / Std.",
        distance: "0,8 km entfernt",
        date: "Diese Woche",
        author: "Lina Weber",
        authorInitial: "L",
    },
    {
        id: "laptop-printer",
        title: "Laptop und Drucker zuhause verbinden",
        kind: "tech",
        tone: "sky",
        category: "Technik",
        clientType: "Privater Auftraggeber",
        description: "WLAN prüfen, Drucker koppeln und E-Mail am Laptop einrichten.",
        price: "18 € / Std.",
        distance: "1,4 km entfernt",
        date: "Diese Woche",
        author: "Mira Klein",
        authorInitial: "M",
    },
    {
        id: "hedge-cutting",
        title: "Hecke schneiden am Samstag",
        kind: "garden",
        tone: "emerald",
        category: "Gartenhilfe",
        clientType: "Familie",
        description: "Hecke sauber schneiden und Grünschnitt ordentlich zusammenlegen.",
        price: "17 € / Std.",
        distance: "2,1 km entfernt",
        date: "Samstag",
        author: "Familie Schmitt",
        authorInitial: "S",
    },
    {
        id: "dog-walk",
        title: "Hundespaziergang nach der Schule",
        kind: "pets",
        tone: "violet",
        category: "Tierbetreuung",
        clientType: "Privater Auftraggeber",
        description: "45 Minuten Spaziergang mit ruhigem Familienhund im Viertel.",
        price: "14 € / Std.",
        distance: "1,2 km entfernt",
        date: "Nach der Schule",
        author: "Nora Becker",
        authorInitial: "N",
    },
    {
        id: "shopping-help",
        title: "Einkaufshilfe am Freitag",
        kind: "shopping",
        tone: "slate",
        category: "Alltagshilfe",
        clientType: "Seniorenhaushalt",
        description: "Wocheneinkauf begleiten und Taschen bis zur Haustür tragen.",
        price: "16 € / Std.",
        distance: "0,9 km entfernt",
        date: "Freitag",
        author: "Helga Mohr",
        authorInitial: "H",
    },
    {
        id: "assembly-help",
        title: "Kleines Regal gemeinsam aufbauen",
        kind: "support",
        tone: "sky",
        category: "Montagehilfe",
        clientType: "Privater Auftraggeber",
        description: "Werkzeug ist da, gebraucht wird eine zweite Hand und Ruhe.",
        price: "19 € / Std.",
        distance: "1,7 km entfernt",
        date: "Nächste Woche",
        author: "Jan Berger",
        authorInitial: "J",
    },
];

const DESKTOP_CARD_SLOTS: CardSlot[] = [
    {
        className: "left-[53%] top-[16%] w-[84%] max-w-[470px] -translate-x-1/2",
        scale: 1,
        rotate: -1.6,
        opacity: 1,
        zIndex: 40,
    },
    {
        className: "left-[43%] top-[45%] w-[78%] max-w-[430px] -translate-x-1/2",
        scale: 0.88,
        rotate: -6.2,
        opacity: 0.34,
        zIndex: 24,
    },
    {
        className: "left-[70%] top-[5%] w-[74%] max-w-[420px] -translate-x-1/2",
        scale: 0.86,
        rotate: 5.4,
        opacity: 0.24,
        zIndex: 16,
    },
    {
        className: "left-[80%] top-[31%] w-[68%] max-w-[370px] -translate-x-1/2",
        scale: 0.78,
        rotate: 7.5,
        opacity: 0.12,
        zIndex: 8,
    },
];

const HERO_CARD_INTERVAL_MS = 3600;
const CARD_STAGE_TRANSITION = {
    type: "spring",
    stiffness: 132,
    damping: 27,
    mass: 0.82,
} as const;

const CARD_TONE_STYLES: Record<CardTone, string> = {
    amber: "border-amber-400/24 bg-amber-400/[0.08] text-amber-200/95",
    sky: "border-sky-300/22 bg-sky-400/[0.08] text-sky-100/92",
    emerald: "border-emerald-400/24 bg-emerald-400/[0.08] text-emerald-100/92",
    violet: "border-violet-400/24 bg-violet-400/[0.08] text-violet-100/92",
    slate: "border-slate-300/18 bg-white/[0.05] text-slate-100/88",
};

const CARD_KIND_ICONS = {
    tech: Smartphone,
    garden: Leaf,
    pets: PawPrint,
    shopping: ShoppingBag,
    support: Wrench,
} as const;

function useIsDesktop(): boolean {
    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px)");
        const update = () => setIsDesktop(mediaQuery.matches);

        update();
        mediaQuery.addEventListener("change", update);

        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    return isDesktop;
}

function useTypewriter(text: string, startDelay: number, reducedMotion: boolean) {
    const [visibleCount, setVisibleCount] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (reducedMotion) {
            return;
        }

        let cancelled = false;
        let elapsed = startDelay;
        const timeouts: number[] = [];

        Array.from(text).forEach((character, index) => {
            const timeoutId = window.setTimeout(() => {
                if (cancelled) return;
                setVisibleCount(index + 1);

                if (index === text.length - 1) {
                    setIsComplete(true);
                }
            }, elapsed);

            timeouts.push(timeoutId);

            if (character === " ") {
                elapsed += 48;
            } else if (character === ".") {
                elapsed += 176;
            } else if (/[A-ZÄÖÜ]/.test(character)) {
                elapsed += 108;
            } else {
                elapsed += 86;
            }
        });

        return () => {
            cancelled = true;
            timeouts.forEach((timeoutId) => window.clearTimeout(timeoutId));
        };
    }, [reducedMotion, startDelay, text]);

    return reducedMotion
        ? { visibleCount: text.length, isComplete: true }
        : { visibleCount, isComplete };
}

function AuroraCanvas({ scrollRef }: { scrollRef: ScrollRef }) {
    const hostRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const host = hostRef.current;
        if (!host) return;

        let disposed = false;
        let cleanup = () => undefined;

        void (async () => {
            const THREE = await import("three");
            if (disposed || !hostRef.current) return;

            const canvas = document.createElement("canvas");
            canvas.style.display = "block";
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            host.appendChild(canvas);

            let renderer: import("three").WebGLRenderer;

            try {
                renderer = new THREE.WebGLRenderer({
                    canvas,
                    alpha: false,
                    antialias: false,
                    powerPreference: "low-power",
                });
            } catch {
                if (canvas.parentNode === host) host.removeChild(canvas);
                return;
            }

            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
            renderer.setClearColor(0x030712, 1);

            const scene = new THREE.Scene();
            const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
            const geometry = new THREE.PlaneGeometry(2, 2);
            const uniforms = {
                uTime: { value: 0 },
                uScroll: { value: 0 },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                uIntensity: { value: 0 },
                uResolution: { value: new THREE.Vector2(1, 1) },
            };
            const material = new THREE.ShaderMaterial({
                uniforms,
                vertexShader: VERTEX_SHADER,
                fragmentShader: FRAGMENT_SHADER,
            });
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);

            const resize = () => {
                const width = host.clientWidth;
                const height = host.clientHeight;
                if (width === 0 || height === 0) return;
                renderer.setSize(width, height, false);
                uniforms.uResolution.value.set(width, height);
            };

            resize();

            const resizeObserver = new ResizeObserver(resize);
            resizeObserver.observe(host);

            const mouseTarget = new THREE.Vector2(0.5, 0.5);
            const handlePointerMove = (event: PointerEvent) => {
                const rect = host.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) return;

                mouseTarget.set(
                    (event.clientX - rect.left) / rect.width,
                    1 - (event.clientY - rect.top) / rect.height
                );
            };

            window.addEventListener("pointermove", handlePointerMove, {
                passive: true,
            });

            const intensityAnimation = animate(0, 1, {
                duration: 1.4,
                ease: EASE,
                onUpdate: (latest) => {
                    uniforms.uIntensity.value = latest;
                },
            });

            let frame = 0;
            let active = true;

            const render = () => {
                if (!active) return;

                uniforms.uTime.value += 0.012;
                uniforms.uScroll.value = scrollRef.current;
                uniforms.uMouse.value.x += (mouseTarget.x - uniforms.uMouse.value.x) * 0.06;
                uniforms.uMouse.value.y += (mouseTarget.y - uniforms.uMouse.value.y) * 0.06;

                renderer.render(scene, camera);
                frame = window.requestAnimationFrame(render);
            };

            frame = window.requestAnimationFrame(render);

            cleanup = () => {
                active = false;
                intensityAnimation.stop();
                window.cancelAnimationFrame(frame);
                window.removeEventListener("pointermove", handlePointerMove);
                resizeObserver.disconnect();
                geometry.dispose();
                material.dispose();
                renderer.dispose();
                if (canvas.parentNode === host) host.removeChild(canvas);
            };
        })();

        return () => {
            disposed = true;
            cleanup();
        };
    }, [scrollRef]);

    return <div ref={hostRef} aria-hidden className="pointer-events-none absolute inset-0 z-0" />;
}

const JobCard = memo(function JobCard({
    card,
    focused,
}: {
    card: HeroCard;
    focused: boolean;
}) {
    const CardIcon = CARD_KIND_ICONS[card.kind];
    const chipStyle = CARD_TONE_STYLES[card.tone];

    return (
            <div
                className={`relative overflow-hidden rounded-[30px] ${
                    focused
                    ? "border border-white/14 bg-[linear-gradient(180deg,rgba(24,35,62,0.96),rgba(14,22,40,0.92))] backdrop-blur-[14px] shadow-[0_38px_120px_rgba(2,6,23,0.52)]"
                    : "border border-white/8 bg-[linear-gradient(180deg,rgba(18,28,50,0.72),rgba(14,21,38,0.6))] shadow-[0_18px_72px_rgba(2,6,23,0.32)]"
            }`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_0%,rgba(255,255,255,0.055),transparent_42%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.018),transparent)]" />

            <div className="relative px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
                <h3 className="text-pretty text-[1.32rem] font-semibold leading-[1.08] tracking-[-0.035em] text-white sm:text-[1.5rem] md:text-[2.05rem]">
                    {card.title}
                </h3>

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-slate-400 sm:mt-5 sm:gap-x-4">
                    <span className={`inline-flex items-center gap-2 rounded-[15px] border px-3 py-1.5 text-[0.82rem] font-medium sm:px-3.5 sm:py-2 sm:text-[0.95rem] ${chipStyle}`}>
                        <CardIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        {card.category}
                    </span>
                    <span className="hidden h-1 w-1 rounded-full bg-slate-500/90 sm:block" />
                    <span className="text-[0.92rem] text-slate-400 sm:text-[0.98rem] md:text-[1.05rem]">
                        {card.clientType}
                    </span>
                </div>

                <p className="mt-5 max-w-[28ch] text-[0.96rem] leading-[1.48] text-slate-300 sm:mt-6 sm:max-w-[32ch] sm:text-[1.02rem] md:mt-7 md:text-[1.1rem]">
                    {card.description}
                </p>

                <div className="mt-6 h-px bg-white/8 sm:mt-7 md:mt-8" />

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[0.82rem] sm:mt-5 sm:gap-x-5 sm:text-[0.9rem] md:gap-x-6 md:gap-y-3 md:text-[0.96rem]">
                    <span className="inline-flex items-center gap-2.5 text-white">
                        <Coins className="h-4 w-4 text-emerald-300 md:h-4.5 md:w-4.5" />
                        <span className="font-semibold tracking-[-0.02em]">{card.price}</span>
                    </span>
                    <span className="inline-flex items-center gap-2.5 text-slate-200">
                        <MapPin className="h-4 w-4 text-indigo-300 md:h-4.5 md:w-4.5" />
                        <span>{card.distance}</span>
                    </span>
                    <span className="inline-flex items-center gap-2.5 text-slate-400">
                        <CalendarDays className="h-4 w-4 text-slate-500 md:h-4.5 md:w-4.5" />
                        <span>{card.date}</span>
                    </span>
                    <span className="inline-flex items-center gap-2.5 text-slate-300">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-blue-300/14 bg-blue-400/[0.12] text-[0.72rem] font-semibold text-blue-100 sm:h-8 sm:w-8 sm:text-[0.82rem]">
                            {card.authorInitial}
                        </span>
                        <span>{card.author}</span>
                    </span>
                </div>
            </div>
        </div>
    );
});

function HeroVisual({
    reducedMotion,
    visualY,
}: {
    reducedMotion: boolean;
    visualY: MotionValue<number>;
}) {
    const sceneRef = useRef<HTMLDivElement | null>(null);
    const [isSceneVisible, setIsSceneVisible] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const scene = sceneRef.current;
        if (!scene) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSceneVisible(entry.isIntersecting);
            },
            {
                rootMargin: "120px 0px",
                threshold: 0.18,
            }
        );

        observer.observe(scene);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (reducedMotion || !isSceneVisible) return;

        let timeoutId = 0;

        const scheduleNextCard = () => {
            timeoutId = window.setTimeout(() => {
                if (document.visibilityState === "visible") {
                    setActiveIndex((current) => (current + 1) % HERO_CARDS.length);
                }

                scheduleNextCard();
            }, HERO_CARD_INTERVAL_MS);
        };

        scheduleNextCard();

        return () => window.clearTimeout(timeoutId);
    }, [isSceneVisible, reducedMotion]);

    return (
        <motion.div
            ref={sceneRef}
            data-hero-visual
            style={{ y: visualY }}
            aria-hidden="true"
            className="relative -ml-8 col-span-5 mt-0 hidden min-h-0 items-center justify-center lg:flex xl:-ml-12"
            initial={reducedMotion ? false : { opacity: 0, x: 36, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
        >
            <div
                className="pointer-events-none absolute -inset-x-24 -inset-y-24 bg-[radial-gradient(circle_at_54%_26%,rgba(96,165,250,0.18),transparent_34%),radial-gradient(circle_at_82%_68%,rgba(37,99,235,0.14),transparent_28%),radial-gradient(circle_at_14%_82%,rgba(125,211,252,0.08),transparent_24%)] blur-[24px]"
                style={{
                    maskImage:
                        "radial-gradient(ellipse 72% 68% at 58% 50%, black 46%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 72% 68% at 58% 50%, black 46%, transparent 100%)",
                }}
            />

            <div className="relative h-[320px] w-full max-w-[380px] sm:h-[390px] sm:max-w-[440px] lg:h-[560px] lg:max-w-[620px]">
                <div className="pointer-events-none absolute inset-[8%_10%_14%_14%] rounded-[120px] bg-[radial-gradient(circle_at_50%_40%,rgba(96,165,250,0.14),transparent_58%)] blur-3xl" />

                <AnimatePresence initial={false}>
                    {DESKTOP_CARD_SLOTS.map((slot, order) => {
                        const card = HERO_CARDS[(activeIndex + order) % HERO_CARDS.length];
                        const isFocused = order === 0;

                        return (
                            <motion.div
                                key={card.id}
                                data-hero-card
                                data-focused={isFocused ? "true" : "false"}
                                layout="position"
                                className={`absolute transform-gpu will-change-transform ${slot.className}`}
                                style={{ zIndex: slot.zIndex }}
                                initial={
                                    reducedMotion
                                        ? false
                                        : { opacity: 0, y: 42, scale: 0.82, rotate: slot.rotate - 4 }
                                }
                                animate={{
                                    opacity: slot.opacity,
                                    scale: slot.scale,
                                    rotate: slot.rotate,
                                    y: 0,
                                }}
                                exit={
                                    reducedMotion
                                        ? { opacity: 0 }
                                        : {
                                              opacity: 0,
                                              scale: 0.82,
                                              y: -46,
                                              rotate: slot.rotate - 4,
                                              transition: { duration: 0.34, ease: EASE },
                                          }
                                }
                                transition={{
                                    layout: CARD_STAGE_TRANSITION,
                                    opacity: { duration: 0.38, ease: EASE },
                                    scale: CARD_STAGE_TRANSITION,
                                    rotate: CARD_STAGE_TRANSITION,
                                    y: CARD_STAGE_TRANSITION,
                                }}
                            >
                                <motion.div
                                    className="transform-gpu"
                                    animate={reducedMotion || !isFocused ? { y: 0 } : { y: [0, -7, 0] }}
                                    transition={
                                        reducedMotion || !isFocused
                                            ? { duration: 0.28, ease: EASE }
                                            : {
                                                  duration: 7.2,
                                                  repeat: Number.POSITIVE_INFINITY,
                                                  ease: "easeInOut",
                                              }
                                    }
                                >
                                    <JobCard card={card} focused={isFocused} />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function handleHeroMenuNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    item: { href: string },
    isCurrent: boolean,
    reducedMotion: boolean,
    closeMenu: () => void
) {
    const { href } = item;

    if (isCurrent) {
        event.preventDefault();
        closeMenu();
        return;
    }

    if (!href.startsWith("#")) {
        closeMenu();
        return;
    }

    event.preventDefault();
    closeMenu();

    if (href === "#how-it-works") {
        scrollToHowItWorksStage(reducedMotion);
        return;
    }

    document.querySelector<HTMLElement>(href)?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
    });
}

function MenuWord({ label, active }: { label: string; active: boolean }) {
    return (
        <span className="relative block h-[1em] overflow-hidden pb-[0.055em]">
            <motion.span
                className="block will-change-transform"
                animate={{ y: active ? "-100%" : "0%" }}
                transition={{ duration: 0.72, ease: MENU_EASE }}
            >
                {label}
            </motion.span>
            <motion.span
                aria-hidden
                className="absolute inset-x-0 top-full block text-white will-change-transform"
                animate={{ y: active ? "-100%" : "0%" }}
                transition={{ duration: 0.72, ease: MENU_EASE }}
            >
                {label}
            </motion.span>
        </span>
    );
}

function HeroMenuItem({
    item,
    index,
    isCurrent,
    reducedMotion,
    onClose,
}: {
    item: (typeof HERO_MENU_ITEMS)[number];
    index: number;
    isCurrent: boolean;
    reducedMotion: boolean;
    onClose: () => void;
}) {
    const [active, setActive] = useState(false);

    return (
        <motion.a
            href={item.href}
            aria-label={item.label}
            aria-current={isCurrent ? "page" : undefined}
            onClick={(event) =>
                handleHeroMenuNavigation(event, item, isCurrent, reducedMotion, onClose)
            }
            onHoverStart={() => setActive(!isCurrent)}
            onHoverEnd={() => setActive(false)}
            onFocus={() => setActive(!isCurrent)}
            onBlur={() => setActive(false)}
            className={`hero-menu-link ${
                isCurrent
                    ? "text-white/34"
                    : "text-white/96 hover:text-white focus-visible:text-white"
            }`}
            style={{
                fontFamily: "var(--font-sans), ui-sans-serif, system-ui, sans-serif",
            }}
            initial={reducedMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.78,
                delay: 0.18 + index * 0.055,
                ease: EASE,
            }}
        >
            <MenuWord label={item.label} active={active} />
        </motion.a>
    );
}

function HeroMenuOverlay({
    open,
    pathname,
    reducedMotion,
    onClose,
}: {
    open: boolean;
    pathname: string;
    reducedMotion: boolean;
    onClose: () => void;
}) {
    useEffect(() => {
        if (!open) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose, open]);

    return (
        <AnimatePresence>
            {open ? (
                <motion.div
                    className="fixed inset-0 z-[120] overflow-hidden bg-[#050505] text-white"
                    initial={reducedMotion ? false : { y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { y: "-100%" }}
                    transition={{ duration: 0.72, ease: EASE }}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Navigation"
                >
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_58%_32%,rgba(59,130,246,0.11),transparent_34%),radial-gradient(circle_at_22%_86%,rgba(14,165,233,0.08),transparent_26%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.025),transparent_28%,rgba(255,255,255,0.018))]" />

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Menü schließen"
                        className="group absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:right-10 sm:top-10"
                    >
                        <motion.span
                            className="flex"
                            whileHover={reducedMotion ? undefined : { rotate: 90, scale: 1.05 }}
                            transition={{ duration: 0.35, ease: EASE }}
                        >
                            <X className="h-8 w-8 stroke-[1.45]" aria-hidden="true" />
                        </motion.span>
                    </button>

                    <nav
                        aria-label="Overlay Navigation"
                        className="hero-menu-nav"
                    >
                        <div className="hero-menu-items">
                            {HERO_MENU_ITEMS.map((item, index) => (
                                <HeroMenuItem
                                    key={item.label}
                                    item={item}
                                    index={index}
                                    isCurrent={item.href === pathname}
                                    reducedMotion={reducedMotion}
                                    onClose={onClose}
                                />
                            ))}
                        </div>
                    </nav>

                    <div data-hero-menu-meta className="hero-menu-meta">
                        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.8rem] font-medium text-white/44 sm:gap-x-10 sm:text-sm">
                            {HERO_MENU_META_LINKS.map((item) =>
                                item.href.startsWith("/") ? (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={onClose}
                                        className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        onClick={onClose}
                                        className="transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                                    >
                                        {item.label}
                                    </a>
                                )
                            )}
                        </div>
                    </div>

                    <div
                        data-hero-menu-wordmark
                        aria-hidden
                        className="hero-menu-wordmark"
                    >
                        JobBridge
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

function Hero() {
    const heroRef = useRef<HTMLElement | null>(null);
    const scrollRef = useRef(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname() ?? "/";
    const reducedMotion = useReducedMotion() ?? false;
    const isDesktop = useIsDesktop();
    const showCanvas = isDesktop && !reducedMotion;
    const { visibleCount: typedCount, isComplete: typewriterComplete } = useTypewriter(
        HEADLINE_TYPED_LINE,
        860,
        reducedMotion
    );
    const visibleTypedCharacters = HEADLINE_TYPED_CHARACTERS.slice(0, typedCount);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        scrollRef.current = latest;
    });

    const contentY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -72]);
    const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, reducedMotion ? 1 : 0.38]);
    const visualY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : -36]);

    return (
        <section
            ref={heroRef}
            aria-label="JobBridge Hero"
            className="relative min-h-[calc(100svh-1rem)] w-full overflow-hidden rounded-[24px] border border-white/10 bg-[#030712] text-white shadow-[0_40px_140px_rgba(2,6,23,0.55)] sm:min-h-[calc(100svh-1.5rem)] sm:rounded-[28px] lg:min-h-[calc(100svh-2rem)] lg:rounded-[32px]"
            style={{
                backgroundImage: showCanvas ? undefined : MOBILE_NOISE_URL,
                backgroundColor: "#030712",
            }}
        >
            {showCanvas ? <AuroraCanvas scrollRef={scrollRef} /> : null}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(96,165,250,0.14),transparent_30%),radial-gradient(circle_at_72%_38%,rgba(59,130,246,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_26%),linear-gradient(180deg,rgba(3,7,18,0.04),rgba(3,7,18,0.28))]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.08]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#02040b] to-transparent" />

            <HeroMenuOverlay
                open={menuOpen}
                pathname={pathname}
                reducedMotion={reducedMotion}
                onClose={() => setMenuOpen(false)}
            />

            <div className="relative z-10 mx-auto grid min-h-[calc(100svh-1rem)] w-full max-w-[1760px] grid-cols-12 grid-rows-[auto_minmax(0,1fr)] gap-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:min-h-[calc(100svh-1.5rem)] sm:px-7 sm:pb-8 sm:pt-6 md:px-10 md:pb-10 md:pt-8 lg:min-h-[calc(100svh-2rem)] lg:grid-rows-none lg:gap-0 xl:px-12 2xl:px-16">
                <motion.div
                    className="col-span-12 flex h-16 items-center justify-between"
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.72, delay: 0.04, ease: EASE }}
                >
                    <Link
                        href="/"
                        aria-label="JobBridge Startseite"
                        className="group flex min-w-0 items-center gap-3 rounded-[1.45rem] py-1 pr-3 outline-none transition focus-visible:ring-2 focus-visible:ring-cyan-200/70"
                    >
                        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[1.15rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.035))] shadow-[0_12px_34px_rgba(2,6,23,0.38)] transition group-hover:border-cyan-100/28 group-hover:bg-white/[0.075]">
                            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_34%_22%,rgba(125,211,252,0.2),transparent_44%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_52%)]" />
                            <Image
                                src="/favicon.ico"
                                alt=""
                                width={48}
                                height={48}
                                unoptimized
                                priority
                                className="relative h-11 w-11 max-w-none scale-[1.08] object-contain object-center drop-shadow-[0_4px_14px_rgba(56,189,248,0.2)]"
                            />
                        </span>
                        <span className="min-w-0">
                            <span className="block truncate text-[1.04rem] font-semibold tracking-normal text-white">
                                JobBridge
                            </span>
                        </span>
                    </Link>

                    <div className="flex items-center">
                        <motion.button
                            type="button"
                            onClick={() => setMenuOpen(true)}
                            aria-label="Menü öffnen"
                            aria-expanded={menuOpen}
                            className="group flex h-11 w-11 items-center justify-center rounded-[1.15rem] border border-white/10 bg-white/[0.045] text-white shadow-[0_10px_35px_rgba(2,6,23,0.24)] backdrop-blur-xl transition hover:border-white/18 hover:bg-white/[0.075] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70"
                            whileHover={reducedMotion ? undefined : { y: -1 }}
                            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                        >
                            <motion.span
                                className="flex"
                                whileHover={reducedMotion ? undefined : { rotate: 90 }}
                                transition={{ duration: 0.35, ease: EASE }}
                            >
                                <Menu className="h-[1.125rem] w-[1.125rem] stroke-[1.8]" aria-hidden="true" />
                            </motion.span>
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    style={{ y: contentY, opacity: contentOpacity }}
                    className="col-span-12 row-start-2 flex min-h-0 flex-col justify-between pb-4 pt-[clamp(2rem,7svh,4.5rem)] sm:pt-12 lg:row-auto lg:col-span-7 lg:justify-center lg:pb-6 lg:pr-10 lg:pt-0 xl:pr-14"
                >
                    <motion.div
                        className="max-w-[760px]"
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
                    >
                        <motion.h1
                            aria-label={`${HEADLINE_PRIMARY_LINE} ${HEADLINE_TYPED_LINE}`}
                            className="text-balance text-[clamp(3.12rem,10.2vw,8.4rem)] font-normal leading-[1.035] tracking-[-0.04em] text-white drop-shadow-[0_14px_40px_rgba(96,165,250,0.08)] sm:text-[clamp(3.35rem,9vw,8.4rem)] sm:leading-[0.97]"
                            style={{
                                fontFamily: "var(--font-serif), ui-serif, Georgia, serif",
                            }}
                            initial={false}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                duration: 1,
                                delay: 0.16,
                                ease: EASE,
                            }}
                        >
                            <span aria-hidden="true" className="block whitespace-nowrap pb-[0.14em] sm:pb-[0.05em]">
                                {HEADLINE_PRIMARY_LINE.split(" ").map((word, wordIndex) => (
                                    <Fragment key={`${word}-${wordIndex}`}>
                                        {wordIndex > 0 ? " " : null}
                                        <motion.span
                                            className="inline-block will-change-transform"
                                            initial={false}
                                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                                            transition={{
                                                duration: 0.78,
                                                delay: 0.26 + wordIndex * 0.09,
                                                ease: EASE,
                                            }}
                                        >
                                            {word}
                                        </motion.span>
                                    </Fragment>
                                ))}
                            </span>

                            <span aria-hidden="true" className="relative -mt-[0.06em] block min-h-[1.08em] whitespace-nowrap pb-[0.08em] sm:-mt-[0.12em] sm:min-h-[1.02em] sm:pb-[0.02em]">
                                <span
                                    aria-hidden
                                    className="pointer-events-none select-none opacity-0"
                                >
                                    {HEADLINE_TYPED_LINE}
                                </span>

                                <span className="pointer-events-none absolute inset-0 inline-flex items-end whitespace-nowrap">
                                    {visibleTypedCharacters.map((character, index) => (
                                        <motion.span
                                            key={`${character}-${index}`}
                                            className="inline-block whitespace-pre bg-[linear-gradient(90deg,#ffffff_0%,#dbeafe_54%,#79adff_100%)] bg-clip-text text-transparent will-change-transform"
                                            initial={false}
                                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                            transition={{
                                                duration: 0.3,
                                                ease: EASE,
                                            }}
                                        >
                                            {character === " " ? "\u00A0" : character}
                                        </motion.span>
                                    ))}

                                    <motion.span
                                        aria-hidden
                                        className="relative ml-[0.045em] inline-block h-[0.76em] w-[0.042em] rounded-[1px] bg-blue-100/95 shadow-[0_0_16px_rgba(191,219,254,0.36)]"
                                        style={{ top: "-0.09em" }}
                                        animate={
                                            reducedMotion
                                                ? { opacity: 0 }
                                                : typewriterComplete
                                                  ? { opacity: [1, 0.28, 1, 0.22, 1, 0] }
                                                  : { opacity: [1, 0.2, 1] }
                                        }
                                        transition={
                                            reducedMotion
                                                ? { duration: 0 }
                                                : typewriterComplete
                                                  ? {
                                                        duration: 2.85,
                                                        times: [0, 0.18, 0.4, 0.6, 0.82, 1],
                                                        ease: "easeInOut",
                                                    }
                                                  : {
                                                        duration: 0.9,
                                                        repeat: Number.POSITIVE_INFINITY,
                                                        ease: "easeInOut",
                                                    }
                                        }
                                    />
                                </span>
                            </span>
                        </motion.h1>

                        <motion.p
                            className="mt-8 max-w-[39rem] text-lg leading-relaxed text-slate-300 md:text-xl"
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.82, delay: 1.44, ease: EASE }}
                        >
                            JobBridge bringt Jugendliche, Eltern und Auftraggeber in Deutschland auf eine Plattform, die Schutz nicht als Nachtrag behandelt. Verifizierte Auftraggeber, moderierte Kommunikation und klare Freigaben machen den Einstieg besser.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        data-hero-ctas
                        className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-9"
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.82, delay: 1.58, ease: EASE }}
                    >
                        <a
                            href="https://app.jobbridge.app"
                            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-[0.9rem] font-medium text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-[0_18px_48px_rgba(147,197,253,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                        >
                            Zur Plattform
                        </a>
                        <button
                            type="button"
                            onClick={() => {
                                scrollToHowItWorksStage(reducedMotion);
                            }}
                            className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-7 py-4 text-[0.9rem] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/28 hover:bg-blue-400/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
                        >
                            So funktioniert&apos;s
                        </button>
                    </motion.div>
                </motion.div>

                {isDesktop ? <HeroVisual reducedMotion={reducedMotion} visualY={visualY} /> : null}
            </div>
        </section>
    );
}

export { Hero };
