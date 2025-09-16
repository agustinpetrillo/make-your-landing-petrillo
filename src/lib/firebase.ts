import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyBwZcpJ6PfbvPwQvm2ekn1y7s6fWFWp4uA",
  authDomain: "coderhouse-database-4a38a.firebaseapp.com",
  projectId: "coderhouse-database-4a38a",
  storageBucket: "coderhouse-database-4a38a.firebasestorage.app",
  messagingSenderId: "393120177874",
  appId: "1:393120177874:web:f7bdc315b2128bfa40d70b",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);

export default app;
