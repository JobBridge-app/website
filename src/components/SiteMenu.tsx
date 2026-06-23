"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { mainNavItems, menuMetaLinks } from "@/config/site";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const MENU_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const MENU_ITEMS = mainNavItems;
const META_LINKS = menuMetaLinks;

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

function MenuItem({
    item,
    index,
    current,
    reducedMotion,
    onClose,
}: {
    item: (typeof MENU_ITEMS)[number];
    index: number;
    current: boolean;
    reducedMotion: boolean;
    onClose: () => void;
}) {
    const [active, setActive] = useState(false);

    return (
        <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.78, delay: 0.18 + index * 0.055, ease: EASE }}
        >
            <Link
                href={item.href}
                aria-label={item.label}
                aria-current={current ? "page" : undefined}
                onClick={onClose}
                onMouseEnter={() => setActive(!current)}
                onMouseLeave={() => setActive(false)}
                onFocus={() => setActive(!current)}
                onBlur={() => setActive(false)}
                className={`hero-menu-link ${
                    current ? "text-white/34" : "text-white/96 hover:text-white focus-visible:text-white"
                }`}
            >
                <MenuWord label={item.label} active={active} />
            </Link>
        </motion.div>
    );
}

function MenuOverlay({
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

                    <nav aria-label="Overlay Navigation" className="hero-menu-nav">
                        <div className="hero-menu-items">
                            {MENU_ITEMS.map((item, index) => (
                                <MenuItem
                                    key={item.label}
                                    item={item}
                                    index={index}
                                    current={item.href === pathname}
                                    reducedMotion={reducedMotion}
                                    onClose={onClose}
                                />
                            ))}
                        </div>
                    </nav>

                    <div className="hero-menu-meta">
                        <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-[0.8rem] font-medium text-white/44 sm:gap-x-10 sm:text-sm">
                            {META_LINKS.map((item) => {
                                const current = item.href === pathname;
                                const className = `transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                                    current ? "text-white/78" : "hover:text-white"
                                }`;

                                return item.href.startsWith("/") ? (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        aria-current={current ? "page" : undefined}
                                        onClick={onClose}
                                        className={className}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        aria-current={current ? "page" : undefined}
                                        onClick={onClose}
                                        className={className}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div aria-hidden className="hero-menu-wordmark">
                        JobBridge
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

export function SiteMenuButton({ className = "" }: { className?: string }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname() ?? "/";
    const reducedMotion = useReducedMotion() ?? false;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Menü öffnen"
                className={`group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.035] text-white shadow-[0_16px_44px_rgba(2,6,23,0.22)] backdrop-blur transition hover:border-blue-200/25 hover:bg-blue-400/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${className}`}
            >
                <motion.span
                    className="flex"
                    whileHover={reducedMotion ? undefined : { rotate: 90, scale: 1.05 }}
                    transition={{ duration: 0.42, ease: EASE }}
                >
                    <Menu className="h-[1.125rem] w-[1.125rem] stroke-[1.8]" aria-hidden="true" />
                </motion.span>
            </button>

            <MenuOverlay
                open={open}
                pathname={pathname}
                reducedMotion={reducedMotion}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
