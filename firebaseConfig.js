// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzMqmEmxHryfAHLbvST5FPW0m8HTbOWdQ",
  authDomain: "auth-app-assignment.firebaseapp.com",
  projectId: "auth-app-assignment",
  storageBucket: "auth-app-assignment.appspot.com",
  messagingSenderId: "1051863200614",
  appId: "1:1051863200614:web:5ea410e616d9ce8effcea7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
