import React, { useState, useRef, useEffect } from "react";
import {
  makeStyles,
  createMuiTheme,
  MuiThemeProvider,
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import { message } from "antd";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../styles/Certification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import calendarImage from "../images/calendar.png";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DatePickerModal from "./DatePickerModal";
import RenewalPopup from "./RenewalPopup";
import Tooltip from "@material-ui/core/Tooltip";
import { monthArray } from "../data/Selections";
const moment = require("moment");

const useStyles = makeStyles({
  autocompleteOptions: {
    fontSize: "1.5rem",
    fontFamily: "inherit",
  },
  root: {
    minWidth: 275,
  },
  state: {
    fontWeight: "bold",
    fontSize: "2.5rem",
  },
  pos: {
    marginBottom: 8,
    fontSize: "2rem",
    color: "textSecondary",
  },
  editing: {
    border: "2px solid #9AC2FF",
    borderRadius: "5px",
  },
  card: {
    borderRadius: "10px",
    maxWidth: "550px",
    marginBottom: "4rem",
  },
  cardContentContainer: {
    display: "flex",
    // justifyContent:'center',
    // alignContent:'center',
    height: "10rem",
    alignItems: "center",
  },
  pencilContainer: {
    flex: 1,
    textAlign: "center",
  },
  pencilBackground: {
    background: "#F2F7FF",
    minWidth: "6rem",
    height: "6rem",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "5rem",
    padding: "3px",
    // alignSelf: 'center'
  },
  pencil: {
    // width: '50%',
    // height: '50%',
  },
  textFieldContainer: {
    flex: 2,
    textAlign: "center",
  },
  calendarContainer: {
    textAlign: "center",
    flex: 1,
  },
  calendarImage: {
    backgroundImage: `url(${calendarImage})`,
    margin: "auto",
    width: "6rem",
    height: "6rem",
    backgroundSize: "100% 100%",
    overflow: "hidden",
  },
  calendarMonth: {
    marginTop: "25%",
    fontSize: "1.3rem",
    textAlign: "center",
    fontWeight: "bold",
    Width: "100%",
    whiteSpace: "pre-line",
    color: "#5894C3",
  },
  calendarYear: {
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: "bold",
    Width: "100%",
    whiteSpace: "pre-line",
    color: "#5894C3",
  },
  renewBtn: {
    fontSize: "12px",
    textTransform: "none",
    lineHeight: "1.43",
    letterSpacing: "0.01071em",
  },
});

const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      label: {
        display: "block",
      },
      text:{
          padding:"0px 8px"
      }
    },
  },
});

