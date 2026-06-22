"use client";

import { useCallback, useRef, useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";

const CHAT_SCRIPT_ID = "chatbot";
const CHAT_SCRIPT_SRC =
    "https://res.public.onecdn.static.microsoft/customerconnect/v1/7dttl/init.js";
const CHAT_ENVIRONMENT_ID = "5775358a-419f-e9cd-b8ef-33eda7dcd054";
const CHAT_REGION = "europe";
const TEAMS_BUTTON_SELECTOR = "img.chatclient-button";
const TEAMS_IFRAME_SELECTOR =
    "iframe[id^='teams-chat-bot-iframe'], iframe[title='Customer Connect chat bot assistant']";

type ChatStatus = "idle" | "loading" | "ready" | "error";

let chatScriptPromise: Promise<void> | null = null;

function getTeamsButton() {
    return document.querySelector<HTMLImageElement>(TEAMS_BUTTON_SELECTOR);
}

function getTeamsIframe() {
    return document.querySelector<HTMLIFrameElement>(TEAMS_IFRAME_SELECTOR);
}

function waitForTeamsWidget(timeoutMs = 8000) {
    if (getTeamsButton() || getTeamsIframe()) {
        return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
        const timeout = window.setTimeout(() => {
            cleanup();
            reject(new Error("Teams chat widget did not become ready in time."));
        }, timeoutMs);

        const observer = new MutationObserver(() => {
            if (getTeamsButton() || getTeamsIframe()) {
                cleanup();
                resolve();
            }
        });

        const cleanup = () => {
            window.clearTimeout(timeout);
            observer.disconnect();
        };

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    });
}

function ensureTeamsChatScript() {
    if (getTeamsButton() || getTeamsIframe()) {
        return Promise.resolve();
    }

    if (chatScriptPromise) {
        return chatScriptPromise;
    }

    chatScriptPromise = new Promise<void>((resolve, reject) => {
        const existingScript = document.getElementById(CHAT_SCRIPT_ID);

        if (existingScript) {
            waitForTeamsWidget().then(resolve).catch(reject);
            return;
        }

        const script = document.createElement("script");
        script.id = CHAT_SCRIPT_ID;
        script.type = "text/javascript";
        script.src = CHAT_SCRIPT_SRC;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.setAttribute("environmentId", CHAT_ENVIRONMENT_ID);
        script.setAttribute("region", CHAT_REGION);

        script.addEventListener("load", () => {
            waitForTeamsWidget().then(resolve).catch(reject);
        });

        script.addEventListener("error", () => {
            chatScriptPromise = null;
            reject(new Error("Teams chat script failed to load."));
        });

        document.body.appendChild(script);
    });

    return chatScriptPromise;
}

function openTeamsChat() {
    const iframe = getTeamsIframe();

    if (iframe) {
        iframe.contentWindow?.focus();
        return;
    }

    const teamsButton = getTeamsButton();

    if (!teamsButton) {
        throw new Error("Teams chat button is unavailable.");
    }

    teamsButton.click();
}

function getButtonLabel(status: ChatStatus) {
    if (status === "loading") {
        return "Chat öffnet...";
    }

    if (status === "error") {
        return "Chat erneut öffnen";
    }

    return "Chat öffnen";
}

export function FooterChat() {
    const [status, setStatus] = useState<ChatStatus>("idle");
    const isOpeningRef = useRef(false);

    const openChat = useCallback(async () => {
        if (isOpeningRef.current) {
            return;
        }

        isOpeningRef.current = true;
        setStatus("loading");

        try {
            await ensureTeamsChatScript();
            openTeamsChat();
            setStatus("ready");
        } catch {
            chatScriptPromise = null;
            setStatus("error");
        } finally {
            isOpeningRef.current = false;
        }
    }, []);

    const isLoading = status === "loading";

    return (
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
                        Öffnet den Microsoft Teams-Chat direkt auf dieser Seite.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openChat}
                    disabled={isLoading}
                    className="inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg border border-white/10 bg-white px-4 text-sm font-medium text-neutral-950 transition hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-70"
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    )}
                    {getButtonLabel(status)}
                </button>
            </div>
        </section>
    );
}
