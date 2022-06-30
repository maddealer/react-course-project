import React from "react";
import { Link } from "react-router-dom";

export default function Home(props) {
  return (
    <>
      Home <Link to="/login">login</Link>
      <br />
      <Link to="/register">register</Link>
    </>
  );
}
