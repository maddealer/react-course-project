import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Fab } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { signUp, signingOut } from "../utils/firebase";
import AuthContext from "../AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import Button from "@mui/material/Button";

export default function Dashboard(props) {
  const { user } = useContext(AuthContext);

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
      <ThemeProvider theme={theme}>
        <div
          style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <h3 className={styles.welcome}>
            Hi there! Let's give away some gifts
          </h3>
          <h3 className={styles.welcome}>Also, you can browse the database</h3>
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
      </ThemeProvider>
    </>
  );
}
