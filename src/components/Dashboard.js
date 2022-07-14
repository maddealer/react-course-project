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
    return <Navigate replace to="/" />;
  }
  return (
    <>
      <div>
        <ThemeProvider theme={theme}>dash</ThemeProvider>
      </div>
    </>
  );
}
