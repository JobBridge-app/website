"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, MessageCircle } from "lucide-react";

const CHAT_SCRIPT_ID = "chatbot";
const CHAT_WIDGET_STYLE_ID = "jobbridge-chat-widget-overrides";
const CHAT_SCRIPT_SRC =
    "https://res.public.onecdn.static.microsoft/customerconnect/v1/7dttl/init.js";
const CHAT_ENVIRONMENT_ID = "5775358a-419f-e9cd-b8ef-33eda7dcd054";
const CHAT_REGION = "europe";
const CHAT_HOST_SELECTOR = "[data-chatclient-host]";
const TEAMS_BUTTON_SELECTOR = "img.chatclient-button";
const TEAMS_LOADER_SELECTOR = ".chatclient-loader";
const TEAMS_IFRAME_SELECTOR =
    "iframe[id^='teams-chat-bot-iframe'], iframe[title='Customer Connect chat bot assistant']";

type ChatStatus = "idle" | "loading" | "ready" | "error";

let chatScriptPromise: Promise<void> | null = null;

const CHAT_WIDGET_OVERRIDE_CSS = `
${CHAT_HOST_SELECTOR} img.chatclient-button,
${CHAT_HOST_SELECTOR} .chatclient-loader {
  position: absolute !important;
  right: 1.25rem !important;
  bottom: 1.25rem !important;
}

${CHAT_HOST_SELECTOR} img.chatclient-button {
  width: 3rem !important;
  height: 3rem !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

${CHAT_HOST_SELECTOR} .chatclient-loader {
  width: 2.75rem !important;
  height: 2.75rem !important;
  border-width: 2px !important;
}

${CHAT_HOST_SELECTOR} iframe[id^="teams-chat-bot-iframe"] {
  z-index: 10000 !important;
}

@media (max-width: 640px) {
  ${CHAT_HOST_SELECTOR} img.chatclient-button,
  ${CHAT_HOST_SELECTOR} .chatclient-loader {
    right: 1rem !important;
    bottom: 1rem !important;
  }
}
`;

function getTeamsButton() {
    return document.querySelector<HTMLImageElement>(TEAMS_BUTTON_SELECTOR);
}

function getTeamsIframe() {
    return document.querySelector<HTMLIFrameElement>(TEAMS_IFRAME_SELECTOR);
}

function getChatHost() {
    return document.querySelector<HTMLElement>(CHAT_HOST_SELECTOR);
}

function moveTeamsWidgetIntoChatHost() {
    const chatHost = getChatHost();

    if (!chatHost) {
        return;
    }

    document
        .querySelectorAll<HTMLElement>(
            `${TEAMS_BUTTON_SELECTOR}, ${TEAMS_LOADER_SELECTOR}, ${TEAMS_IFRAME_SELECTOR}`,
        )
        .forEach((element) => {
            if (element.parentElement !== chatHost) {
                chatHost.appendChild(element);
            }
        });
}

function relabelTeamsWidget() {
    moveTeamsWidgetIntoChatHost();

    const teamsButton = getTeamsButton();

    if (teamsButton) {
        if (teamsButton.alt !== "JobBridge Chat öffnen") {
            teamsButton.alt = "JobBridge Chat öffnen";
        }

        if (teamsButton.ariaLabel !== "JobBridge Chat öffnen") {
            teamsButton.ariaLabel = "JobBridge Chat öffnen";
        }

        if (teamsButton.title !== "JobBridge Chat öffnen") {
            teamsButton.title = "JobBridge Chat öffnen";
        }
    }

    const iframe = getTeamsIframe();

    if (iframe) {
        if (iframe.title !== "JobBridge Chat") {
            iframe.title = "JobBridge Chat";
        }

        if (iframe.getAttribute("aria-label") !== "JobBridge Chat") {
            iframe.setAttribute("aria-label", "JobBridge Chat");
        }
    }
}

function installChatWidgetOverrides() {
    if (document.getElementById(CHAT_WIDGET_STYLE_ID)) {
        return;
    }

    const style = document.createElement("style");
    style.id = CHAT_WIDGET_STYLE_ID;
    style.textContent = CHAT_WIDGET_OVERRIDE_CSS;

    document.head.appendChild(style);
}

function waitForTeamsWidget(timeoutMs = 8000) {
    if (getTeamsButton() || getTeamsIframe()) {
        relabelTeamsWidget();
        return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
        const timeout = window.setTimeout(() => {
            cleanup();
            reject(new Error("Teams chat widget did not become ready in time."));
        }, timeoutMs);

        const observer = new MutationObserver(() => {
            if (getTeamsButton() || getTeamsIframe()) {
                relabelTeamsWidget();
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
    installChatWidgetOverrides();

    if (getTeamsButton() || getTeamsIframe()) {
        relabelTeamsWidget();
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
    relabelTeamsWidget();

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

    useEffect(() => {
        installChatWidgetOverrides();
        relabelTeamsWidget();

        const observer = new MutationObserver(relabelTeamsWidget);

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["alt", "aria-label", "title"],
        });

        return () => observer.disconnect();
    }, []);

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
        <>
            <style id={CHAT_WIDGET_STYLE_ID}>{CHAT_WIDGET_OVERRIDE_CSS}</style>
            <section
                aria-label="JobBridge Chat"
                data-chatclient-host
                className="relative z-20 bg-black px-4 py-10 md:py-12"
            >
                <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <div className="max-w-xl">
                        <h2 className="text-[1.05rem] font-medium tracking-[-0.02em] text-white">
                            Fragen zu JobBridge?
                        </h2>
                        <p className="mt-1.5 text-sm leading-6 text-neutral-400">
                            Öffnet den Chat direkt auf dieser Seite.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={openChat}
                        disabled={isLoading}
                        className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white px-4 text-sm font-medium text-neutral-950 shadow-[0_14px_36px_rgba(255,255,255,0.08)] transition hover:bg-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:pointer-events-none disabled:opacity-70 sm:w-auto"
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
        </>
    );
}
