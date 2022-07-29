import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import { db } from "../utils/firebase";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  limitToLast,
  endBefore,
} from "firebase/firestore";
import styles from "./DataTable.module.css";
export default function UsersList(props) {
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
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    fetchDataFirst();
    return () => {};
  }, []);

  const fetchDataFirst = async () => {
    try {
      const first = query(usersCollectionRef, orderBy("name", "asc"), limit(5));
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

  const showNext = ({ item }) => {
    try {
      console.log("item", item);
      const fetchNextData = async () => {
        const next = query(
          usersCollectionRef,
          orderBy("name", "asc"),
          limit(5),
          startAfter(item.name)
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
          usersCollectionRef,
          orderBy("name", "asc"),
          endBefore(item.name),
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

  return (
    <>
      <ThemeProvider theme={theme}>
        {user ? (
          <>
            {" "}
            <h2>Users List</h2>
            <div className={styles["table-wrapper"]}>
              <table className={styles["fl-table"]}>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Department</th>
                  </tr>
                </thead>

                {list.length > 0 ? (
                  <tbody>
                    {list.map((el) => (
                      <tr key={el.id}>
                        <td>{el.email}</td>
                        <td>{el.name}</td>

                        <td>{el.department}</td>
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
        ) : null}
      </ThemeProvider>
    </>
  );
}
