import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFS9M7z8Phc8qSCBwe3ibvS4AdN2hAM0E",
  authDomain: "archive-demo-2af37.firebaseapp.com",
  projectId: "archive-demo-2af37",
  storageBucket: "archive-demo-2af37.appspot.com",
  messagingSenderId: "491388484377",
  appId: "1:491388484377:web:901f811b4c142b1125e388"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
