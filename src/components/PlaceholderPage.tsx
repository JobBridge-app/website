import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

type PlaceholderPageProps = {
    eyebrow: string;
    title: string;
    description: string;
};

export function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
    return (
        <main className="min-h-screen bg-[#02040b] text-white selection:bg-blue-400/30 selection:text-blue-100">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(37,99,235,0.14),transparent_32%),linear-gradient(180deg,#02040b_0%,#050505_100%)]" />
            <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-6 sm:px-10 sm:py-10">
                <SiteHeader />

                <section className="flex flex-1 flex-col justify-center py-20 sm:py-24">
                    <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-blue-200/60">
                        {eyebrow}
                    </p>
                    <h1 className="max-w-4xl text-[clamp(3.6rem,10vw,7.2rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-white">
                        {title}
                    </h1>
                    <p className="mt-8 max-w-2xl text-[1.08rem] font-medium leading-8 tracking-[-0.015em] text-slate-300/78 sm:text-xl">
                        {description}
                    </p>
                </section>
            </div>
            <Footer />
        </main>
    );
}
