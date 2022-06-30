import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Fab } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { signUp, signingOut } from "../utils/firebase";
import AuthContext from "../AuthContext";
import { useNavigate, Navigate } from "react-router-dom";
import "./Dashboard.css";

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
    return <Navigate replace to="/login" />;
  }
  return (
    <>
      <div className="main">
        <ThemeProvider theme={theme}>
          dash
          <Fab
            variant="extended"
            size="small"
            style={{ bottom: "5px", left: "1px", position: "absolute" }}
            color="secondary"
          >
            <Link
              to="/wheel-list"
              style={{
                display: "flex",
                textDecoration: "none",
                color: "#ffffff",
                fontSize: "10px",
                alignItems: "center",
              }}
              onClick={() => signingOut()}
            >
              <ArrowBackIosIcon sx={{ fontSize: 20 }} />
              go back
            </Link>
          </Fab>
          <Fab
            variant="extended"
            size="small"
            style={{ bottom: "5px", right: "1px", position: "absolute" }}
            color="secondary"
            onClick={() => signingOut()}
          >
            {/* <ArrowBackIosIcon sx={{ fontSize: 20 }} /> */}
            logout
          </Fab>
        </ThemeProvider>
      </div>
    </>
  );
}
