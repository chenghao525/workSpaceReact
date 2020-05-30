import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Button from "@material-ui/core/Button";
import CertificationCardContainer from "./CertificationCardContainer";
import CertificationPopup from "./CertificationPopup";
import DropZone from "./Dropzone"
import ReactDropzone from "react-dropzone";
import {DropzoneArea} from 'material-ui-dropzone'
// import Dropzone from "react-dropzone";
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
  textFieldLabel: {
    fontSize: "1.5rem",
    fontFamily: "inherit",
    transform: "translate(12px, 22px) scale(1)",
    "&$focused": {
      color: "rgba(0,0,0,.6)",
    },
  },
  formButton: {
    height: "36px",
    textTransform: "none",
    fontFamily: "inherit",
    fontSize: "1.6rem",
    padding: 0,
  },
  biggerButton: {
    height: "56px",
    fontSize: "2.5rem",
    marginBottom: "3rem",
  },
  focused: {},
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
  },
  dropZoneContainer:{
    width:'18rem'
  }
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

  const onDrop = files => {
    // POST to a test endpoint for demo purposes
    // const req = request.post("https://httpbin.org/post");

    // files.forEach(file => {
    //   req.attach(file.name, file).then(() => {
    //     console.log("done");
    //   });
    // });

    // req.end();
    console.log("On drop",files);
  };

  const handleFile = files =>{
    console.log("On drop",files);
  }

  return (
    <ThemeProvider theme={theme}>
      <div id="cert-box">
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
            + Add a new License(s)
          </Button>
        </div>
        <CertificationPopup openModal={openModal} closeModal={handleClose} />
      </div>
      {/* <DropZone>
      </DropZone> */}
      <div className={classes.dropZoneContainer}>
      <DropzoneArea
        onChange={handleFile}
        />
      </div>
    </ThemeProvider>
  );
}
