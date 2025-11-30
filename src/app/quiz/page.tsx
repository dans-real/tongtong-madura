import { quizzes } from "@/data/quizzes";
import QuizCard from "@/components/QuizCard";

export default function QuizPage() {
    return (
        <div className="space-y-5">
            <header className="space-y-1">
                <p className="text-[11px] uppercase tracking-[0.25em] text-maduraGold">
                    Quiz Zone
                </p>
                <h1 className="text-2xl font-semibold">Tong-Tong Quizzes</h1>
                <p className="text-sm text-slate-200">
                    Test your knowledge about tong-tong history, instruments, and rhythms.
                    Learn by playing, not only by reading.
                </p>
            </header>

            <div className="grid md:grid-cols-2 gap-4">
                {quizzes.map((q) => (
                    <QuizCard key={q.slug} quiz={q} />
                ))}
            </div>
        </div>
    );
}
