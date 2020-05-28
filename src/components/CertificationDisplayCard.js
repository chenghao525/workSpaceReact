import React, { useState,useRef } from "react";
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
import {DatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import DatePickerModal from "./DatePickerModal"
import Tooltip from '@material-ui/core/Tooltip';
require("../images/calendar.png");

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
  focused: {},
  chipsRoot: {
    fontSize: "1.8125rem",
    backgroundColor: "#CCE0FF",
  },
  autocompleteOptions: {
    fontSize: "1.5rem",
    fontFamily: "inherit",
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  state: {
    fontWeight: "bold",
    fontSize: "2rem",
  },
  pos: {
    marginBottom: 8,
    fontSize: "1.4rem",
    color: "textSecondary",
  },
  editing: {
    border: "2px solid #9AC2FF",
    borderRadius: "5px",
  },
  card: {
    // height:'10rem',
    marginBottom: "2rem",
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
    width: "4rem",
    height: "4rem",
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
    width: "5rem",
    height: "5rem",
    backgroundSize: "100% 100%",
    overflow: "hidden",
  },
  calendaMonth: {
    marginTop: "25%",
    fontSize: "1rem",
    textAlign: "center",
    fontWeight: "bold",
    Width: "100%",
    whiteSpace: "pre-line",
    color: "#5894C3",
  },
  calendaYear: {
    fontSize: "1.2rem",
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

  const handleOpen = (e) => {
    console.log("Button triggered");
    setOpenModal(true);
  };

  const handleClose = () =>{
    console.log("Closing modal");
    setOpenModal(false);
  }

  const handleEdit = ()=>{
    props.editing();
  }

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
            <Button className={classes.pencilBackground} onClick={handleEdit}>
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
              California, USA
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Medical Doctor (MD)
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              #MD-20494586342
            </Typography>
          </div>
          <div className={classes.calendarContainer}>
            <button
              className={classes.calendarImage}
              onClick={handleOpen}
            >
              <Typography
                className={classes.calendaMonth}
                color="textSecondary"
              >
                Jan 9
              </Typography>
              <Typography className={classes.calendaYear} color="textSecondary">
                2022
              </Typography>
            </button>
          </div>
        </div>
      </CardContent>
      </CSSTransition>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    <DatePickerModal openModal={openModal} closeModal={handleClose}/>
    </div>
  );
}

export default CertificationDisplayCard;
