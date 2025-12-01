"use client";

import { useState, useEffect } from "react";
import MapMadura from "./MapMadura";
import { db } from "@/lib/firebase";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Image from "next/image";

interface ExploreContent {
    id: string;
    title: string;
    informasi: string;
    referensi: string;
    imageUrl?: string;
    createdAt?: any;
}

export default function JelajahSection() {
    const [contents, setContents] = useState<ExploreContent[]>([]);
    const [loading, setLoading] = useState(true);

    // Load from Firestore
    useEffect(() => {
        try {
            const q = query(collection(db, 'explore'), orderBy('createdAt', 'desc'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as ExploreContent));
                setContents(data);
                setLoading(false);
            }, (error) => {
                console.log('Firebase not configured');
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            console.log('Firebase not configured');
            setLoading(false);
        }
    }, []);

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Intro */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-2 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    <span>🗺️</span>
                    <span>Jelajah Madura</span>
                </h2>
                <p className="text-sm md:text-base text-redBrown-300 leading-relaxed">
                    Madura itu satu pulau dengan empat kabupaten: Bangkalan, Sampang, Pamekasan, dan Sumenep. Tradisi Tong-Tong hidup di seluruh penjuru pulau ini dengan keunikan masing-masing.
                </p>
            </div>

            {/* Map */}
            <div className="max-w-4xl mx-auto">
                <MapMadura />
            </div>

            {/* Konten dari Firebase */}
            {loading ? (
                <div className="max-w-4xl mx-auto text-center py-12">
                    <div className="text-white">Loading konten...</div>
                </div>
            ) : contents.length > 0 ? (
                <div className="max-w-4xl mx-auto mt-8 space-y-6">
                    {contents.map((content) => (
                        <div key={content.id} className="rounded-3xl border-2 border-redBrown-700/50 bg-linear-to-br from-redBrown-900/80 to-redBrown-800/60 p-6 md:p-8 space-y-6 shadow-2xl shadow-redBrown-950/50">
                            {/* Header */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-white animate-pulse-slow shadow-sm shadow-white" />
                                    <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                                        {content.title}
                                    </h3>
                                </div>
                            </div>

                            {/* Image (if exists) */}
                            {content.imageUrl && (
                                <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden border-2 border-redBrown-600/50">
                                    <Image
                                        src={content.imageUrl}
                                        alt={content.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 896px"
                                    />
                                </div>
                            )}

                            {/* Informasi */}
                            <div className="space-y-2">
                                <h4 className="text-sm font-bold text-redBrown-300 uppercase tracking-wider flex items-center gap-2">
                                    <span className="text-base">📖</span>
                                    <span>Informasi</span>
                                </h4>
                                <div className="text-sm text-redBrown-100 leading-relaxed whitespace-pre-line">
                                    {content.informasi}
                                </div>
                            </div>

                            {/* Referensi */}
                            <div className="space-y-2 pt-4 border-t border-redBrown-700">
                                <h4 className="text-sm font-bold text-redBrown-400 uppercase tracking-wider flex items-center gap-2">
                                    <span className="text-base">📚</span>
                                    <span>Referensi</span>
                                </h4>
                                <div className="text-xs text-redBrown-200 leading-relaxed whitespace-pre-line">
                                    {content.referensi}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="max-w-4xl mx-auto text-center py-12">
                    <div className="space-y-3">
                        <div className="text-5xl">📝</div>
                        <p className="text-redBrown-300">
                            Konten belum tersedia. Admin belum mengisi informasi Explore.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
