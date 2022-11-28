import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDQcde65VvTweVT4wKgfvncYzZ3pdmaaZQ",
  authDomain: "crud-a7e00.firebaseapp.com",
  projectId: "crud-a7e00",
  storageBucket: "crud-a7e00.appspot.com",
  messagingSenderId: "1033958980038",
  appId: "1:1033958980038:web:1597071674eb0079b0dac7",
  measurementId: "G-KGHVRE329K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Function used to sign in with Google
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        user_id: Math.floor(Math.random() * 10),
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    toast("Logged in successfully");
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

// Function used to login with Email and Password (if registered)
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast("Logged in successfully");
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

// Function used to Register using email
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      user_id: Math.floor(Math.random() * 10),
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast("Logged in successfully");
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

// Function used for logout 
const logout = () => {
  signOut(auth);
  toast("Logged out");
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};