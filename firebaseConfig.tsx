import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

var FIREBASE_API_KEY="AIzaSyBt0cgSTJkAmmIbsi6g3FPNKK7OljETZk0"
var FIREBASE_AUTH_DOMAIN="pirith-6fb06.firebaseapp.com"
var FIREBASE_PROJECT_ID="pirith-6fb06"
var FIREBASE_STORAGE_BUCKET="pirith-6fb06.firebasestorage.app"
var FIREBASE_MESSAGING_SENDER_ID="799214750008"
var FIREBASE_APP_ID="1:799214750008:web:98e9abb50f8158e2a199cd"
var FIREBASE_MEASUREMENT_ID="G-8RGQ69DG09"
// Your Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
