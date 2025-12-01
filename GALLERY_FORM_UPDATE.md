# Gallery Form Updates - Image Upload & Region Tags

## Perubahan yang Dilakukan

### 1. **Upload Gambar** (Ganti URL Input)

**Sebelum:**
- Input manual URL gambar
- Tidak praktis - harus upload gambar ke hosting lain terlebih dahulu

**Sesudah:**
- ✅ **Upload langsung dari komputer**
- ✅ **Preview gambar** sebelum submit
- ✅ **Auto-upload ke ImgBB** (free cloud hosting)
- ✅ **Progress indicator** saat uploading
- ✅ **Error handling** yang informatif

### 2. **Tags Wilayah** (4 Wilayah Saja)

**Sebelum:**
- Input manual comma-separated tags
- Bisa isi apa saja, tidak terstruktur
- Tags banyak dan tidak konsisten

**Sesudah:**
- ✅ **4 tombol pilihan**: Bangkalan, Sampang, Pamekasan, Sumenep
- ✅ **Multiple select** - bisa pilih lebih dari 1 wilayah
- ✅ **Visual feedback** - tombol active berwarna cyan
- ✅ **Konsisten** - semua item gallery punya tags yang sama
- ✅ **Filter gallery** otomatis update dengan tags yang tersedia

### 3. **Public Gallery Filter**

**Sebelum:**
- Menampilkan semua tags yang ada (bisa banyak dan berantakan)

**Sesudah:**
- ✅ Hanya menampilkan **4 filter wilayah**
- ✅ Filter dinamis - hanya tampil jika ada item dengan tag tersebut
- ✅ Tombol "Semua" untuk reset filter

## Files yang Diubah

### 1. `src/app/admin/gallery/page.tsx`

**Form State:**
```typescript
// BEFORE
const [imageUrl, setImageUrl] = useState('');
const [tags, setTags] = useState('');

// AFTER
const [imageFile, setImageFile] = useState<File | null>(null);
const [imagePreview, setImagePreview] = useState('');
const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
const [isUploading, setIsUploading] = useState(false);

const REGIONS = ['Bangkalan', 'Sampang', 'Pamekasan', 'Sumenep'];
```

**Upload Function:**
```typescript
const uploadImageToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    
    if (!apiKey) {
        throw new Error('Image upload not configured');
    }
    
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        throw new Error('Failed to upload image');
    }

    const data = await response.json();
    return data.data.url;
};
```

**Region Toggle:**
```typescript
const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
        prev.includes(region) 
            ? prev.filter(r => r !== region)
            : [...prev, region]
    );
};
```

### 2. `src/components/GallerySection.tsx`

**Filter Logic:**
```typescript
// BEFORE
const allTags = Array.from(new Set(items.flatMap((item) => item.tags))).sort();

// AFTER
const AVAILABLE_REGIONS = ['Bangkalan', 'Sampang', 'Pamekasan', 'Sumenep'];

const regionTags = AVAILABLE_REGIONS.filter(region => 
    items.some(item => item.tags.includes(region))
);
```

### 3. `.env.local`

**Added:**
```env
# ImgBB Image Upload Configuration
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here
```

## UI/UX Improvements

### Form Layout
```
┌─────────────────────────────────────┐
│ Upload Image *                      │
│ [Choose File] image.jpg             │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │      [Image Preview]            │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Title                               │
│ [Photo title____________]           │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Caption                             │
│ [Photo caption_________]            │
│ [_____________________]             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Wilayah Tags                        │
│ ┌──────────┐ ┌──────────┐          │
│ │Bangkalan │ │ Sampang  │          │
│ │  (cyan)  │ │  (gray)  │          │
│ └──────────┘ └──────────┘          │
│ ┌──────────┐ ┌──────────┐          │
│ │Pamekasan │ │ Sumenep  │          │
│ │  (gray)  │ │  (gray)  │          │
│ └──────────┘ └──────────┘          │
│ Selected: Bangkalan                 │
└─────────────────────────────────────┘

[Add Item] [Cancel]
```

### Visual States

**Upload Button:**
- Normal: Cyan background dengan file icon
- Hover: Cyan darker
- File selected: Shows preview dengan label "Preview"

**Region Buttons:**
- Unselected: Dark gray background (`bg-redBrown-800`)
- Selected: Cyan bright (`bg-cyan-500`) dengan shadow
- Hover: Border cyan untuk visual feedback

**Submit Button:**
- Normal: "Add Item" / "Update Item"
- Uploading: "Uploading..." dengan disabled state
- Error: Alert dengan pesan spesifik

