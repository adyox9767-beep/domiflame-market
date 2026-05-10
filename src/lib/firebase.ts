import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_wDz4evy-laRHPlMe9B-7npJ8AR9MUtk",
  authDomain: "domiflame-market.firebaseapp.com",
  projectId: "domiflame-market",
  storageBucket: "domiflame-market.firebasestorage.app",
  messagingSenderId: "992079114764",
  appId: "1:992079114764:web:8eec6b995b436c6b79b429",
  measurementId: "G-9LD085TX4V"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);