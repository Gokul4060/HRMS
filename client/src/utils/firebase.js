// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY ,
  authDomain: "hrmstask.firebaseapp.com",
  projectId: "hrmstask",
  storageBucket: "hrmstask.appspot.com",
  messagingSenderId: "263016844524",
  appId: "1:263016844524:web:42600dace7ec4ad61229c9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
