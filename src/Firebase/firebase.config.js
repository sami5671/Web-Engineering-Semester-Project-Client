import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAznXgJ1nn7y5vg_CZ20sHswwm9Aa8MvwE",
  authDomain: "tube-nest.firebaseapp.com",
  projectId: "tube-nest",
  storageBucket: "tube-nest.appspot.com",
  messagingSenderId: "285702052826",
  appId: "1:285702052826:web:323420d376318ba9793ee3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
