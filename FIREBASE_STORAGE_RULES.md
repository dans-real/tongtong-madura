# Firebase Storage & Firestore Rules Setup

## Error yang Muncul
- ❌ `Missing or insufficient permissions` (Firestore)
- ❌ `storage/unauthorized` (Storage)

## Solusi: Update Firebase Rules

### 1️⃣ **Firebase Storage Rules**

Buka [Firebase Console](https://console.firebase.google.com/) → Project `tongtong-madura` → **Storage** → **Rules**

Ganti dengan rules ini:

```javascript
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload images to gallery folder
    match /gallery/{imageId} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Only authenticated users can upload
    }
    
    // Default: deny all
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Klik "Publish"**

---

### 2️⃣ **Firestore Database Rules**

Buka [Firebase Console](https://console.firebase.google.com/) → Project `tongtong-madura` → **Firestore Database** → **Rules**

Ganti dengan rules ini:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Gallery Collection
    match /gallery/{document=**} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Only authenticated users
    }
    
    // Explore Collection
    match /explore/{document=**} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Only authenticated users
    }
    
    // Quizzes Collection
    match /quizzes/{document=**} {
      allow read: if true; // Public read
      allow write: if request.auth != null; // Only authenticated users
    }
    
    // Regions Collection (legacy, if needed)
    match /regions/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

**Klik "Publish"**

---

## ✅ Testing

Setelah update rules:

1. **Refresh halaman admin** (Ctrl + F5)
2. **Login** ke admin dashboard
3. **Upload gambar** di Gallery
4. Seharusnya berhasil! ✨

---

## 📝 Catatan

### Keamanan Rules
- ✅ **Public Read** - Semua orang bisa lihat konten
- ✅ **Auth Write** - Hanya admin yang login bisa tambah/edit/hapus
- ✅ **Storage** - Gambar disimpan di Firebase Storage (gratis 5GB)

### Keuntungan Firebase Storage vs ImgBB
- ✅ **No API Key needed** (lebih aman)
- ✅ **Integrated dengan Firebase project**
- ✅ **Tidak ada limit upload per jam**
- ✅ **Free 5GB storage**
- ✅ **CDN global** (loading cepat)
- ✅ **No network blocking** (tidak terblokir ISP/firewall)

---

## 🔧 Troubleshooting

### Jika masih error "insufficient permissions":
1. Pastikan rules sudah di-**Publish**
2. **Hard refresh** browser (Ctrl + Shift + R)
3. **Logout & login** ulang di admin
4. Cek browser console untuk error spesifik

### Jika upload masih gagal:
1. Cek Firebase Console → **Storage** → Pastikan bucket aktif
2. Periksa `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` di `.env.local`
3. Restart dev server: `npm run dev`
