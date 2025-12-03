"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/useAuth';
import { db, storage } from '@/lib/firebase';
import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface GalleryItem {
    id: string;
    imageUrl: string;
    title: string;
    caption: string;
    tags: string[];
    region?: string;
    mood?: string;
    year?: number;
    description?: string;
    isFeatured?: boolean;
    createdAt: Timestamp;
    updatedAt?: Timestamp;
}

export default function GalleryAdminPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [items, setItems] = useState<GalleryItem[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [caption, setCaption] = useState('');
    const [description, setDescription] = useState('');
    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [primaryRegion, setPrimaryRegion] = useState('');
    const [mood, setMood] = useState('');
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [isFeatured, setIsFeatured] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const REGIONS = ['Bangkalan', 'Sampang', 'Pamekasan', 'Sumenep'];
    const MOODS = ['Night Parade', 'Festival', 'Practice', 'Cultural Event', 'Workshop'];

    // Redirect if not authenticated
    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin');
        }
    }, [user, loading, router]);

    // Load gallery items from Firestore
    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loadedItems: GalleryItem[] = [];
            snapshot.forEach((doc) => {
                loadedItems.push({ id: doc.id, ...doc.data() } as GalleryItem);
            });
            setItems(loadedItems);
        });

        return () => unsubscribe();
    }, [user]);

    const resetForm = () => {
        setImageFile(null);
        setImagePreview('');
        setImageUrl('');
        setTitle('');
        setCaption('');
        setDescription('');
        setSelectedRegions([]);
        setPrimaryRegion('');
        setMood('');
        setYear(new Date().getFullYear());
        setIsFeatured(false);
        setIsEditing(false);
        setEditingId(null);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (max 32MB for ImgBB)
            const maxSize = 32 * 1024 * 1024; // 32MB in bytes
            if (file.size > maxSize) {
                alert('❌ File terlalu besar!\n\nUkuran maksimal: 32MB\nUkuran file Anda: ' + (file.size / (1024 * 1024)).toFixed(2) + 'MB\n\nSolusi: Kompres gambar terlebih dahulu');
                e.target.value = ''; // Reset input
                return;
            }

            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert('❌ Format file tidak didukung!\n\nFormat yang diterima: JPG, PNG, GIF, WebP\nFormat file Anda: ' + file.type);
                e.target.value = ''; // Reset input
                return;
            }

            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadImageToFirebase = async (file: File): Promise<string> => {
        console.log('📁 File info:', {
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            type: file.type
        });

        try {
            console.log('📤 Uploading to Firebase Storage...');

            // Create unique filename with timestamp
            const timestamp = Date.now();
            const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const fileName = `gallery/${timestamp}_${sanitizedFileName}`;

            // Create storage reference
            const storageRef = ref(storage, fileName);

            // Upload file
            const snapshot = await uploadBytes(storageRef, file);
            console.log('📥 Upload complete:', snapshot.metadata.fullPath);

            // Get download URL
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('✅ Download URL:', downloadURL);

            return downloadURL;
        } catch (error: any) {
            console.error('❌ Upload error:', error);

            if (error.code === 'storage/unauthorized') {
                throw new Error('Tidak memiliki izin upload. Periksa Firebase Storage Rules.');
            } else if (error.code === 'storage/canceled') {
                throw new Error('Upload dibatalkan.');
            } else if (error.code === 'storage/unknown') {
                throw new Error('Terjadi kesalahan. Periksa koneksi internet Anda.');
            }

            throw new Error(error.message || 'Gagal upload gambar ke Firebase Storage');
        }
    };

    const toggleRegion = (region: string) => {
        setSelectedRegions(prev =>
            prev.includes(region)
                ? prev.filter(r => r !== region)
                : [...prev, region]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isEditing && !imageFile) {
            alert('Please select an image to upload');
            return;
        }

        setIsUploading(true);

        try {
            let finalImageUrl = imageUrl;

            // Upload image if new file selected
            if (imageFile) {
                try {
                    finalImageUrl = await uploadImageToFirebase(imageFile);
                } catch (uploadError: any) {
                    console.error('Image upload failed:', uploadError);
                    alert(`❌ Gagal upload gambar: ${uploadError.message}\n\nSolusi:\n1. Cek koneksi internet\n2. Pastikan Firebase Storage sudah aktif\n3. Periksa Storage Rules di Firebase Console`);
                    setIsUploading(false);
                    return; // Stop form submission
                }
            }

            if (isEditing && editingId) {
                // Update existing item
                const docRef = doc(db, 'gallery', editingId);
                const updateData: any = {
                    title,
                    caption,
                    tags: selectedRegions,
                    description: description || caption,
                    isFeatured: isFeatured,
                    updatedAt: Timestamp.now()
                };

                // Only add optional fields if they have values
                if (primaryRegion) updateData.region = primaryRegion;
                if (mood) updateData.mood = mood;
                if (year) updateData.year = year;

                if (imageFile) {
                    updateData.imageUrl = finalImageUrl;
                }

                await updateDoc(docRef, updateData);
                alert('Gallery item updated!');
            } else {
                // Create new item - only include defined fields
                const newItemData: any = {
                    imageUrl: finalImageUrl,
                    title,
                    caption,
                    description: description || caption,
                    tags: selectedRegions,
                    isFeatured: isFeatured,
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now()
                };

                // Only add optional fields if they have values
                if (primaryRegion) newItemData.region = primaryRegion;
                if (mood) newItemData.mood = mood;
                if (year) newItemData.year = year;

                await addDoc(collection(db, 'gallery'), newItemData);
                alert('Gallery item added!');
            }
            resetForm();
        } catch (error) {
            console.error('Error saving gallery item:', error);
            alert('Error saving item');
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (item: GalleryItem) => {
        setImageUrl(item.imageUrl);
        setImagePreview(item.imageUrl);
        setTitle(item.title);
        setCaption(item.caption);
        setDescription(item.description || '');
        setSelectedRegions(item.tags || []);
        setPrimaryRegion(item.region || '');
        setMood(item.mood || '');
        setYear(item.year || new Date().getFullYear());
        setIsFeatured(item.isFeatured || false);
        setIsEditing(true);
        setEditingId(item.id);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this item?')) return;

        try {
            await deleteDoc(doc(db, 'gallery', id));
            alert('Item deleted!');
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Error deleting item');
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-redBrown-950 text-white">Loading...</div>;
    }

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-redBrown-950 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white">Gallery Management</h1>
                    <button
                        onClick={() => router.push('/admin')}
                        className="px-4 py-2 bg-redBrown-800 text-white rounded-lg hover:bg-redBrown-700"
                    >
                        ← Back to Dashboard
                    </button>
                </div>

                {/* Add/Edit Form */}
                <div className="bg-redBrown-900/80 border-2 border-amber-500/50 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">
                        {isEditing ? 'Edit Item' : 'Add New Item'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-amber-300 mb-2">
                                Upload Image {!isEditing && <span className="text-red-400">*</span>}
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 bg-redBrown-800 border border-redBrown-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-maduraGold file:text-redBrown-950 file:font-bold hover:file:bg-amber-400"
                            />
                            {imagePreview && (
                                <div className="mt-3 relative aspect-video bg-redBrown-800 rounded-lg overflow-hidden border-2 border-amber-400">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute top-2 right-2 bg-maduraGold text-redBrown-950 px-3 py-1 rounded-lg text-xs font-bold">
                                        Preview
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-300 mb-2">Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-redBrown-800 border border-redBrown-600 rounded-lg text-white"
                                placeholder="Photo title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-300 mb-2">Caption (Short)</label>
                            <textarea
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                required
                                rows={2}
                                className="w-full px-4 py-2 bg-redBrown-800 border border-redBrown-600 rounded-lg text-white"
                                placeholder="Caption singkat untuk preview card"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-300 mb-2">
                                Description (Optional - untuk detail lebih panjang)
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={3}
                                className="w-full px-4 py-2 bg-redBrown-800 border border-redBrown-600 rounded-lg text-white"
                                placeholder="Deskripsi detail (opsional, jika kosong akan pakai caption)"
                            />
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isFeatured}
                                    onChange={(e) => setIsFeatured(e.target.checked)}
                                    className="w-5 h-5 rounded bg-redBrown-800 border-2 border-maduraGold checked:bg-maduraGold checked:border-maduraGold"
                                />
                                <span className="text-sm font-medium text-amber-300">
                                    ⭐ Mark as Featured (tampil besar di atas)
                                </span>
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-amber-300 mb-2">
                                Wilayah Tags (Pilih wilayah yang sesuai)
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {REGIONS.map((region) => (
                                    <button
                                        key={region}
                                        type="button"
                                        onClick={() => toggleRegion(region)}
                                        className={`px-4 py-3 rounded-lg font-semibold transition-all border-2 ${selectedRegions.includes(region)
                                            ? 'bg-maduraGold text-redBrown-950 border-amber-400 shadow-lg shadow-maduraGold/30'
                                            : 'bg-redBrown-800 text-white border-redBrown-600 hover:border-maduraGold/50'
                                            }`}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-redBrown-400 mt-2">
                                {selectedRegions.length > 0
                                    ? `Selected: ${selectedRegions.join(', ')}`
                                    : 'Belum ada wilayah dipilih'}
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isUploading}
                                className="px-6 py-2 bg-maduraGold text-redBrown-950 font-bold rounded-lg hover:bg-amber-400 border-2 border-amber-400 shadow-lg shadow-maduraGold/30 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUploading ? 'Uploading...' : isEditing ? '💾 Update Item' : '➕ Add Item'}
                            </button>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-2 bg-redBrown-700 text-white rounded-lg hover:bg-redBrown-600"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white mb-4">Existing Items ({items.length})</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-redBrown-900/80 border-2 border-redBrown-700/50 rounded-xl p-4 space-y-3"
                            >
                                {/* Featured Badge */}
                                {item.isFeatured && (
                                    <div className="flex justify-end">
                                        <span className="px-3 py-1 rounded-full bg-maduraGold text-redBrown-950 text-xs font-bold">
                                            ⭐ FEATURED
                                        </span>
                                    </div>
                                )}

                                <div className="aspect-video bg-redBrown-800 rounded-lg overflow-hidden">
                                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                <p className="text-sm text-redBrown-300">{item.caption}</p>

                                {/* Additional Info */}
                                <div className="space-y-1 text-xs text-redBrown-400">
                                    {item.region && (
                                        <p><span className="font-semibold">Primary Region:</span> {item.region}</p>
                                    )}
                                    {item.mood && (
                                        <p><span className="font-semibold">Mood:</span> {item.mood}</p>
                                    )}
                                    {item.year && (
                                        <p><span className="font-semibold">Year:</span> {item.year}</p>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-amber-400/90 border-2 border-amber-300 rounded-full text-xs text-redBrown-950 font-bold"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="flex-1 px-4 py-2 bg-cyan-500 text-white font-medium rounded-lg hover:bg-cyan-600 border-2 border-cyan-400"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 border-2 border-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        </div >
    );
}
