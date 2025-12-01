"use client";

import Image from "next/image";
import { regions } from "@/data/regions";
import { useRouter } from "next/navigation";

const positions: Record<string, { top: string; left: string }> = {
    bangkalan: { top: "55%", left: "5%" }, // ujung barat, agak ke bawah
    sampang: { top: "75%", left: "35%" }, // tengah-barat, sisi selatan
    pamekasan: { top: "70%", left: "56%" }, // tengah-timur, sisi selatan
    sumenep: { top: "47%", left: "92%" }, // ujung timur, sedikit naik
};

export default function MapMadura() {
    const router = useRouter();

    return (
        <div className="relative w-full aspect-video rounded-3xl border border-slate-900 overflow-hidden shadow-soft-card">
            {/* Foto map Madura */}
            <Image
                src="/madura-map.png"
                alt="Map of Madura showing Bangkalan, Sampang, Pamekasan, and Sumenep regions"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                className="object-cover"
                priority
            />
            {/* Overlay gelap biar teks & pin kebaca */}
            <div className="absolute inset-0 bg-slate-950/50" />

            <div className="absolute top-3 left-4 text-[11px] text-slate-100">
                <div className="font-semibold">Madura Island</div>
                <div className="text-slate-300">
                    Click a pin to explore local Tong-Tong culture.
                </div>
            </div>

            {regions.map((region) => {
                const pos = positions[region.slug];
                if (!pos) return null;
                return (
                    <button
                        key={region.slug}
                        style={{ top: pos.top, left: pos.left }}
                        onClick={() => router.push(`/daerah/${region.slug}`)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none focus:ring-2 focus:ring-maduraGold focus:ring-offset-2 focus:ring-offset-slate-950 rounded-full"
                        aria-label={`Explore Tong-Tong culture in ${region.name}`}
                    >
                        <div className="w-4 h-4 rounded-full bg-maduraGold shadow-[0_0_18px_#fbbf24] group-hover:scale-125 transition-transform" />
                        <div className="mt-1 px-2 py-1 rounded-full bg-slate-950/90 border border-slate-700 text-[10px] text-slate-100 whitespace-nowrap group-hover:border-maduraGold">
                            {region.name}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
