"use client";

import { useState, useEffect } from "react";
import { galleryItems as staticGalleryItems } from "@/data/gallery";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

interface GalleryItem {
    id: string;
    imageUrl?: string;
    title?: string;
    caption: string;
    tags: string[];
}

export default function GallerySection() {
    const [items, setItems] = useState<GalleryItem[]>(staticGalleryItems);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [useFirebase, setUseFirebase] = useState(false);

    const AVAILABLE_REGIONS = ['Bangkalan', 'Sampang', 'Pamekasan', 'Sumenep'];

    // Try to load from Firestore, fallback to static data
    useEffect(() => {
        try {
            const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                if (!snapshot.empty) {
                    const loaded: GalleryItem[] = [];
                    snapshot.forEach((doc) => {
                        loaded.push({ id: doc.id, ...doc.data() } as GalleryItem);
                    });
                    setItems(loaded);
                    setUseFirebase(true);
                }
                setLoading(false);
            }, (error) => {
                console.log('Firebase not configured, using static data');
                setLoading(false);
            });

            return () => unsubscribe();
        } catch (error) {
            console.log('Firebase not configured, using static data');
            setLoading(false);
        }
    }, []);

    // Get only region tags that are in the available list
    const regionTags = AVAILABLE_REGIONS.filter(region =>
        items.some(item => item.tags.includes(region))
    );

    // Filter items
    const filteredItems = selectedTag
        ? items.filter((item) => item.tags.includes(selectedTag))
        : items;

    return (
        <div className="animate-fadeIn space-y-6">
            {/* Intro */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center justify-center gap-3 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    <span>📸</span>
                    <span>Galeri Visual</span>
                </h2>
            </div>

            {/* Tag Filter */}
            <div className="flex flex-wrap justify-center gap-2">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 shadow-lg ${selectedTag === null
                        ? "bg-linear-to-r from-amber-400 to-amber-500 text-redBrown-950 shadow-amber-400/50 scale-105 border-2 border-amber-300"
                        : "bg-slate-700/80 text-white hover:bg-slate-600 border-2 border-slate-600"
                        }`}
                >
                    Semua
                </button>
                {regionTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 shadow-lg ${selectedTag === tag
                            ? "bg-linear-to-r from-amber-400 to-amber-500 text-redBrown-950 shadow-amber-400/50 scale-105 border-2 border-amber-300"
                            : "bg-slate-700/80 text-white hover:bg-slate-600 border-2 border-slate-600"
                            }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
                {filteredItems.map((item, index) => (
                    <div
                        key={item.id}
                        className="group relative aspect-4/3 rounded-2xl overflow-hidden border-2 border-redBrown-800/50 bg-linear-to-br from-redBrown-900 to-redBrown-950 hover:border-white/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/20"
                        style={{
                            animationDelay: `${index * 50}ms`,
                        }}
                    >
                        {/* Image or placeholder */}
                        {useFirebase && item.imageUrl ? (
                            <img
                                src={item.imageUrl}
                                alt={item.title || item.caption}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-linear-to-br from-redBrown-800/80 via-redBrown-900/80 to-redBrown-950/80 flex items-center justify-center">
                                <span className="text-5xl opacity-40">🥁</span>
                            </div>
                        )}

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-linear-to-t from-redBrown-950/95 via-redBrown-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <p className="text-xs md:text-sm text-white leading-relaxed font-medium">
                                {item.caption}
                            </p>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {item.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-2 py-1 rounded-full bg-amber-400/90 border-2 border-amber-300 text-[10px] text-redBrown-950 font-bold backdrop-blur-sm shadow-lg"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-redBrown-300">Nggak ada foto untuk tag ini.</p>
                </div>
            )}
        </div>
    );
}
