import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDEw9vA1qIGKYcDRSCQChrx181HFRfChLM",
  authDomain: "clone-4bef0.firebaseapp.com",
  projectId: "clone-4bef0",
  storageBucket: "clone-4bef0.appspot.com",
  messagingSenderId: "271143803357",
  appId: "1:271143803357:web:6e897c1286fa04e58b3e34",
  measurementId: "G-4PCPYWV0KG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
