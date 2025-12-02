# Firebase Storage CORS Setup Manual

## Error yang Muncul:
```
Access to fetch at 'https://firebasestorage.googleapis.com/...' from origin 'https://dans-real.github.io' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solusi Sementara (Sudah Diterapkan):
Website saat ini menggunakan **fallback download method** dengan `window.open()` yang tidak terkena CORS block. Download masih berfungsi dengan baik.

## Solusi Permanen - 2 Opsi:

### Opsi 1: Firebase Storage Rules (Mudah, via Console)

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project **tongtong-madura**
3. Klik **Storage** → **Rules** tab
4. Ubah rules menjadi:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;  // Public read
      allow write: if request.auth != null;
    }
  }
}
service firebase.storage {
  match /b/{bucket}/o {
    // Gallery folder - public read, auth write
    match /gallery/{fileName} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Default - public read, auth write
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

5. Klik **Publish**

**Catatan:** Rules di atas sudah benar, tapi CORS headers masih perlu diterapkan via gsutil (lihat Opsi 2)

### Opsi 2: Apply CORS via gsutil (Permanen, mengatasi CORS sepenuhnya)

#### A. Install Google Cloud SDK

**Windows:**
1. Download installer: https://cloud.google.com/sdk/docs/install#windows
2. Jalankan installer `google-cloud-sdk-installer.exe`
3. Follow wizard, install semua components
4. Restart PowerShell/terminal

**Atau via Chocolatey:**
```powershell
choco install gcloudsdk
```

#### B. Login & Apply CORS

```powershell
# 1. Login ke Google Cloud
gcloud auth login

# 2. Set project
gcloud config set project tongtong-madura

# 3. Apply CORS configuration
gsutil cors set cors.json gs://tongtong-madura.firebasestorage.app

# 4. Verify CORS applied
gsutil cors get gs://tongtong-madura.firebasestorage.app
```

#### C. cors.json Content (Sudah Ada di Root Project)

```json
[
    {
        "origin": [
            "https://dans-real.github.io",
            "http://localhost:3000",
            "https://localhost:3000"
        ],
        "method": [
            "GET",
            "HEAD",
            "PUT",
            "POST",
            "DELETE"
        ],
        "maxAgeSeconds": 3600,
        "responseHeader": [
            "Content-Type",
            "Access-Control-Allow-Origin",
            "Content-Disposition"
        ]
    }
]
```

## Firebase Authentication Authorized Domains

**Error:**
```
The current domain is not authorized for OAuth operations. 
Add your domain (dans-real.github.io) to the OAuth redirect domains list.
```

**Solusi:**

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project **tongtong-madura**
3. **Authentication** → **Settings** tab → **Authorized domains**
4. Klik **Add domain**
5. Masukkan: `dans-real.github.io`
6. Klik **Add**

## Status Saat Ini

- ✅ Download berfungsi via fallback method
- ✅ Gallery display sudah benar (masonry + original ratio)
- ⚠️ CORS errors masih muncul di console (tidak mengganggu fungsi)
- ⚠️ Auth domain belum ditambahkan (perlu untuk login admin)

## Rekomendasi

1. **Prioritas Tinggi:** Tambah authorized domain `dans-real.github.io` (untuk admin login)
2. **Opsional:** Install gsutil dan apply CORS (untuk hilangkan console errors)

Fallback download method sudah cukup untuk user experience yang baik.
