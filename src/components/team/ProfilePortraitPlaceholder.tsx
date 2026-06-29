export function ProfilePortraitPlaceholder({
    compact = false,
}: {
    name?: string;
    role?: string;
    compact?: boolean;
}) {
    return (
        <div
            className={`relative overflow-hidden border border-white/[0.075] bg-[#050912] ${
                compact ? "aspect-[4/5] rounded-[0.7rem]" : "aspect-[4/5] rounded-[0.85rem]"
            }`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.032)_1px,transparent_1px)] bg-[size:18px_18px] opacity-60" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(2,4,11,0.08)_0%,rgba(2,4,11,0.42)_100%)]" />
            <span className="absolute bottom-5 left-5 text-sm font-semibold tracking-[-0.02em] text-slate-500">
                Profilbild folgt
            </span>
        </div>
    );
}
