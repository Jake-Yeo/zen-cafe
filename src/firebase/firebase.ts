// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const api_key = process.env.REACT_APP_API_KEY;x

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: api_key,
    authDomain: "the-zen-cafe.firebaseapp.com",
    projectId: "the-zen-cafe",
    storageBucket: "the-zen-cafe.appspot.com",
    messagingSenderId: "563633434827",
    appId: "1:563633434827:web:212095e856a88221876b4e",
    measurementId: "G-NK3T8D35QR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' }); // This forces the user to pick an account when they press the log in button I beleive (From the google popup, they may have multiple accounts)
export const auth = getAuth(app);
const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);
export const dataBase = firebase.firestore();   