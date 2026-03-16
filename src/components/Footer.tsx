"use client";

import Link from "next/link";
import { reportConversion } from "@/lib/gtag";
import { Leaf } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black relative z-10">
            <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-500">
                    <div className="text-sm">
                        <span className="font-semibold text-white">JobBridge</span>{" "}
                        – die digitale Taschengeldbörse für Rheinbach
                    </div>
                    <nav aria-label="Footer-Navigation" className="flex gap-8 text-sm">
                        <a
                            href="https://app.jobbridge.app"
                            className="hover:text-white transition-colors cursor-pointer"
                            onClick={() => reportConversion()}
                        >
                            Zur Plattform
                        </a>
                        <Link href="/impressum" className="hover:text-white transition-colors">
                            Impressum
                        </Link>
                        <Link href="/datenschutz" className="hover:text-white transition-colors">
                            Datenschutz
                        </Link>
                    </nav>
                </div>
                
                <div className="flex justify-center md:justify-start">
                    <a 
                        href="https://climate.stripe.com/rXyipE" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-xs text-neutral-500 hover:text-emerald-400 transition-colors duration-300"
                    >
                        <Leaf className="w-3 h-3" />
                        <span>Wir spenden 5 % unserer Einnahmen für die CO₂-Entnahme.</span>
                        <span className="underline decoration-neutral-700 underline-offset-2 group-hover:decoration-emerald-400/50 transition-colors">Mehr erfahren</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
