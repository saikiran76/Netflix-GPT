/* eslint-disable no-undef */
// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the messaging sender ID
firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyD3ueXI94zOMu6DQpP-4eNH6lK7ctM61Q8",
    authDomain: "flixyai.firebaseapp.com",
    projectId: "flixyai",
    storageBucket: "flixyai.firebasestorage.app",
    messagingSenderId: "194441512510",
    appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:194441512510:web:c3a5e777e097547228736f",
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-7YBWR61GP7",
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);
  // Customize background message here if needed
});
