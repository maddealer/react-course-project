import React, { useEffect, useState, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import "firebase/compat/auth";
import { collection, addDoc } from "firebase/firestore";
import "./forms.css";
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
  let giftNew = "no gift";
  useEffect(() => {
    if (user && location.state) {
      giftNew = location.state.gift;
      console.log("user", user.email);
      setGift(giftNew);
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

    if (email !== "" && card !== "" && agreeGDPR === true) {
      try {
        const res = await addDoc(claimsCollectionRef, {
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
      } catch (err) {
        console.log(err);
        setError("Something went wrong!");
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

  if (!user) {
    return <Navigate replace to="/" />;
  }

  return (
    <>
      <>
        <div>
          <ThemeProvider theme={theme}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                height: "70vh",
                position: "relative",
              }}
            >
              <div className="auth">
                {" "}
                <form>
                  <h1>
                    Apply for Gift <br />"{gift}"
                  </h1>
                  {error ? <div className="auth__error">{error}</div> : null}
                  <div className="formcontainer">
                    <hr />
                    <div className="container">
                      <label htmlFor="uname">
                        <strong>Casino Card Number</strong>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="Casino Card Number"
                        value={card ?? ""}
                        name="uname"
                        onChange={handleChangeCard}
                        required
                      />
                      <label htmlFor="psw">
                        <strong>Email</strong>
                      </label>

                      <input
                        type="Email"
                        autoComplete="off"
                        placeholder="Enter Your Email"
                        value={email ?? ""}
                        name="psw"
                        onChange={handleChangeEmail}
                        required
                      />
                      <label htmlFor="phone">
                        <strong>Phone Number Optional</strong>
                      </label>
                      <input
                        type="text"
                        autoComplete="off"
                        placeholder="Phone Number Optional"
                        value={phone}
                        name="phone"
                        onChange={handleChangePhone}
                      />
                    </div>
                    <button type="submit" onClick={handleAddFormSubmit}>
                      Claim
                    </button>
                    <div
                      className="container"
                      style={{ backgroundColor: "#eee" }}
                    >
                      <label style={{ paddingLeft: "15px" }}>
                        <input
                          type="checkbox"
                          name="remember"
                          value={agreeGDPR}
                          checked={agreeGDPR}
                          onChange={() => handleChangeCheck()}
                        />{" "}
                        “Agree to <a href="#"> Terms and Conditions </a>”
                      </label>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </>
    </>
  );
}
