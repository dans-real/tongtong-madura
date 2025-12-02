"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Link from "next/link";

interface Quiz {
    id: string;
    slug: string;
    title: string;
    level: 'basic' | 'medium' | 'advanced';
    questions: any[];
}

export default function KuisSection() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loaded: Quiz[] = [];
            snapshot.forEach((doc) => {
                loaded.push({ id: doc.id, ...doc.data() } as Quiz);
            });
            setQuizzes(loaded);
            setLoading(false);
        }, (error) => {
            console.error('Error loading quizzes:', error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const levelColor = {
        basic: "bg-green-500/20 border-green-500/50 text-green-400",
        medium: "bg-amber-500/20 border-amber-500/50 text-amber-400",
        advanced: "bg-red-500/20 border-red-500/50 text-red-400",
    };

    const levelEmoji = {
        basic: "🌟",
        medium: "🔥",
        advanced: "💀",
    };

    const levelLabel = {
        basic: "MUDAH",
        medium: "SEDANG",
        advanced: "SUSAH",
    };

    if (loading) {
        return (
            <div className="animate-fadeIn text-center py-12">
                <div className="text-redBrown-300">Memuat quiz...</div>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Intro */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    <span>⚡</span>
                    <span>Kuis Challenge</span>
                </h2>
                <p className="text-sm md:text-base text-redBrown-300 leading-relaxed">
                    Udah baca di <strong>Jelajah</strong>? Sekarang waktunya buktiin! Semua soal diambil dari konten Madura—jadi pastikan kamu udah kenal dulu sebelum mulai.
                </p>
            </div>

            {/* Quiz Grid */}
            {quizzes.length === 0 ? (
                <div className="max-w-2xl mx-auto">
                    <div className="rounded-2xl border-2 border-redBrown-700/50 bg-redBrown-900/60 p-8 text-center">
                        <div className="text-4xl mb-3">📝</div>
                        <p className="text-redBrown-300 text-sm">
                            Belum ada quiz tersedia. Admin sedang menyiapkan konten quiz untuk Anda!
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                    {quizzes.map((quiz) => (
                        <Link
                            key={quiz.id}
                            href={`/quiz/detail?slug=${quiz.slug}`}
                            className="group rounded-2xl border-2 border-redBrown-700/50 bg-linear-to-br from-redBrown-900/80 to-redBrown-800/60 hover:border-amber-500 hover:bg-redBrown-900 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-600/40 transition-all duration-300 p-5 flex flex-col gap-3 shadow-2xl shadow-redBrown-950/50 relative overflow-hidden"
                        >
                            {/* Decorative overlay */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-br from-amber-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <span
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold tracking-wider ${levelColor[quiz.level]
                                        }`}
                                >
                                    <span>{levelEmoji[quiz.level]}</span>
                                    {levelLabel[quiz.level]}
                                </span>
                                <span className="text-[10px] text-redBrown-300">
                                    {quiz.questions?.length || 0} soal
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-bold text-redBrown-100 group-hover:text-white transition-colors">
                                {quiz.title}
                            </h3>

                            {/* CTA */}
                            <div className="mt-auto flex items-center gap-2">
                                <span className="text-xs text-amber-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Mulai Challenge →
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Info Box */}
            {quizzes.length > 0 && (
                <div className="max-w-2xl mx-auto mt-8">
                    <div className="rounded-2xl border border-redBrown-700 bg-redBrown-900/60 p-4">
                        <p className="text-xs text-redBrown-300 text-center leading-relaxed">
                            💡 <strong className="text-redBrown-100">Tips:</strong> Semua kuis tentang Madura! Kalau kamu udah baca bagian <strong className="text-redBrown-200">Jelajah</strong> dulu, pasti lebih gampang. Semua jawabannya ada di sana!
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}