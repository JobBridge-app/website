import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { LegalPageNavigation, LegalScrollReset, LegalSectionFrame } from "./LegalInteractions";

export const PLATFORM_IMPRINT_URL = "https://app.jobbridge.app/legal/impressum";
export const PLATFORM_PRIVACY_URL = "https://app.jobbridge.app/legal/datenschutz";

export type LegalNavItem = {
    id: string;
    label: string;
};

export function LegalPage({
    title,
    intro,
    updatedAt,
    navItems,
    platformLegalUrl = PLATFORM_IMPRINT_URL,
    platformLegalLabel = "app.jobbridge.app/legal/impressum",
    children,
}: {
    title: string;
    intro?: string;
    updatedAt: string;
    navItems: LegalNavItem[];
    platformLegalUrl?: string;
    platformLegalLabel?: string;
    children: ReactNode;
}) {
    return (
        <main className="relative min-h-screen bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
            <LegalScrollReset />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-18%,#10213a_0%,#07111f_38%,#02040b_72%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(96,165,250,0.12),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(34,211,238,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_24%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:120px_120px] opacity-[0.055]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02040b] to-transparent" />

            <div className="relative mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-12 xl:px-8">
                <SiteHeader />

                <header className="mt-12 md:mt-16">
                    <div className="grid gap-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                        <div>
                            <h1
                                className="text-[clamp(3.5rem,9vw,8.2rem)] font-normal leading-[0.92] text-white drop-shadow-[0_16px_52px_rgba(96,165,250,0.12)]"
                                style={{
                                    fontFamily: "var(--font-serif), ui-serif, Georgia, serif",
                                }}
                            >
                                {title}
                            </h1>
                            {intro ? (
                                <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
                                    {intro}
                                </p>
                            ) : null}
                        </div>
                        <dl className="w-fit min-w-52 rounded-2xl border border-white/10 bg-[#050f1d]/88 px-5 py-4 text-sm text-slate-400 shadow-[0_18px_55px_rgba(2,6,23,0.28)] backdrop-blur-xl">
                            <div className="border-l border-cyan-300/40 pl-4">
                                <dt className="text-xs uppercase text-slate-500">Stand</dt>
                                <dd className="mt-1 text-slate-100">{updatedAt}</dd>
                            </div>
                        </dl>
                    </div>
                </header>

                <div className="mt-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:mt-12" />

                <div className="mt-10 grid gap-10 xl:grid-cols-[minmax(0,1fr)_19rem] xl:items-start">
                    <article className="min-w-0 rounded-[2rem] border border-white/10 bg-[#050f1d]/88 p-5 shadow-[0_28px_90px_rgba(2,6,23,0.42)] backdrop-blur-xl md:p-8 lg:p-10">
                        {children}
                    </article>

                    <LegalPageNavigation
                        title={title}
                        navItems={navItems}
                        platformLegalUrl={platformLegalUrl}
                        platformLegalLabel={platformLegalLabel}
                    />
                </div>
            </div>
        </main>
    );
}

export function LegalSection({
    id,
    title,
    children,
}: {
    id: string;
    title: string;
    children: ReactNode;
}) {
    return (
        <LegalSectionFrame id={id} title={title}>
            {children}
        </LegalSectionFrame>
    );
}

export function LegalNotice({ children }: { children: ReactNode }) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#050f1d]/88 px-5 py-4 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] before:absolute before:inset-y-4 before:left-0 before:w-px before:bg-cyan-200/55 md:px-6 md:py-5">
            {children}
        </div>
    );
}

export function LegalDefinitionList({
    items,
}: {
    items: Array<{ term: string; description: ReactNode }>;
}) {
    return (
        <dl className="overflow-hidden rounded-2xl border border-white/10 bg-[#050f1d]/88">
            {items.map((item) => (
                <div
                    key={item.term}
                    className="grid gap-2 border-b border-white/10 px-4 py-4 last:border-b-0 md:grid-cols-[13rem_1fr] md:px-5"
                >
                    <dt className="text-sm font-medium text-slate-500">{item.term}</dt>
                    <dd className="text-slate-100">{item.description}</dd>
                </div>
            ))}
        </dl>
    );
}

export function Placeholder({ children }: { children: ReactNode }) {
    return <span className="font-medium text-amber-200">[{children}]</span>;
}
