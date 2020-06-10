import React, { useState, useEffect } from "react";
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
    maxWidth:"550px",
    margin:'60px 0',
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
    backgroundColor:"#fff",
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
  // const numOfCardLeft = cards.length - 2;
  const [openModal, setOpenModal] = React.useState(false);
  const [numOfCardNotShown, setNumOfCardNotShown] = React.useState(0);
  const [buttonText, setButtonText] = React.useState(
    "View " + numOfCardNotShown + " more License(s)"
  );
  const [licenseCardList, SetLicenseCardList] = React.useState([{"license":"MD","country":"United States","endDate":"2020-05-28","lastEndDate":null,"licenseNumber":"88765434567","state":"Alaska","licenseId":"157"},{"license":"RN","country":"United States","endDate":"2020-06-03","lastEndDate":null,"licenseNumber":null,"state":"Connecticut","licenseId":"84"},{"license":"MD","country":"United States","endDate":"2020-06-07","lastEndDate":null,"licenseNumber":null,"state":"Alaska","licenseId":"157"},{"license":"MD","country":"United States","endDate":"2020-06-09","lastEndDate":null,"licenseNumber":null,"state":"Alaska","licenseId":"157"},{"license":"DDS","country":"United States","endDate":"2020-06-26","lastEndDate":null,"licenseNumber":null,"state":"Maine","licenseId":"160"}])
  // const[numOfCardShown,setNumOfCardShown] = React.useState(0);
  const [showMore, setShowMore] = React.useState(false);
  const numOfCardShown = showMore ? licenseCardList.length : licenseCardList.length > 2 ? 2 : licenseCardList.length;
  
  useEffect(()=>{
    setNumOfCardNotShown(licenseCardList.length-2);
  },[licenseCardList])

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
      setButtonText("View " + numOfCardNotShown + " more License(s)");
      setShowMore(!showMore);
    }
  };

  useEffect(()=>{
    setButtonText("View " + numOfCardNotShown + " more License(s)");
  },[numOfCardNotShown])

  // useEffect(()=>{
  //   axios({
  //     method: "get",
  //     url: "../MyProfile/GetLicenseList",
  //     data: {},
  //   })
  //     .then((response)=>{
  //       console.log("license cards info: ", response);
  //       SetLicenseCardList(response.lics);
  //       // setNumOfCardShown(response.lics?response.lics.length:0);
  //       setNumOfCardNotShown(response.lics?response.lics.length-2:0);
  //     })
  //     .catch(function (response) {
  //       //handle error
  //       console.log(response);
  //     })
  // },[])

  return (
    <ThemeProvider theme={theme}>
      <div id="cert-box" className={classes.certBox}>
        <div id="cards-container">
          {licenseCardList.slice(0, numOfCardShown).map((licenseDetail) => {
            return <CertificationCardContainer licenseDetail={licenseDetail}/>;
          })}
        </div>

        <div id="bottom-btn-container">
          {numOfCardNotShown > 0 ? (
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