function CertificationRenewedCard(props) {
  const classes = useStyles();
  const dialogRef = useRef(null);
  const [openRenewalModal, setOpenRenewalModal] = React.useState(false);
  const [openDateModal, setOpenDateModal] = React.useState(false);
  const [year, setYear] = useState("");
  const [monthDay, setMonthDay] = useState("");
  const [currentMonthDay, setCurrentMonthDay] = useState("");
  const [currentYear, setCurrentYear] = useState("");
  const [licenseCountry, setLicenseCountry] = useState("");
  const [renewing, setRenewing] = useState(false);
  const cardDetail = props.licenseDetail;
  const displayCountry =
    cardDetail.country === "United States" ? "USA" : cardDetail.country;

  useEffect(() => {
    // initRender();
    getDate();
  }, []);

  useEffect(() => {
    // initRender();
    getDate();
  }, [props.licenseDetail]);

  const initRender = () => {
    if (cardDetail.country === "United States") {
      setLicenseCountry("USA");
    } else {
      setLicenseCountry(cardDetail.country);
    }
    getDate();
  };

  const getDate = () => {
    if (cardDetail.endDate) {
      let dateArray = cardDetail.endDate.split("-");
      setYear(dateArray[0]);
      let month = monthArray[parseInt(dateArray[1], 10)];
      month = month === "May" ? "May" : month + ".";
      let day = dateArray[2];

      setMonthDay(month + " " + day);
    } else {
      setYear("Unset");
      setMonthDay("Unset");
    }

    if (cardDetail.previousEndDate) {
      let dateArray = cardDetail.previousEndDate.split("-");
      setCurrentYear(dateArray[0]);
      let month = monthArray[parseInt(dateArray[1], 10)];
      month = month === "May" ? "May" : month + ".";
      let day = dateArray[2];

      setCurrentMonthDay(month + " " + day);
    }
  };

  const handleRenewalOpen = (e) => {
    console.log("Button triggered");
    setOpenRenewalModal(true);
  };

  const handleOpenDateModal = (renewing) => {
    setRenewing(renewing);
    setOpenRenewalModal(false);
    setOpenDateModal(true);
  };

  const handleRenewalClose = () => {
    console.log("Closing modal");
    setOpenRenewalModal(false);
  };

  const handleDateClose = () => {
    setOpenDateModal(false);
  };

  const handleEdit = () => {
    props.editing();
  };

  const handleDateSubmit = (date) => {
    if (renewing) {
      renewLicense(date);
    } else {
      editCurrentDate(date);
    }
  };

  const handleRenewDateChange = () => {
    setOpenDateModal(true);
  };

  const renewLicense = (date) => {
    const tmpEndDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

    let params = {
      endDate: tmpEndDate,
      license: cardDetail.license,
      state: cardDetail.state,
      country: cardDetail.country,
      originalIssueDate: cardDetail.originalIssueDate,
      licenseNumber: cardDetail.licenseNumber,
    };

    axios({
      method: "post",
      url: "../MyProfile/AddNewLicense",
      data: params,
    })
      .then((response) => {
        // if(response.data.code===1){
        message.success("New License add successfully");
        props.refreshList();
        // }
      })
      .catch(function (response) {
        message.error("Unable to add license now. Please try again later");
        //handle error
        console.log(response);
      });
  };

  const editCurrentDate = (date) => {
    const tmpEndDate = moment(date).format("YYYY-MM-DD HH:mm:ss");
    // const tmpOrignialIssueDate = moment(date).format('YYYY-MM-DD HH:mm:ss');

    let params = {
      id: cardDetail.id,
      endDate: tmpEndDate,
      license: cardDetail.license,
      state: cardDetail.state,
      country: cardDetail.country,
      originalIssueDate: cardDetail.originalIssueDate,
      licenseNumber: cardDetail.licenseNumber,
      firstRenewal: cardDetail.firstRenewal,
    };

    axios({
      method: "post",
      url: "../MyProfile/EditLicense",
      data: params,
    })
      .then((response) => {
        // if(response.data.code===1){
        message.success("License expiration date changed");
        props.refreshList();
        console.log(response);
        // }
      })
      .catch(function (response) {
        message.success(
          "Unable to change the expiration date now, please try again later"
        );
        //handle error
        console.log(response);
      });
  };

  const locationDataChanged = (data) => {
    console.log("location", data);
  };

  const setDatePickerDialogReference = (ref) => {
    // React passes undefined/null if the reference has been unmounted.
    // datePickerDialog = ref;
  };

  return (
    <>
      <Card className={classes.card}>
        <CSSTransition
          in={props.editingDone}
          appear={true}
          timeout={800}
          classNames="slideIn"
        >
          <CardContent>
            <div className={classes.cardContentContainer}>
              <Tooltip
                title="Edittttt"
                placement="bottom"
                arrow
                PopperProps={{ disablePortal: true }}
              >
                <div className={classes.pencilContainer}>
                  <Button
                    className={classes.pencilBackground}
                    onClick={handleEdit}
                  >
                    <FontAwesomeIcon
                      icon={faPencilAlt}
                      style={{ color: "#9AC2FF" }}
                      size="lg"
                    />
                  </Button>
                </div>
              </Tooltip>
              <div className={classes.textFieldContainer}>
                <Typography className={classes.state} color="textPrimary">
                  {cardDetail.state + ", " + displayCountry}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {cardDetail.license}
                </Typography>
              </div>
              <div className={classes.calendarContainer}></div>
            </div>
            <MuiThemeProvider theme={theme}>
            <div class="bar-container">
              <ul class="progressbar">
                <li>
                  Current Cycle Ends:
                  <br />
                  <p style={{ fontSize: "18px", fontWeight:"500"}}>
                  {currentMonthDay}, {currentYear}
                  </p>
                </li>
                <li class="active">
                  <Button
                    className={classes.renewBtn}
                    onClick={handleRenewDateChange}
                  >
                    Renewed To: <br />
                    <p style={{ fontSize: "18px", fontWeight:"500"}}>
                    {monthDay}, {year}
                    </p>
                  </Button>
                </li>
              </ul>
            </div>
            </MuiThemeProvider>
          </CardContent>
        </CSSTransition>
      </Card>
      <DatePickerModal
        openModal={openDateModal}
        closeModal={handleDateClose}
        onSubmit={handleDateSubmit}
      />
      <RenewalPopup
        openModal={openRenewalModal}
        closeModal={handleRenewalClose}
        openDateModal={handleOpenDateModal}
      />
    </>
  );
}

export default CertificationRenewedCard;
