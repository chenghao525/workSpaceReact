import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../styles/Certification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import calendarImage from "../images/calendar.png";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import DatePickerModal from "./DatePickerModal";
import Tooltip from "@material-ui/core/Tooltip";
import { monthArray } from "../data/Selections";

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
    height: "14rem",
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
  calendaMonth: {
    marginTop: "25%",
    fontSize: "1.3rem",
    textAlign: "center",
    fontWeight: "bold",
    Width: "100%",
    whiteSpace: "pre-line",
    color: "#5894C3",
  },
  calendaYear: {
    fontSize: "1.5rem",
    textAlign: "center",
    fontWeight: "bold",
    Width: "100%",
    whiteSpace: "pre-line",
    color: "#5894C3",
  },
});

function CertificationDisplayCard(props) {
  const classes = useStyles();
  const dialogRef = useRef(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [date, changeDate] = useState(new Date());
  const [year, setYear] = useState("");
  const [monthDay, setMonthDay] = useState("");
  const [licenseCountry, setLicenseCountry] = useState("");
  const cardDetail = props.licenseDetail;
  // let licenseCountry = cardDetail.country;

  useEffect(() => {
    initRender();
  }, []);

  const initRender = () => {
    if (cardDetail.country === "United States") {
      setLicenseCountry("USA");
    } else {
      setLicenseCountry(cardDetail.country);
    }
    getDate();
  };

  const getDate = () => {
    let dateArray = cardDetail.endDate.split("-");
    setYear(dateArray[0]);
    let month = monthArray[parseInt(dateArray[1], 10)];
    let day = dateArray[2];

    setMonthDay(month + " " + day);
  };

  const handleOpen = (e) => {
    console.log("Button triggered");
    setOpenModal(true);
  };

  const handleClose = () => {
    console.log("Closing modal");
    setOpenModal(false);
  };

  const handleEdit = () => {
    props.editing();
  };

  const locationDataChanged = (data) => {
    console.log("location", data);
  };

  const setDatePickerDialogReference = (ref) => {
    // React passes undefined/null if the reference has been unmounted.
    // datePickerDialog = ref;
  };

  return (
    <div>
      <Card className={classes.card}>
        <CSSTransition
          in={props.editingDone}
          appear={true}
          timeout={800}
          classNames="slideIn"
        >
          <CardContent>
            <div className={classes.cardContentContainer}>
              <div className={classes.pencilContainer}>
                <Tooltip title="Edit" arrow>
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
                </Tooltip>
              </div>
              <div className={classes.textFieldContainer}>
                <Typography className={classes.state} color="textPrimary">
                  {cardDetail.state + ", " + licenseCountry}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {cardDetail.license}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  {"#" + cardDetail.licenseNumber}
                </Typography>
              </div>
              <div className={classes.calendarContainer}>
                <button className={classes.calendarImage} onClick={handleOpen}>
                  <Typography
                    className={classes.calendaMonth}
                    color="textSecondary"
                  >
                    {monthDay}
                  </Typography>
                  <Typography
                    className={classes.calendaYear}
                    color="textSecondary"
                  >
                    {year}
                  </Typography>
                </button>
              </div>
            </div>
          </CardContent>
        </CSSTransition>
      </Card>
      <DatePickerModal openModal={openModal} closeModal={handleClose} />
    </div>
  );
}

export default CertificationDisplayCard;
