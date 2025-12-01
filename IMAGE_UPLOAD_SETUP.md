# Setup Image Upload dengan ImgBB

## Mengapa ImgBB?

ImgBB adalah layanan hosting gambar gratis yang:
- ✅ **100% Gratis** dengan 100 uploads per jam
- ✅ **Unlimited storage** - gambar disimpan selamanya
- ✅ **CDN Global** - loading cepat dari mana saja
- ✅ **API Simple** - mudah diintegrasikan
- ✅ **No Signup Required** untuk viewer - hanya admin yang perlu API key

## Langkah Setup

### 1. Dapatkan API Key ImgBB

1. Buka https://api.imgbb.com/
2. Klik **"Get API Key"**
3. Buat akun dengan email atau login via Facebook/Google
4. Setelah login, Anda akan mendapat **API Key** seperti ini:
   ```
   a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```
5. **Copy API Key** tersebut

### 2. Masukkan API Key ke Code

Buka file: `src/app/admin/gallery/page.tsx`

Cari baris ini (sekitar line 88-90):

```typescript
const response = await fetch('https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY', {
```

**Ganti `YOUR_IMGBB_API_KEY`** dengan API key Anda:

```typescript
const response = await fetch('https://api.imgbb.com/1/upload?key=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', {
```

### 3. Save dan Test

1. Save file
2. Buka admin panel: http://localhost:3000/admin/gallery
3. Coba upload gambar
4. Gambar akan diupload ke ImgBB dan URL-nya disimpan ke Firestore

## Alternatif: Gunakan Environment Variable (Recommended)

Untuk keamanan lebih baik, simpan API key di `.env.local`:

### 1. Edit `.env.local`

Tambahkan baris ini:

```env
NEXT_PUBLIC_IMGBB_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

### 2. Update Code

Di `src/app/admin/gallery/page.tsx`, ubah menjadi:

```typescript
const uploadImageToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || 'YOUR_IMGBB_API_KEY';
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

### 3. Restart Dev Server

```powershell
# Stop server (Ctrl+C)
npm run dev
```

## Fallback Mode (Base64)

Jika upload ke ImgBB gagal, sistem akan otomatis menggunakan **base64 preview** sebagai fallback.

⚠️ **Warning**: Base64 membuat database besar dan loading lambat. Gunakan hanya untuk testing!

Untuk production, **wajib setup ImgBB API Key** yang benar.

## Limits & Quota

### Free Plan (Default)
- ✅ 100 uploads per jam
- ✅ Unlimited storage
- ✅ Max file size: 32 MB
- ✅ Supported formats: JPG, PNG, GIF, BMP, WEBP

### Jika Perlu Lebih
Jika website ramai dan butuh lebih dari 100 uploads/jam:
1. Buat multiple API keys dengan email berbeda
2. Implementasi rotation system di code
3. Atau upgrade ke Cloudinary/AWS S3

## Troubleshooting

### Error: "Failed to upload image"

**Penyebab:**
1. API Key salah atau belum dimasukkan
2. File terlalu besar (>32 MB)
3. Format file tidak didukung
4. Quota terlampaui (>100/hour)

**Solusi:**
1. Cek API key di ImgBB dashboard
2. Compress gambar sebelum upload
3. Tunggu 1 jam untuk reset quota
4. Periksa console browser untuk error detail

### Error: "Cannot read property 'data'"

**Penyebab:** Response dari ImgBB tidak sesuai

**Solusi:**
```typescript
const data = await response.json();
console.log('ImgBB Response:', data); // Debug
return data.data.url;
```

### Gambar Tidak Muncul

**Penyebab:** URL tidak tersimpan dengan benar

**Solusi:**
1. Buka Firebase Console → Firestore
2. Cek collection `gallery`
3. Pastikan field `imageUrl` berisi URL valid (bukan base64)

## Best Practices

### 1. Compress Images Sebelum Upload
- Target: 200-500 KB per image
- Tools: TinyPNG, Squoosh.app
- Resolution: 1920x1080 max

### 2. File Naming Convention
```typescript
// Tambahkan timestamp untuk unique filename
const timestamp = Date.now();
const fileName = `tongtong-${timestamp}.jpg`;
```

### 3. Error Handling
```typescript
try {
    finalImageUrl = await uploadImageToImgBB(imageFile);
} catch (uploadError) {
    console.error('Upload failed:', uploadError);
    alert('Gagal upload gambar. Coba lagi atau kompres file Anda.');
    setIsUploading(false);
    return; // Stop form submission
}
```

## FAQ

**Q: Apakah gambar akan hilang jika saya hapus akun ImgBB?**  
A: Ya. Jika khawatir, backup URL semua gambar di spreadsheet.

**Q: Apakah bisa pakai Google Drive/Dropbox?**  
A: Tidak recommended. Link sharing bisa expire dan loading lambat.

**Q: Berapa lama gambar disimpan?**  
A: Selamanya, selama akun ImgBB aktif.

**Q: Apakah ImgBB aman untuk production?**  
A: Ya, digunakan oleh jutaan website. Tapi untuk high-traffic site, pertimbangkan Cloudinary atau AWS S3.

---

**Next Steps:**
1. ✅ Setup ImgBB API Key
2. ✅ Test upload di admin panel
3. ✅ Cek gambar tampil di galeri publik
4. 📱 Share website Anda!
