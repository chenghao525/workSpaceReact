import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  makeStyles,
  withStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
// import { Alert } from 'react-alert';
import { responsiveFontSizes } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import DateFnsUtils from "@date-io/date-fns";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import checkboxImage from "./images/checkbox.png";
import { credential, USStatesArray } from "./data/Selections";
import "./styles/WelcomeAboard.css";
const moment = require("moment");

const currentUrl = window.location.href;
const MYPROFILE_URL = currentUrl.substring(0, currentUrl.length - 14);

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
  root: {
    height: "48px",
    background: "white",
    "@media (max-width:715px)": {
      height: "24px",
      fontSize: "15px",
    },
  },
  otherStateBtn: {
    fontSize: "16px",
    color: "#5894C3",
  },
  datePickerInputLabel: {
    marginTop: "8px",
    fontSize: "22.4px",
  },
  datePickerInput: {
    fontSize: "22.4px",
    root: {
      width: "100%",
    },
  },
  disabledButton: {
    background: "#808080",
    color: "white",
  },
});

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#5894C3",
      light: "#5894C3",
      dark: "#5894C3",
    },
    secondary: {
      main: "#CCE0FF",
    },
  },
  overrides: {
    MuiInput: {
      root: {
        width: "100%",
      },
    },
    MuiSvgIcon: {
    //   fontSize: "2 px",
      root:{
        "@media (max-width:715px)": {
            // fontSize: "14px",
        },
      }
    },
    MuiTypography: {
      body2: {
        fontSize: "19.2px",
      },
      body1: {
        fontSize: "24px",
      },
    },
  },
});

