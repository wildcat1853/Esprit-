
// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




const firebaseConfig = {
    apiKey: "AIzaSyDPzrUSDqTI3SbL9jJ8W8eiCq9xOjJHpSw",
    authDomain: "twitter-15243.firebaseapp.com",
    projectId: "twitter-15243",
    storageBucket: "twitter-15243.appspot.com",
    messagingSenderId: "561720651186",
    appId: "1:561720651186:web:2eef31f0e5a7be58fb88ab",
    measurementId: "G-747KBJ0TCV"
  };


  const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };