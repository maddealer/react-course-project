import React, { useEffect, useState, useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import "firebase/compat/auth";
import {
  updateDoc,
  doc,
  getDoc,
  query,
  where,
  collection,
} from "firebase/firestore";
import { db } from "../utils/firebase";
import AuthContext from "../AuthContext";
import style from "./Details.module.css";
export default function Details(props) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState("");
  const [id, setId] = useState("");
  const [redirect, setRedirect] = useState(false);
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
  }, [id]);

  const getData = async () => {
    try {
      const q = doc(db, "claims", id);
      console.log(id);
      const data = await getDoc(q);
      console.log("here i go again", data.data());
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
          agreeGDPR: data.data().agreeGDPR,
          phone: data.data().phone ? true : false,
        });
      }
      //   setData(data.data());
    } catch (err) {
      console.log(err);
    }
  };
  if (redirect) {
    return <Navigate replace to="/" />;
  }
  return (
    <>
      {user ? (
        <p>{data.phone}</p>
      ) : (
        <div
          style={{
            display: "flex",
            height: "50vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div class="card">
            <div class="container">
              <h4>
                <b>John Doe</b>
              </h4>
              <p>Architect & Engineer</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
