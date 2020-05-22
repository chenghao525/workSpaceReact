import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CertificationDisplayCard from "./CertificationDisplayCard";
import CertificationEditCard from "./CertificationEditCard";
import CertificationPopup from "./CertificationPopup";

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
});

export default function CertificationBox() {
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpen = (e) => {
    console.log("Button triggered");
    setOpenModal(true);
  };

  const handleClose = () =>{
    console.log("Closing modal");
    setOpenModal(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <div id="cert-box">
        <div id="title-container">
          <h1>Licenses & Certifications</h1>
          <h4>Track all of your credentials and know your compliance.</h4>
        </div>
        <div id="cards-container">
          <CertificationDisplayCard />
          <CertificationEditCard />
        </div>
        <div id="add-btn-container">
          <Button onClick={handleOpen}>+ Add a new License(s)</Button>
        </div>
        <CertificationPopup openModal={openModal} closeModal={handleClose}/>
      </div>
    </ThemeProvider>
  );
}
