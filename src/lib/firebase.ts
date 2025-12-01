import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

// Your Firebase config from Firebase Console
// These values are safe to expose in client code
// For static export to GitHub Pages, we hardcode the values
const firebaseConfig = {
    apiKey: "AIzaSyB0xszTVtMgCuUIDqudPz5aHZl_MQCE8N0",
    authDomain: "tongtong-madura.firebaseapp.com",
    projectId: "tongtong-madura",
    storageBucket: "tongtong-madura.firebasestorage.app",
    messagingSenderId: "699551076236",
    appId: "1:699551076236:web:aa6a3f6f3597249d2a10a9",
    measurementId: "G-HSRD5SB7MG"
};

// Initialize Firebase (singleton pattern)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
const storage: FirebaseStorage = getStorage(app);

export { app, auth, db, storage };
