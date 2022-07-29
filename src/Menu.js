import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import { signingOut } from "./utils/firebase";

import "./Menu.css";
export default function Menu(props) {
  const { user } = useContext(AuthContext);
  const [check, setCheck] = useState(false);
  const handleChange = () => setCheck(!check);
  return (
    <>
      <nav>
        <div className="navbar">
          <div className="container nav-container">
            <input
              className="checkbox"
              type="checkbox"
              name=""
              id=""
              checked={check}
              onClick={() => handleChange()}
              readOnly
            />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            {/* <div className="logo">
              <h3>Casino Gift Wheel</h3>
            </div> */}
            <div className="menu-items">
              {user !== null ? (
                <>
                  <li>
                    <Link to="/dashboard" onClick={() => handleChange()}>
                      Dasboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/gift-wheel" onClick={() => handleChange()}>
                      Gift Wheel
                    </Link>
                  </li>
                  <li>
                    <Link to="/data-table" onClick={() => handleChange()}>
                      DATABASE
                    </Link>
                  </li>
                  <li>
                    <Link to="/users-list" onClick={() => handleChange()}>
                      Users
                    </Link>
                  </li>
                  {/* <li>
                    <Link to="/claim" onClick={() => handleChange()}>
                      Claim
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      to="#"
                      onClick={() => {
                        signingOut();
                        handleChange();
                      }}
                    >
                      Sign Out
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" onClick={() => handleChange()}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/data-table" onClick={() => handleChange()}>
                      Data Base
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" onClick={() => handleChange()}>
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" onClick={() => handleChange()}>
                      Register
                    </Link>
                  </li>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
