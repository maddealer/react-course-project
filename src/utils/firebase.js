import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app);

export { auth };
