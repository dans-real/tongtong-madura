"use client";

import { useState, useEffect } from "react";
import { exploreTopics as staticTopics, type ExploreTopic } from "@/data/exploreTopics";
import ChapterCard from "./ChapterCard";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

export default function JelajahSection() {
    const [topics, setTopics] = useState<ExploreTopic[]>(staticTopics);
    const [loading, setLoading] = useState(true);

    // Load from Firebase
    useEffect(() => {
        const q = query(collection(db, 'explore'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                const loaded: ExploreTopic[] = [];
                snapshot.forEach((doc) => {
                    loaded.push({ id: doc.id, ...doc.data() } as ExploreTopic);
                });
                // Use Firebase data if available, otherwise fallback to static
                setTopics(loaded.length > 0 ? loaded : staticTopics);
                setLoading(false);
            },
            (error) => {
                console.error('Error loading explore topics:', error);
                // Fallback to static data on error
                setTopics(staticTopics);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return (
        <div className="animate-fadeIn">
            {/* Desktop 2-Column Layout */}
            <div className="grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-6 md:gap-8">

                {/* LEFT COLUMN: Map Card (Sticky on Desktop) */}
                <div className="md:sticky md:top-4 md:self-start">
                    <div className="rounded-3xl border-2 border-redBrown-700/50 bg-linear-to-br from-redBrown-900/80 to-redBrown-950/60 p-6 md:p-7 space-y-5 shadow-2xl shadow-redBrown-950/50">
                        {/* Title */}
                        <div className="space-y-2">
                            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                                <span>🗺️</span>
                                <span>Jelajah Madura</span>
                            </h2>
                            <p className="text-sm text-redBrown-300 leading-relaxed">
                                Madura punya empat kabupaten—tapi ritme Tong-Tong menyatu di seluruh pulau.
                                Di kanan, kamu bisa baca artikel dan pengetahuan tentang itu.
                            </p>
                        </div>

                        {/* Map Image */}
                        <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden border-2 border-redBrown-600/50 shadow-lg">
                            <Image
                                src="/madura-map.png"
                                alt="Peta Madura"
                                fill
                                className="object-contain bg-redBrown-950/50 p-4"
                                sizes="(max-width: 768px) 100vw, 400px"
                                priority
                            />
                        </div>

                        {/* Stats */}
                        <div className="pt-4 border-t border-redBrown-700/50">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="text-center p-3 rounded-xl bg-redBrown-800/40">
                                    <div className="text-2xl font-bold text-maduraGold">{topics.length}</div>
                                    <div className="text-xs text-redBrown-400">Artikel Tersedia</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Articles */}
                <div className="space-y-6">

                    {loading ? (
                        <div className="text-center py-16">
                            <div className="space-y-3">
                                <div className="text-4xl">⏳</div>
                                <p className="text-lg text-redBrown-300">Memuat artikel...</p>
                            </div>
                        </div>
                    ) : topics.length > 0 ? (
                        <div className="space-y-5">
                            {topics.map((topic, index) => (
                                <div key={topic.id} id={topic.id}>
                                    <ChapterCard topic={topic} index={index} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 animate-fadeIn">
                            <div className="space-y-3">
                                <div className="text-6xl">📚</div>
                                <p className="text-lg text-redBrown-300">
                                    Belum ada artikel. Tambahkan di panel admin.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
