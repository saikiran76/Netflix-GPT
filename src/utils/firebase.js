// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByWGKO8Vy3JkI1KCTPcYOQPvuE2jL6JxU",
  authDomain: "netgpt-b774f.firebaseapp.com",
  projectId: "netgpt-b774f",
  storageBucket: "netgpt-b774f.appspot.com",
  messagingSenderId: "519298939407",
  appId: "1:519298939407:web:c5483ecf084bbe61a1817a",
  measurementId: "G-3CGCTT7B57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();