const BlueCheckbox = withStyles({
  root: {
    color: "#9AC2FF",
    "&$checked": {
      color: "#9AC2FF",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function WelcomeAboardPage() {
  const classes = useStyles();
  const [state, setState] = useState(null);
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [otherStateInput, setOtherStateInput] = useState(false);
  const [salutation, setSalutation] = useState("");
  const [firstCycleChecked, setFirstCycleChecked] = useState(0);
  const [stateOption, setStateOption] = useState(USStatesArray);
  const [expirationDate, setExpirationDate] = React.useState(new Date());
  const [error, setError] = React.useState(false);
  const [btnDisable, setBtnDisable] = React.useState(true);
  const height = 30;

  React.useEffect(() => {
    checkFields();
  }, [profession, licenseType]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStateChange = (event, values) => {
    setState(values);
  };

  const handleOtherStateChange = (e) => {
    setState(e.target.value);
  };

  const handleLicenseTypeChange = (event, values) => {
    console.log("event: ", event, "values: ", values);
    setLicenseType(values);
  };

  const handleProfessionChange = (event) => {
    console.log("profession: ", event.target.value);
    setProfession(event.target.value);
  };

  const handleCycleCheckboxChange = (event) => {
    if (event.target.checked) {
      setFirstCycleChecked(1);
    } else {
      setFirstCycleChecked(0);
    }
  };

  const handleSalutationChange = (e) => {
    console.log("handleSalutationChange");
    setSalutation(e.target.value);
  };

  const checkFields = () => {
    if (profession !== "" && licenseType !== "") {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  const handleStartBtn = (e) => {
    let formattedExpirationDate = null;

    if (expirationDate !== "") {
      formattedExpirationDate = moment(expirationDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    let params = {
      endDate: formattedExpirationDate,
      license: licenseType,
      state: state,
      firstRenewal: firstCycleChecked,
    };

    axios({
      method: "post",
      url: "../MyProfile/AddNewLicense",
      data: params,
    })
      .then((response) => {
        // if(response.data.code===1);
        updateNameAndTitle();
        console.log("Success");
        // }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const updateNameAndTitle = () => {
    let formData = new FormData();
    formData.append("sal", salutation);
    formData.append("nam", name);

    axios({
      method: "post",
      url: "../MyProfile/UpdateProfileNameAndTitle",
      data: formData,
      headers: {
        "Content-Type": "text/plain",
      },
      responseType: "text",
    })
      .then((response) => {
        // if(response.data.code===1){
        console.log("name set");
        window.location.replace(MYPROFILE_URL);
        // }
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  return (
    <ThemeProvider theme={defaultMaterialTheme}>
      <div className="welcome-page-container">
        <div className="welcome-page-content">
          <div className="pic-title-container">
            <img className="checkbox-image" src={checkboxImage} />
            <div className="title-container">
              <h1 className="welcome-text">Welcome Aboard!</h1>
              <p className="thrill-text">
                We're thrilled to welcome you to our community
              </p>
              <p className="detail-text">
                Start by adding your basic detail below:
              </p>
              <div className="title-name-container">
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  className="titleTextField"
                  value={salutation}
                  onChange={handleSalutationChange}
                  placeholder="Salutation"
                  input={<OutlinedInput classes={{ root: classes.root }} />}
                >
                  <MenuItem value="Dr.">Dr.</MenuItem>
                  <MenuItem value="Ms.">Ms.</MenuItem>
                  <MenuItem value="Mrs.">Mrs.</MenuItem>
                  <MenuItem value="Mr.">Mr.</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
                <TextField
                  className="nameTextField"
                  onChange={handleNameChange}
                  placeholder="Your Full Name"
                  variant="outlined"
                  InputProps={{
                    classes: {
                      root: classes.root,
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="mid-text-container">
            <p className="profession-text">What is your profession?</p>
            <TextField
              className="professionTextField"
              placeholder="e.g Healthcare, Insurance, Education"
              variant="outlined"
              // style={{ height:"3rem" }}
              onChange={handleProfessionChange}
              InputProps={{
                classes: {
                  root: classes.root,
                },
              }}
            />
          </div>
          <div className="which-add-container"
            style={{
              display: "flex",
              // justifyContent: "space-between",
              margin: "32px 0",
            }}
          >
            <p className="which-text">
              Which of your credentials require continuing education?
            </p>
            <p className="add-text"
             

            >
              Add one license, certification, or other credential
            </p>
          </div>

          <div className="credential-info-container">
            <div className="first-row-container">
              <div className="state-issuebody-textfield">
                {otherStateInput ? (
                  <TextField
                    id="standard-basic"
                    // value={licenseNum}
                    placeholder="Type any issuing body…"
                    style={{ width: "100%", height: "48px" }}
                    onChange={handleOtherStateChange}
                  />
                ) : (
                  <div className="stateContainer">
                    <Autocomplete
                      options={stateOption}
                      getOptionLabel={(option) => (option ? option : "")}
                      style={{ marginBottom: "8px" }}
                      className="stateAutoCom"
                      onChange={handleStateChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={'State(or add "Other" Issuing Body)'}
                          // inputProps={{
                          //   style: { fontSize: "1rem" },
                          // }}
                        />
                      )}
                    />
                    <p
                      style={{
                        alignSelf: "center",
                        fontSize: "24px",
                        margin: "0 16px 0 48px",
                        color: "#757575",
                      }}
                    >
                      OR
                    </p>
                    <Button
                      className={classes.otherStateBtn}
                      onClick={() => {
                        setOtherStateInput(true);
                      }}
                    >
                      +<br />
                      other
                    </Button>
                  </div>
                )}
              </div>
              <div className="expiration-date-picker">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      id="date-picker-inline"
                      label="Expiration date"
                      value={
                        expirationDate === "" ? new Date() : expirationDate
                      }
                      autoOk
                      // style={{
                      //   width: "100%",
                      // }}
                      onChange={(date) => setExpirationDate(date)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      InputLabelProps={{
                        className: classes.datePickerInputLabel,
                      }}
                      InputProps={{
                        className: classes.datePickerInput,
                        root: {
                          width: "80%",
                        },
                      }}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
            </div>
            <div className="second-row-container">
              <Autocomplete
                options={credential}
                getOptionLabel={(option) => (option ? option : "")}
                onChange={handleLicenseTypeChange}
                style={{
                  flex: "3",
                  fontSize: "16px",
                  height: "48px",
                }}
                PopperComponent={(params) => (
                  <Popper {...params} disablePortal />
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Credential"
                    required
                    error={error}
                  />
                )}
              />
              <div>
                <FormControlLabel
                  control={
                    <BlueCheckbox
                      checked={firstCycleChecked === 1}
                      onChange={handleCycleCheckboxChange}
                      name="firstCycle"
                    />
                  }
                  label="This is my first renew cycle"
                  className="checkbox"
                />
                <Tooltip
                  title="Check this box if this is a new credential that you have not renewed yet. This tells us if you may have alternative requirements than for normal, ongoing renewals."
                  placement="bottom"
                  arrow
                  PopperProps={{ disablePortal: true }}
                >
                  <button style={{ backgroundColor: "Transparent" }}>
                    <FontAwesomeIcon
                      icon={faQuestionCircle}
                      style={{ color: "#808080" }}
                      size="lg"
                    />
                  </button>
                </Tooltip>
              </div>
            </div>
            <div style={{ fontSize: "1.5vw", fontStyle: "italic" }}>
              <FontAwesomeIcon
                icon={faExclamationCircle}
                style={{ color: "#808080" }}
                size="md"
              />
              You can add more or make edits later
            </div>
          </div>
          <div className="btn-container">
            <Button
              className="getStartBtn"
              disabled={btnDisable}
              classes={{ disabled: classes.disabledButton }}
              onClick={handleStartBtn}
            >
              Let's Get Started >
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

//   ReactDOM.render(<WelcomeAboardPage />, document.getElementById("react"));
