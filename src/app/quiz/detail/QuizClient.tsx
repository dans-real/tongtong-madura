"use client";

import { useMemo, useState } from "react";
import type { Quiz, Question, QuizOption } from "@/data/quizzes";
import Link from "next/link";

export default function QuizClient({ quiz }: { quiz: Quiz }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [showResults, setShowResults] = useState(false);

    const currentQ = quiz.questions[currentQuestion];
    const totalQuestions = quiz.questions.length;
    const isLastQuestion = currentQuestion === totalQuestions - 1;
    const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

    const score = useMemo(() => {
        if (!showResults) return 0;
        let correct = 0;
        quiz.questions.forEach((q, idx) => {
            const selectedOptionId = selectedAnswers[idx];
            const selectedOption = q.options.find(opt => opt.id === selectedOptionId);
            if (selectedOption?.isCorrect) correct++;
        });
        return correct;
    }, [showResults, quiz.questions, selectedAnswers]);

    const handleSelectAnswer = (optionId: string) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [currentQuestion]: optionId
        }));
    };

    const handleNext = () => {
        if (isLastQuestion) {
            setShowResults(true);
        } else {
            setCurrentQuestion(prev => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setSelectedAnswers({});
        setShowResults(false);
    };

    if (showResults) {
        const percentage = Math.round((score / totalQuestions) * 100);
        const isPerfect = percentage === 100;
        const isGreat = percentage >= 80;
        const isPassed = percentage >= 60;

        return (
            <div className="min-h-screen bg-redBrown-950 px-4 py-12">
                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Results Card */}
                    <div className="bg-linear-to-br from-redBrown-900/80 to-redBrown-950/60 border-2 border-maduraGold/50 rounded-3xl p-8 md:p-10 text-center space-y-6 shadow-2xl shadow-maduraGold/20 animate-fadeIn">
                        {/* Emoji & Title */}
                        <div className="text-7xl mb-4 animate-bounce">
                            {isPerfect ? "🏆" : isGreat ? "🎉" : isPassed ? "✨" : "💪"}
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {isPerfect ? "Perfect Score!" : isGreat ? "Keren Banget!" : isPassed ? "Good Job!" : "Keep Learning!"}
                        </h1>

                        {/* Score Display */}
                        <div className="space-y-2">
                            <p className="text-lg text-redBrown-300">
                                Skor Kamu:
                            </p>
                            <p className="text-5xl font-bold text-maduraGold">
                                {score}/{totalQuestions}
                            </p>
                            <p className="text-3xl font-bold text-white">
                                {percentage}%
                            </p>
                        </div>

                        {/* Feedback Message */}
                        <div className="pt-4 border-t border-redBrown-700/50">
                            <p className="text-sm text-redBrown-200 leading-relaxed">
                                {isPerfect && "Wow! Kamu bener-bener master Tong-Tong! 🔥"}
                                {isGreat && !isPerfect && "Mantap! Kamu udah paham banget tentang budaya Madura!"}
                                {isPassed && !isGreat && "Lumayan! Tapi masih bisa lebih baik lagi. Coba baca Jelajah lagi yuk!"}
                                {!isPassed && "Jangan nyerah! Coba baca bagian Jelajah dulu, terus ulangi quiz-nya."}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                            <button
                                onClick={handleRestart}
                                className="px-6 py-3 bg-linear-to-r from-maduraGold to-amber-500 text-redBrown-950 font-bold rounded-lg hover:from-maduraGold hover:to-maduraGold border-2 border-maduraGold shadow-lg hover:shadow-xl transition-all"
                            >
                                🔄 Ulangi Quiz
                            </button>
                            <Link
                                href="/"
                                className="px-6 py-3 bg-redBrown-700 text-white font-semibold rounded-lg hover:bg-redBrown-600 border-2 border-redBrown-600 transition-all text-center"
                            >
                                ← Kembali ke Home
                            </Link>
                        </div>
                    </div>

                    {/* Review Answers */}
                    <div className="bg-redBrown-900/60 border-2 border-redBrown-700/50 rounded-2xl p-6 space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <span>📋</span>
                            <span>Review Jawaban</span>
                        </h3>
                        <div className="space-y-3">
                            {quiz.questions.map((q, idx) => {
                                const selectedOptionId = selectedAnswers[idx];
                                const selectedOption = q.options.find(opt => opt.id === selectedOptionId);
                                const correctOption = q.options.find(opt => opt.isCorrect);
                                const isCorrect = selectedOption?.isCorrect || false;

                                return (
                                    <div key={q.id} className="flex items-start gap-3 text-sm">
                                        <span className={`
                                            shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs
                                            ${isCorrect ? 'bg-green-500/20 text-green-300 border border-green-400' : 'bg-red-500/20 text-red-300 border border-red-400'}
                                        `}>
                                            {idx + 1}
                                        </span>
                                        <div className="grow">
                                            <p className="text-redBrown-200">{q.question}</p>
                                            <p className={`text-xs mt-1 ${isCorrect ? 'text-green-300' : 'text-red-300'}`}>
                                                {isCorrect ? '✓ Benar' : `✗ Salah · Jawaban: ${correctOption?.text || '-'}`}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-redBrown-950 px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{quiz.title}</h1>
                    <p className="text-redBrown-300 text-sm">
                        Pertanyaan {currentQuestion + 1} dari {totalQuestions}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-redBrown-800 rounded-full h-3 shadow-inner">
                    <div
                        className="bg-linear-to-r from-maduraGold to-amber-500 h-3 rounded-full transition-all duration-500 shadow-md shadow-maduraGold/50"
                        style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                    />
                </div>

                {/* Question Card */}
                <div className="bg-linear-to-br from-redBrown-900/80 to-redBrown-950/60 border-2 border-redBrown-700/50 rounded-2xl p-6 md:p-8 shadow-2xl animate-fadeIn">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-relaxed">
                        {currentQ.question}
                    </h2>

                    <div className="space-y-3">
                        {currentQ.options.map((option, idx) => {
                            const isSelected = selectedAnswers[currentQuestion] === option.id;

                            return (
                                <button
                                    key={option.id}
                                    onClick={() => handleSelectAnswer(option.id)}
                                    className={`
                                        w-full text-left p-4 rounded-lg border-2 transition-all duration-200 relative
                                        ${isSelected
                                            ? 'bg-maduraGold/20 border-maduraGold text-white ring-2 ring-maduraGold/50 shadow-lg shadow-maduraGold/30'
                                            : 'bg-redBrown-800/60 border-redBrown-600 text-redBrown-200 hover:border-maduraGold/50 hover:bg-redBrown-800'
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className={`
                                            shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
                                            ${isSelected
                                                ? 'bg-maduraGold text-redBrown-950'
                                                : 'bg-redBrown-700 text-white'
                                            }
                                        `}>
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        <span className="grow">{option.text}</span>
                                        {isSelected && (
                                            <span className="shrink-0 text-maduraGold text-xl animate-pulse">✓</span>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>                {/* Navigation Buttons */}
                <div className="flex gap-3 justify-between">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="px-6 py-3 bg-redBrown-700 text-white font-semibold rounded-lg hover:bg-redBrown-600 border-2 border-redBrown-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                        ← Sebelumnya
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!hasAnswered}
                        className="px-6 py-3 bg-linear-to-r from-maduraGold to-amber-500 text-redBrown-950 font-bold rounded-lg hover:from-maduraGold hover:to-maduraGold border-2 border-maduraGold disabled:opacity-30 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all"
                    >
                        {isLastQuestion ? 'Selesai ✓' : 'Selanjutnya →'}
                    </button>
                </div>
            </div>
        </div>
    );
}
