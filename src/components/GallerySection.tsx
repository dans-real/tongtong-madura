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
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

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

    // Handle image click
    const handleImageClick = (item: GalleryItem) => {
        setSelectedImage(item);
        setLightboxOpen(true);
    };

    // Handle download - menggunakan metode langsung untuk menghindari CORS
    const handleDownload = () => {
        if (!selectedImage?.imageUrl) return;

        try {
            // Extract filename from title or use default
            const filename = selectedImage.title
                ? `${selectedImage.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`
                : 'tongtong-madura-gallery.jpg';

            // Method 1: Try to download directly with fetch
            fetch(selectedImage.imageUrl, { mode: 'cors' })
                .then(response => {
                    if (!response.ok) throw new Error('Fetch failed');
                    return response.blob();
                })
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    window.URL.revokeObjectURL(url);
                })
                .catch(() => {
                    // Method 2: Fallback - open in new tab
                    // Firebase Storage akan otomatis download jika dibuka langsung
                    console.log('Using fallback download method (opening in new tab)');
                    window.open(selectedImage.imageUrl, '_blank');
                });
        } catch (error) {
            console.error('Error downloading image:', error);
            // Fallback - open in new tab
            window.open(selectedImage.imageUrl, '_blank');
        }
    };

    // Close lightbox on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setLightboxOpen(false);
        };
        if (lightboxOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [lightboxOpen]);

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

            {/* Gallery Grid - Preserve original aspect ratios */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 max-w-6xl mx-auto space-y-5">
                {filteredItems.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => handleImageClick(item)}
                        className="group relative rounded-2xl overflow-hidden border-2 border-redBrown-800/50 bg-linear-to-br from-redBrown-900 to-redBrown-950 hover:border-white/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/20 cursor-pointer break-inside-avoid"
                        style={{
                            animationDelay: `${index * 50}ms`,
                        }}
                    >
                        {/* Image with original aspect ratio */}
                        {useFirebase && item.imageUrl ? (
                            <img
                                src={item.imageUrl}
                                alt={item.title || item.caption}
                                className="w-full h-auto object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full aspect-square bg-linear-to-br from-redBrown-800/80 via-redBrown-900/80 to-redBrown-950/80 flex items-center justify-center">
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

            {/* Lightbox Modal - Fit viewport dengan website scrollable */}
            {lightboxOpen && selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/97 flex items-center justify-center p-4 animate-fadeIn"
                    onClick={() => setLightboxOpen(false)}
                    suppressHydrationWarning
                >
                    {/* Floating Controls - Fixed position */}
                    <div className="fixed top-6 right-6 flex gap-3 z-20">
                        {/* Download Button */}
                        {useFirebase && selectedImage.imageUrl && (
                            <button
                                onClick={handleDownload}
                                className="text-white/80 hover:text-white transition-all w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 backdrop-blur-sm"
                                aria-label="Download"
                                title="Download gambar"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </button>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={() => setLightboxOpen(false)}
                            className="text-white/80 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 backdrop-blur-sm text-2xl"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Image Container - Fit viewport */}
                    <div
                        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {useFirebase && selectedImage.imageUrl ? (
                            <img
                                src={selectedImage.imageUrl}
                                alt={selectedImage.title || selectedImage.caption}
                                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                            />
                        ) : (
                            <div className="w-96 h-96 bg-linear-to-br from-redBrown-800/80 via-redBrown-900/80 to-redBrown-950/80 flex items-center justify-center rounded-lg">
                                <span className="text-9xl opacity-40">🥁</span>
                            </div>
                        )}
                    </div>

                    {/* Caption - Bottom overlay */}
                    {selectedImage.caption && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-2xl px-4">
                            <p className="text-center text-white/80 text-sm bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
                                {selectedImage.caption}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
