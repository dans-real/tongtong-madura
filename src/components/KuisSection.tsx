"use client";

import { useState, useEffect } from "react";
import { quizzes as staticQuizzes, type Quiz } from "@/data/quizzes";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function KuisSection() {
    const [quizzes, setQuizzes] = useState<Quiz[]>(staticQuizzes);
    const [loading, setLoading] = useState(true);

    // Load from Firebase
    useEffect(() => {
        const q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const loaded: Quiz[] = [];
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    loaded.push({
                        id: doc.id,
                        ...data,
                        questionCount: data.questions?.length || 0
                    } as Quiz);
                });
                // Use Firebase data if available, otherwise fallback to static
                setQuizzes(loaded.length > 0 ? loaded : staticQuizzes);
                setLoading(false);
            },
            (error) => {
                console.error('Error loading quizzes:', error);
                // Fallback to static data on error
                setQuizzes(staticQuizzes);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Intro */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    <span className="text-4xl">⚡</span>
                    <span>Kuis Challenge</span>
                </h2>
                <p className="text-sm text-redBrown-200/90 leading-relaxed">
                    Udah baca di <span className="font-bold text-maduraGold">Jelajah</span>?
                    Sekarang waktunya buktiin! Pilih challenge dan test pengetahuanmu.
                </p>
            </div>

            {/* Quiz Grid */}
            {loading ? (
                <div className="text-center py-16">
                    <div className="space-y-3">
                        <div className="text-4xl">⏳</div>
                        <p className="text-lg text-redBrown-300">Memuat quiz...</p>
                    </div>
                </div>
            ) : quizzes.length === 0 ? (
                <div className="max-w-2xl mx-auto animate-fadeIn">
                    <div className="rounded-2xl border-2 border-redBrown-700/50 bg-redBrown-900/60 p-12 text-center space-y-3">
                        <div className="text-6xl">📝</div>
                        <p className="text-lg text-redBrown-300">
                            Belum ada quiz. Tambahkan di panel admin.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                    {quizzes.map((quiz, index) => (
                        <Link
                            key={quiz.id}
                            href={`/quiz/detail?slug=${quiz.slug}`}
                            className="group relative rounded-2xl border-2 border-redBrown-700/50 bg-linear-to-br from-redBrown-900/80 to-redBrown-950/60 hover:border-maduraGold/70 hover:-translate-y-1 hover:shadow-2xl hover:shadow-maduraGold/20 transition-all duration-300 p-6 flex flex-col gap-4 shadow-lg animate-slideUp"
                            style={{
                                animationDelay: `${index * 80}ms`,
                            }}
                        >
                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-br from-maduraGold/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white leading-snug group-hover:text-maduraGold transition-colors">
                                {quiz.title}
                            </h3>

                            {/* Meta Info */}
                            <div className="flex items-center text-xs text-redBrown-400 pt-3 border-t border-redBrown-700/50">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {quiz.questionCount} soal
                                </span>
                            </div>

                            {/* CTA */}
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-sm font-bold text-maduraGold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Mulai Challenge
                                </span>
                                <svg className="w-5 h-5 text-maduraGold transform translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Info Box */}
            <div className="max-w-3xl mx-auto mt-8">
                <div className="rounded-2xl border-2 border-maduraGold/30 bg-linear-to-br from-redBrown-900/60 to-redBrown-800/40 p-5 md:p-6 space-y-3">
                    <div className="flex items-start gap-3">
                        <div className="text-3xl">💡</div>
                        <div className="space-y-2 flex-1">
                            <h3 className="text-sm font-bold text-white">Tips Jago Quiz:</h3>
                            <ul className="text-xs text-redBrown-200 leading-relaxed space-y-1">
                                <li className="flex items-start gap-2">
                                    <span className="text-maduraGold mt-0.5">▸</span>
                                    <span>Baca bagian <strong className="text-white">Jelajah</strong> dulu—semua jawabannya ada di sana!</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-maduraGold mt-0.5">▸</span>
                                    <span>Nggak perlu buru-buru, santai aja. Ini bukan lomba kok.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-maduraGold mt-0.5">▸</span>
                                    <span>Kalau salah, ada penjelasan di akhir—jadi bisa belajar dari kesalahan!</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="pt-3 border-t border-redBrown-700/50">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-2 rounded-lg bg-redBrown-800/40">
                                <div className="text-xl font-bold text-maduraGold">{quizzes.length}</div>
                                <div className="text-xs text-redBrown-400">Total Quiz</div>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-redBrown-800/40">
                                <div className="text-xl font-bold text-maduraGold">
                                    {quizzes.reduce((sum, q) => sum + q.questionCount, 0)}
                                </div>
                                <div className="text-xs text-redBrown-400">Total Soal</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}