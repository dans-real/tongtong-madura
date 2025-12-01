import Link from "next/link";
import { materials } from "@/data/materials";
import { quizzes } from "@/data/quizzes";
import MaterialCard from "@/components/MaterialCard";
import QuizCard from "@/components/QuizCard";
import MapMadura from "@/components/MapMadura";

export default function HomePage() {
    return (
        <div className="space-y-10">
            {/* Hero */}
            <section className="grid md:grid-cols-[1.2fr,1fr] gap-8 items-center">
                <div className="space-y-4">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-maduraGold">
                        Digital Culture Hub
                    </p>
                    <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                        Tong-Tong Madura:
                        <span className="block text-maduraGold">
                            from night watch to digital stage
                        </span>
                    </h1>
                    <p className="text-sm text-slate-200">
                        Explore Madura through the sound of tong-tong. Learn the history,
                        instruments, rhythms, and stories behind this unique tradition,
                        presented in a way that is friendly for today&apos;s youth.
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs">
                        <Link
                            href="/peta"
                            className="px-4 py-2 rounded-full bg-maduraRed text-slate-50 hover:bg-red-700 transition-colors shadow-soft-card"
                        >
                            Explore Tong-Tong Map
                        </Link>
                        <Link
                            href="/materi"
                            className="px-4 py-2 rounded-full border border-slate-700 hover:border-maduraGold hover:bg-slate-900/60 transition-colors"
                        >
                            Read Materials
                        </Link>
                        <Link
                            href="/quiz"
                            className="px-4 py-2 rounded-full border border-slate-700 hover:border-maduraGold hover:bg-slate-900/60 transition-colors"
                        >
                            Take a Quiz
                        </Link>
                    </div>
                </div>
                <div className="max-w-md mx-auto w-full">
                    <MapMadura />
                </div>
            </section>

            {/* Highlight sections */}
            <section className="grid md:grid-cols-2 gap-8">
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold">Start with the basics</h2>
                        <Link href="/materi" className="text-[11px] text-maduraGold">
                            See all materials →
                        </Link>
                    </div>
                    <div className="grid gap-3">
                        {materials.slice(0, 3).map((m) => (
                            <MaterialCard key={m.slug} material={m} />
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold">Quick rhythm check</h2>
                        <Link href="/quiz" className="text-[11px] text-maduraGold">
                            See all quizzes →
                        </Link>
                    </div>
                    <div className="grid gap-3">
                        {quizzes.slice(0, 2).map((q) => (
                            <QuizCard key={q.slug} quiz={q} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
