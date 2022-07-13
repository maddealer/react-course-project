import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./AuthProvider";
import { auth } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Dashboard from "./components/Dashboard";
import Claim from "./components/Claim";
import Wheel1 from "./components/GiftWheel";
function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
  }, []);
  return (
    <div className="appStyle">
      <BrowserRouter>
        <AuthProvider value={{ currentUser }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/claim" element={<Claim />} />
            <Route path="/giftWheel" element={<Wheel1 />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
