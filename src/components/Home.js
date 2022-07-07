import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";

export default function Home(props) {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate replace to="/dashboard" />;
  }
  return (
    <>
      Home <Link to="/login">login</Link>
      <br />
      <Link to="/register">register</Link>
    </>
  );
}
