# 🚀 Deployment Guide - GitHub Pages

Panduan lengkap untuk deploy website Tong-Tong Madura ke GitHub Pages.

## 📋 Prerequisites

1. Repository GitHub sudah dibuat
2. Firebase project sudah setup (untuk admin dashboard)
3. Node.js 20+ terinstall
4. Git terinstall

## 🔧 Setup Awal

### 1. Konfigurasi Repository GitHub

#### A. Enable GitHub Pages
1. Buka repository di GitHub
2. Go to **Settings** → **Pages**
3. Source: Pilih **GitHub Actions**
4. Save

#### B. Tambahkan Firebase Secrets
1. Buka repository → **Settings** → **Secrets and variables** → **Actions**
2. Klik **New repository secret**
3. Tambahkan secrets berikut (dari file `.env.local` Anda):

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | Your Firebase API Key |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | your-project.firebaseapp.com |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | your-project-id |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | your-project.appspot.com |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | Your app ID |

### 2. Konfigurasi Firebase

#### A. Firebase Authentication
1. Buka Firebase Console → Authentication
2. Enable **Email/Password** sign-in method
3. Buat user admin:
   - Email: `admin@tongtong-madura.com` (atau email pilihan Anda)
   - Password: [Pilih password yang kuat]

#### B. Firebase Storage (Blaze Plan Required)
1. Buka Firebase Console → Storage
2. Click "Get started"
3. Location: **asia-southeast2** (Jakarta)
4. Update Storage Rules:
   ```javascript
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /{allPaths=**} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

#### C. Firestore Database
1. Buka Firebase Console → Firestore Database
2. Create database (Start in production mode)
3. Location: **asia-southeast2** (Jakarta)
4. Update Firestore Rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Public read untuk semua collections
       match /{document=**} {
         allow read: if true;
       }
       
       // Admin write untuk gallery
       match /gallery/{docId} {
         allow write: if request.auth != null;
       }
       
       // Admin write untuk explore
       match /explore/{docId} {
         allow write: if request.auth != null;
       }
       
       // Admin write untuk quizzes
       match /quizzes/{docId} {
         allow write: if request.auth != null;
       }
     }
   }
   ```

## 🚀 Deployment Process

### Metode 1: Auto Deploy dengan GitHub Actions (Recommended)

**Setelah setup selesai, deployment otomatis setiap push ke main branch:**

```bash
# 1. Buat perubahan di local
git add .
git commit -m "Your commit message"

# 2. Push ke GitHub
git push origin main

# 3. GitHub Actions akan otomatis:
#    - Install dependencies
#    - Build project
#    - Deploy ke GitHub Pages
```

**Cek deployment status:**
- Buka repository → **Actions** tab
- Lihat workflow "Deploy to GitHub Pages"
- Klik untuk melihat detail logs

**Website akan live di:**
```
https://dans-real.github.io/tongtong-madura
```

### Metode 2: Manual Deploy (Alternatif)

Jika tidak ingin menggunakan GitHub Actions:

```bash
# 1. Build project local
npm run build

# 2. Output ada di folder 'out/'

# 3. Copy folder 'out/' ke folder 'docs/' (atau deploy langsung)
# Kemudian commit dan push

git add docs/
git commit -m "Deploy to GitHub Pages"
git push origin main
```

Lalu di GitHub Settings → Pages → Source: **Deploy from a branch** → Branch: main, Folder: /docs

## ✅ Verification Checklist

Setelah deployment, pastikan semua berfungsi:

### Website Public
- [ ] Homepage loading dengan baik
- [ ] Map Madura tampil
- [ ] Gallery section tampil (mungkin kosong jika belum diisi)
- [ ] Explore section tampil (mungkin kosong jika belum diisi)
- [ ] Quiz section tampil (mungkin kosong jika belum diisi)
- [ ] Navigasi antar halaman berfungsi
- [ ] Responsive di mobile

### Admin Dashboard
- [ ] `/admin` dapat diakses
- [ ] Login dengan email/password berhasil
- [ ] Tab Gallery berfungsi
- [ ] Tab Explore berfungsi
- [ ] Tab Quizzes berfungsi
- [ ] Upload gambar berfungsi (Firebase Storage)
- [ ] CRUD operations berfungsi (Create, Read, Update, Delete)

### Firebase
- [ ] Storage aktif dan menerima upload
- [ ] Firestore collections terbuat
- [ ] Security rules terpasang dengan benar

## 🐛 Troubleshooting

### Issue: Build gagal di GitHub Actions

**Solusi:**
1. Cek logs di Actions tab
2. Pastikan semua secrets sudah diisi dengan benar
3. Pastikan Firebase credentials valid

### Issue: Website tampil 404

**Solusi:**
1. Pastikan file `.nojekyll` ada di output
2. Cek Settings → Pages → Source sudah benar
3. Tunggu 5-10 menit untuk propagation

### Issue: Admin tidak bisa login

**Solusi:**
1. Pastikan Firebase Auth enabled
2. Pastikan email/password sudah dibuat di Firebase Console
3. Cek browser console untuk error messages

### Issue: Upload gambar gagal

**Solusi:**
1. Pastikan Firebase Storage sudah aktif
2. Pastikan sudah upgrade ke Blaze plan (gratis dengan verification)
3. Cek Storage Rules sudah benar

### Issue: Data tidak muncul di public pages

**Solusi:**
1. Pastikan sudah isi data di admin dashboard
2. Cek Firestore rules allow read: true
3. Cek browser console untuk Firebase errors

## 🔄 Update Website

Untuk update konten atau code:

```bash
# 1. Buat perubahan
# Edit files...

# 2. Test di local
npm run dev
# Cek di http://localhost:3000

# 3. Build untuk pastikan tidak ada error
npm run build

# 4. Commit dan push
git add .
git commit -m "Update: description of changes"
git push origin main

# 5. GitHub Actions akan auto-deploy
```

## 📊 Monitoring

### Cek Build Status
- GitHub Actions tab: Lihat status build terbaru
- Email notifications untuk build failures

### Analytics (Optional)
Tambahkan Google Analytics atau Vercel Analytics untuk tracking visitors:

1. Get tracking ID dari Google Analytics
2. Tambahkan ke `src/app/layout.tsx`

## 🎯 Best Practices

1. **Always test locally** sebelum push
   ```bash
   npm run dev  # Development
   npm run build  # Production build test
   ```

2. **Use meaningful commit messages**
   ```bash
   git commit -m "feat: Add new quiz about instruments"
   git commit -m "fix: Correct map coordinates"
   git commit -m "style: Update color scheme"
   ```

3. **Backup Firebase data** secara berkala
   - Export Firestore data dari Firebase Console
   - Backup Storage files

4. **Monitor Firebase usage**
   - Cek Firebase Console → Usage
   - Pastikan tidak melebihi free tier limits

## 🆘 Support

Jika ada masalah:
1. Cek dokumentasi ini
2. Lihat error logs di GitHub Actions
3. Cek Firebase Console untuk errors
4. Check browser developer console

---

**Happy Deploying! 🎉**
