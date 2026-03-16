"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reportConversion } from "@/lib/gtag";
import { homePageConfig } from "@/config/site";

function Hero() {
    const [titleNumber, setTitleNumber] = useState(0);
    const titles = useMemo(
        () => ["sicher", "fair", "transparent", "jugendfreundlich", "lokal"],
        []
    );

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    return (
        <div className="w-full relative z-20">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-center gap-6 py-4 text-center md:py-6">
                    {homePageConfig.showRayGroupBadgeInHero && (
                        <div>
                            <a
                                href="https://ray-group.eu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur px-3 py-1 text-sm text-white hover:bg-white/10 transition-colors cursor-pointer"
                            >
                                Ein Projekt der Ray Group <MoveRight className="ml-2 w-4 h-4" />
                            </a>
                        </div>
                    )}
                    <div className="flex gap-4 flex-col">
                        <h1 className="text-4xl md:text-6xl max-w-4xl tracking-tight text-center font-semibold text-white leading-tight">
                            JobBridge verbindet Jugendliche und Auftraggeber –
                            <span className="relative flex w-full justify-center overflow-hidden text-center h-[1.2em]">
                                &nbsp;
                                {titles.map((title, index) => (
                                    <motion.span
                                        key={index}
                                        className="absolute font-semibold text-cyan-200"
                                        initial={{ opacity: 0, y: "100%" }}
                                        transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                        animate={
                                            titleNumber === index
                                                ? { y: 0, opacity: 1 }
                                                : { y: titleNumber > index ? "-100%" : "100%", opacity: 0 }
                                        }
                                    >
                                        {title}
                                    </motion.span>
                                ))}
                            </span>
                        </h1>

                        <p className="text-base md:text-lg leading-relaxed tracking-tight text-neutral-200 max-w-2xl text-center mx-auto">
                            Die Plattform für Taschengeldjobs in deiner Nähe: Jugendliche finden sichere Aufgaben in Rheinbach und Umgebung, Eltern behalten den Überblick und Auftraggeber erhalten geprüfte Unterstützung.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4 mt-4">
                        <Button
                            size="lg"
                            className="gap-3 rounded-full px-8 bg-white text-black hover:bg-white/90"
                            asChild
                        >
                            <a
                                href="https://app.jobbridge.app"
                                onClick={() => reportConversion()}
                            >
                                Zur Plattform <MoveRight className="w-4 h-4" />
                            </a>
                        </Button>
                        <Button
                            size="lg"
                            className="gap-3 rounded-full px-8 border-white/20 hover:bg-white/10 text-white cursor-pointer"
                            variant="outline"
                            onClick={() => {
                                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            Mehr erfahren
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export { Hero };
