import React, { useEffect, useState, useContext } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import "firebase/compat/auth";
import { collection, addDoc } from "firebase/firestore";
import styles from "./Login.module.css";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { db } from "../utils/firebase";
import AuthContext from "../AuthContext";

export default function Claim(props) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const claimsCollectionRef = collection(db, "claims");

  const [gift, setGift] = useState("");
  const [card, setCard] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeGDPR, setAgreeGDPR] = useState(false);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  useEffect(() => {
    if (user && location.state) {
      console.log("user", user.email);
      setGift(location.state.gift);
      return;
    }
    setGift("no gift");
  }, []);

  const handleChangeCard = (event) => {
    setCard(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleChangeCheck = (event) => {
    setAgreeGDPR((agreeGDPR) => !agreeGDPR);
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();

    if (email !== "" && card !== "" && agreeGDPR === true && phone !== "") {
      if (emailRegex.test(email)) {
        try {
          await addDoc(claimsCollectionRef, {
            card,
            email,
            phone,
            gift,
            agreeGDPR,
            name: "",
            congratulated: "",
            creator: user.email,
            createdAt: Date.now(),
          });

          setAgreeGDPR(false);
          setCard("");
          setEmail("");
          setPhone("");
          setRedirect(true);
        } catch (err) {
          console.log(err);
          setError("Something went wrong!");
        }
      } else {
        alert(`Enter valid email.`);
      }
    } else {
      alert(`All fields please.`);
    }
  };

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#00000099",
      },
    },
  });

  if (redirect) {
    return <Navigate replace to="/data-table" />;
  }

  return (
    <>
      <>
        <div>
          <ThemeProvider theme={theme}>
            <div
              style={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className={styles.form}>
                {error ? <div className="auth__error">{error}</div> : null}
                <div
                  style={{
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    marginBottom: "15px",
                  }}
                >
                  {" "}
                  <h5 style={{ fontSize: "1.5em" }}>Apply for Gift</h5>
                  <br /> <p style={{ fontSize: "1em" }}>"{gift}"</p>
                </div>
                <div className={styles["input-container ic1"]}>
                  <label htmlFor="card" className={styles["placeholder"]}>
                    Card Number
                  </label>
                  <input
                    id="card  "
                    value={card ?? ""}
                    autoComplete="off"
                    placeholder="Casino Card Number"
                    className={styles.input}
                    type="text"
                    onChange={handleChangeCard}
                    required
                  />
                </div>
                <div className={styles["input-container ic2"]}>
                  <label htmlFor="email" className={styles["placeholder"]}>
                    Email
                  </label>
                  <input
                    id="email"
                    className={styles["input"]}
                    type="email"
                    autoComplete="off"
                    placeholder="Enter Your Email"
                    value={email ?? ""}
                    onChange={handleChangeEmail}
                    required
                  />
                </div>
                <div className={styles["input-container ic1"]}>
                  <label htmlFor="phone" className={styles["placeholder"]}>
                    Phone Number
                  </label>
                  <input
                    id="phone "
                    type="text"
                    autoComplete="off"
                    placeholder="Phone Number Optional"
                    value={phone}
                    name="phone"
                    onChange={handleChangePhone}
                    className={styles.input}
                  />
                </div>
                <div className={styles["input-container ic1"]}>
                  <label style={{ paddingLeft: "15px" }}>
                    <input
                      type="checkbox"
                      name="remember"
                      value={agreeGDPR}
                      checked={agreeGDPR}
                      onChange={() => handleChangeCheck()}
                    />{" "}
                    <span style={{ color: "#fff" }}>Agree to </span>{" "}
                    <Link
                      to="#"
                      style={{ color: "#147fa6", textDecoration: "none" }}
                    >
                      {" "}
                      "Terms and Conditions"
                    </Link>
                  </label>
                </div>
                <button
                  type="submit"
                  className={styles["submit"]}
                  onClick={handleAddFormSubmit}
                >
                  Claim
                </button>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </>
    </>
  );
}
