import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  doc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import styles from "./Home.module.css";
export default function Home(props) {
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#34c6eb90",
      },
      primary: {
        main: "#239e6290",
      },
    },
  });
  const { user } = useContext(AuthContext);
  const [prizes, setPrizes] = useState([]);

  const claimsCollectionRef = collection(db, "claims");

  useEffect(() => {
    const getClaims = async () => {
      const q = query(
        claimsCollectionRef,
        orderBy("createdAt", "desc"),
        limit(10)
      );
      console.log(q);
      const data = await getDocs(q);
      setPrizes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getClaims();
  }, []);

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
            }}
          >
            <h3 className={styles.welcome}>Welcome to Sunny Beach Casino</h3>
            <h4 className={styles.gwheel}>Gift Wheel</h4>
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
            Check the last 10 prizes won by our players
          </p>

          <ul>
            {prizes.map((prize) => {
              return (
                <li
                  key={prize.createdAt}
                  style={{ color: "#393e40", fontWeight: "bold" }}
                >
                  {prize.email} Won a '{prize.gift.toUpperCase()}' at{" "}
                  {new Date(prize.createdAt).toLocaleTimeString("en-US")}
                </li>
              );
            })}
          </ul>
        </div>
      </ThemeProvider>
    </>
  );
}
