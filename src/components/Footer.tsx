"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { FooterChat } from "./FooterChat";

export function Footer({ showChat = true }: { showChat?: boolean }) {
    return (
        <>
            {showChat ? <FooterChat /> : null}

            <footer className="relative z-10 border-t border-white/10 bg-black">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-12 pt-8">
                    <div className="flex flex-col items-center justify-between gap-6 text-neutral-500 md:flex-row">
                        <div className="text-sm">
                            <span className="font-semibold text-white">JobBridge</span>{" "}
                            – die digitale Taschengeldbörse für Deutschland
                        </div>
                        <nav aria-label="Footer-Navigation" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
                            <a
                                href="https://app.jobbridge.app"
                                className="cursor-pointer transition-colors hover:text-white"
                            >
                                Zur Plattform
                            </a>
                            <Link href="/einblicke" className="transition-colors hover:text-white">
                                Einblicke
                            </Link>
                            <Link href="/impressum" className="transition-colors hover:text-white">
                                Impressum
                            </Link>
                            <Link href="/datenschutz" className="transition-colors hover:text-white">
                                Datenschutz
                            </Link>
                        </nav>
                    </div>

                    <div className="flex justify-center md:justify-start">
                        <a
                            href="https://climate.stripe.com/rXyipE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 text-xs text-neutral-500 transition-colors duration-300 hover:text-emerald-400"
                        >
                            <Leaf className="h-3 w-3" />
                            <span>Wir spenden 5 % unserer Einnahmen für die CO₂-Entnahme.</span>
                            <span className="underline decoration-neutral-700 underline-offset-2 transition-colors group-hover:decoration-emerald-400/50">
                                Mehr erfahren
                            </span>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
}
