// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-icon-generator-nextjs.firebaseapp.com",
  projectId: "ai-icon-generator-nextjs",
  storageBucket: "ai-icon-generator-nextjs.firebasestorage.app",
  messagingSenderId: "381060786977",
  appId: "1:381060786977:web:e5078f912db354c2f06c60",
  measurementId: "G-BEHC75HW87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
