"use client";

import Image from "next/image";
import { Fragment, type MutableRefObject, useEffect, useRef, useState } from "react";
import {
    animate,
    motion,
    type MotionValue,
    useMotionValueEvent,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";
import {
    BookOpenText,
    CalendarDays,
    Coins,
    Leaf,
    MapPin,
    PawPrint,
    ShoppingBag,
    Smartphone,
    Wrench,
} from "lucide-react";
import { reportConversion } from "@/lib/gtag";

const HEADLINE_PRIMARY_LINE = "Dein erster Job.";
const HEADLINE_TYPED_LINE = "Aber sicher.";
const HEADLINE_TYPED_CHARACTERS = Array.from(HEADLINE_TYPED_LINE);
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MOBILE_NOISE_URL =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 240 240'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='240' height='240' filter='url(%23noise)' opacity='0.09'/%3E%3C/svg%3E\")";

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
    blur: number;
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
        date: "25.3.2026",
        author: "Rezan Yalçin",
        authorInitial: "R",
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
        date: "26.3.2026",
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
        date: "29.3.2026",
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
        date: "30.3.2026",
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
        date: "28.3.2026",
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
        date: "31.3.2026",
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
        blur: 0,
        zIndex: 40,
    },
    {
        className: "left-[70%] top-[3%] w-[74%] max-w-[420px] -translate-x-1/2",
        scale: 0.92,
        rotate: 5.5,
        opacity: 0.52,
        blur: 0.6,
        zIndex: 28,
    },
    {
        className: "left-[39%] top-[46%] w-[74%] max-w-[420px] -translate-x-1/2",
        scale: 0.86,
        rotate: -6.5,
        opacity: 0.34,
        blur: 1,
        zIndex: 20,
    },
    {
        className: "left-[81%] top-[30%] w-[68%] max-w-[370px] -translate-x-1/2",
        scale: 0.78,
        rotate: 7.5,
        opacity: 0.16,
        blur: 1.6,
        zIndex: 10,
    },
];

const MOBILE_CARD_SLOTS: CardSlot[] = [
    {
        className: "left-1/2 top-[5%] w-[92%] max-w-[340px] -translate-x-1/2",
        scale: 1,
        rotate: -1.2,
        opacity: 1,
        blur: 0,
        zIndex: 40,
    },
    {
        className: "left-[59%] top-[1%] w-[84%] max-w-[308px] -translate-x-1/2",
        scale: 0.9,
        rotate: 5.2,
        opacity: 0.24,
        blur: 1,
        zIndex: 24,
    },
    {
        className: "left-[43%] top-[28%] w-[82%] max-w-[296px] -translate-x-1/2",
        scale: 0.82,
        rotate: -5.8,
        opacity: 0.14,
        blur: 1.8,
        zIndex: 14,
    },
];

const HIDDEN_CARD_SLOT: CardSlot = {
    className: "left-[84%] top-[34%] w-[70%] max-w-[320px] -translate-x-1/2",
    scale: 0.74,
    rotate: 8,
    opacity: 0,
    blur: 2,
    zIndex: 0,
};

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

function useIsWideCardScene(): boolean {
    const [isWide, setIsWide] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");
        const update = () => setIsWide(mediaQuery.matches);

        update();
        mediaQuery.addEventListener("change", update);

        return () => mediaQuery.removeEventListener("change", update);
    }, []);

    return isWide;
}

