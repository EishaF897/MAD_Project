// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCa2a2Cq-y-ZZPEL2Tb86ckOM0lUY7HUR4",
  authDomain: "project-a0b9e.firebaseapp.com",
  projectId: "project-a0b9e",
  storageBucket: "project-a0b9e.firebasestorage.app",
  messagingSenderId: "546408982603",
  appId: "1:546408982603:web:19598576932f91c6fc45ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db}; // Export firestore for use in your components

