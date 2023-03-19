// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOdt_CtsHuxlSJYSXmmfKhHSvAHPFE86g",
  authDomain: "college-planner-app-c524c.firebaseapp.com",
  projectId: "college-planner-app-c524c",
  storageBucket: "college-planner-app-c524c.appspot.com",
  messagingSenderId: "740889844702",
  appId: "1:740889844702:web:91c60706acb825d6b35b4f",
  measurementId: "G-WBY64ZFYQM"
};

// Initialize Firebase apps
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
//export to use in other
export { app, auth, db};