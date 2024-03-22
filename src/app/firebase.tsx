// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGozYHr5AfBqi9uV3VByIxRZwL-Fvxa5k",
  authDomain: "apptrix-55a06.firebaseapp.com",
  projectId: "apptrix-55a06",
  storageBucket: "apptrix-55a06.appspot.com",
  messagingSenderId: "859127509399",
  appId: "1:859127509399:web:fbbce4bb41c394d33bd4d2",
  measurementId: "G-XKY38NL4X0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)