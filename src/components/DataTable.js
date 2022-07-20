import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { db } from "../utils/firebase";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
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
    return () => {};
  }, [user]);

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

  const deleteClaim = async (id) => {
    try {
      const claimsDoc = doc(db, "claims", id);
      await deleteDoc(claimsDoc);
      getAllGifts();
    } catch (err) {
      console.log(err);
    }
  };
  const updateClaimCongrad = async (id) => {
    const claimDoc = doc(db, "claims", id);
    const newFields = { congratulated: true };
    await updateDoc(claimDoc, newFields);
    getAllGifts();
  };
  // if (!user) {
  //   return <Navigate replace to="/dashboard" />;
  // }
  return (
    <>
      {user ? (
        <>
          {" "}
          <h2>Players DataBase</h2>
          <div className={styles["table-wrapper"]}>
            <table className={styles["fl-table"]}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Gift</th>
                  <th>Created At</th>
                  <th>Congratulated</th>
                  <th>Player Name</th>
                  <th>actions</th>
                </tr>
              </thead>

              {data.length > 0 ? (
                <tbody>
                  {data.map((el) => (
                    <tr key={el.id}>
                      <td>{el.email}</td>
                      <td>{el.gift}</td>
                      <td>
                        {new Date(el.createdAt).toLocaleTimeString("en-US")} on{" "}
                        {new Date(el.createdAt).toLocaleDateString("en-US")}
                      </td>
                      <td>
                        {el.congratulated !== true ? (
                          <input
                            type="checkbox"
                            onClick={() => {
                              updateClaimCongrad(el.id);
                            }}
                          ></input>
                        ) : (
                          <span style={{ color: "green" }}>
                            <DoneIcon />
                          </span>
                        )}
                      </td>
                      <td>{el.name}</td>
                      <td>
                        {el.creator === user.email ? (
                          <>
                            <DeleteForeverIcon
                              onClick={() => {
                                deleteClaim(el.id);
                              }}
                            />
                            <Link
                              to="/edit-claim"
                              state={{ claimId: el.id }}
                              style={{ color: "#f76c0f" }}
                            >
                              <EditIcon />
                            </Link>
                          </>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : null}
            </table>
          </div>
        </>
      ) : (
        <Link to="/login">Login first please</Link>
      )}
    </>
  );
}
