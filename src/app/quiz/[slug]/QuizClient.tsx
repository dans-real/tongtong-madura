"use client";

import { useMemo, useState } from "react";
import type { Quiz } from "@/data/quizzes";
import { analytics } from "@/lib/analytics";

export default function QuizClient({ quiz }: { quiz: Quiz }) {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const score = useMemo(() => {
        if (!submitted) return 0;
        let correct = 0;
        quiz.questions.forEach((q) => {
            const chosen = answers[q.id];
            const opt = q.options.find((o) => o.id === chosen);
            if (opt?.isCorrect) correct += 1;
        });
        return Math.round((correct / quiz.questions.length) * 100);
    }, [submitted, answers, quiz.questions]);

    function handleChoose(questionId: string, optionId: string) {
        if (submitted) return;
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
    }

    function handleSubmit() {
        if (!submitted) {
            setSubmitted(true);
            // Track quiz completion
            analytics.quizCompleted(quiz.slug, score);
        }
    }

    function handleReset() {
        setSubmitted(false);
        setAnswers({});
    }

    return (
        <div className="space-y-5">
            <header className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.25em] text-maduraGold">
                    Quiz
                </p>
                <h1 className="text-2xl font-semibold">{quiz.title}</h1>
                <p className="text-sm text-slate-200">{quiz.description}</p>
            </header>

            <section className="space-y-4">
                {quiz.questions.map((q, index) => (
                    <div
                        key={q.id}
                        className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2"
                    >
                        <div className="text-[11px] text-slate-400">
                            Question {index + 1} of {quiz.questions.length}
                        </div>
                        <div className="text-sm font-medium">{q.question}</div>
                        <div className="space-y-1">
                            {q.options.map((o) => {
                                const selected = answers[q.id] === o.id;
                                const correct = submitted && o.isCorrect;
                                const wrong = submitted && selected && !o.isCorrect;

                                return (
                                    <button
                                        key={o.id}
                                        type="button"
                                        onClick={() => handleChoose(q.id, o.id)}
                                        className={[
                                            "w-full text-left text-xs px-3 py-2 rounded-xl border transition-colors",
                                            selected
                                                ? "border-maduraGold bg-slate-800"
                                                : "border-slate-700 bg-slate-900/60 hover:border-slate-500",
                                            correct && "border-green-500 bg-green-500/10",
                                            wrong && "border-red-500 bg-red-500/10",
                                        ]
                                            .filter(Boolean)
                                            .join(" ")}
                                    >
                                        {o.text}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </section>

            {!submitted ? (
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 rounded-full bg-maduraRed text-xs font-medium hover:bg-red-700 transition-colors"
                >
                    Submit answers
                </button>
            ) : (
                <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-2">
                    <div className="text-sm font-semibold">
                        Your score: {score} / 100
                    </div>
                    <p className="text-[11px] text-slate-300">
                        Great if you scored high! If not, no problem – revisit the material
                        and try again. The goal is to keep the rhythm of tong-tong alive in
                        your memory.
                    </p>
                    <div className="flex gap-2 text-xs">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-3 py-1.5 rounded-full border border-slate-700 hover:border-maduraGold hover:bg-slate-900/60 transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
}
