"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import GallerySection from "@/components/GallerySection";
import JelajahSection from "@/components/JelajahSection";
import KuisSection from "@/components/KuisSection";

type TabType = "galeri" | "jelajah" | "kuis";

export default function HomePage() {
    const searchParams = useSearchParams();
    const tabParam = searchParams.get('tab');
    const [activeTab, setActiveTab] = useState<TabType>("galeri");

    // Set active tab based on URL parameter
    useEffect(() => {
        if (tabParam === 'kuis' || tabParam === 'jelajah' || tabParam === 'galeri') {
            setActiveTab(tabParam as TabType);
        }
    }, [tabParam]);

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <section className="text-center space-y-6 pt-4 pb-2">
                <div className="space-y-3 max-w-3xl mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                        <span className="block text-amber-300 drop-shadow-[0_4px_12px_rgba(251,191,36,0.6)] text-4xl md:text-6xl font-black tracking-tight">
                            TONGMA
                        </span>
                        <span className="block text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-xl md:text-3xl mt-1">
                            Tong-Tong Madura
                        </span>
                        <span className="block text-2xl md:text-3xl text-white/90 mt-2">
                            Rhythm Playground
                        </span>
                    </h1>
                    <div className="flex justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r from-redBrown-500/30 to-redBrown-600/30 border border-redBrown-400/50 text-[10px] font-medium text-white shadow-lg shadow-redBrown-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-sm shadow-white"></span>
                            Culture • Vibe • Youth
                        </span>
                    </div>
                    <p className="text-sm md:text-base text-redBrown-300 leading-relaxed max-w-2xl mx-auto">
                        Lihat vibe-nya, jelajah ceritanya, uji pemahamanmu. Semua dalam satu tempat.
                    </p>
                </div>

                {/* Tab Navigation - 3 Pillars */}
                <div className="flex justify-center pt-2">
                    <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-redBrown-900/90 border-2 border-redBrown-700/50 shadow-2xl shadow-redBrown-950/50 backdrop-blur">
                        {/* Galeri Tab */}
                        <button
                            onClick={() => setActiveTab("galeri")}
                            className={`
                                group relative px-5 py-2.5 rounded-full font-medium text-sm
                                transition-all duration-300 flex items-center gap-2
                                ${activeTab === "galeri"
                                    ? "bg-linear-to-r from-redBrown-500/30 to-redBrown-600/30 text-redBrown-100 border-2 border-redBrown-400 shadow-lg shadow-redBrown-500/40"
                                    : "text-redBrown-300 hover:text-redBrown-100 hover:bg-redBrown-800/60"
                                }
                            `}
                        >
                            <span className="text-sm opacity-70">◈</span>
                            <span>Gallery</span>
                            {activeTab === "galeri" && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-redBrown-400 animate-pulse shadow-sm shadow-redBrown-400" />
                            )}
                        </button>

                        {/* Jelajah Tab */}
                        <button
                            onClick={() => setActiveTab("jelajah")}
                            className={`
                                group relative px-5 py-2.5 rounded-full font-medium text-sm
                                transition-all duration-300 flex items-center gap-2
                                ${activeTab === "jelajah"
                                    ? "bg-linear-to-r from-redBrown-600/30 to-redBrown-700/30 text-redBrown-100 border-2 border-redBrown-500 shadow-lg shadow-redBrown-600/40"
                                    : "text-redBrown-300 hover:text-redBrown-100 hover:bg-redBrown-800/60"
                                }
                            `}
                        >
                            <span className="text-sm opacity-70">◉</span>
                            <span>Explore</span>
                            {activeTab === "jelajah" && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-redBrown-500 animate-pulse shadow-sm shadow-redBrown-500" />
                            )}
                        </button>

                        {/* Kuis Tab */}
                        <button
                            onClick={() => setActiveTab("kuis")}
                            className={`
                                group relative px-5 py-2.5 rounded-full font-medium text-sm
                                transition-all duration-300 flex items-center gap-2
                                ${activeTab === "kuis"
                                    ? "bg-linear-to-r from-redBrown-700/30 to-redBrown-800/30 text-redBrown-100 border-2 border-redBrown-600 shadow-lg shadow-redBrown-700/40"
                                    : "text-redBrown-300 hover:text-redBrown-100 hover:bg-redBrown-800/60"
                                }
                            `}
                        >
                            <span className="text-sm opacity-70">◆</span>
                            <span>Quiz</span>
                            {activeTab === "kuis" && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-redBrown-600 animate-pulse shadow-sm shadow-redBrown-600" />
                            )}
                        </button>
                    </div>
                </div>
            </section>

            {/* Tabbed Content Area */}
            <section className="min-h-[60vh]">
                {/* Galeri Content */}
                {activeTab === "galeri" && <GallerySection />}

                {/* Jelajah Content */}
                {activeTab === "jelajah" && <JelajahSection />}

                {/* Kuis Content */}
                {activeTab === "kuis" && <KuisSection />}
            </section>
        </div>
    );
}