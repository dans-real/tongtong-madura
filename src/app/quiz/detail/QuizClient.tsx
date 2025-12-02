"use client";

import { useMemo, useState } from "react";

interface QuizOption {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface QuizQuestion {
    id: string;
    question: string;
    options: QuizOption[];
}

interface Quiz {
    id: string;
    slug: string;
    title: string;
    level: 'basic' | 'medium' | 'advanced';
    questions: QuizQuestion[];
}

export default function QuizClient({ quiz }: { quiz: Quiz }) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
    const [showResults, setShowResults] = useState(false);

    const currentQ = quiz.questions[currentQuestion];
    const totalQuestions = quiz.questions.length;
    const isLastQuestion = currentQuestion === totalQuestions - 1;

    const score = useMemo(() => {
        if (!showResults) return 0;
        let correct = 0;
        quiz.questions.forEach((q, idx) => {
            const selectedOption = q.options.find(opt => opt.id === selectedAnswers[idx]);
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
        const passed = percentage >= 60;

        return (
            <div className="min-h-screen bg-redBrown-950 px-4 py-12">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-redBrown-900/80 border-2 border-redBrown-700/50 rounded-3xl p-8 text-center space-y-6">
                        <div className="text-6xl mb-4">
                            {passed ? "🎉" : "💪"}
                        </div>
                        <h1 className="text-3xl font-bold text-white">
                            {passed ? "Selamat!" : "Terus Belajar!"}
                        </h1>
                        <p className="text-xl text-redBrown-300">
                            Skor Anda: <span className="text-white font-bold">{score}/{totalQuestions}</span>
                        </p>
                        <p className="text-2xl font-bold text-amber-400">
                            {percentage}%
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={handleRestart}
                                className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 border-2 border-amber-400"
                            >
                                Ulangi Quiz
                            </button>
                            <a
                                href="/"
                                className="px-6 py-3 bg-redBrown-700 text-white font-semibold rounded-lg hover:bg-redBrown-600 border-2 border-redBrown-600"
                            >
                                Kembali ke Beranda
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-redBrown-950 px-4 py-12">
            <div className="max-w-3xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center space-y-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-white">{quiz.title}</h1>
                    <p className="text-redBrown-300">
                        Pertanyaan {currentQuestion + 1} dari {totalQuestions}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-redBrown-800 rounded-full h-2">
                    <div
                        className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                    />
                </div>

                {/* Question Card */}
                <div className="bg-redBrown-900/80 border-2 border-redBrown-700/50 rounded-2xl p-6 md:p-8">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                        {currentQ.question}
                    </h2>

                    <div className="space-y-3">
                        {currentQ.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelectAnswer(option.id)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedAnswers[currentQuestion] === option.id
                                        ? 'bg-amber-500/20 border-amber-500 text-white'
                                        : 'bg-redBrown-800 border-redBrown-600 text-redBrown-200 hover:border-amber-500/50'
                                    }`}
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3 justify-between">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="px-6 py-3 bg-redBrown-700 text-white font-semibold rounded-lg hover:bg-redBrown-600 border-2 border-redBrown-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ← Sebelumnya
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!selectedAnswers[currentQuestion]}
                        className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 border-2 border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLastQuestion ? 'Selesai' : 'Selanjutnya →'}
                    </button>
                </div>
            </div>
        </div>
    );
}
