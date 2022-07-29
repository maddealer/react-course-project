import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./AuthProvider";
import { auth } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Dashboard from "./components/Dashboard";
import Claim from "./components/Claim";
import Wheel1 from "./components/GiftWheel";
import DataTable from "./components/DataTable";
import Menu from "./Menu";
import EditClaim from "./components/EditClaim";
import PrivateRoute from "./PrivateRoute";
import Details from "./components/Details";
import UsersList from "./components/UsersList";
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
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute isLoggedIn={currentUser}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/users-list"
              element={
                <PrivateRoute isLoggedIn={currentUser}>
                  <UsersList />
                </PrivateRoute>
              }
            />
            <Route
              path="/claim"
              element={
                <PrivateRoute isLoggedIn={currentUser}>
                  <Claim />
                </PrivateRoute>
              }
            />
            <Route
              path="/gift-wheel"
              element={
                <PrivateRoute isLoggedIn={currentUser}>
                  <Wheel1 />
                </PrivateRoute>
              }
            />
            <Route path="/data-table" element={<DataTable />} />
            <Route
              path="/edit-claim"
              element={
                <PrivateRoute isLoggedIn={currentUser}>
                  <EditClaim />
                </PrivateRoute>
              }
            />
            <Route path="/details" element={<Details />} />
            <Route
              path="*"
              element={<PrivateRoute isLoggedIn={false}></PrivateRoute>}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
