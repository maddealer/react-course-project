import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DetailsIcon from "@mui/icons-material/Details";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

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
  startAfter,
  limitToLast,
  endBefore,
  startAt,
} from "firebase/firestore";
import styles from "./DataTable.module.css";
export default function DataTable(props) {
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
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const claimsCollectionRef = collection(db, "claims");

  useEffect(() => {
    fetchDataFirst();
    return () => {};
  }, []);

  const fetchDataFirst = async () => {
    try {
      const first = query(
        claimsCollectionRef,
        orderBy("createdAt", "desc"),
        limit(5)
      );
      const documentSnapshots = await getDocs(first);
      let items = [];
      documentSnapshots.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      console.log("first item ", items[0]);

      setList(items);
      setPage(1);
      return;
    } catch (err) {
      console.log("error ", err);
    }
  };
  //when update 'congratulated' to stay on the same page
  const fetchSameDataAgain = () => {
    try {
      const fetchSameData = async () => {
        const same = query(
          claimsCollectionRef,
          orderBy("createdAt", "desc"),
          limit(5),
          startAt(list[0].createdAt)
        );
        const documentSnapshots = await getDocs(same);
        let items = [];
        documentSnapshots.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        console.log("next item ", items[0]);

        setList(items);
      };
      fetchSameData();
    } catch (err) {
      console.log(err);
    }
  };

  const showNext = ({ item }) => {
    try {
      console.log("item", item);
      const fetchNextData = async () => {
        const next = query(
          claimsCollectionRef,
          orderBy("createdAt", "desc"),
          limit(5),
          startAfter(item.createdAt)
        );
        const documentSnapshots = await getDocs(next);
        let items = [];
        documentSnapshots.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        console.log("next item ", items[0]);
        if (items.length > 0) {
          setList(items);
          setPage((page) => page + 1);
        }
      };
      fetchNextData();
    } catch (err) {
      console.log(err);
    }
  };
  const showPrevious = ({ item }) => {
    try {
      const fetchPreviousData = async () => {
        const prev = query(
          claimsCollectionRef,
          orderBy("createdAt", "desc"),
          endBefore(item.createdAt),
          limitToLast(5)
        );
        const documentSnapshots = await getDocs(prev);
        let items = [];
        documentSnapshots.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        console.log("next item ", items[0]);

        if (items.length > 0) {
          setList(items);
          setPage((page) => page - 1);
        }
      };
      fetchPreviousData();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteClaim = async (id) => {
    try {
      const claimsDoc = doc(db, "claims", id);
      await deleteDoc(claimsDoc);
      fetchDataFirst();
    } catch (err) {
      console.log(err);
    }
  };
  const updateClaimCongrad = async (id) => {
    try {
      const claimDoc = doc(db, "claims", id);
      const newFields = { congratulated: true };
      await updateDoc(claimDoc, newFields);
      fetchSameDataAgain();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* logged in view */}
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

                {list.length > 0 ? (
                  <tbody>
                    {list.map((el) => (
                      <tr key={el.id}>
                        <td>{el.email}</td>
                        <td>{el.gift}</td>
                        <td>
                          {new Date(el.createdAt).toLocaleTimeString("en-US")}{" "}
                          on{" "}
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
                          <Link
                            to="/details"
                            state={{ claimId: el.id }}
                            style={{ color: "#71b8de" }}
                          >
                            <DetailsIcon />
                          </Link>
                          {el.creator === user.email ? (
                            <>
                              <Link
                                to="/edit-claim"
                                state={{ claimId: el.id }}
                                style={{ color: "#f76c0f" }}
                              >
                                <EditIcon />
                              </Link>
                              <DeleteForeverIcon
                                onClick={() => {
                                  deleteClaim(el.id);
                                }}
                              />
                            </>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : null}
              </table>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              {
                //show previous Button only when we have items
                page === 1 ? (
                  ""
                ) : (
                  <Button
                    style={{
                      position: "inherit",
                      fontWeight: "bold",
                      width: "100px",
                      marginRight: "20px",
                    }}
                    variant="contained"
                    disableRipple
                    color="primary"
                    onClick={() => showPrevious({ item: list[0] })}
                  >
                    Previous
                  </Button>
                )
              }
              {
                //show next Button only when we have items
                list.length < 5 ? (
                  ""
                ) : (
                  <Button
                    style={{
                      position: "inherit",
                      fontWeight: "bold",
                      width: "100px",
                    }}
                    variant="contained"
                    disableRipple
                    color="secondary"
                    onClick={() => showNext({ item: list[list.length - 1] })}
                  >
                    Next
                  </Button>
                )
              }
            </div>
          </>
        ) : (
          // visitor view

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
                    <th>actions</th>
                  </tr>
                </thead>

                {list.length > 0 ? (
                  <tbody>
                    {list.map((el) => (
                      <tr key={el.id}>
                        <td>
                          {el.email.split("@")[0].charAt(0).toUpperCase() +
                            el.email.split("@")[0].slice(1)}
                          @*****
                        </td>
                        <td>{el.gift}</td>
                        <td>
                          {new Date(el.createdAt).toLocaleTimeString("en-US")}{" "}
                          on{" "}
                          {new Date(el.createdAt).toLocaleDateString("en-US")}
                        </td>

                        <td>
                          <Link
                            to="/details"
                            state={{ claimId: el.id }}
                            style={{ color: "#71b8de" }}
                          >
                            <DetailsIcon />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : null}
              </table>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              {
                //show previous Button only when we have items
                page === 1 ? (
                  ""
                ) : (
                  <Button
                    style={{
                      position: "inherit",
                      fontWeight: "bold",
                      width: "100px",
                      marginRight: "20px",
                    }}
                    variant="contained"
                    disableRipple
                    color="primary"
                    onClick={() => showPrevious({ item: list[0] })}
                  >
                    Previous
                  </Button>
                )
              }
              {
                //show next Button only when we have items
                list.length < 5 ? (
                  ""
                ) : (
                  <Button
                    style={{
                      position: "inherit",
                      fontWeight: "bold",
                      width: "100px",
                    }}
                    variant="contained"
                    disableRipple
                    color="secondary"
                    onClick={() => showNext({ item: list[list.length - 1] })}
                  >
                    Next
                  </Button>
                )
              }
            </div>
          </>
        )}
      </ThemeProvider>
    </>
  );
}
