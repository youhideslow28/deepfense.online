// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7Tx5k2cmo8qdBbWb-N935nVlPPXXPZ8U",
  authDomain: "deepfense-db.firebaseapp.com",
  projectId: "deepfense-db",
  storageBucket: "deepfense-db.firebasestorage.app",
  messagingSenderId: "69010699999",
  appId: "1:69010699999:web:35cb1dba1fb42f20bf1b6a",
  measurementId: "G-4KVKD8FTNK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };