import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Fab } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import AuthContext from "../AuthContext";
import { Navigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Button from "@mui/material/Button";
import { db } from "../utils/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function Dashboard(props) {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(true);
  const usersCollectionRef = collection(db, "users");

  const getUser = async () => {
    try {
      if (user) {
        const q = query(usersCollectionRef, where("email", "==", user.email));
        const data = await getDocs(q);
        setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const theme = createTheme({
    palette: {
      secondary: {
        main: "#00000099",
      },
    },
  });

  return (
    <>
      {user ? (
        <ThemeProvider theme={theme}>
          <>
            {userData ? (
              <>
                <h3 className={styles.welcome}>
                  Hi {userData[0].name}! Let's give away nice gifts
                </h3>
                <p className={styles.parag}>
                  {userData[0].department} Department will collect some data now
                  :)
                </p>
                <h3 className={styles.welcome}>
                  Also, you can browse the database
                </h3>

                <div
                  style={{
                    display: "flex",
                    height: "100vh",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "50px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginTop: "50px",
                    }}
                  >
                    <Link
                      to="/gift-wheel"
                      className="claimBlink"
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <Button
                        style={{
                          fontSize: "1.2em",
                          color: "#fff",
                        }}
                        className="claimBlink"
                        variant="contained"
                        fullWidth={true}
                        color="primary"
                      >
                        gift wheel
                      </Button>
                    </Link>
                    <Link
                      to="/data-table"
                      className="claimBlink"
                      style={{
                        marginBottom: "20px",
                      }}
                    >
                      <Button
                        style={{
                          fontSize: "1.2em",
                          color: "#fff",
                        }}
                        className="claimBlink"
                        variant="contained"
                        fullWidth={true}
                        color="primary"
                      >
                        data table
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            ) : null}
          </>
        </ThemeProvider>
      ) : (
        <p>loading</p>
      )}
    </>
  );
}
