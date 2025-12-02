import Link from "next/link";
import type { Quiz } from "@/data/quizzes";

export default function QuizCard({ quiz }: { quiz: Quiz }) {
    return (
        <article>
            <Link
                href={`/quiz/detail?slug=${quiz.slug}`}
                className="group rounded-2xl border-2 border-redBrown-700/50 bg-linear-to-br from-redBrown-900/80 to-redBrown-800/60 hover:border-redBrown-500 hover:bg-redBrown-900 hover:-translate-y-1 hover:shadow-lg hover:shadow-redBrown-600/40 transition-all duration-300 p-4 flex flex-col gap-2 shadow-2xl shadow-redBrown-950/50 relative overflow-hidden"
                aria-label={`Mulai ${quiz.title}`}
            >
                <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-redBrown-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="flex items-center justify-end">
                    <span className="text-[10px] text-redBrown-300">
                        {quiz.questions.length} soal
                    </span>
                </div>
                <h3 className="text-sm font-bold text-redBrown-100 group-hover:text-redBrown-300 transition-colors">{quiz.title}</h3>
                {quiz.description && (
                    <p className="text-[11px] text-redBrown-300 line-clamp-2 leading-relaxed">
                        {quiz.description}
                    </p>
                )}
                <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-redBrown-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Mulai Tantangan →
                    </span>
                    <span className="text-[10px] text-redBrown-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        Berani?
                    </span>
                </div>
            </Link>
        </article>
    );
}
