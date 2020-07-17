import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Popper from "@material-ui/core/Popper";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { message } from "antd";
import Tooltip from "@material-ui/core/Tooltip";
import {
  countryArray,
  credential,
  getStateOption,
  USStatesArray,
} from "../data/Selections";
import "../styles/Certification.css";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
const moment = require("moment");

const useStyles = makeStyles({
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
    borderRadius: "10px",
    maxWidth: "550px",
    marginBottom: "4rem",
  },
  cardContentContainer: {
    display: "flex",
    // justifyContent:'center',
    // alignContent:'center',
    minHeight: "14rem",
    alignItems: "center",
  },
  pencilContainer: {
    flex: 1,
    textAlign: "center",
  },
  pencilBackground: {
    background: "#CCE0FF",
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
  stateContainer: {
    display: "flex",
    height: "3rem",
  },
  otherStateBtn: {
    fontSize: "1rem",
    color: "#5894C3",
  },
  stateAutoCom: {
    flex: 3,
    height: "3rem",
  },
  textFieldContainer: {
    textAlign: "center",
    flex: 3,
  },
  editMoreButton: {
    display: "flex",
    margin: "20px 0 0 0",
    width: "100%",
    fontSize: "0.5rem",
    color: "#5894C3",
    backgroundColor: "#F2F2F2",
    height: "2rem",
  },
  datePickerInputLabel: {
    marginTop: "8px",
    fontSize: "1.4rem",
  },
  datePickerInput: {
    fontSize: "1.4rem",
  },
  checkbox: {
    marginTop: "1rem",
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
    MuiSvgIcon: {
      fontSize: "2rem",
    },
    MuiTypography: {
      body2: {
        fontSize: "1.2rem",
      },
      body1: {
        fontSize: "1.5rem",
      },
      caption: {
        fontSize: "1rem",
      },
    },
  },
});

message.config({
  top: "7.1rem",
});

