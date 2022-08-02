import React, { useState, useEffect, useContext } from "react";
import url from "../sounds/BonusWheelMusic.mp3";
import url1 from "../sounds/WheelSound.mp3";
import url2 from "../sounds/win.mp3";
import "firebase/compat/auth";
import "./GiftWheel.css";
import { Wheel } from "react-custom-roulette";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

const data = [
  { id: 0, option: "Coctail" },
  { id: 1, option: "Packet of Cigarettes" },
  { id: 2, option: "Free Transfer" },
  { id: 3, option: "Deck of Cards" },
  { id: 4, option: "Champagne" },

  { id: 5, option: "Coctail" },
  { id: 6, option: "Free Massage" },
  { id: 7, option: "Packet of Cigarettes" },
  { id: 8, option: "Deck of Cards" },
  { id: 9, option: "Champagne" },

  { id: 10, option: "Coctail" },
  { id: 11, option: "Free Transfer" },
  { id: 12, option: "Champagne" },
  { id: 13, option: "Deck of Cards" },

  { id: 14, option: "Coctail" },
  { id: 15, option: `VIP Dinner` },
  { id: 16, option: "Packet of Cigarettes" },
  { id: 17, option: "Deck of Cards" },

  { id: 18, option: "Coctail" },
  { id: 19, option: "Free Massage" },
  { id: 20, option: "Free Transfer" },
  { id: 21, option: "Deck of Cards" },

  { id: 22, option: "Coctail" },
  { id: 23, option: `VIP Dinner` },
  { id: 24, option: `Free Room` },
  { id: 25, option: "Deck of Cards" },

  { id: 26, option: "Champagne" },
];

function Wheel1() {
  const theme = createTheme({
    palette: {},
  });
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const audio = new Audio(url);
  const audioW = new Audio(url1);
  const audioWin = new Audio(url2);
  const [start, setStart] = useState(false);
  const [done, setDone] = useState(false);

  const handleSpinClick = () => {
    audio.play();
    audioW.play();
    let newPrizeNumber = Math.floor(Math.random() * data.length);
    console.log("real", newPrizeNumber);

    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
    setStart(true);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div
          align="center"
          style={{
            background: "#000",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <h1
            align="center"
            style={{
              fontWeight: "bold",
              marginTop: "0",
              color: "#fff",
              fontSize: "1.6em",
            }}
          >
            'Canto Bight' Gift Wheel
          </h1>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={data}
            outerBorderColor={["#d6d6d6"]}
            outerBorderWidth={[5]}
            innerBorderColor={["#969696"]}
            radiusLineColor={["#969696"]}
            radiusLineWidth={[1]}
            textColors={["#ffffff"]}
            fontSize={[15]}
            perpendicularText={false}
            backgroundColors={[
              "#ad4b98",
              "#EF9F9F",
              "#35858B",
              "#646FD4",
              "#ECB365",

              "#ad4b98",
              "#4FBDBA",
              "#EF9F9F",
              "#646FD4",
              "#ECB365",

              "#ad4b98",
              "#35858B",
              "#ECB365",
              "#646FD4",

              "#ad4b98",
              "#9145B7",
              "#EF9F9F",
              "#646FD4",

              "#ad4b98",
              "#4FBDBA",
              "#35858B",
              "#646FD4",

              "#ad4b98",
              "#9145B7",
              "#072227",
              "#646FD4",

              "#ECB365",
            ]}
            onStopSpinning={() => {
              setMustSpin(false);
              setDone(true);
              audio.pause();
              audioW.pause();
              audioWin.play();
            }}
          />
          {start ? null : (
            <Button
              style={{
                position: "inherit",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                fontSize: "2em",
                color: "#fff",
                boxShadow: "2px 2px 3px #000",
              }}
              className="spinner"
              variant="contained"
              fullWidth={true}
              color="secondary"
              onClick={handleSpinClick}
            >
              spin
            </Button>
          )}

          <br />
          {done ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "100%",
                position: "absolute",
                bottom: "0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  width: "100%",
                  top: "0",
                  background: "#5c5c5c",
                  color: "#fff",
                }}
              >
                <h1
                  style={{
                    marginTop: "15px",
                    fontSize: "1em",
                  }}
                >
                  Congratulations YOU WON <br /> "{data[prizeNumber].option}"
                </h1>
                <Link
                  to="/claim"
                  state={{ gift: data[prizeNumber].option }}
                  className="claimBlink"
                >
                  <Button
                    style={{
                      fontSize: "0.8em",
                      color: "#fff",
                    }}
                    className="claimBlink"
                    variant="contained"
                    fullWidth={true}
                    color="primary"
                  >
                    claim your gift
                  </Button>
                </Link>
              </div>
            </div>
          ) : null}

          <div className="light x1"></div>
          <div className="light x2"></div>
          <div className="light x3"></div>
          <div className="light x4"></div>
          <div className="light x5"></div>
          <div className="light x6"></div>
          <div className="light x7"></div>
          <div className="light x8"></div>
          <div className="light x9"></div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default Wheel1;
