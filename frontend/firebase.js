// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "food-delivery-2216c.firebaseapp.com",
  projectId: "food-delivery-2216c",
  storageBucket: "food-delivery-2216c.firebasestorage.app",
  messagingSenderId: "1097693883841",
  appId: "1:1097693883841:web:ef71e14a869b1af1c0d340",
  measurementId: "G-QYS3KE60DE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

