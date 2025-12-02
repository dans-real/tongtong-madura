"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { db } from '@/lib/firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    Timestamp,
    query,
    orderBy
} from 'firebase/firestore';

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

export default function QuizzesAdminPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [slug, setSlug] = useState('');
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState<'basic' | 'medium' | 'advanced'>('basic');
    const [questions, setQuestions] = useState<QuizQuestion[]>([
        {
            id: '1',
            question: '',
            options: [
                { id: '1', text: '', isCorrect: false },
                { id: '2', text: '', isCorrect: false },
                { id: '3', text: '', isCorrect: false },
                { id: '4', text: '', isCorrect: false }
            ]
        }
    ]);

    useEffect(() => {
        if (!loading && !user) router.push('/admin');
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loaded: Quiz[] = [];
            snapshot.forEach((doc) => {
                loaded.push({ id: doc.id, ...doc.data() } as Quiz);
            });
            setQuizzes(loaded);
        });

        return () => unsubscribe();
    }, [user]);

    const resetForm = () => {
        setSlug('');
        setTitle('');
        setLevel('basic');
        setQuestions([
            {
                id: '1',
                question: '',
                options: [
                    { id: '1', text: '', isCorrect: false },
                    { id: '2', text: '', isCorrect: false },
                    { id: '3', text: '', isCorrect: false },
                    { id: '4', text: '', isCorrect: false }
                ]
            }
        ]);
        setIsEditing(false);
        setEditingId(null);
    };

    const addQuestion = () => {
        const newId = (questions.length + 1).toString();
        setQuestions([
            ...questions,
            {
                id: newId,
                question: '',
                options: [
                    { id: '1', text: '', isCorrect: false },
                    { id: '2', text: '', isCorrect: false },
                    { id: '3', text: '', isCorrect: false },
                    { id: '4', text: '', isCorrect: false }
                ]
            }
        ]);
    };

    const removeQuestion = (questionId: string) => {
        if (questions.length <= 1) {
            alert('Quiz harus memiliki minimal 1 pertanyaan');
            return;
        }
        setQuestions(questions.filter(q => q.id !== questionId));
    };

    const updateQuestion = (questionId: string, field: string, value: string) => {
        setQuestions(questions.map(q =>
            q.id === questionId ? { ...q, [field]: value } : q
        ));
    };

    const updateOption = (questionId: string, optionId: string, text: string) => {
        setQuestions(questions.map(q =>
            q.id === questionId
                ? {
                    ...q,
                    options: q.options.map(opt =>
                        opt.id === optionId ? { ...opt, text } : opt
                    )
                }
                : q
        ));
    };

    const setCorrectAnswer = (questionId: string, optionId: string) => {
        setQuestions(questions.map(q =>
            q.id === questionId
                ? {
                    ...q,
                    options: q.options.map(opt => ({
                        ...opt,
                        isCorrect: opt.id === optionId
                    }))
                }
                : q
        ));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi
        for (const q of questions) {
            if (!q.question.trim()) {
                alert('Semua pertanyaan harus diisi');
                return;
            }
            if (q.options.some(opt => !opt.text.trim())) {
                alert('Semua opsi jawaban harus diisi');
                return;
            }
            if (!q.options.some(opt => opt.isCorrect)) {
                alert(`Pertanyaan "${q.question}" belum memiliki jawaban yang benar`);
                return;
            }
        }

        try {
            const quizData = {
                slug,
                title,
                level,
                questions,
                updatedAt: Timestamp.now()
            };

            if (isEditing && editingId) {
                await updateDoc(doc(db, 'quizzes', editingId), quizData);
                alert('Quiz berhasil diupdate!');
            } else {
                await addDoc(collection(db, 'quizzes'), {
                    ...quizData,
                    createdAt: Timestamp.now()
                });
                alert('Quiz berhasil ditambahkan!');
            }
            resetForm();
        } catch (error) {
            console.error('Error saving quiz:', error);
            alert('Gagal menyimpan quiz');
        }
    };

    const handleEdit = (quiz: Quiz) => {
        setSlug(quiz.slug);
        setTitle(quiz.title);
        setLevel(quiz.level);
        setQuestions(quiz.questions || []);
        setIsEditing(true);
        setEditingId(quiz.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Hapus quiz ini?')) return;
        try {
            await deleteDoc(doc(db, 'quizzes', id));
            alert('Quiz berhasil dihapus!');
        } catch (error) {
            alert('Gagal menghapus quiz');
        }
    };

    if (loading || !user) {
        return <div className="min-h-screen flex items-center justify-center bg-redBrown-950 text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-redBrown-950 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white">Kelola Quiz</h1>
                    <button
                        onClick={() => router.push('/admin')}
                        className="px-4 py-2 bg-redBrown-800 text-white rounded-lg hover:bg-redBrown-700 border-2 border-redBrown-600"
                    >
                        ← Kembali
                    </button>
                </div>

                {/* Form */}
                <div className="bg-redBrown-900/80 border-2 border-amber-500/50 rounded-2xl p-6 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        {isEditing ? '✏️ Edit Quiz' : '➕ Tambah Quiz Baru'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-amber-300 mb-2">Judul Quiz *</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 bg-redBrown-800 border-2 border-redBrown-600 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                                    placeholder="Contoh: Quiz Sejarah Madura"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-amber-300 mb-2">Slug (URL) *</label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                                    required
                                    className="w-full px-4 py-2 bg-redBrown-800 border-2 border-redBrown-600 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                                    placeholder="quiz-sejarah-madura"
                                />
                            </div>
                        </div>

                        <hr className="border-amber-500/30" />

                        {/* Questions */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-amber-300">Pertanyaan ({questions.length})</h3>
                                <button
                                    type="button"
                                    onClick={addQuestion}
                                    className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 border-2 border-amber-400"
                                >
                                    + Tambah Pertanyaan
                                </button>
                            </div>

                            {questions.map((q, qIndex) => (
                                <div key={q.id} className="bg-redBrown-800/60 border-2 border-amber-600/30 rounded-xl p-5 space-y-4">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-amber-200 mb-2">
                                                Pertanyaan {qIndex + 1} *
                                            </label>
                                            <textarea
                                                value={q.question}
                                                onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                                                required
                                                rows={2}
                                                className="w-full px-4 py-2 bg-redBrown-700 border-2 border-redBrown-500 rounded-lg text-white focus:border-amber-400 focus:outline-none"
                                                placeholder="Tuliskan pertanyaan di sini..."
                                            />
                                        </div>
                                        {questions.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeQuestion(q.id)}
                                                className="px-3 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 border-2 border-red-500"
                                            >
                                                🗑️ Hapus
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <p className="text-xs text-amber-200 font-medium">Pilihan Jawaban (pilih 1 jawaban benar):</p>
                                        {q.options.map((opt, optIndex) => (
                                            <div key={opt.id} className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name={`correct-${q.id}`}
                                                    checked={opt.isCorrect}
                                                    onChange={() => setCorrectAnswer(q.id, opt.id)}
                                                    className="w-5 h-5 accent-green-500 cursor-pointer"
                                                    title="Tandai sebagai jawaban benar"
                                                />
                                                <input
                                                    type="text"
                                                    value={opt.text}
                                                    onChange={(e) => updateOption(q.id, opt.id, e.target.value)}
                                                    required
                                                    className={`flex-1 px-3 py-2 rounded-lg text-white focus:outline-none ${opt.isCorrect
                                                        ? 'bg-green-700/50 border-2 border-green-500'
                                                        : 'bg-redBrown-700 border-2 border-redBrown-500 focus:border-amber-400'
                                                        }`}
                                                    placeholder={`Opsi ${String.fromCharCode(65 + optIndex)}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                className="px-8 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 border-2 border-amber-400 shadow-lg shadow-amber-400/30"
                            >
                                {isEditing ? '💾 Update Quiz' : '➕ Simpan Quiz'}
                            </button>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 bg-redBrown-700 text-white font-semibold rounded-lg hover:bg-redBrown-600 border-2 border-redBrown-500"
                                >
                                    ❌ Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Quiz List */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">📋 Daftar Quiz ({quizzes.length})</h2>
                    {quizzes.length === 0 ? (
                        <div className="text-center py-12 bg-redBrown-900/50 border-2 border-redBrown-700/50 rounded-xl">
                            <p className="text-redBrown-300">Belum ada quiz. Silakan tambahkan quiz baru di atas.</p>
                        </div>
                    ) : (
                        quizzes.map((quiz) => (
                            <div
                                key={quiz.id}
                                className="bg-redBrown-900/80 border-2 border-amber-600/30 rounded-xl p-5 hover:border-amber-500/50 transition-all"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-white mb-2">{quiz.title}</h3>
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            <span className="text-xs bg-white/10 px-3 py-1 rounded-full text-redBrown-300">
                                                {quiz.questions?.length || 0} pertanyaan
                                            </span>
                                            <span className="text-xs text-redBrown-400">/{quiz.slug}</span>
                                        </div>
                                        {quiz.questions && quiz.questions.length > 0 && (
                                            <div className="text-sm text-redBrown-300 space-y-1">
                                                <p className="font-semibold text-amber-300">Preview Pertanyaan:</p>
                                                <p className="line-clamp-2">1. {quiz.questions[0].question}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => handleEdit(quiz)}
                                            className="px-4 py-2 bg-amber-500 text-white text-sm font-semibold rounded hover:bg-amber-600 border-2 border-amber-400"
                                        >
                                            ✏️ Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(quiz.id)}
                                            className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 border-2 border-red-500"
                                        >
                                            🗑️ Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
