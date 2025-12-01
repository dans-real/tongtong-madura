"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import QuizCard from "@/components/QuizCard";

interface Quiz {
    id: string;
    slug: string;
    title: string;
    level: 'basic' | 'medium' | 'advanced';
    questions: any[];
}

export default function QuizPage() {
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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-redBrown-950">
                <div className="text-white">Memuat quiz...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-redBrown-950 px-4 py-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="text-center space-y-3">
                    <p className="text-xs uppercase tracking-widest text-amber-400 font-semibold">
                        Quiz Zone
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-white">Kuis Tong-Tong Madura</h1>
                    <p className="text-base text-redBrown-300 max-w-2xl mx-auto">
                        Uji pengetahuan kamu tentang budaya Madura melalui kuis interaktif.
                        Belajar sambil bermain!
                    </p>
                </header>

                {quizzes.length === 0 ? (
                    <div className="max-w-2xl mx-auto">
                        <div className="rounded-2xl border-2 border-redBrown-700/50 bg-redBrown-900/60 p-12 text-center">
                            <div className="text-6xl mb-4">📝</div>
                            <h2 className="text-xl font-bold text-white mb-2">Belum Ada Quiz</h2>
                            <p className="text-redBrown-300">
                                Kuis sedang disiapkan. Nantikan konten quiz menarik tentang budaya Madura!
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((q) => (
                            <QuizCard key={q.id} quiz={q} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
