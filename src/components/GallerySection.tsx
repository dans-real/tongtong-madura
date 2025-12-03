"use client";

import { useState, useEffect } from "react";
import { galleryItems as staticGalleryItems, type GalleryItem } from "@/data/gallery";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

export default function GallerySection() {
    const [items, setItems] = useState<GalleryItem[]>(staticGalleryItems);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [useFirebase, setUseFirebase] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const [isFilterTransitioning, setIsFilterTransitioning] = useState(false);

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

    // Filter items by region
    const filteredItems = selectedRegion
        ? items.filter((item) => {
            // Prioritas 1: Check tags array (Firebase structure)
            if (item.tags && Array.isArray(item.tags)) {
                return item.tags.includes(selectedRegion);
            }
            // Prioritas 2: Check region field (enriched data)
            if (item.region) {
                return item.region === selectedRegion;
            }
            return false;
        })
        : items;

    // Get featured item (first item marked as featured or first item in list)
    const featuredItem = items.find(item => item.isFeatured) || items[0];
    const regularItems = filteredItems.filter(item => item.id !== featuredItem?.id);

    // Handle filter change with transition
    const handleRegionChange = (region: string | null) => {
        setIsFilterTransitioning(true);
        setTimeout(() => {
            setSelectedRegion(region);
            setIsFilterTransitioning(false);
        }, 150);
    };

    // Handle image click
    const handleImageClick = (item: GalleryItem) => {
        setSelectedImage(item);
        setLightboxOpen(true);
    };

    // Handle download
    const handleDownload = () => {
        if (!selectedImage?.imageUrl) return;

        try {
            const filename = selectedImage.title
                ? `${selectedImage.title.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`
                : 'tongtong-madura-gallery.jpg';

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
                    window.open(selectedImage.imageUrl, '_blank');
                });
        } catch (error) {
            console.error('Error downloading image:', error);
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
        <div className="animate-fadeIn space-y-8">
            {/* Intro */}
            <div className="text-center space-y-2 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    <span className="text-4xl">📸</span>
                    <span>Galeri Visual</span>
                </h2>
                <p className="text-sm text-redBrown-200/90">
                    Lihat warna dan bentuk Tong-Tong sebelum kamu baca ceritanya.
                </p>
            </div>

            {/* Region Filter Chips */}
            <div className="flex flex-wrap justify-center gap-3">
                <button
                    onClick={() => handleRegionChange(null)}
                    className={`
                        px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg
                        ${selectedRegion === null
                            ? "bg-linear-to-r from-redBrown-500 to-redBrown-600 text-white border-2 border-maduraGold shadow-maduraGold/50 scale-105"
                            : "bg-redBrown-800/60 text-redBrown-200 hover:bg-redBrown-700/80 border-2 border-redBrown-700 hover:scale-105"
                        }
                    `}
                >
                    Semua
                </button>
                {AVAILABLE_REGIONS.map((region) => (
                    <button
                        key={region}
                        onClick={() => handleRegionChange(region)}
                        className={`
                            px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 shadow-lg
                            ${selectedRegion === region
                                ? "bg-linear-to-r from-redBrown-500 to-redBrown-600 text-white border-2 border-maduraGold shadow-maduraGold/50 scale-105"
                                : "bg-redBrown-800/60 text-redBrown-200 hover:bg-redBrown-700/80 border-2 border-redBrown-700 hover:scale-105"
                            }
                        `}
                    >
                        {region}
                    </button>
                ))}
            </div>

            {/* Featured Image Card */}
            {featuredItem && !selectedRegion && (
                <div
                    className="group relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-maduraGold/50 shadow-2xl shadow-maduraGold/20 cursor-pointer animate-slideUp"
                    onClick={() => handleImageClick(featuredItem)}
                >
                    {/* Image */}
                    <div className="relative aspect-21/9 overflow-hidden">
                        {featuredItem.imageUrl ? (
                            <img
                                src={featuredItem.imageUrl}
                                alt={featuredItem.title}
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full bg-linear-to-br from-redBrown-800 via-redBrown-900 to-redBrown-950 flex items-center justify-center">
                                <span className="text-8xl opacity-30">🥁</span>
                            </div>
                        )}
                    </div>

                    {/* Gradient Overlay (always visible but enhanced on hover) */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 space-y-2">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-3 py-1 rounded-full bg-maduraGold text-redBrown-950 text-xs font-bold">FEATURED</span>
                                {featuredItem.region && (
                                    <span className="px-3 py-1 rounded-full bg-redBrown-700/80 backdrop-blur-sm text-white text-xs font-semibold">
                                        {featuredItem.region}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white">{featuredItem.title}</h3>
                            {(featuredItem.description || featuredItem.caption) && (
                                <p className="text-sm md:text-base text-white/90 max-w-2xl">
                                    {featuredItem.description || featuredItem.caption}
                                </p>
                            )}
                            {featuredItem.year && (
                                <p className="text-xs text-white/70">{featuredItem.year}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Gallery Grid - Pinterest Masonry Style */}
            <div
                className={`
                    columns-1 md:columns-2 lg:columns-3 gap-6 max-w-6xl mx-auto space-y-6
                    transition-opacity duration-300
                    ${isFilterTransitioning ? 'opacity-0' : 'opacity-100'}
                `}
            >
                {regularItems.map((item, index) => (
                    <div
                        key={item.id}
                        onClick={() => handleImageClick(item)}
                        className="group relative rounded-2xl overflow-hidden border-2 border-redBrown-700/50 bg-linear-to-br from-redBrown-900 to-redBrown-950 hover:border-maduraGold/70 transition-all duration-300 hover:shadow-2xl hover:shadow-maduraGold/20 cursor-pointer animate-slideUp break-inside-avoid mb-6"
                        style={{
                            animationDelay: `${index * 50}ms`,
                        }}
                    >
                        {/* Image - Natural Size */}
                        <div className="relative overflow-hidden">
                            {item.imageUrl ? (
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-250"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full aspect-square bg-linear-to-br from-redBrown-800 via-redBrown-900 to-redBrown-950 flex items-center justify-center">
                                    <span className="text-6xl opacity-30">🥁</span>
                                </div>
                            )}
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250 flex flex-col justify-end p-5">
                            <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                            {item.region && (
                                <p className="text-sm text-maduraGold font-semibold mb-1">{item.region}</p>
                            )}
                            {item.year && (
                                <p className="text-xs text-white/70">{item.year}</p>
                            )}
                        </div>

                        {/* Mobile Info (always visible) - Hidden on desktop */}
                        <div className="md:hidden absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 to-transparent p-4">
                            <h3 className="text-sm font-bold text-white">{item.title}</h3>
                            {item.region && (
                                <p className="text-xs text-maduraGold font-semibold">{item.region}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {filteredItems.length === 0 && (
                <div className="text-center py-16 animate-fadeIn">
                    <p className="text-lg text-redBrown-300">Nggak ada foto untuk daerah ini.</p>
                </div>
            )}

            {/* Lightbox Modal */}
            {lightboxOpen && selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn"
                    style={{
                        background: selectedImage.imageUrl
                            ? `linear-gradient(rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.95)), url(${selectedImage.imageUrl})`
                            : 'rgba(0, 0, 0, 0.97)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundBlendMode: 'darken'
                    }}
                    onClick={() => setLightboxOpen(false)}
                    suppressHydrationWarning
                >
                    {/* Floating Controls */}
                    <div className="fixed top-6 right-6 flex gap-3 z-20">
                        {/* Download Button */}
                        {selectedImage.imageUrl && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDownload();
                                }}
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
                            onClick={(e) => {
                                e.stopPropagation();
                                setLightboxOpen(false);
                            }}
                            className="text-white/80 hover:text-white transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 backdrop-blur-sm text-2xl"
                            aria-label="Close"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Image Container */}
                    <div
                        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {selectedImage.imageUrl ? (
                            <img
                                src={selectedImage.imageUrl}
                                alt={selectedImage.title || selectedImage.description || "Gallery image"}
                                className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                            />
                        ) : (
                            <div className="w-96 h-96 bg-linear-to-br from-redBrown-800/80 via-redBrown-900/80 to-redBrown-950/80 flex items-center justify-center rounded-lg">
                                <span className="text-9xl opacity-40">🥁</span>
                            </div>
                        )}
                    </div>

                    {/* Info - Bottom overlay */}
                    {(selectedImage.title || selectedImage.description || selectedImage.caption) && (
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 max-w-2xl px-4">
                            <div className="text-center bg-black/70 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
                                {selectedImage.title && (
                                    <h3 className="text-white font-bold text-lg mb-1">{selectedImage.title}</h3>
                                )}
                                {(selectedImage.description || selectedImage.caption) && (
                                    <p className="text-white/80 text-sm">
                                        {selectedImage.description || selectedImage.caption}
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
