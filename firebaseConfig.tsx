import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt0cgSTJkAmmIbsi6g3FPNKK7OljETZk0",
  authDomain: "pirith-6fb06.firebaseapp.com",
  projectId: "pirith-6fb06",
  storageBucket: "pirith-6fb06.firebasestorage.app",
  messagingSenderId: "799214750008",
  appId: "1:799214750008:web:98e9abb50f8158e2a199cd",
  measurementId: "G-8RGQ69DG09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export {db}