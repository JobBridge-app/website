import Image from "next/image";

export function ProfilePortraitPlaceholder({
    name,
    role,
    compact = false,
}: {
    name: string;
    role: string;
    compact?: boolean;
}) {
    const initials = name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("");

    return (
        <div
            className={`relative overflow-hidden border border-white/10 bg-[#050912] shadow-[0_32px_90px_rgba(2,6,23,0.42)] ${
                compact ? "aspect-[1.08/1] rounded-[1.5rem]" : "aspect-[4/5] rounded-[1.85rem]"
            }`}
        >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_44%_18%,rgba(59,130,246,0.26),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.065),transparent_42%)]" />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-[0.24]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(148,163,184,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.22) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                    maskImage: "linear-gradient(180deg, black, rgba(0,0,0,0.72), transparent)",
                }}
            />

            <div className="absolute left-6 top-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] border border-white/10 bg-white/[0.055]">
                    <Image
                        src="/favicon.ico"
                        alt=""
                        width={44}
                        height={44}
                        unoptimized
                        className="h-11 w-11 scale-[1.04] object-cover"
                    />
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                    Profil
                </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-[1.35rem] border border-white/12 bg-white/[0.06] text-[2.4rem] font-semibold tracking-[-0.07em] text-white">
                    {initials}
                </div>
                <p className="mt-6 text-xl font-semibold tracking-[-0.035em] text-white">{name}</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">{role}</p>
                <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Profilbild folgt
                </p>
            </div>
        </div>
    );
}
