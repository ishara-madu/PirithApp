// firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA6Tk-aNP_pxUWIB3Rrk8mfpjs_bKV0AyQ",
  authDomain: "pirith-app-d3289.firebaseapp.com",
  databaseURL: "https://pirith-app-d3289-default-rtdb.asia-southeast1.firebasedatabase.app", // Updated database URL
  projectId: "pirith-app-d3289",
  storageBucket: "pirith-app-d3289.appspot.com",
  messagingSenderId: "502680967547",
  appId: "1:502680967547:web:815630ef7908d553f785de",
  measurementId: "G-CTDPWZ1KTP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize Realtime Database

export { database }; // Export the database instance
