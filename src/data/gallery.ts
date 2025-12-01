export type GalleryItem = {
    id: string;
    imageUrl: string;
    caption: string;
    tags: string[];
    title?: string;
};

// Static data dihapus - semua data diambil dari Firebase
export const galleryItems: GalleryItem[] = [];
