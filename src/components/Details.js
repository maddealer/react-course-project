import React, { useEffect, useState, useContext } from "react";
import { useLocation, Navigate, Link } from "react-router-dom";
import "firebase/compat/auth";
import {
  updateDoc,
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import AuthContext from "../AuthContext";
import style from "./Details.module.css";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Details(props) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState("");
  const [userData, setUserData] = useState("");
  const [id, setId] = useState("");
  const [redirect, setRedirect] = useState(false);
  const usersCollectionRef = collection(db, "users");

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      setId(location.state.claimId);
    } else {
      setRedirect(true);
    }
  }, []);
  useEffect(() => {
    if (id) getData();
  }, [id, user]);
  useEffect(() => {
    getUser();
  }, [data]);

  const getUser = async () => {
    try {
      if (data) {
        const q = query(usersCollectionRef, where("email", "==", data.creator));
        const dataU = await getDocs(q);
        setUserData(dataU.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {
      const q = doc(db, "claims", id);
      // console.log(id);
      const data = await getDoc(q);
      // console.log("here i go again", data.data());
      if (user) {
        setData({
          name: data.data().name,
          createdAt: data.data().createdAt,
          gift: data.data().gift,
          agreeGDPR: data.data().agreeGDPR,
          card: data.data().card,
          congratulated: data.data().congratulated,
          creator: data.data().creator,
          email: data.data().email,
          phone: data.data().phone,
        });
      } else {
        setData({
          createdAt: data.data().createdAt,
          gift: data.data().gift,
          email: data.data().email,
          card: data.data().card,
          creator: data.data().creator,
          agreeGDPR: data.data().agreeGDPR,
          phone: data.data().phone ? true : false,
        });
      }
      //   setData(data.data());
    } catch (err) {
      console.log(err);
    }
  };
  // if (redirect) {
  //   return <Navigate replace to="/" />;
  // }
  return (
    <>
      {location.state ? (
        <>
          {" "}
          {user && data && userData ? (
            // logged in user can see this

            <div
              style={{
                display: "flex",
                height: "50vh",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "100px",
              }}
            >
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    // sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    <>
                      {" "}
                      Player <br />"{data.email}"
                    </>
                  </Typography>
                  <Typography variant="h6" component="div">
                    <> Won {`"${data.gift}"`}</>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    <>
                      {" "}
                      at {new Date(data.createdAt).toLocaleTimeString(
                        "en-US"
                      )}{" "}
                      on {new Date(data.createdAt).toLocaleDateString("en-US")}
                    </>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} variant="h6" component="div">
                    <> Name: {data.name ? data.name : "Still no name"}</>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} variant="h6" component="div">
                    <>
                      {" "}
                      Congratulated:{" "}
                      {data.congratulated === true ? "Yes" : "No"}
                    </>
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} variant="h6" component="div">
                    <> Phone: {data.phone}</>
                  </Typography>
                  <Typography variant="body2">
                    <>
                      {" "}
                      Awarded by
                      <br />
                      {userData[0].name}
                      <br />
                      Department {userData[0].department}
                    </>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to="/data-table"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button size="small">Go back</Button>
                  </Link>
                </CardActions>
              </Card>
            </div>
          ) : data && userData ? (
            // only not logged in user can see this
            <div
              style={{
                display: "flex",
                height: "50vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography
                    // sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    Player <br />"
                    {data.email.split("@")[0].charAt(0).toUpperCase() +
                      data.email.split("@")[0].slice(1)}
                    @*****"
                  </Typography>
                  <Typography variant="h6" component="div">
                    Won {`"${data.gift}"`}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    at {new Date(data.createdAt).toLocaleTimeString("en-US")} on{" "}
                    {new Date(data.createdAt).toLocaleDateString("en-US")}
                  </Typography>
                  <Typography variant="body2">
                    Awarded by
                    <br />
                    {userData[0].name}
                    <br />
                    Department {userData[0].department}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to="/data-table"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Button size="small">Go back</Button>
                  </Link>
                </CardActions>
              </Card>
            </div>
          ) : null}
        </>
      ) : (
        <Link
          to="/data-table"
          style={{
            textDecoration: "none",
          }}
        >
          <Button size="small">Go to data table</Button>
        </Link>
      )}
    </>
  );
}
