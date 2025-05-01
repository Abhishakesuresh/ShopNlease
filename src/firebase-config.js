// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // ✅ Add this import
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoWw8VTfdZjeMxbg0HSNfQyqpuX3TSqYo",
  authDomain: "shopnlease.firebaseapp.com",
  projectId: "shopnlease",
  storageBucket: "shopnlease.firebasestorage.app",
  messagingSenderId: "145705447884",
  appId: "1:145705447884:web:1d30e5f4fc02011cea2d69",
  measurementId: "G-RT4M8PSW9B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);   // ✅ Initialize auth

// Export auth
export { auth };             // ✅ Export auth
export { app }; 
export const db = getFirestore(app);