function CertificationEditCard(props) {
  const classes = useStyles();
  const [state, setState] = useState("California");
  const [country, setCountry] = useState("USA");
  const [licenseNum, setLicenseNum] = useState("#MD-20494586342");
  const [licenseType, setLicenseType] = useState(null);
  const [endDate, setEndDate] = useState("");
  const [otherStateInput, setOtherStateInput] = useState(false);
  const [editMore, setEditMore] = useState(false);
  const [date, setDate] = useState(new Date());
  const [changeNotSaved, setChangeNotSaved] = useState(false);
  const [firstCycleChecked, setFirstCycleChecked] = useState(0);
  const [stateOption, setStateOption] = useState(USStatesArray);
  const [cardType, setCardType] = useState("License");
  const cardDetail = props.licenseDetail;

  useEffect(() => {
    setState(cardDetail.state);
    setLicenseNum(cardDetail.licenseNumber);
    setLicenseType(cardDetail.license);
    setCountry(cardDetail.country);
    setFirstCycleChecked(parseInt(cardDetail.firstRenewal));
    convertStringtoDate();
  }, [props.licenseDetail]);

  useEffect(() => {
    setStateOption(getStateOption(cardDetail.country));
    // getListOfLicenseType();
  }, []);

  // const getListOfLicenseType = ()=>{
  //   axios({
  //     method: "get",
  //     url: "../MyProfile/GetLicenseTypeList",
  //     data: {},
  //   })
  //       .then((response)=>{
  //         // if(response.data.code===1){
  //
  //         console.log(response)
  //         // }
  //       })
  //       .catch(function (response) {
  //         //handle error
  //         console.log(response);
  //       });
  // };

  const convertStringtoDate = () => {
    if (cardDetail.originalIssueDate !== null) {
      let parts = cardDetail.originalIssueDate.split("-");
      let formatDate = new Date(parts[0], parts[1] - 1, parts[2]);
      setDate(formatDate);
    }
  };

  const handleSave = (e) => {
    if (licenseType === null || licenseType.length === 0) {
      message.error("License type cannot be empty");
      return;
    }
    setChangeNotSaved(false);
    const tmpOriginalIssueDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

    let params = {
      id: cardDetail.id,
      endDate: cardDetail.endDate,
      license: licenseType,
      state: state,
      country: country,
      originalIssueDate: tmpOriginalIssueDate,
      licenseNumber: licenseNum,
      firstRenewal: firstCycleChecked,
    };

    axios({
      method: "post",
      url: "../MyProfile/EditLicense",
      data: params,
    })
      .then((response) => {
        // if(response.data.code===1){
        message.success("New license info saved");
        props.confirm();
        // }
      })
      .catch(function (response) {
        message.error("Unable to edit license now, please try again later");
        //handle error
        console.log(response);
      });
    props.confirm();
  };

  const getSelectedState = () => {
    const item = stateOption.find((opt) => {
      // console.log("Compare,", opt.title);
      if (opt === state) return opt;
    });
    return item || "";
  };

  const getSelectedLicenseType = () => {
    const item = props.licenseTypes.find((opt) => {
      // console.log("Compare,", opt.title);
      if (opt === licenseType) return opt;
    });
    return item || "";
  };

  const getSelectedCountry = () => {
    const item = countryArray.find((opt) => {
      // console.log("Compare,", opt.title);
      if (opt === country) return opt;
    });
    return item || "";
  };

  const handleFormChange = () => {
    console.log("Form change");
  };

  const handleStateChange = (event, values) => {
    setState(values);
    setChangeNotSaved(true);
  };

  const handleOtherStateChange = (e) => {
    setState(e.target.value);
    setChangeNotSaved(true);
  };

  const handleLicenseTypeChange = (event, values) => {
    console.log("event: ", event, "values: ", values);
    setLicenseType(values);
    setChangeNotSaved(true);
  };

  const handleLicenseNumChange = (e) => {
    console.log("Number changed");
    setLicenseNum(e.target.value);
    setChangeNotSaved(true);
  };

  const handleCountryChange = (event, values) => {
    setStateOption(getStateOption(values));
    setCountry(values);
    setChangeNotSaved(true);
  };

  const handleCardTypeChange = (e) => {
    setCardType(e.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
    setChangeNotSaved(true);
  };

  const handleBeforeUnload = (event) => {
    event.returnValue = `You have unsaved changes!`;
  };

  const handleCycleCheckboxChange = (event) => {
    if (event.target.checked) {
      setFirstCycleChecked(1);
    } else {
      setFirstCycleChecked(0);
    }
  };

  React.useEffect(() => {
    if (!changeNotSaved) return;
    window.addEventListener("beforeunload", handleBeforeUnload);

    // window.removeEventListener("beforeunload",handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [changeNotSaved]);

  React.useEffect(() => {
    console.log("Renewal: ", firstCycleChecked);
  }, [firstCycleChecked]);

  return (
    <Card className={classes.card}>
      <CSSTransition in={true} appear={true} timeout={300} classNames="slide">
        <CardContent>
          <div className={classes.cardContentContainer}>
            <div className={classes.textFieldContainer}>
              <form onChange={handleFormChange}>
                {otherStateInput ? (
                  <TextField
                    id="standard-basic"
                    // value={licenseNum}
                    placeholder="Type any issuing body…"
                    style={{ width: "100%", height: "3rem" }}
                    onChange={handleOtherStateChange}
                  />
                ) : (
                  <div className={classes.stateContainer}>
                    <Autocomplete
                      options={stateOption}
                      getOptionLabel={(option) => (option ? option : "")}
                      style={{ width: "100%", marginBottom: "8px" }}
                      className={classes.stateAutoCom}
                      value={getSelectedState()}
                      onChange={handleStateChange}
                      PopperComponent={(params) => (
                        <Popper {...params} disablePortal />
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder="State"
                          // inputProps={{
                          //   style: { fontSize: "1rem" },
                          // }}
                        />
                      )}
                    />
                    <p
                      style={{
                        alignSelf: "center",
                        fontSize: "1.5rem",
                        margin: "0 1rem 0 3rem",
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
                <Autocomplete
                  options={props.licenseTypes}
                  getOptionLabel={(option) => (option ? option : "")}
                  // defaultValue={top100Films[18]}
                  value={getSelectedLicenseType()}
                  onChange={handleLicenseTypeChange}
                  style={{
                    width: "100%",
                    fontSize: "1rem",
                    height: "3rem",
                  }}
                  PopperComponent={(params) => (
                    <Popper {...params} disablePortal />
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Credential"
                      required
                      error={licenseType === null ? true : false}
                      // errorText="License type cannot be empty"
                      // inputProps={{
                      //   style: { fontSize: "1rem" },
                      // }}
                    />
                  )}
                />
                <TextField
                  id="standard-basic"
                  value={licenseNum}
                  placeholder="Credential Number"
                  style={{ width: "100%", height: "3rem" }}
                  onChange={handleLicenseNumChange}
                />

                {editMore ? (
                  <>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      // className={classes.titleTextField}
                      value={cardType}
                      onChange={handleCardTypeChange}
                      placeholder="Card Type"
                      // input={<OutlinedInput classes={{ root: classes.root }} />}
                    >
                      <MenuItem value="License">License</MenuItem>
                      <MenuItem value="Certification">Certification</MenuItem>
                      <MenuItem value="Credential">Credential</MenuItem>
                      <MenuItem value="Designation">Designation</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                    <Autocomplete
                      options={countryArray}
                      getOptionLabel={(option) => option}
                      style={{ width: "100%", height: "3rem" }}
                      className={classes.stateAutoCom}
                      value={getSelectedCountry()}
                      onChange={handleCountryChange}
                      PopperComponent={(params) => (
                        <Popper {...params} disablePortal />
                      )}
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
                          id="date-picker-inline"
                          label="Original issue date"
                          value={date}
                          autoOk
                          style={{
                            width: "100%",
                            height: "3rem",
                            marginBottom: "10px",
                          }}
                          onChange={handleDateChange}
                          KeyboardButtonProps={{
                            "aria-label": "change date",
                          }}
                          InputLabelProps={{
                            className: classes.datePickerInputLabel,
                          }}
                          InputProps={{ className: classes.datePickerInput }}
                        />
                      </ThemeProvider>
                    </MuiPickersUtilsProvider>
                    <FormControlLabel
                      control={
                        <BlueCheckbox
                          checked={firstCycleChecked === 1}
                          onChange={handleCycleCheckboxChange}
                          name="firstCycle"
                        />
                      }
                      label="This is my first cycle period for this credential"
                      className={classes.checkbox}
                    />
                  </>
                ) : (
                  <Button
                    className={classes.editMoreButton}
                    onClick={() => setEditMore(true)}
                  >
                    <span style={{ flex: 3, fontSize: "1rem" }}>edit more</span>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      style={{ color: "#BDBDBD" }}
                      size="2x"
                    />
                  </Button>
                )}
              </form>
            </div>
            <div className={classes.pencilContainer}>
              <Tooltip
                title="Save"
                arrow
                placement="bottom"
                PopperProps={{ disablePortal: true, eventsEnabled: true }}
              >
                <Button
                  className={classes.pencilBackground}
                  onClick={handleSave}
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                    style={{ color: "#fff" }}
                    size="lg"
                  />
                </Button>
              </Tooltip>
            </div>
          </div>
        </CardContent>
      </CSSTransition>
    </Card>
  );
}

export default CertificationEditCard;
