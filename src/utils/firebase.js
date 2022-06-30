import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCnogFZsPvZT0myBztz7CnWM4ZMV9zD0A",
  authDomain: "react-course-app-3db69.firebaseapp.com",
  projectId: "react-course-app-3db69",
  storageBucket: "react-course-app-3db69.appspot.com",
  messagingSenderId: "315330963838",
  appId: "1:315330963838:web:e7b9b412e7c751399e6b2f",
  measurementId: "G-WHHXC10PCY",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

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
    signingOut();
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
