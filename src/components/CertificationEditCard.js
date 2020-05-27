import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import "../styles/Certification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import calendarImage from "../images/calendar.png";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import "../styles/Certification.css";
import { DatePicker, MuiPickersUtilsProvider,KeyboardDatePicker, } from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
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
    // height:'15rem',
    marginBottom: "2rem",
  },
  cardContentContainer: {
    display: "flex",
    // justifyContent:'center',
    // alignContent:'center',
    minHeight: "10rem",
    alignItems: "center",
  },
  pencilContainer: {
    flex: 1,
    textAlign: "center",
  },
  pencilBackground: {
    background: "#CCE0FF",
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
  stateContainer: {
    display: "flex",
    // height:'4rem'
  },
  otherStateBtn: {
    fontSize: "0.8rem",
    color: "#5894C3",
    marginBottom: "10px",
  },
  stateAutoCom: {
    flex: 3,
  },
  textFieldContainer: {
    textAlign: "center",
    flex: 2,
  },
  calendarContainer: {
    flex: 1,
    textAlign: "center",
  },
  calendarImage: {
    margin: "auto",
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
  editMoreButton: {
    display: "flex",
    margin: "6px 0",
    width: "100%",
    fontSize: "0.5rem",
    color: "#5894C3",
    backgroundColor: "#F2F2F2",
    height: "1.5rem",
  },
});

const defaultMaterialTheme = createMuiTheme({
  // spacing: 2,
});

function CertificationEditCard(props) {
  const classes = useStyles();
  const [licenseNum, setLicenseNum] = useState("#MD-20494586342");
  const [licenseType, setLicenseType] = useState("Medical Doctor(MD)");
  const [otherState, setOtherState] = useState(false);
  const [editMore, setEditMore] = useState(false);
  const [date, changeDate] = useState(new Date());



  const stateDataChanged = (data) => {
    console.log("location", data);
  };

  const licenseNumChange = (e) => {
    setLicenseNum(e.target.value);
  };

  const licenseTypeChange = (e) => {
    setLicenseType(e.target.value);
  };

  const handleConfirm = (e) => {
    props.confirm();
  };

  //"title" need to change
  const getSelectedLicenseType = () => {
    const item = top100Films.find((opt) => {
      console.log("Compare,", opt.title);
      if (opt.title === licenseType) return opt;
    });
    return item || {};
  };

  return (
    <Card className={classes.card}>
      <CSSTransition in={true} appear={true} timeout={300} classNames="slide">
        <CardContent>
          <div className={classes.cardContentContainer}>
            <div className={classes.textFieldContainer}>
              {otherState ? (
                <Autocomplete
                  id="combo-box-demo"
                  options={top100Films}
                  getOptionLabel={(option) => option.title}
                  style={{ width: "100%", marginBottom: "20px" }}
                  className={classes.stateAutoCom}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Type any issue body..."
                      // inputProps={{
                      //   style: { fontSize: "1rem" },
                      // }}
                    />
                  )}
                />
              ) : (
                <div className={classes.stateContainer}>
                  <Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%", marginBottom: "8px" }}
                    className={classes.stateAutoCom}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="California, USA"
                        // inputProps={{
                        //   style: { fontSize: "1rem" },
                        // }}
                      />
                    )}
                  />
                  <p
                    style={{
                      alignSelf: "center",
                      margin: "0 1rem",
                      color: "#757575",
                    }}
                  >
                    OR
                  </p>
                  <Button
                    className={classes.otherStateBtn}
                    onClick={() => {
                      setOtherState(true);
                    }}
                  >
                    +<br />
                    other
                  </Button>
                </div>
              )}
              <Autocomplete
                id="combo-box-demo"
                options={top100Films}
                searchText={licenseType}
                getOptionLabel={(option) => option.title}
                // defaultValue={top100Films[18]}
                value={getSelectedLicenseType()}
                //         getOptionSelected={(option, { multiple, value }) => {
                //    if (!multiple) {
                //     /*
                //      * PROPOSAL for single selection, be able to provide own logic.
                //      */
                //     return (option.title === value);
                //    }

                //    return false;
                // }}
                style={{
                  width: "100%",
                  marginBottom: "25px",
                  fontSize: "1rem",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={licenseTypeChange}
                    // inputProps={{
                    //   style: { fontSize: "1rem" },
                    // }}
                  />
                )}
              />
              <TextField
                id="standard-basic"
                value={licenseNum}
                style={{ width: "100%",marginBottom: "25px" }}
                onChange={licenseNumChange}
              />

              {
                editMore?(<><Autocomplete
                    id="combo-box-demo"
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%", marginBottom: "10px" }}
                    className={classes.stateAutoCom}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Select Country"
                        // inputProps={{
                        //   style: { fontSize: "1rem" },
                        // }}
                      />
                    )}
                  />
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={defaultMaterialTheme}>
          <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Original issue date"
          value={date}
          style={{width:"100%"}}
          onChange={(date)=>changeDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
          </ThemeProvider>
        </MuiPickersUtilsProvider></>)
        :<Button className={classes.editMoreButton} onClick={()=>setEditMore(true)}>
                <span style={{flex:3}}>edit more</span>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  style={{ color: "#BDBDBD"}}
                  size="2x"
                />
              </Button>
              }
              
            </div>
            <div className={classes.pencilContainer}>
              <Button
                className={classes.pencilBackground}
                onClick={handleConfirm}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  style={{ color: "#fff" }}
                  size="lg"
                />
              </Button>
            </div>
          </div>
        </CardContent>
      </CSSTransition>
    </Card>
  );
}

export default CertificationEditCard;

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Medical Doctor(MD)", year: 1954 },
];
