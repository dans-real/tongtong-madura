export type Region = {
    slug: string;
    name: string;
    shortDescription: string;
    history: string;
    uniqueness: string;
    lat: number;
    lng: number;
};

export const regions: Region[] = [
    {
        slug: "bangkalan",
        name: "Bangkalan",
        shortDescription:
            "Gerbang utama Madura dengan tradisi tong-tong ronda yang hidup hingga sekarang.",
        history:
            "Di Bangkalan, tong-tong berawal dari tradisi ronda malam untuk menjaga kampung. Bunyi kentongan menjadi tanda waktu, bahaya, dan ajakan berkumpul. Seiring waktu, pola pukulan mulai digarap lebih rapi dan dimainkan dalam acara-acara adat serta lomba tong-tong.",
        uniqueness:
            "Ritme tong-tong Bangkalan cenderung cepat, enerjik, dan penuh sorak semangat. Sering dipadukan dengan teriakan khas Madura dan gerakan tubuh pemain yang dinamis.",
        lat: -7.0303,
        lng: 112.749,
    },
    {
        slug: "sampang",
        name: "Sampang",
        shortDescription:
            "Kota pesisir dengan tong-tong sebagai pengikat solidaritas warga kampung nelayan.",
        history:
            "Tong-tong di Sampang berkembang di kampung-kampung pesisir. Awalnya digunakan sebagai pengganti lonceng kapal dan penanda perubahan cuaca, lalu menjadi hiburan rakyat di sela aktivitas melaut.",
        uniqueness:
            "Ritme di Sampang terasa lebih 'berayun' dengan jeda pukulan yang khas. Kadang dipadukan dengan nyanyian sederhana yang menceritakan kehidupan laut.",
        lat: -7.1903,
        lng: 113.241,
    },
    {
        slug: "pamekasan",
        name: "Pamekasan",
        shortDescription:
            "Tong-tong hadir dalam nuansa religius dan kegiatan keagamaan.",
        history:
            "Di Pamekasan, tong-tong sering digunakan sebagai penanda waktu sahur pada bulan Ramadan dan penggugah semangat jamaah. Grup tong-tong tumbuh di lingkungan pesantren dan kampung-kampung santri.",
        uniqueness:
            "Pukulan tong-tong Pamekasan terasa mantap dan ritmis, sering diulang dalam pola tertentu yang mudah diingat. Beberapa kelompok menggabungkan shalawat dan seruan religi dalam permainannya.",
        lat: -7.1544,
        lng: 113.474,
    },
    {
        slug: "sumenep",
        name: "Sumenep",
        shortDescription:
            "Kawasan dengan kekayaan seni tinggi, tong-tong berdampingan dengan karapan sapi dan musik tradisi lain.",
        history:
            "Sumenep dikenal kaya akan seni tradisi. Tong-tong di sini tidak hanya untuk ronda, tapi juga bagian dari atraksi budaya, festival, dan penyambutan tamu penting.",
        uniqueness:
            "Ritme tong-tong Sumenep cenderung variatif dan eksperimental. Beberapa kelompok memasukkan unsur musik modern seperti drum atau bass agar lebih menarik bagi generasi muda.",
        lat: -6.9269,
        lng: 113.906,
    },
];

export function getRegionBySlug(slug: string): Region | undefined {
    return regions.find((r) => r.slug === slug);
}
