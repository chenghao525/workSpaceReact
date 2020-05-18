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
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import StyledAutocomplete from "../../reusable-components/StyledAutocomplete";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";



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