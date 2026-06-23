import Link from "next/link";

type PlaceholderPageProps = {
    eyebrow: string;
    title: string;
    description: string;
};

export function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
    return (
        <main className="min-h-screen bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
            <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 sm:py-10">
                <header className="flex items-center justify-between">
                    <Link
                        href="/"
                        aria-label="JobBridge Startseite"
                        className="text-[1.04rem] font-semibold tracking-normal text-white outline-none transition hover:text-cyan-100 focus-visible:ring-2 focus-visible:ring-cyan-200/70"
                    >
                        JobBridge
                    </Link>
                    <Link
                        href="/"
                        className="text-sm font-medium text-white/54 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70"
                    >
                        Startseite
                    </Link>
                </header>

                <section className="flex flex-1 flex-col justify-center py-24">
                    <p className="mb-5 text-sm font-medium tracking-normal text-cyan-100/58">
                        {eyebrow}
                    </p>
                    <h1
                        className="max-w-3xl text-6xl font-normal leading-[0.92] tracking-normal sm:text-8xl lg:text-9xl"
                        style={{
                            fontFamily: "var(--font-serif), ui-serif, Georgia, serif",
                        }}
                    >
                        {title}
                    </h1>
                    <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300/78">
                        {description}
                    </p>
                </section>
            </div>
        </main>
    );
}
