// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBHKG_Ok8zknpyBeOipFbwDvpGqTQ4k_4U",
  authDomain: "relation-application.firebaseapp.com",
  projectId: "relation-application",
  storageBucket: "relation-application.appspot.com",
  messagingSenderId: "245312338698",
  appId: "1:245312338698:web:ea3ebb0fa7be006fa018f3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
