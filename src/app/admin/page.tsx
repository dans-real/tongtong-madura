"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useAuth } from '@/lib/useAuth';
import {
    collection,
    onSnapshot,
    deleteDoc,
    doc,
    query,
    orderBy,
    limit
} from 'firebase/firestore';

interface GalleryItem {
    id: string;
    imageUrl?: string;
    title?: string;
    caption: string;
    tags: string[];
}

interface ExploreContent {
    id: string;
    title: string;
    informasi: string;
    referensi: string;
    imageUrl?: string;
}

interface Quiz {
    id: string;
    slug: string;
    title: string;
    level: string;
}

export default function AdminPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Data states
    const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
    const [exploreContents, setExploreContents] = useState<ExploreContent[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [activeTab, setActiveTab] = useState<'gallery' | 'explore' | 'quizzes'>('gallery');

    // Load all data when user is authenticated
    useEffect(() => {
        if (!user) return;

        // Load Gallery
        const galleryQuery = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const unsubGallery = onSnapshot(galleryQuery, (snapshot) => {
            const items: GalleryItem[] = [];
            snapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() } as GalleryItem);
            });
            setGalleryItems(items);
        }, (error) => {
            console.log('Gallery not loaded:', error);
        });

        // Load Explore Content
        const exploreQuery = query(collection(db, 'explore'), orderBy('createdAt', 'desc'));
        const unsubExplore = onSnapshot(exploreQuery, (snapshot) => {
            const items: ExploreContent[] = [];
            snapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() } as ExploreContent);
            });
            setExploreContents(items);
        }, (error) => {
            console.log('Explore content not loaded:', error);
        });

        // Load Quizzes
        const quizQuery = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'));
        const unsubQuizzes = onSnapshot(quizQuery, (snapshot) => {
            const items: Quiz[] = [];
            snapshot.forEach((doc) => {
                items.push({ id: doc.id, ...doc.data() } as Quiz);
            });
            setQuizzes(items);
        }, (error) => {
            console.log('Quizzes not loaded:', error);
        });

        return () => {
            unsubGallery();
            unsubExplore();
            unsubQuizzes();
        };
    }, [user]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoggingIn(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Successfully logged in - user state will update via useAuth
        } catch (err: any) {
            setError(err.message || 'Login gagal. Periksa email dan password.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const handleDelete = async (type: 'gallery' | 'explore' | 'quizzes', id: string) => {
        if (!confirm(`Hapus ${type === 'gallery' ? 'galeri' : type === 'explore' ? 'konten explore' : 'quiz'} ini?`)) return;

        try {
            await deleteDoc(doc(db, type, id));
            alert('Item berhasil dihapus!');
        } catch (error) {
            console.error('Error deleting:', error);
            alert('Gagal menghapus item');
        }
    };

    const handleEdit = (type: string, id: string) => {
        router.push(`/admin/${type}?edit=${id}`);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-redBrown-950">
                <div className="text-white text-lg">Loading...</div>
            </div>
        );
    }

    // If not logged in, show login form
    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-redBrown-950 px-4">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
                        <p className="text-redBrown-300 text-sm">Tong-Tong Madura Dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="bg-redBrown-900/80 rounded-2xl border-2 border-redBrown-700/50 p-8 space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-redBrown-200 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-redBrown-800 border border-redBrown-600 rounded-lg text-white placeholder-redBrown-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-redBrown-200 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-redBrown-800 border border-redBrown-600 rounded-lg text-white placeholder-redBrown-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 text-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full bg-amber-500 text-white font-bold py-3 rounded-lg hover:bg-amber-600 transition-colors border-2 border-amber-400 shadow-lg shadow-amber-400/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoggingIn ? 'Logging in...' : 'Login as Admin'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    // If logged in, show admin dashboard with all content
    return (
        <div className="min-h-screen bg-redBrown-950 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Content Management Dashboard</h1>
                        <p className="text-redBrown-300 text-sm">Logged in as: {user.email}</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-redBrown-800 text-white rounded-lg hover:bg-redBrown-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-redBrown-900/80 border-2 border-redBrown-700/50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-redBrown-300 text-sm">Total Gallery</p>
                                <p className="text-3xl font-bold text-white">{galleryItems.length}</p>
                            </div>
                            <div className="text-4xl">📸</div>
                        </div>
                    </div>
                    <div className="bg-redBrown-900/80 border-2 border-redBrown-700/50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-redBrown-300 text-sm">Explore Content</p>
                                <p className="text-3xl font-bold text-white">{exploreContents.length}</p>
                            </div>
                            <div className="text-4xl">🗺️</div>
                        </div>
                    </div>
                    <div className="bg-redBrown-900/80 border-2 border-redBrown-700/50 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-redBrown-300 text-sm">Total Quizzes</p>
                                <p className="text-3xl font-bold text-white">{quizzes.length}</p>
                            </div>
                            <div className="text-4xl">⚡</div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 mb-6 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap border-2 ${activeTab === 'gallery'
                            ? 'bg-amber-500 text-white border-amber-400 shadow-lg shadow-amber-400/30'
                            : 'bg-slate-700/80 text-white border-slate-600 hover:bg-slate-600'
                            }`}
                    >
                        📸 Gallery ({galleryItems.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('explore')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap border-2 ${activeTab === 'explore'
                            ? 'bg-amber-500 text-white border-amber-400 shadow-lg shadow-amber-400/30'
                            : 'bg-slate-700/80 text-white border-slate-600 hover:bg-slate-600'
                            }`}
                    >
                        🗺️ Explore ({exploreContents.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('quizzes')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap border-2 ${activeTab === 'quizzes'
                            ? 'bg-amber-500 text-white border-amber-400 shadow-lg shadow-amber-400/30'
                            : 'bg-slate-700/80 text-white border-slate-600 hover:bg-slate-600'
                            }`}
                    >
                        🎯 Quizzes ({quizzes.length})
                    </button>
                </div>

                {/* Gallery Tab */}
                {activeTab === 'gallery' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Gallery Items</h2>
                            <button
                                onClick={() => router.push('/admin/gallery')}
                                className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors border-2 border-amber-400 shadow-lg shadow-amber-400/30"
                            >
                                + Add New Gallery Item
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {galleryItems.length === 0 ? (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-redBrown-300">Belum ada item gallery. Klik "Add New" untuk menambahkan.</p>
                                </div>
                            ) : (
                                galleryItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-redBrown-900/80 border-2 border-redBrown-700/50 rounded-xl overflow-hidden hover:border-white/50 transition-all"
                                    >
                                        {item.imageUrl ? (
                                            <div className="aspect-video bg-redBrown-800 overflow-hidden">
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title || item.caption}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="aspect-video bg-redBrown-800 flex items-center justify-center">
                                                <span className="text-4xl">🥁</span>
                                            </div>
                                        )}
                                        <div className="p-4 space-y-2">
                                            {item.title && (
                                                <h3 className="font-bold text-white text-sm">{item.title}</h3>
                                            )}
                                            <p className="text-xs text-redBrown-300 line-clamp-2">{item.caption}</p>
                                            <div className="flex flex-wrap gap-1">
                                                {item.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-0.5 bg-amber-400/90 border border-amber-300 rounded-full text-[10px] text-redBrown-950 font-bold"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {item.tags.length > 3 && (
                                                    <span className="px-2 py-0.5 bg-amber-400/90 border border-amber-300 rounded-full text-[10px] text-redBrown-950 font-bold">
                                                        +{item.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex gap-2 pt-2">
                                                <button
                                                    onClick={() => handleEdit('gallery', item.id)}
                                                    className="flex-1 px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded hover:bg-amber-600 border-2 border-amber-400"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete('gallery', item.id)}
                                                    className="flex-1 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 border-2 border-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Explore Tab */}
                {activeTab === 'explore' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Explore Content ({exploreContents.length})</h2>
                            <button
                                onClick={() => router.push('/admin/explore')}
                                className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors border-2 border-amber-400 shadow-lg shadow-amber-400/30"
                            >
                                + Add New Article
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {exploreContents.length === 0 ? (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-redBrown-300">Belum ada konten explore. Klik tombol di atas untuk menambahkan.</p>
                                </div>
                            ) : (
                                exploreContents.map((content) => (
                                    <div
                                        key={content.id}
                                        className="bg-redBrown-900/80 border-2 border-redBrown-700/50 rounded-xl p-6 hover:border-white/50 transition-all"
                                    >
                                        <div className="space-y-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-bold text-white mb-2">{content.title}</h3>

                                                    {/* Image Preview */}
                                                    {content.imageUrl && (
                                                        <div className="mb-3">
                                                            <img
                                                                src={content.imageUrl}
                                                                alt={content.title}
                                                                className="w-full h-48 object-cover rounded-lg border-2 border-redBrown-600/50"
                                                            />
                                                        </div>
                                                    )}

                                                    <div className="space-y-3">
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-emerald-400 mb-1">Informasi:</h4>
                                                            <p className="text-sm text-redBrown-300 line-clamp-3">
                                                                {content.informasi}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-semibold text-emerald-400 mb-1">Referensi:</h4>
                                                            <p className="text-xs text-redBrown-400 line-clamp-2">
                                                                {content.referensi}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-3xl ml-4">🗺️</div>
                                            </div>
                                            <div className="flex gap-2 pt-2 border-t border-redBrown-700/50">
                                                <button
                                                    onClick={() => handleDelete('explore', content.id)}
                                                    className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 border-2 border-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Quizzes Tab */}
                {activeTab === 'quizzes' && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-white">Quiz Content</h2>
                            <button
                                onClick={() => router.push('/admin/quizzes')}
                                className="px-4 py-2 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 transition-colors border-2 border-amber-400 shadow-lg shadow-amber-400/30"
                            >
                                + Add New Quiz
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {quizzes.length === 0 ? (
                                <div className="col-span-full text-center py-12">
                                    <p className="text-redBrown-300">Belum ada quiz. Klik "Add New" untuk menambahkan.</p>
                                </div>
                            ) : (
                                quizzes.map((quiz) => (
                                    <div
                                        key={quiz.id}
                                        className="bg-redBrown-900/80 border-2 border-redBrown-700/50 rounded-xl p-4 hover:border-white/50 transition-all"
                                    >
                                        <div className="space-y-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-bold text-white">{quiz.title}</h3>
                                                    <p className="text-xs text-redBrown-400">Slug: {quiz.slug}</p>
                                                </div>

                                            </div>
                                            <div className="flex gap-2 pt-2">
                                                <button
                                                    onClick={() => handleEdit('quizzes', quiz.id)}
                                                    className="flex-1 px-3 py-1.5 bg-amber-500 text-white text-xs font-semibold rounded hover:bg-amber-600 border-2 border-amber-400"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete('quizzes', quiz.id)}
                                                    className="flex-1 px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700 border-2 border-red-500"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
