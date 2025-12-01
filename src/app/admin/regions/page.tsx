"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { db } from '@/lib/firebase';
import {
    collection,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    Timestamp
} from 'firebase/firestore';

interface Region {
    id: string;
    slug: string;
    name: string;
    shortDescription: string;
    history: string;
    uniqueness: string;
    coordinates?: { lat: number; lng: number };
}

export default function RegionsAdminPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [regions, setRegions] = useState<Region[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [slug, setSlug] = useState('');
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [history, setHistory] = useState('');
    const [uniqueness, setUniqueness] = useState('');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin');
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;

        const unsubscribe = onSnapshot(collection(db, 'regions'), (snapshot) => {
            const loadedRegions: Region[] = [];
            snapshot.forEach((doc) => {
                loadedRegions.push({ id: doc.id, ...doc.data() } as Region);
            });
            setRegions(loadedRegions);
        });

        return () => unsubscribe();
    }, [user]);

    const resetForm = () => {
        setSlug('');
        setName('');
        setShortDescription('');
        setHistory('');
        setUniqueness('');
        setEditingId(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const regionData = {
                slug,
                name,
                shortDescription,
                history,
                uniqueness,
                updatedAt: Timestamp.now()
            };

            if (editingId) {
                await updateDoc(doc(db, 'regions', editingId), regionData);
                alert('Region updated!');
            } else {
                await setDoc(doc(db, 'regions', slug), {
                    ...regionData,
                    createdAt: Timestamp.now()
                });
                alert('Region added!');
            }
            resetForm();
        } catch (error) {
            console.error('Error saving region:', error);
            alert('Error saving region');
        }
    };

    const handleEdit = (region: Region) => {
        setSlug(region.slug);
        setName(region.name);
        setShortDescription(region.shortDescription);
        setHistory(region.history);
        setUniqueness(region.uniqueness);
        setEditingId(region.id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this region?')) return;

        try {
            await deleteDoc(doc(db, 'regions', id));
            alert('Region deleted!');
        } catch (error) {
            console.error('Error deleting region:', error);
            alert('Error deleting region');
        }
    };

    if (loading || !user) {
        return <div className="min-h-screen flex items-center justify-center bg-redBrown-950 text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-redBrown-950 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white">Regions Management</h1>
                    <button
                        onClick={() => router.push('/admin')}
                        className="px-4 py-2 bg-redBrown-800 text-white rounded-lg hover:bg-redBrown-700"
                    >
                        ← Back
                    </button>
                </div>

                {/* Form */}
                <div className="bg-redBrown-900/80 border-2 border-redBrown-700/50 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {editingId ? 'Edit Region' : 'Add Region'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-redBrown-200 mb-2">Slug (ID)</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                required
                                disabled={!!editingId}
                                className="w-full px-4 py-2 bg-redBrown-800 border border-redBrown-600 rounded-lg text-white disabled:opacity-50"
                                placeholder="bangkalan"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-redBrown-200 mb-2">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-redBrown-800 border border-redBrown-600 rounded-lg text-white"
                                placeholder="Bangkalan"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-redBrown-200 mb-2">Short Description</label>
                            <textarea
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                                required
                                rows={2}
                                className="w-full px-4 py-2 bg-redBrown-800 border border-redBrown-600 rounded-lg text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-redBrown-200 mb-2">History & Function</label>
                            <textarea
                                value={history}
                                onChange={(e) => setHistory(e.target.value)}
                                required
                                rows={4}
                                className="w-full px-4 py-2 bg-redBrown-800 border border-redBrown-600 rounded-lg text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-redBrown-200 mb-2">Character & Uniqueness</label>
                            <textarea
                                value={uniqueness}
                                onChange={(e) => setUniqueness(e.target.value)}
                                required
                                rows={4}
                                className="w-full px-4 py-2 bg-redBrown-800 border border-redBrown-600 rounded-lg text-white"
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-white text-redBrown-900 font-bold rounded-lg hover:bg-gray-100"
                            >
                                {editingId ? 'Update Region' : 'Add Region'}
                            </button>
                            {editingId && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 bg-redBrown-700 text-white rounded-lg hover:bg-redBrown-600"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Regions List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white">Existing Regions ({regions.length})</h2>
                    {regions.map((region) => (
                        <div
                            key={region.id}
                            className="bg-redBrown-900/80 border-2 border-redBrown-700/50 rounded-xl p-4"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-bold text-white">{region.name}</h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(region)}
                                        className="px-4 py-1 bg-white text-redBrown-900 font-medium rounded-lg hover:bg-gray-100 text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(region.id)}
                                        className="px-4 py-1 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="text-sm text-redBrown-300 mb-2">{region.shortDescription}</p>
                            <p className="text-xs text-redBrown-400">Slug: {region.slug}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
