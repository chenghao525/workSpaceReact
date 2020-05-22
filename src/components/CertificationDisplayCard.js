import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditableLabel from "react-inline-editing";
import InlineEdit from "react-edit-inline2";
import "../styles/Certification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import calendarImage from "../images/calendar.png";
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
  title: {
    fontSize: "1.5rem",
  },
  pos: {
    marginBottom: 8,
    fontSize: "1.5rem",
    color: "textSecondary",
  },
  editing: {
    border: "2px solid #9AC2FF",
    borderRadius: "5px",
  },
  cardContentContainer: {
    display: "flex",
    // justifyContent:'center',
    // alignContent:'center',
    alignItems: "center",
  },
  pencilContainer:{
    flex: 1,
    textAlign:"center",
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
  },
  calendarContainer: {
    textAlign:"center",
    flex:1,
  },
  calendarImage: {
    backgroundImage: `url(${calendarImage})`,
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

  const locationDataChanged = (data) => {
    console.log("location", data);
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.cardContentContainer}>
          <div className={classes.pencilContainer}>
            <Button className={classes.pencilBackground}>
              <FontAwesomeIcon
                icon={faPencilAlt}
                style={{ color: "#9AC2FF" }}
                size="lg"
              />
            </Button>
          </div>
          <div className={classes.textFieldContainer}>
            <Typography className={classes.pos} color="textSecondary">
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
            <div className={classes.calendarImage}>
              <Typography
                className={classes.calendaMonth}
                color="textSecondary"
              >
                Jan 9
              </Typography>
              <Typography className={classes.calendaYear} color="textSecondary">
                2022
              </Typography>
            </div>
          </div>
        </div>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default CertificationDisplayCard;
