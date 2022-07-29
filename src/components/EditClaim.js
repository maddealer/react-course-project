import React, { useEffect, useState, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import "firebase/compat/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import styles from "./Login.module.css";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { db } from "../utils/firebase";
import AuthContext from "../AuthContext";

export default function EditClaim(props) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (user && location.state) {
      setId(location.state.claimId);
      return;
    }
  }, []);
  useEffect(() => {
    if (id) getName();
  }, [id]);
  const getName = async () => {
    try {
      const q = doc(db, "claims", id);
      const data = await getDoc(q);
      if (data.error) setError(data.error);
      setName(data.data().name);
    } catch (err) {
      console.log(err);
    }
  };
  const updateClaim = async (id, name) => {
    try {
      const claimDoc = doc(db, "claims", id);
      const newFields = { name: name };
      await updateDoc(claimDoc, newFields);
      setRedirect(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleAddFormSubmit = async (e) => {
    e.preventDefault();
    if (user && name) {
      try {
        updateClaim(id, name);
      } catch (err) {
        setError(err);
        console.log(err);
      }
    } else {
      alert(`Fill name please.`);
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
                  <h5 style={{ fontSize: "1.5em" }}>
                    Add or Edit Player's Name
                  </h5>
                </div>
                <div className={styles["input-container ic1"]}>
                  <label htmlFor="card" className={styles["placeholder"]}>
                    Name
                  </label>
                  <input
                    id="name"
                    value={name ?? ""}
                    autoComplete="off"
                    placeholder="Players Name"
                    maxLength="50"
                    className={styles.input}
                    type="text"
                    onChange={handleChangeName}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className={styles["submit"]}
                  onClick={handleAddFormSubmit}
                >
                  Add Name
                </button>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </>
    </>
  );
}
