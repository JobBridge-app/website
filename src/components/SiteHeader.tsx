import Image from "next/image";
import Link from "next/link";
import { SiteMenuButton } from "@/components/SiteMenu";

export function SiteHeader({ className = "" }: { className?: string }) {
    return (
        <header className={`flex items-center justify-between ${className}`}>
            <Link
                href="/"
                aria-label="JobBridge Startseite"
                className="group inline-flex items-center gap-3 rounded-[1.25rem] outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#02040b]"
            >
                <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[1.15rem] border border-white/10 bg-white/[0.045] shadow-[0_12px_36px_rgba(2,6,23,0.2)]">
                    <span className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(96,165,250,0.25),transparent_58%)] opacity-80" />
                    <Image
                        src="/favicon.ico"
                        alt=""
                        width={44}
                        height={44}
                        unoptimized
                        className="relative object-cover"
                        style={{ width: 44, height: "auto", transform: "scale(1.08)" }}
                    />
                </span>
                <span className="text-[1.05rem] font-semibold tracking-[-0.015em] text-white transition group-hover:text-blue-100">
                    JobBridge
                </span>
            </Link>

            <SiteMenuButton />
        </header>
    );
}