function useTypewriter(text: string, startDelay: number, reducedMotion: boolean) {
    const [visibleCount, setVisibleCount] = useState(reducedMotion ? text.length : 0);
    const [isComplete, setIsComplete] = useState(reducedMotion);

    useEffect(() => {
        if (reducedMotion) {
            setVisibleCount(text.length);
            setIsComplete(true);
            return;
        }

        setVisibleCount(0);
        setIsComplete(false);

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

    return { visibleCount, isComplete };
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

function getCardOrder(index: number, activeIndex: number, total: number) {
    return (index - activeIndex + total) % total;
}

function JobCard({
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
                    ? "border border-white/14 bg-[linear-gradient(180deg,rgba(24,35,62,0.96),rgba(14,22,40,0.92))] backdrop-blur-[18px] shadow-[0_38px_120px_rgba(2,6,23,0.52)]"
                    : "border border-white/8 bg-[linear-gradient(180deg,rgba(18,28,50,0.68),rgba(14,21,38,0.56))] backdrop-blur-[8px] shadow-[0_18px_72px_rgba(2,6,23,0.34)]"
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
}

function HeroVisual({
    reducedMotion,
    visualY,
}: {
    reducedMotion: boolean;
    visualY: MotionValue<number>;
}) {
    const isWideCardScene = useIsWideCardScene();
    const [activeIndex, setActiveIndex] = useState(0);
    const slots = isWideCardScene ? DESKTOP_CARD_SLOTS : MOBILE_CARD_SLOTS;

    useEffect(() => {
        if (reducedMotion) return;

        const intervalId = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % HERO_CARDS.length);
        }, 4200);

        return () => window.clearInterval(intervalId);
    }, [reducedMotion]);

    return (
        <motion.div
            style={{ y: visualY }}
            className="relative col-span-12 mt-8 flex min-h-[320px] items-start justify-center sm:mt-10 sm:min-h-[380px] lg:-ml-8 lg:col-span-5 lg:mt-0 lg:min-h-0 lg:items-center xl:-ml-12"
            initial={reducedMotion ? false : { opacity: 0, x: 36, scale: 0.97, filter: "blur(24px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 0.5, ease: EASE }}
        >
            <div
                className="absolute -inset-x-24 -inset-y-24 bg-[radial-gradient(circle_at_54%_26%,rgba(96,165,250,0.18),transparent_34%),radial-gradient(circle_at_82%_68%,rgba(37,99,235,0.14),transparent_28%),radial-gradient(circle_at_14%_82%,rgba(125,211,252,0.08),transparent_24%)] blur-[24px]"
                style={{
                    maskImage:
                        "radial-gradient(ellipse 72% 68% at 58% 50%, black 46%, transparent 100%)",
                    WebkitMaskImage:
                        "radial-gradient(ellipse 72% 68% at 58% 50%, black 46%, transparent 100%)",
                }}
            />

            <div className="relative h-[320px] w-full max-w-[380px] sm:h-[390px] sm:max-w-[440px] lg:h-[560px] lg:max-w-[620px]">
                <div className="pointer-events-none absolute inset-[8%_10%_14%_14%] rounded-[120px] bg-[radial-gradient(circle_at_50%_40%,rgba(96,165,250,0.14),transparent_58%)] blur-3xl" />

                {HERO_CARDS.map((card, index) => {
                    const order = getCardOrder(index, activeIndex, HERO_CARDS.length);
                    const slot = slots[order] ?? HIDDEN_CARD_SLOT;
                    const isFocused = order === 0;
                    const targetOpacity = isFocused ? 1 : slot.opacity;

                    return (
                        <motion.div
                            key={card.id}
                            layout
                            className={`absolute ${slot.className}`}
                            style={{ zIndex: slot.zIndex }}
                            initial={
                                reducedMotion
                                    ? false
                                    : { opacity: 0, y: 36, scale: 0.92, filter: "blur(16px)" }
                            }
                            animate={{
                                opacity: targetOpacity,
                                scale: slot.scale,
                                rotate: slot.rotate,
                                filter: `blur(${slot.blur}px)`,
                                y: 0,
                            }}
                            transition={{
                                layout: {
                                    type: "spring",
                                    stiffness: 108,
                                    damping: 24,
                                    mass: 0.9,
                                },
                                opacity: { duration: 0.55, ease: EASE },
                                scale: { duration: 0.78, ease: EASE },
                                rotate: { duration: 0.78, ease: EASE },
                                filter: { duration: 0.78, ease: EASE },
                                y: { duration: 0.78, ease: EASE },
                            }}
                        >
                            <motion.div
                                animate={reducedMotion ? { y: 0 } : isFocused ? { y: [0, -10, 0] } : { y: [0, 4, 0] }}
                                transition={
                                    reducedMotion
                                        ? { duration: 0 }
                                        : {
                                              duration: isFocused ? 6.8 : 8.6,
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
            </div>
        </motion.div>
    );
}

function Hero() {
    const heroRef = useRef<HTMLElement | null>(null);
    const scrollRef = useRef(0);
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
            className="relative min-h-[calc(100svh-2rem)] w-full max-w-[1760px] overflow-hidden rounded-[32px] border border-white/10 bg-[#030712] text-white shadow-[0_40px_140px_rgba(2,6,23,0.55)] lg:h-[calc(100vh-2rem)] lg:min-h-[760px]"
            style={{
                backgroundImage: showCanvas ? undefined : MOBILE_NOISE_URL,
                backgroundColor: "#030712",
            }}
        >
            {showCanvas ? <AuroraCanvas scrollRef={scrollRef} /> : null}

            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(96,165,250,0.14),transparent_30%),radial-gradient(circle_at_72%_38%,rgba(59,130,246,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_26%),linear-gradient(180deg,rgba(3,7,18,0.04),rgba(3,7,18,0.28))]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.08]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#02040b] to-transparent" />

            <div className="relative z-10 grid grid-cols-12 gap-6 px-6 pb-10 pt-6 sm:pb-12 md:px-8 md:pb-10 md:pt-8 lg:h-full lg:gap-0 xl:px-10">
                <motion.div
                    className="col-span-12 flex h-16 items-center justify-between"
                    initial={reducedMotion ? false : { opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.72, delay: 0.04, ease: EASE }}
                >
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_10px_35px_rgba(2,6,23,0.35)]">
                            <Image
                                src="/favicon.ico"
                                alt=""
                                width={30}
                                height={30}
                                unoptimized
                                priority
                                className="h-[30px] w-[30px] scale-[1.28] object-cover"
                            />
                        </div>
                        <span className="text-[1rem] font-medium tracking-[0.01em] text-white">
                            JobBridge
                        </span>
                    </div>
                    <span
                        className="text-right text-[0.95rem] tracking-[0.01em] text-slate-200/82 md:text-[1.05rem]"
                        style={{
                            fontFamily: "var(--font-serif), ui-serif, Georgia, serif",
                        }}
                    >
                        Die digitale Taschengeldbörse
                    </span>
                </motion.div>

                <motion.div
                    style={{ y: contentY, opacity: contentOpacity }}
                    className="col-span-12 flex flex-col justify-start pt-4 lg:col-span-7 lg:justify-center lg:pb-6 lg:pr-10 lg:pt-0 xl:pr-14"
                >
                    <motion.div
                        className="max-w-[760px]"
                        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
                    >
                        <motion.h1
                            className="text-balance text-[clamp(3.6rem,9vw,8.4rem)] font-normal leading-[0.97] tracking-[-0.045em] text-white drop-shadow-[0_14px_40px_rgba(96,165,250,0.08)]"
                            style={{
                                fontFamily: "var(--font-serif), ui-serif, Georgia, serif",
                            }}
                            initial={reducedMotion ? false : { opacity: 0, y: 60, filter: "blur(18px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                duration: 1,
                                delay: 0.16,
                                ease: EASE,
                            }}
                        >
                            <span className="block whitespace-nowrap pb-[0.05em]">
                                {HEADLINE_PRIMARY_LINE.split(" ").map((word, wordIndex) => (
                                    <Fragment key={`${word}-${wordIndex}`}>
                                        {wordIndex > 0 ? " " : null}
                                        <motion.span
                                            className="inline-block will-change-transform"
                                            initial={reducedMotion ? false : { y: 30, opacity: 0, filter: "blur(10px)" }}
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

                            <span className="relative -mt-[0.12em] block min-h-[1.02em] whitespace-nowrap pb-[0.02em]">
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
                                            initial={reducedMotion ? false : { opacity: 0, y: 10, filter: "blur(10px)" }}
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
                            initial={reducedMotion ? false : { opacity: 0, y: 26 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.82, delay: 1.44, ease: EASE }}
                        >
                            JobBridge bringt Jugendliche, Eltern und lokale Auftraggeber in Rheinbach auf eine Plattform, die Schutz nicht als Nachtrag behandelt. Verifizierte Auftraggeber, moderierte Kommunikation und klare Freigaben machen den Einstieg besser.
                        </motion.p>

                        <motion.div
                            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
                            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.82, delay: 1.58, ease: EASE }}
                        >
                            <a
                                href="https://app.jobbridge.app"
                                onClick={() => reportConversion()}
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
                </motion.div>

                <HeroVisual reducedMotion={reducedMotion} visualY={visualY} />
            </div>
        </section>
    );
}

export { Hero };
