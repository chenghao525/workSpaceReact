import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CertificationCardContainer from "./CertificationCardContainer";
import CredentialPopup from "./CredentialPopup";
import "../styles/Certification.css";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9AC2FF",
    },
  },
  typography: {
    htmlFontSize: 10,
  },
});



const useStyles = makeStyles({
  textFieldBase: {
    fontSize: "2rem",
    backgroundColor: "#F5F5F5",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,.04)",
    },
    "&$focused": {
      backgroundColor: "#f3f4f6",
    },
  },

  certBox:{
    margin:'100px 100px',
  },
  arrowRightBase: {
    padding: 0,
    minWidth: "unset",
  },
  arrowRightLabel: {
    overflow: "hidden",
  },
  arrowRightIcon: {
    height: "36px",
    width: "24px",
    transform: "scale(2.8)",
  },
  chipsRoot: {
    fontSize: "1.8125rem",
    backgroundColor: "#CCE0FF",
  },
  autocompleteOptions: {
    fontSize: "1.5rem",
    fontFamily: "inherit",
  },
  roundButton: {
    width: "7rem",
    height: "7rem",
    borderRadius: "50%",
  },
  showMoreBtn: {
    display: "block",
    width: "100%",
    color: "#5894C3",
    // border: '2px solid black',
    marginBottom: "20px",
  },
  addNewBtn: {
    display: "block",
    width: "100%",
    color: "white",
    backgroundColor: "#9AC2FF",
    "&:hover": {
      backgroundColor: "#5894C3",
    },
  },
  dropZoneContainer: {
    width: "18rem",
  },
});

export default function CertificationBox() {
  const classes = useStyles();
  const cards = [0, 1, 2, 3, 4];
  const numOfCardLeft = cards.length - 2;
  const [openModal, setOpenModal] = React.useState(false);
  const [buttonText, setButtonText] = React.useState(
    "View " + numOfCardLeft + " more License(s)"
  );
  const [showMore, setShowMore] = React.useState(false);
  const numberOfCards = showMore ? cards.length : 2;

  const handleOpen = (e) => {
    console.log("Button triggered");
    setOpenModal(true);
  };

  const handleClose = () => {
    console.log("Closing modal");
    setOpenModal(false);
  };

  const handleShowMore = () => {
    if (!showMore) {
      setButtonText("View less");
      setShowMore(!showMore);
    } else {
      setButtonText("View " + numOfCardLeft + " more License(s)");
      setShowMore(!showMore);
    }
  };

  useEffect(()=>{
    axios({
      method: "get",
      url: "http://localhost:8080/addCE-web-1.0/MyProfile",
      data: {},
    })
      .then((response)=>{
        console.log("res: ", response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      })
  },[])

  return (
    <ThemeProvider theme={theme}>
      <div id="cert-box" className={classes.certBox}>
        <div id="title-container">
          <h1>Licenses & Certifications</h1>
          <h4>Track all of your credentials and know your compliance.</h4>
        </div>
        <div id="cards-container">
          {cards.slice(0, numberOfCards).map((item) => {
            return <CertificationCardContainer />;
          })}
        </div>

        <div id="bottom-btn-container">
          {numOfCardLeft > 0 ? (
            <Button className={classes.showMoreBtn} onClick={handleShowMore}>
              {buttonText}
            </Button>
          ) : (
            ""
          )}

          <Button className={classes.addNewBtn} onClick={handleOpen}>
            + ADD NEW CREDENTIAL(S)
          </Button>
        </div>
        <CredentialPopup openModal={openModal} closeModal={handleClose} />
      </div>
    </ThemeProvider>
  );
}
