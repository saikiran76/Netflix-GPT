// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "flixyai.firebaseapp.com",
  projectId: "flixyai",
  storageBucket: "flixyai.firebasestorage.app",
  messagingSenderId: "194441512510",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);

export const requestPermissionForNotifications = async () => {
  try {
    const token = await getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });
    console.log('User FCM registration token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // Show a notification or handle the message

});

export const auth = getAuth(app);

export default app;