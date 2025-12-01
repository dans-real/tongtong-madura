import Link from "next/link";
import type { Quiz } from "@/data/quizzes";

const levelLabel: Record<Quiz["level"], string> = {
    basic: "Basic",
    medium: "Intermediate",
    advanced: "Advanced",
};

export default function QuizCard({ quiz }: { quiz: Quiz }) {
    return (
        <article>
            <Link
                href={`/quiz/${quiz.slug}`}
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 hover:border-maduraGold hover:bg-slate-900 transition-colors p-4 flex flex-col gap-1 shadow-soft-card/40"
                aria-label={`Start ${quiz.title}`}
            >
                <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-slate-400">
                    <span>Level: {levelLabel[quiz.level]}</span>
                    <span className="text-maduraGold group-hover:text-maduraSoft">
                        Start →
                    </span>
                </div>
                <h3 className="text-sm font-semibold">{quiz.title}</h3>
                <p className="text-[11px] text-slate-300 line-clamp-2">
                    {quiz.description}
                </p>
            </Link>
        </article>
    );
}