## Setup Instructions

### Quick Start

1. **Dapatkan ImgBB API Key:**
   ```
   https://api.imgbb.com/ → Get API Key
   ```

2. **Tambahkan ke .env.local:**
   ```env
   NEXT_PUBLIC_IMGBB_API_KEY=your_actual_api_key_here
   ```

3. **Restart server:**
   ```powershell
   npm run dev
   ```

4. **Test upload:**
   - Buka http://localhost:3000/admin/gallery
   - Pilih gambar dari komputer
   - Pilih 1+ wilayah
   - Submit

### Error Messages

**1. API Key Belum Dikonfigurasi:**
```
⚠️ Image upload belum dikonfigurasi.

Tambahkan NEXT_PUBLIC_IMGBB_API_KEY ke file .env.local

Lihat IMAGE_UPLOAD_SETUP.md untuk panduan lengkap.
```

**2. Upload Gagal:**
```
❌ Gagal upload gambar: [error message]

Solusi:
1. Cek koneksi internet
2. Pastikan file < 32MB
3. Coba kompres gambar terlebih dahulu
```

**3. File Terlalu Besar:**
```
❌ Gagal upload gambar: File size exceeds limit

Solusi:
1. Kompres gambar dengan TinyPNG.com
2. Target file size: 200-500 KB
3. Max resolution: 1920x1080
```

## Testing Checklist

### Form Functionality
- [ ] Upload image file → Preview muncul
- [ ] Pilih multiple regions → Selected count update
- [ ] Submit form → Loading state tampil
- [ ] Upload success → Alert "Gallery item added!"
- [ ] Edit item → Form prepopulated dengan data yang benar
- [ ] Cancel edit → Form reset

### Gallery Public View
- [ ] Filter "Semua" → Tampil semua items
- [ ] Filter "Bangkalan" → Hanya items dengan tag Bangkalan
- [ ] Filter "Sampang" → Hanya items dengan tag Sampang
- [ ] Filter "Pamekasan" → Hanya items dengan tag Pamekasan
- [ ] Filter "Sumenep" → Hanya items dengan tag Sumenep
- [ ] No items → Show empty state

### Error Handling
- [ ] Submit tanpa pilih gambar → Alert "Please select an image"
- [ ] Upload dengan API key salah → Error message muncul
- [ ] Upload tanpa internet → Error message muncul
- [ ] File > 32MB → Error message muncul

## Performance Notes

### Image Optimization
ImgBB otomatis optimize gambar:
- Auto resize untuk web view
- Compression tanpa quality loss
- CDN delivery (fast loading)

### Firestore Data
Hanya URL yang disimpan di Firestore (bukan file gambar):
```json
{
  "imageUrl": "https://i.ibb.co/abc123/image.jpg",
  "title": "Festival Tong-Tong",
  "caption": "...",
  "tags": ["Bangkalan", "Pamekasan"],
  "createdAt": "2025-12-01T..."
}
```

Size per document: ~500 bytes (sangat kecil!)

## Migration Guide

### Dari URL Manual ke Upload

**Jika sudah ada data lama dengan URL manual:**

1. Data lama tetap bisa diakses (backward compatible)
2. Edit item lama → Upload gambar baru → URL otomatis ganti
3. Atau biarkan URL lama, hanya update tags ke wilayah

**Jika ingin bulk update tags:**

```javascript
// Run di Firebase Console
const galleryRef = db.collection('gallery');
const snapshot = await galleryRef.get();

snapshot.forEach(async (doc) => {
  const data = doc.data();
  // Convert old tags to regions if needed
  const newTags = data.tags.filter(tag => 
    ['Bangkalan', 'Sampang', 'Pamekasan', 'Sumenep'].includes(tag)
  );
  
  await doc.ref.update({ tags: newTags });
});
```

## Future Enhancements

### Possible Features:
1. **Drag & Drop Upload** - Lebih user friendly
2. **Multiple Image Upload** - Batch upload
3. **Image Cropper** - Crop sebelum upload
4. **Image Filters** - Sepia, B&W, Vintage
5. **Auto Tagging** - AI detect lokasi dari EXIF data

---

**Complete Documentation:**
- Setup: `IMAGE_UPLOAD_SETUP.md`
- Color Fixes: `COLOR_CONTRAST_IMPROVEMENTS.md`
- Firebase: `FIREBASE_SETUP.md`
- Implementation: `IMPLEMENTATION_COMPLETE.md`
