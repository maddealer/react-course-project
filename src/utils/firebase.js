import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// REACT_APP_FIREBASE_API_KEY = "AIzaSyDCnogFZsPvZT0myBztz7CnWM4ZMV9zD0A"
// REACT_APP_FIREBASE_AUTH_DOMAIN = "react-course-app-3db69.firebaseapp.com"
// REACT_APP_FIREBASE_PROJECT_ID = "react-course-app-3db69"
// REACT_APP_FIREBASE_STORAGE_BUCKET = "react-course-app-3db69.appspot.com"
// REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "315330963838"
// REACT_APP_FIREBASE_APP_ID = "1:315330963838:web:e7b9b412e7c751399e6b2f"
// REACT_APP_FIREBASE_MEASUREMENT_ID = "G-WHHXC10PCY"

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      name,
    });

    return true;
  } catch (error) {
    return { error: error.message };
  }
};

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return true;
  } catch (error) {
    return { error: error.message };
  }
};

const signingOut = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return false;
  }
};

export { auth, db, signUp, signIn, signingOut };
