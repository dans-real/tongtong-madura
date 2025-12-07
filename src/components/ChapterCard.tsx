"use client";

import { useState } from "react";
import type { ExploreTopic } from "@/data/exploreTopics";
import Image from "next/image";

interface ChapterCardProps {
    topic: ExploreTopic;
    index: number;
}

export default function ChapterCard({ topic, index }: ChapterCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div
            className={`
                group relative rounded-2xl overflow-hidden
                border-2 bg-linear-to-br from-redBrown-900/80 to-redBrown-950/60
                shadow-lg hover:shadow-2xl
                transition-all duration-300
                animate-slideUp
                ${isExpanded
                    ? `border-maduraGold/70 scale-[1.02] shadow-maduraGold/20`
                    : `border-redBrown-700/50 hover:border-maduraGold/40`
                }
            `}
            style={{
                animationDelay: `${index * 80}ms`,
            }}
        >
            <div className="p-5 md:p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white leading-snug">
                    {topic.title}
                </h3>

                {/* Image */}
                {topic.imageUrl && (
                    <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden border-2 border-redBrown-600/50">
                        <Image
                            src={topic.imageUrl}
                            alt={topic.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 60vw"
                        />
                    </div>
                )}

                {/* Sub Judul (if exists) */}
                {topic.subJudul && (
                    <div className="flex items-start gap-2">
                        <span className="text-emerald-400 text-lg shrink-0">📌</span>
                        <h4 className="text-base md:text-lg font-semibold text-emerald-400 leading-snug">
                            {topic.subJudul}
                        </h4>
                    </div>
                )}

                {/* Preview (First 200 chars) */}
                {!isExpanded && (
                    <p className="text-sm text-redBrown-200 leading-relaxed line-clamp-3">
                        {topic.informasi.substring(0, 200)}...
                    </p>
                )}

                {/* Expanded Content */}
                <div
                    className={`
                        overflow-hidden transition-all duration-300
                        ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}
                    `}
                >
                    {isExpanded && (
                        <div className="space-y-4 animate-fadeIn">
                            {/* Full Content */}
                            <div className="text-sm text-redBrown-100 leading-relaxed whitespace-pre-line">
                                {topic.informasi}
                            </div>

                            {/* References */}
                            {topic.referensi && (
                                <div className="pt-4 border-t border-redBrown-700/30">
                                    <h4 className="text-xs font-bold text-redBrown-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        Referensi
                                    </h4>
                                    <div className="text-xs text-redBrown-300 leading-relaxed whitespace-pre-line pl-6">
                                        {topic.referensi.split('\n').map((ref, idx) => (
                                            <div key={idx} className="flex items-start gap-2 mb-1">
                                                <span className="text-maduraGold mt-0.5">•</span>
                                                <span>{ref}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* CTA Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`
                        w-full px-4 py-2.5 rounded-lg font-semibold text-sm
                        transition-all duration-200
                        ${isExpanded
                            ? 'bg-redBrown-700/60 text-white border-2 border-redBrown-600 hover:bg-redBrown-700'
                            : 'bg-linear-to-r from-maduraGold/90 to-amber-500 text-redBrown-950 border-2 border-maduraGold hover:from-maduraGold hover:to-maduraGold shadow-md hover:shadow-lg'
                        }
                    `}
                >
                    {isExpanded ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            Tutup
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            Baca Lengkap
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
