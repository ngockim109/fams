import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCth5T2RCVuEa5s4VBXpgUHXghxUci5kWI",
  authDomain: "api-fams.firebaseapp.com",
  projectId: "api-fams",
  storageBucket: "api-fams.appspot.com",
  messagingSenderId: "182856253954",
  appId: "1:182856253954:web:2c146313ed44cb68e1dd1b",
  measurementId: "G-F9DJMFFJP6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const storage = getStorage(app);
