// @ts-nocheck
/**
 * DEEPFENSE.ONLINE — Firebase Configuration
 * Graceful fallback when env vars are missing (local dev without .env)
 * @copyright 2025 Ho Xuan Nguyen (25NS039)
 */

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY            || 'demo-api-key',
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN        || 'demo.firebaseapp.com',
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID         || 'demo-project',
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET     || 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID|| '000000000000',
  appId:             import.meta.env.VITE_FIREBASE_APP_ID             || '1:000:web:000000',
  measurementId:     import.meta.env.VITE_FIREBASE_MEASUREMENT_ID     || 'G-DEMO',
};

// Avoid duplicate app initialization (HMR safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Only init analytics in browser + production
let analytics = null;
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  import("firebase/analytics").then(({ getAnalytics }) => {
    try { analytics = getAnalytics(app); } catch { /* silent */ }
  });
}

const db      = getFirestore(app);
const storage = getStorage(app);
const auth    = getAuth(app);

export { app, analytics, db, storage, auth };