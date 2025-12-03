export type GalleryItem = {
    id: string;
    title: string;
    imageUrl: string;

    // Main fields (Firebase structure)
    caption: string;           // Deskripsi/caption utama
    tags: string[];            // Region tags: ['Bangkalan', 'Sampang', etc]

    // New optional fields (enriched data)
    region?: "Bangkalan" | "Sampang" | "Pamekasan" | "Sumenep" | "All Madura" | string;  // Primary region
    mood?: string;             // e.g. "Night Parade", "Festival", "Practice"
    year?: number;             // Tahun foto diambil
    description?: string;      // Deskripsi detail (lebih panjang dari caption)
    isFeatured?: boolean;      // Tandai sebagai featured item

    // Firestore timestamps
    createdAt?: any;           // Firestore Timestamp
    updatedAt?: any;           // Firestore Timestamp
};

// Sample static gallery items (empty - use Firebase data)
export const galleryItems: GalleryItem[] = [];

