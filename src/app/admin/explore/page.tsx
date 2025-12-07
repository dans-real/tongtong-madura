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
    query,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ContentSection {
    subJudul: string;
    informasi: string;
}

interface ExploreContent {
    id: string;
    title: string;
    imageUrl: string;
    sections: ContentSection[];
    referensi: string;
    createdAt: Timestamp;
}

export default function ExploreAdminPage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [contents, setContents] = useState<ExploreContent[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form state
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [title, setTitle] = useState('');
    const [sections, setSections] = useState<ContentSection[]>([{ subJudul: '', informasi: '' }]);
    const [referensi, setReferensi] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    // Redirect if not authenticated
    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin');
        }
    }, [user, loading, router]);

    // Load all explore content from Firestore
    useEffect(() => {
        if (!user) return;

        const q = query(collection(db, 'explore'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const loaded: ExploreContent[] = [];
            snapshot.forEach((doc) => {
                loaded.push({ id: doc.id, ...doc.data() } as ExploreContent);
            });
            setContents(loaded);
        });

        return () => unsubscribe();
    }, [user]);

    const resetForm = () => {
        setImageFile(null);
        setImagePreview('');
        setImageUrl('');
        setTitle('');
        setSections([{ subJudul: '', informasi: '' }]);
        setReferensi('');
        setIsEditing(false);
        setEditingId(null);
    };

    const addSection = () => {
        setSections([...sections, { subJudul: '', informasi: '' }]);
    };

    const removeSection = (index: number) => {
        if (sections.length > 1) {
            setSections(sections.filter((_, i) => i !== index));
        }
    };

    const updateSection = (index: number, field: 'subJudul' | 'informasi', value: string) => {
        const newSections = [...sections];
        newSections[index][field] = value;
        setSections(newSections);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (max 10MB)
            const maxSize = 10 * 1024 * 1024;
            if (file.size > maxSize) {
                alert('❌ File terlalu besar! Maksimal 10MB');
                e.target.value = '';
                return;
            }

            // Validate file type
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert('❌ Format file tidak didukung! Gunakan: JPG, PNG, WebP');
                e.target.value = '';
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
        try {
            const timestamp = Date.now();
            const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
            const fileName = `explore/${timestamp}_${sanitizedFileName}`;

            const storageRef = ref(storage, fileName);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            return downloadURL;
        } catch (error: any) {
            console.error('Upload error:', error);
            if (error.code === 'storage/unauthorized') {
                throw new Error('Firebase Storage belum aktif. Aktifkan dulu di Firebase Console.');
            }
            throw new Error(error.message || 'Gagal upload gambar');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isEditing && !imageFile) {
            alert('Pilih gambar terlebih dahulu');
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
                    alert(`❌ Gagal upload gambar: ${uploadError.message}`);
                    setIsUploading(false);
                    return;
                }
            }

            if (isEditing && editingId) {
                // Update existing content
                const docRef = doc(db, 'explore', editingId);
                const updateData: any = {
                    title,
                    sections,
                    referensi,
                    updatedAt: Timestamp.now()
                };

                if (imageFile) {
                    updateData.imageUrl = finalImageUrl;
                }

                await updateDoc(docRef, updateData);
                alert('✅ Konten berhasil diupdate!');
            } else {
                // Create new content
                await addDoc(collection(db, 'explore'), {
                    imageUrl: finalImageUrl,
                    title,
                    sections,
                    referensi,
                    createdAt: Timestamp.now(),
                    updatedAt: Timestamp.now()
                });
                alert('✅ Konten berhasil ditambahkan!');
            }
            resetForm();
        } catch (error) {
            console.error('Error saving content:', error);
            alert('❌ Error menyimpan konten');
        } finally {
            setIsUploading(false);
        }
    };

    const handleEdit = (content: ExploreContent) => {
        setImageUrl(content.imageUrl);
        setImagePreview(content.imageUrl);
        setTitle(content.title);
        setSections(content.sections && content.sections.length > 0 ? content.sections : [{ subJudul: '', informasi: '' }]);
        setReferensi(content.referensi);
        setIsEditing(true);
        setEditingId(content.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Hapus konten ini?')) return;
        try {
            await deleteDoc(doc(db, 'explore', id));
            alert('✅ Konten berhasil dihapus!');
        } catch (error) {
            alert('❌ Gagal menghapus konten');
        }
    };

    if (loading || !user) {
        return <div className="min-h-screen flex items-center justify-center bg-redBrown-950 text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-redBrown-950 p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-white">Kelola Konten Explore</h1>
                    <button
                        onClick={() => router.push('/admin')}
                        className="px-4 py-2 bg-redBrown-800 text-white rounded-lg hover:bg-redBrown-700 border-2 border-redBrown-600"
                    >
                        ← Kembali
                    </button>
                </div>

                {/* Form */}
                <div className="bg-redBrown-900/80 border-2 border-amber-500/50 rounded-2xl p-6 mb-8">
                    <h2 className="text-2xl font-bold text-white mb-6">
                        {isEditing ? '✏️ Edit Artikel' : '➕ Tambah Artikel Baru'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-amber-300 mb-2">
                                Foto Artikel *
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full px-4 py-2 bg-redBrown-800 border-2 border-redBrown-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-maduraGold file:text-redBrown-950 file:font-bold hover:file:bg-amber-400"
                            />
                            {imagePreview && (
                                <div className="mt-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-amber-500/50"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-amber-300 mb-2">
                                Judul Artikel *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full px-4 py-2 bg-redBrown-800 border-2 border-redBrown-600 rounded-lg text-white focus:border-emerald-400 focus:outline-none"
                                placeholder="Contoh: Sejarah Tong-Tong Madura"
                            />
                        </div>

                        {/* Content Sections (Dynamic) */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium text-amber-300">
                                    Konten Artikel (Sub Judul + Informasi)
                                </label>
                                <button
                                    type="button"
                                    onClick={addSection}
                                    className="px-3 py-1.5 bg-emerald-500 text-white text-xs font-semibold rounded hover:bg-emerald-600 border-2 border-emerald-400"
                                >
                                    ➕ Tambah Section
                                </button>
                            </div>

                            {sections.map((section, index) => (
                                <div key={index} className="p-4 bg-redBrown-800/50 border-2 border-redBrown-600/50 rounded-lg space-y-3">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-emerald-400">Section {index + 1}</span>
                                        {sections.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSection(index)}
                                                className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700"
                                            >
                                                🗑️ Hapus
                                            </button>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-amber-300 mb-1">
                                            Sub Judul {index === 0 ? '*' : '(Opsional)'}
                                        </label>
                                        <input
                                            type="text"
                                            value={section.subJudul}
                                            onChange={(e) => updateSection(index, 'subJudul', e.target.value)}
                                            required={index === 0}
                                            className="w-full px-3 py-2 bg-redBrown-800 border-2 border-redBrown-600 rounded-lg text-white text-sm focus:border-emerald-400 focus:outline-none"
                                            placeholder={`Sub judul ${index + 1}`}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-amber-300 mb-1">
                                            Informasi {index === 0 ? '*' : '(Opsional)'}
                                        </label>
                                        <textarea
                                            value={section.informasi}
                                            onChange={(e) => updateSection(index, 'informasi', e.target.value)}
                                            required={index === 0}
                                            rows={6}
                                            className="w-full px-3 py-2 bg-redBrown-800 border-2 border-redBrown-600 rounded-lg text-white text-sm focus:border-emerald-400 focus:outline-none"
                                            placeholder={`Informasi untuk section ${index + 1}...`}
                                        />
                                    </div>
                                </div>
                            ))}
                            <p className="text-xs text-redBrown-400">💡 Setiap section akan ditampilkan dengan sub judul yang menonjol diikuti informasinya</p>
                        </div>

                        {/* Referensi */}
                        <div>
                            <label className="block text-sm font-medium text-amber-300 mb-2">
                                Referensi / Sumber *
                            </label>
                            <textarea
                                value={referensi}
                                onChange={(e) => setReferensi(e.target.value)}
                                required
                                rows={4}
                                className="w-full px-4 py-2 bg-redBrown-800 border-2 border-redBrown-600 rounded-lg text-white focus:border-emerald-400 focus:outline-none"
                                placeholder="Daftar sumber/referensi, pisahkan dengan enter"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={isUploading}
                                className="px-8 py-3 bg-maduraGold text-redBrown-950 font-bold rounded-lg hover:bg-amber-400 border-2 border-amber-400 shadow-lg shadow-maduraGold/30 disabled:opacity-50"
                            >
                                {isUploading ? '⏳ Uploading...' : isEditing ? '💾 Update Artikel' : '➕ Add Artikel'}
                            </button>
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 bg-redBrown-700 text-white font-semibold rounded-lg hover:bg-redBrown-600 border-2 border-redBrown-500"
                                >
                                    ❌ Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Content List */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">📚 Daftar Artikel ({contents.length})</h2>
                    {contents.length === 0 ? (
                        <div className="text-center py-12 bg-redBrown-900/50 border-2 border-redBrown-700/50 rounded-xl">
                            <p className="text-redBrown-300">Belum ada artikel. Tambahkan artikel pertama di atas.</p>
                        </div>
                    ) : (
                        contents.map((content) => (
                            <div
                                key={content.id}
                                className="bg-redBrown-900/80 border-2 border-emerald-600/30 rounded-xl p-5 hover:border-emerald-500/50 transition-all"
                            >
                                <div className="flex gap-5">
                                    {/* Image */}
                                    <img
                                        src={content.imageUrl}
                                        alt={content.title}
                                        className="w-40 h-40 object-cover rounded-lg border-2 border-emerald-500/50 shrink-0"
                                    />

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-3">{content.title}</h3>

                                        {/* Sections Preview */}
                                        {content.sections && content.sections.length > 0 && (
                                            <div className="space-y-2 mb-3">
                                                {content.sections.map((section, idx) => (
                                                    <div key={idx} className="text-sm">
                                                        {section.subJudul && (
                                                            <h4 className="font-semibold text-emerald-400">📌 {section.subJudul}</h4>
                                                        )}
                                                        <p className="text-redBrown-300 line-clamp-2">{section.informasi}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="text-xs text-redBrown-400 mb-3">
                                            <strong>Referensi:</strong> {content.referensi.substring(0, 100)}...
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-2 pt-2 border-t border-redBrown-700/50">
                                            <button
                                                onClick={() => handleEdit(content)}
                                                className="px-4 py-2 bg-emerald-500 text-white text-sm font-semibold rounded hover:bg-emerald-600 border-2 border-emerald-400"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(content.id)}
                                                className="px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded hover:bg-red-700 border-2 border-red-500"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
