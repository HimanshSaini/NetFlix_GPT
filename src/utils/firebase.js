// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAwagnAoCckutx6Sih1LFehsF4fnlkVd_w",
  authDomain: "netflix-gpt-100925.firebaseapp.com",
  projectId: "netflix-gpt-100925",
  storageBucket: "netflix-gpt-100925.firebasestorage.app",
  messagingSenderId: "743679655471",
  appId: "1:743679655471:web:55c0b21266e893f168d0da",
  measurementId: "G-2FTJ2S4SVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);