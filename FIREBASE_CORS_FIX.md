# Fix CORS Error untuk Firebase Storage

## Masalah
```
Access to fetch at 'https://firebasestorage.googleapis.com/...' from origin 'https://dans-real.github.io' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solusi: Konfigurasi CORS di Firebase Storage

### Langkah 1: Install Google Cloud SDK

**Windows:**
1. Download installer: https://cloud.google.com/sdk/docs/install
2. Jalankan installer dan ikuti petunjuk
3. Setelah selesai, buka Command Prompt baru
4. Jalankan: `gcloud init`

**macOS/Linux:**
```bash
curl https://sdk.cloud.google.com | bash
exec -l $SHELL
gcloud init
```

### Langkah 2: Login ke Google Cloud

```bash
gcloud auth login
```

Browser akan terbuka, login dengan akun Google yang sama dengan Firebase project.

### Langkah 3: Set Project

```bash
gcloud config set project tongtong-madura
```

### Langkah 4: Buat File CORS Configuration

Buat file `cors.json` di root project dengan isi:

```json
[
  {
    "origin": ["https://dans-real.github.io", "http://localhost:3000"],
    "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin"]
  }
]
```

### Langkah 5: Apply CORS Configuration

```bash
gsutil cors set cors.json gs://tongtong-madura.firebasestorage.app
```

### Langkah 6: Verifikasi

```bash
gsutil cors get gs://tongtong-madura.firebasestorage.app
```

Harusnya akan menampilkan konfigurasi CORS yang baru saja di-set.

---

## Alternative: Gunakan Download URL Langsung

Jika tidak bisa setup CORS, bisa gunakan metode download langsung tanpa fetch:

```typescript
const handleDownload = () => {
    if (!selectedImage?.imageUrl) return;
    
    // Download langsung dengan membuka di tab baru
    const link = document.createElement('a');
    link.href = selectedImage.imageUrl;
    link.download = `${selectedImage.title || 'gallery-image'}.jpg`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
```

---

## Testing

Setelah setup CORS:

1. **Hard refresh** browser (Ctrl + Shift + R)
2. Buka halaman gallery
3. Klik gambar dan coba download
4. Seharusnya berhasil tanpa CORS error! ✨

---

## Troubleshooting

### Error: "gcloud: command not found"
- Restart terminal/command prompt setelah install
- Atau tambahkan ke PATH secara manual

### Error: "AccessDeniedException: 403"
- Pastikan akun Google yang login memiliki akses ke project
- Periksa di Firebase Console → Project Settings → Users and Permissions

### CORS masih error setelah di-set
- Tunggu 5-10 menit untuk propagasi
- Clear browser cache
- Coba di incognito/private mode

---

## Notes

- CORS configuration berlaku untuk semua file di bucket
- Jika domain berubah, update `cors.json` dan re-apply
- Untuk production, tambahkan domain production ke `origin` array
