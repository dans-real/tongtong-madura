export type MaterialCategory =
    | "history"
    | "instruments"
    | "rhythm"
    | "social"
    | "modern";

export type Material = {
    slug: string;
    title: string;
    category: MaterialCategory;
    excerpt: string;
    content: string;
};

export const materials: Material[] = [
    {
        slug: "history-of-tong-tong",
        title: "History of Tong-Tong in Madura",
        category: "history",
        excerpt:
            "How tong-tong grew from a simple kentongan for ronda into a lively cultural performance.",
        content: `
Tong-tong berakar dari tradisi ronda malam di kampung-kampung Madura. Dulu, warga memukul kentongan untuk memberi tanda bahaya, kebakaran, atau serangan perampok. Bunyi kentongan juga dipakai untuk menandai pergantian waktu dan mengumpulkan warga.

Seiring waktu, pola pukulan kentongan berkembang. Warga mulai memainkan ritme yang lebih teratur, menambah variasi tempo, dan menjadikannya bagian dari hiburan rakyat. Dari sinilah muncul kelompok-kelompok tong-tong yang tampil saat acara kampung, perayaan hari besar, dan festival budaya.

Dalam perkembangannya, tong-tong menjadi simbol kebersamaan dan kewaspadaan. Meskipun teknologi komunikasi sudah maju, banyak kampung yang masih mempertahankan tong-tong sebagai identitas budaya dan cara berkumpul bersama.`,
    },
    {
        slug: "tong-tong-instruments",
        title: "Tong-Tong Instruments and Their Roles",
        category: "instruments",
        excerpt:
            "Get to know the main instruments in a tong-tong group and the rhythm roles they play.",
        content: `
Satu kelompok tong-tong biasanya terdiri dari beberapa kentongan dengan ukuran dan nada yang berbeda. Secara umum, kita bisa membaginya menjadi:

1. Kentongan utama
   Berukuran lebih besar dan menghasilkan nada rendah. Fungsinya sebagai penopang ritme dasar, mirip 'kick drum' dalam musik modern.

2. Kentongan pengiring
   Berukuran sedang dengan nada menengah. Pukulan diisi di sela-sela ritme utama untuk memberi variasi dan menggerakkan pola.

3. Kentongan aksen
   Lebih kecil dan bernada tinggi. Dipakai untuk memberi penekanan pada bagian tertentu, misalnya menjelang teriakan semangat atau pergantian pola.

Selain kentongan, beberapa kelompok tong-tong menambahkan bedug kecil, simbal, atau bahkan drum modern. Penambahan ini bertujuan agar suara lebih kaya dan dekat dengan selera anak muda tanpa menghilangkan karakter asli tong-tong.`,
    },
    {
        slug: "rhythm-and-patterns",
        title: "Rhythms and Basic Patterns in Tong-Tong",
        category: "rhythm",
        excerpt:
            "Simple ways to feel and follow tong-tong rhythms, even for beginners.",
        content: `
Ritme tong-tong biasanya dibangun dari pola pengulangan yang sederhana namun enerjik. Jika kita membayangkan dalam hitungan 1–2–3–4, kentongan utama mengisi ketukan kuat, sementara kentongan pengiring mengisi sela di antaranya.

Contoh pola dasar:
- Kentongan utama: 1   .   3   .
- Kentongan pengiring: .  2 .  4
- Kentongan aksen: variasi di antara ketukan untuk memberi kejutan.

Pola sederhana ini kemudian dikembangkan menjadi variasi tempo cepat, lambat, atau berhenti sejenak untuk memberi ruang sorakan. Dengan cara ini, ritme tong-tong mudah diikuti sekaligus mengundang orang untuk bergerak bersama.`,
    },
    {
        slug: "social-function-of-tong-tong",
        title: "Social Function of Tong-Tong in the Community",
        category: "social",
        excerpt:
            "Beyond music, tong-tong strengthens solidarity, vigilance, and shared identity.",
        content: `
Tong-tong bukan hanya soal bunyi, tetapi juga cara masyarakat membangun solidaritas. Saat kentongan dipukul, warga tahu bahwa ada sesuatu yang penting: bahaya, pengumuman, atau ajakan berkumpul.

Beberapa fungsi sosial tong-tong:
- Menguatkan rasa aman karena warga saling menjaga.
- Menjadi media komunikasi murah dan efektif di kampung.
- Menjadi momen berkumpul, berdiskusi, dan bersenda gurau.

Dalam acara-acara budaya, tong-tong juga menjadi penanda kebanggaan lokal. Setiap daerah punya gaya pukulan dan cara berteriak yang khas, memperkuat identitas kolektif sebagai orang Madura.`,
    },
    {
        slug: "tong-tong-and-youth",
        title: "Tong-Tong and Today’s Youth",
        category: "modern",
        excerpt:
            "How tong-tong can stay relevant by collaborating with modern music and digital media.",
        content: `
Banyak anak muda yang merasa jauh dari budaya tradisional karena lebih dekat dengan musik digital dan media sosial. Namun tong-tong justru punya potensi besar untuk dikolaborasikan dengan dunia modern.

Beberapa ide pengembangan:
- Menggabungkan tong-tong dengan beat hip-hop atau EDM.
- Membuat konten pendek di media sosial berisi challenge ritme tong-tong.
- Mengadakan workshop tong-tong di kampus dan komunitas kreatif.

Dengan cara ini, tong-tong tidak hanya dikenang sebagai tradisi masa lalu, tetapi dihidupkan kembali sebagai ruang ekspresi baru yang membanggakan akar budaya Madura.`,
    },
];

export function getMaterialBySlug(slug: string): Material | undefined {
    return materials.find((m) => m.slug === slug);
}
