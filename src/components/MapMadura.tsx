"use client";

import Image from "next/image";

export default function MapMadura() {
    const basePath = process.env.NODE_ENV === "production" ? "/tongtong-madura" : "";

    return (
        <div className="relative w-full aspect-video rounded-3xl border-2 border-redBrown-700/50 overflow-hidden shadow-2xl shadow-redBrown-950/50 bg-linear-to-br from-redBrown-900 via-redBrown-800 to-redBrown-900">
            {/* Foto map Madura */}
            <Image
                src={`${basePath}/madura-map.png`}
                alt="Map of Madura showing Bangkalan, Sampang, Pamekasan, and Sumenep regions"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                className="object-cover"
                priority
            />
            {/* Overlay gelap biar teks kebaca */}
            <div className="absolute inset-0 bg-linear-to-t from-redBrown-950/80 via-redBrown-900/50 to-redBrown-800/30" />

            <div className="absolute top-3 left-4 text-[11px] text-redBrown-50">
                <div className="font-bold text-sm mb-0.5 bg-linear-to-r from-redBrown-300 to-redBrown-500 bg-clip-text text-transparent">Pulau Madura</div>
                <div className="text-redBrown-200 text-xs">
                    🗺️ Empat kabupaten, satu tradisi Tong-Tong
                </div>
            </div>
        </div>
    );
}
