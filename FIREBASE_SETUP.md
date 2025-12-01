# Firebase Setup Instructions untuk Tong-Tong Madura

## 1. Buat Firebase Project

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" / "Tambah project"
3. Beri nama project: `tongtong-madura`
4. Ikuti langkah-langkah setup

## 2. Enable Firestore Database

1. Di Firebase Console, pilih project Anda
2. Klik "Firestore Database" di menu kiri
3. Klik "Create database"
4. Pilih "Start in production mode"
5. Pilih lokasi (asia-southeast1 untuk Indonesia)

## 3. Set Firestore Security Rules

Buka tab "Rules" di Firestore, lalu paste kode berikut:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is admin
    function isAdmin() {
      // GANTI dengan email admin Anda
      return request.auth != null && request.auth.token.email == 'admin@example.com';
    }
    
    // Gallery collection
    match /gallery/{documentId} {
      allow read: if true; // Semua orang bisa baca
      allow write: if isAdmin(); // Hanya admin bisa tulis
    }
    
    // Regions collectionj
    match /regions/{regionId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Quizzes collection
    match /quizzes/{quizId} {
      allow read: if true;
      allow write: if isAdmin();
      
      // Questions subcollection
      match /questions/{questionId} {
        allow read: if true;
        allow write: if isAdmin();
      }
    }
  }
}
```

**PENTING:** Ganti `admin@example.com` dengan email admin Anda!

## 4. Enable Authentication

1. Klik "Authentication" di menu kiri
2. Klik "Get started"
3. Pilih tab "Sign-in method"
4. Enable "Email/Password"
5. Klik tab "Users"
6. Klik "Add user"
7. Masukkan email dan password admin Anda
8. Klik "Add user"

## 5. Get Firebase Config

1. Klik icon ⚙️ (Settings) di menu kiri
2. Pilih "Project settings"
3. Scroll ke bawah ke "Your apps"
4. Klik icon Web (</>) untuk menambah web app
5. Beri nama app: "Tong-Tong Madura Web"
6. **JANGAN** centang "Firebase Hosting"
7. Klik "Register app"
8. Copy konfigurasi Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0xszTVtMgCuUIDqudPz5aHZl_MQCE8N0",
  authDomain: "tongtong-madura.firebaseapp.com",
  projectId: "tongtong-madura",
  storageBucket: "tongtong-madura.firebasestorage.app",
  messagingSenderId: "699551076236",
  appId: "1:699551076236:web:aa6a3f6f3597249d2a10a9",
  measurementId: "G-HSRD5SB7MG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
## 6. Setup Environment Variables

1. Buka file `.env.local` di root project
2. Ganti nilai-nilai berikut dengan config dari Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tongtong-madura.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tongtong-madura
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tongtong-madura.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...
```

## 7. Test Local Development

```bash
npm run dev
```

Buka browser:
- Public site: http://localhost:3000
- Admin login: http://localhost:3000/admin

## 8. Migrate Data dari Static ke Firestore (Optional)

Jika Anda ingin memindahkan data existing dari file TypeScript ke Firestore:

1. Login ke admin panel: http://localhost:3000/admin
2. Untuk setiap item di `src/data/gallery.ts`, `regions.ts`, dan `quizzes.ts`:
   - Copy data
   - Paste ke form di admin panel
   - Submit

Atau buat script migration (advanced).

## 9. Build & Deploy ke GitHub Pages

```bash
# Build project
npm run build

# Copy ke docs folder
rm -rf docs/*
cp -r out/* docs/

# Commit dan push
git add .
git commit -m "Add Firebase integration"
git push origin main
```

## 10. Test Production

Setelah deploy, buka:
- Site: https://your-username.github.io/tongtong-madura/
- Admin: https://your-username.github.io/tongtong-madura/admin

## Struktur Admin Routes

- `/admin` - Login page & dashboard
- `/admin/gallery` - Manage gallery items
- `/admin/regions` - Manage Jelajah regions
- `/admin/quizzes` - Manage quizzes

## Security Notes

✅ Firebase config (API keys) aman di-expose di client code
✅ Security dijaga oleh Firestore Security Rules
✅ Hanya authenticated admin yang bisa write data
✅ Public users hanya bisa read data

## Troubleshooting

### Error: Missing or insufficient permissions
- Cek Firestore Security Rules sudah benar
- Pastikan email di rules sesuai dengan email admin

### Error: Firebase not initialized
- Cek `.env.local` sudah diisi dengan benar
- Restart development server: `npm run dev`

### Admin tidak bisa login
- Pastikan user sudah dibuat di Firebase Authentication
- Pastikan email/password benar

### Data tidak muncul di public site
- Pastikan sudah ada data di Firestore
- Buka Console browser untuk cek error
- Pastikan Firestore rules allow read untuk semua orang
