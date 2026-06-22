"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    Loader2,
    MessageCircle,
    PanelRightClose,
    PanelRightOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CHAT_ENVIRONMENT_ID = "5775358a-419f-e9cd-b8ef-33eda7dcd054";
const CHAT_REGION = "europe";

export function FooterChat() {
    const [hasOpened, setHasOpened] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isFrameReady, setIsFrameReady] = useState(false);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const chatUrl = useMemo(() => {
        const url = new URL(
            "https://customerconnect.teams.usercontent.microsoft/customer-service-chatbot",
        );

        url.searchParams.set("environmentId", CHAT_ENVIRONMENT_ID);
        url.searchParams.set("region", CHAT_REGION);

        return url.toString();
    }, []);

    const notifyFrameResize = useCallback(() => {
        iframeRef.current?.contentWindow?.postMessage(
            {
                type: "resize",
                height: window.innerHeight.toString(),
            },
            "*",
        );
    }, []);

    const openChat = useCallback(() => {
        setHasOpened(true);
        setIsExpanded(true);

        window.requestAnimationFrame(notifyFrameResize);
    }, [notifyFrameResize]);

    const collapseChat = useCallback(() => {
        setIsExpanded(false);
    }, []);

    useEffect(() => {
        if (!hasOpened) {
            return;
        }

        window.addEventListener("resize", notifyFrameResize);
        notifyFrameResize();

        return () => {
            window.removeEventListener("resize", notifyFrameResize);
        };
    }, [hasOpened, notifyFrameResize]);

    const chatPanel = typeof document !== "undefined" && hasOpened
        ? createPortal(
            <>
                <aside
                    aria-label="JobBridge Chatfenster"
                    aria-hidden={!isExpanded}
                    inert={!isExpanded}
                    className={cn(
                        "fixed inset-y-0 right-0 z-[100] flex w-full max-w-[28rem] flex-col border-l border-white/10 bg-[#05070d] text-white shadow-[-18px_0_60px_rgba(0,0,0,0.38)] transition-transform duration-300 ease-out motion-reduce:transition-none sm:w-[28rem]",
                        isExpanded ? "translate-x-0" : "pointer-events-none translate-x-full",
                    )}
                >
                    <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-white">
                                JobBridge Chat
                            </p>
                            <p className="truncate text-xs text-neutral-500">
                                Unterhaltung bleibt erhalten
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={collapseChat}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200"
                            aria-label="Chat einklappen"
                        >
                            <PanelRightClose className="h-4 w-4" aria-hidden="true" />
                        </button>
                    </div>

                    <div className="relative min-h-0 flex-1 bg-white">
                        {!isFrameReady ? (
                            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#05070d] text-neutral-400">
                                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                            </div>
                        ) : null}

                        <iframe
                            ref={iframeRef}
                            src={chatUrl}
                            title="JobBridge Chat"
                            sandbox="allow-scripts allow-same-origin"
                            className="h-full w-full border-0"
                            onLoad={() => {
                                setIsFrameReady(true);
                                notifyFrameResize();
                            }}
                        />
                    </div>
                </aside>

                {!isExpanded ? (
                    <button
                        type="button"
                        onClick={openChat}
                        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[100] inline-flex h-11 items-center gap-2 rounded-lg border border-white/10 bg-white px-4 text-sm font-medium text-neutral-950 shadow-[0_14px_40px_rgba(0,0,0,0.32)] transition hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040b]"
                    >
                        <PanelRightOpen className="h-4 w-4" aria-hidden="true" />
                        Chat
                    </button>
                ) : null}
            </>,
            document.body,
        )
        : null;

    return (
        <>
            <section
                aria-label="JobBridge Chat"
                className="border-t border-white/10 pt-8"
            >
                <div className="grid gap-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
                    <div className="max-w-2xl">
                        <h2 className="text-base font-medium text-white">
                            Fragen zu JobBridge?
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-neutral-500">
                            Schreibe direkt im Chat, ohne die Seite zu verlassen.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openChat}
                        className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg border border-white/10 bg-white px-4 text-sm font-medium text-neutral-950 transition hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    >
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        Chat öffnen
                    </button>
                </div>
            </section>

            {chatPanel}
        </>
    );
}
