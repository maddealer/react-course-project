import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { db } from "../utils/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import styles from "./DataTable.module.css";

export default function DataTable(props) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const claimsCollectionRef = collection(db, "claims");

  useEffect(() => {
    getAllGifts();
  }, []);

  const getAllGifts = async () => {
    try {
      const q = query(
        claimsCollectionRef,
        orderBy("createdAt", "desc")
        // limit(10)
      );
      const data = await getDocs(q);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) {
    return <Navigate replace to="/" />;
  }
  return (
    <>
      <h2>Players DataBase</h2>
      <div class={styles["table-wrapper"]}>
        <table class={styles["fl-table"]}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Gift</th>
              <th>Created At</th>
              <th>Congratulated</th>
              <th>Name</th>
              <th>actions</th>
            </tr>
          </thead>

          {data.length > 0 ? (
            <tbody>
              {" "}
              {data.map((el) => (
                <tr
                  style={{
                    backgroundColor:
                      el.creator === user.email ? "#ccc" : "#cca",
                  }}
                >
                  <td>{el.email}</td>
                  <td>{el.gift}</td>
                  <td>
                    {" "}
                    {new Date(el.createdAt).toLocaleTimeString("en-US")} on{" "}
                    {new Date(el.createdAt).toLocaleDateString("en-US")}
                  </td>
                  <td>
                    {el.congratulated === "" ? (
                      <input type="checkbox"></input>
                    ) : (
                      "congratulated"
                    )}
                  </td>
                  <td>{el.name}</td>
                  <td>button</td>{" "}
                </tr>
              ))}
            </tbody>
          ) : null}

          {/* <tr>
              <td>Content 10</td>
              <td>Content 10</td>
              <td>Content 10</td>
              <td>Content 10</td>
              <td>Content 10</td>
              <td>Content 10</td>
            </tr> */}
        </table>
      </div>
    </>
  );
}
