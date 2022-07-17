import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { db } from "../utils/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import styles from "./Home.module.css";
export default function Home(props) {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#FAE4EA95",
      },
      primary: {
        main: "#5392A095",
      },
      error: {
        main: "#FAAA8C95",
      },
    },
  });
  const { user } = useContext(AuthContext);
  const [prizes, setPrizes] = useState([]);
  const [toggleWinners, setToggleWinners] = useState(false);
  const claimsCollectionRef = collection(db, "claims");

  useEffect(() => {
    getClaims();
  }, []);
  const getClaims = async () => {
    try {
      const q = query(
        claimsCollectionRef,
        orderBy("createdAt", "desc"),
        limit(10)
      );
      console.log(q);
      const data = await getDocs(q);
      setPrizes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
  };
  const handleToggle = () => {
    setToggleWinners((state) => !state);
  };

  if (user) {
    return <Navigate replace to="/dashboard" />;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={styles.home}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              height: "70vh",
              marginTop: "50px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <h3 className={styles.welcome}>Welcome to Sunny Beach Casino</h3>
              <h4 className={styles.gwheel}>GIFT WHEEL</h4>
            </div>
            <br />
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                width: "200px",
              }}
            >
              <Button
                style={{ position: "inherit", fontWeight: "bold" }}
                variant="contained"
                fullWidth={true}
                color="primary"
              >
                Login
              </Button>
            </Link>
            <br />
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                width: "200px",
                marginBottom: "50px",
              }}
            >
              <Button
                style={{ position: "inherit", fontWeight: "bold" }}
                variant="contained"
                fullWidth={true}
                color="secondary"
              >
                Register
              </Button>
            </Link>
            <p
              style={{
                marginBottom: "50px",
                fontSize: "1.5em",
                fontWeight: "bold",
                color: "#113340",
                textAlign: "center",
              }}
            >
              Check the last 10 prizes won by Players in our Casino
            </p>
          </div>
          <Link
            to="#"
            style={{
              textDecoration: "none",
              width: "200px",
              marginBottom: "50px",
            }}
            onClick={handleToggle}
          >
            <Button
              style={{ position: "inherit", fontWeight: "bold" }}
              variant="contained"
              fullWidth={true}
              color="error"
            >
              Winners
            </Button>
          </Link>
          {!toggleWinners ? null : (
            <ul>
              {prizes.map((prize) => {
                return (
                  <li
                    key={prize.createdAt}
                    style={{ color: "#393e40", fontWeight: "bold" }}
                  >
                    {prize.email.split("@")[0].charAt(0).toUpperCase() +
                      prize.email.split("@")[0].slice(1)}{" "}
                    Won a '{prize.gift.toUpperCase()}' at{" "}
                    {new Date(prize.createdAt).toLocaleTimeString("en-US")} on{" "}
                    {new Date(prize.createdAt).toLocaleDateString("en-US")}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </ThemeProvider>
    </>
  );
}
