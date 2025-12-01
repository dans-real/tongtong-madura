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
            "Tong-tong Bangkalan itu seperti pembukaan yang bikin kamu langsung fokus. Nggak terlalu riuh, tapi tegas—setiap ketukan berasa punya bobot.",
        history:
            "Dulu, tong-tong di Bangkalan dipake buat ronda malam dan ngasih tahu warga kalau ada bahaya. Sekarang? Biasa dimainkan pas acara 17 Agustus, festival desa, atau pembukaan acara budaya. Fungsinya udah bergeser dari alarm jadi hiburan, tapi tetap jadi simbol kebersamaan. Kalau ada acara besar di Bangkalan, pasti ada sesi tong-tong—kayak tradisi wajib yang nggak boleh dilewatin.\n\nTempo Bangkalan cenderung medium, nggak terlalu cepat tapi juga nggak lambat banget. Ritmenya teratur, kayak heartbeat yang konsisten. Aksennya sering muncul di awal ketukan, jadi pendengar langsung tau mana yang jadi patokan. Nggak banyak teriakan dramatis—lebih banyak dialog antara kentongan besar dan kentongan kecil.",
        uniqueness:
            "Biasanya ada 3–5 pemain. Kentongan utama (yang paling besar) dipegang sama pemain senior—dia yang jaga tempo dasar. Kentongan menengah dan kecil ngisi sela-sela, bikin variasi biar nggak monoton. Fun fact: Festival Gerbang Salam adalah event tahunan yang sering nampilkan tong-tong sebagai opening. Ada juga grup anak muda yang pernah eksperimen tong-tong dengan beatbox—viral di medsos lokal!",
        lat: -7.0303,
        lng: 112.749,
    },
    {
        slug: "sampang",
        name: "Sampang",
        shortDescription:
            "Kalau Bangkalan itu steady, Sampang lebih dinamis dan ekspresif. Tong-tong Sampang suka bikin kejutan—tempo bisa berubah tiba-tiba.",
        history:
            "Di Sampang, tong-tong dulunya juga buat ronda, tapi sekarang lebih sering dimainkan pas acara hajatan (pernikahan, sunatan, syukuran) atau malam takbiran. Fungsinya jadi semacam soundtrack untuk momen kebahagiaan kolektif. Warga Sampang percaya kalau suara kentongan bisa bikin acara lebih meriah dan 'hidup'.\n\nTempo Sampang bisa mulai pelan terus ngebut di tengah, atau sebaliknya. Ritmenya padat—banyak pukulan cepat di sela-sela ketukan utama. Teriakan pemain juga lebih sering—kadang kayak call-and-response antara pemain dan penonton. Rasanya kayak lagi nonton pertandingan: tegang, seru, bikin adrenalin naik.",
        uniqueness:
            "Biasanya 5–7 pemain. Kentongan besar jadi anchor, tapi yang nguasain panggung justru kentongan kecil—mereka yang bikin variasi ritme. Kadang ada pemain khusus yang cuma fokus ngasih teriakan atau vokalisasi ritmis. Fun fact: Pas malam takbiran, grup tong-tong Sampang keliling kampung sambil main—vibesnya kayak karnaval mini. Banyak pemain yang masih SMA atau mahasiswa!",
        lat: -7.1903,
        lng: 113.241,
    },
    {
        slug: "pamekasan",
        name: "Pamekasan",
        shortDescription:
            "Tong-tong Pamekasan itu yang paling 'nge-groove'—tempo cepat, ritme kompleks, banyak sinkopasi. Kayak main game ritme di level hard.",
        history:
            "Di Pamekasan, tong-tong sering jadi bagian dari pertunjukan seni rupa atau festival budaya. Fungsinya lebih ke arah entertainment dan pelestarian identitas lokal. Banyak sekolah di Pamekasan yang ngajarin tong-tong sebagai ekstrakurikuler—jadi generasi muda tetep kenal dan bisa main.\n\nTempo Pamekasan cepat dan nggak banyak jeda. Ritmenya penuh sinkopasi—ketukan muncul di tempat yang 'salah' tapi justru itu yang bikin seru. Aksen datang dari berbagai arah. Rasanya seperti lagi denger polyrhythm—banyak pola ritme jalan bareng tapi tetep harmonis.",
        uniqueness:
            "Biasanya 6–8 pemain. Kentongan besar tetap jadi fondasi, tapi kentongan kecil dan menengah punya porsi besar. Ada pemain khusus yang pegang dua kentongan sekaligus, mainnya kayak drummer. Fun fact: Festival Seni Pamekasan adalah event tahunan dengan lomba tong-tong. Ada juga produser musik lokal yang pernah sampling suara tong-tong buat track EDM—lumayan hits di radio lokal!",
        lat: -7.1544,
        lng: 113.474,
    },
    {
        slug: "sumenep",
        name: "Sumenep",
        shortDescription:
            "Tong-tong Sumenep itu elegan dan penuh nuansa. Tempo nggak terburu-buru, tapi setiap pukulan dipikirkan dengan matang. Energinya tenang tapi dalam.",
        history:
            "Sumenep punya pengaruh keraton yang kuat, jadi tong-tong di sini kadang dimainkan pas acara adat atau upacara kenegaraan lokal. Selain itu, biasa juga dimainkan pas festival budaya atau penyambutan tamu penting. Masyarakat Sumenep menghargai tong-tong sebagai warisan leluhur yang harus dijaga dengan cara yang terhormat.\n\nTempo Sumenep cenderung pelan sampai medium, jarang ngebut. Ritmenya terstruktur rapi—ada intro, body, dan outro yang jelas. Aksen sering muncul di akhir frase, bikin kesan 'closing statement' yang kuat.",
        uniqueness:
            "Biasanya 4–6 pemain. Kentongan utama dipegang pemain senior atau tokoh masyarakat—simbolisasi kepemimpinan. Formasi cenderung statis dan formal. Fun fact: Ada kentongan pusaka di keraton Sumenep yang dipercaya punya nilai spiritual. Kentongan Sumenep terkenal karena ukirannya yang detail dan artistik. Grup tong-tong Sumenep pernah perform di festival budaya internasional di Bali!",
        lat: -6.9269,
        lng: 113.906,
    },
];

export function getRegionBySlug(slug: string): Region | undefined {
    return regions.find((r) => r.slug === slug);
}
