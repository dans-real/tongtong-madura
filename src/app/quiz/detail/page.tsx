"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import type { Quiz } from "@/data/quizzes";
import QuizClient from "./QuizClient";

export default function QuizDetailPage() {
    const searchParams = useSearchParams();
    const slug = searchParams.get('slug');
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            if (!slug) {
                setLoading(false);
                return;
            }

            try {
                const q = query(
                    collection(db, 'quizzes'),
                    where('slug', '==', slug)
                );
                const snapshot = await getDocs(q);

                if (!snapshot.empty) {
                    const doc = snapshot.docs[0];
                    const data = doc.data();
                    setQuiz({
                        ...data,
                        id: doc.id,
                        questionCount: data.questions?.length || 0
                    } as any as Quiz);
                } else {
                    setQuiz(null);
                }
            } catch (error) {
                console.error('Error fetching quiz:', error);
                setQuiz(null);
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-redBrown-950">
                <div className="text-white text-lg">Memuat quiz...</div>
            </div>
        );
    }

    if (!quiz) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-redBrown-950 px-4">
                <div className="text-6xl mb-4">😕</div>
                <h1 className="text-2xl font-bold text-white mb-2">Quiz Tidak Ditemukan</h1>
                <p className="text-redBrown-300 mb-6">Quiz yang Anda cari tidak tersedia.</p>
                <a
                    href="/"
                    className="px-6 py-3 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 border-2 border-amber-400"
                >
                    ← Kembali ke Beranda
                </a>
            </div>
        );
    }

    return <QuizClient quiz={quiz} />;
}
