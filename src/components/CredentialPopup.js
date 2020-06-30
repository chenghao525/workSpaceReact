import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Button, message } from "antd";
import MUIButton from "@material-ui/core/Button";
import "antd/dist/antd.css";
import axios from "axios";
import "../styles/Certification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Popper from "@material-ui/core/Popper";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
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
    borderRadius: "10px",
    maxWidth: "550px",
    marginBottom: "4rem",
  },
  cardContentContainer: {
    // display: "flex",
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
    height: "3.2rem",
  },
  otherStateBtn: {
    fontSize: "1rem",
    color: "#5894C3",
  },
  stateAutoCom: {
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
  footButton: {
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    minHeight: "3.6rem",
    backgroundColor: "#9AC2FF",
    "&:hover": {
      backgroundColor: "#5894C3",
    },
  },
  cancelButton: {
    float: "left",
    minHeight: "3.6rem",
    borderRadius: "5px",
    "&:hover": {
      color: "#9AC2FF",
      borderColor: "#9AC2FF",
    },
  },
  bottomDatePicker:{
    display:"inline-block",
    width:"45%"
  },
  bottomDatePickerContainer:{
    display:"flex",
    justifyContent: "space-between"
  }
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
    MuiInput:{
      root:{
        width:'100%'
      }
    },
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
    },
  },
});

function CredentialPopup(props) {
  const classes = useStyles();
  const [state, setState] = useState("California");
  const [country, setCountry] = useState("United States");
  const [licenseNum, setLicenseNum] = useState("");
  const [licenseType, setLicenseType] = useState(null);
  const [otherStateInput, setOtherStateInput] = useState(false);
  const [editMore, setEditMore] = useState(false);
  const [originalDate, setOriginalDate] = useState("");
  const [stateOption, setStateOption] = useState(USStatesArray);
  const cardDetail = props.licenseDetail;
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [expirationDate, setExpirationDate] = React.useState(new Date());

  React.useEffect(() => {
    console.log("Triggered in popup");
    setOpen(props.openModal);
  }, [props.openModal]);

  const handleClose = () => {
    props.closeModal();
    setEditMore(false);
    setOtherStateInput(false);
    setLicenseType(null);
    setLicenseNum("");
    setOriginalDate("");
    setError(false);
  };

  const handleAddLicense = (e) => {
    if (licenseType === null || licenseType.length === 0) {
      setError(true);
      message.error("License type cannot be empty");
      return;
    }

    let formattedOriginalIssueDate = null;
    let formattedExpirationDate = null;

    if (originalDate !== "") {
      formattedOriginalIssueDate = moment(originalDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    if (expirationDate !== "") {
      formattedExpirationDate = moment(expirationDate).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }

    let params = {
      endDate: formattedExpirationDate,
      license: licenseType,
      state: state,
      country: country,
      originalIssueDate: formattedOriginalIssueDate,
      licenseNumber: licenseNum,
    };

    axios({
      method: "post",
      url: "../MyProfile/AddNewLicense",
      data: params,
    })
      .then((response) => {
        // if(response.data.code===1){
        message.success("New License add successfully");
        props.onSubmit();
        handleClose();
        // }
      })
      .catch(function (response) {
        message.error("Unable to add license now. Please try again later");
        handleClose();
        //handle error
        console.log(response);
      });
  };

  const getSelectedState = () => {
    const item = stateOption.find((opt) => {
      // console.log("Compare,", opt.title);
      if (opt === state) return opt;
    });
    return item || "";
  };

  const getSelectedLicenseType = () => {
    const item = credential.find((opt) => {
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
  };

  const handleOtherStateChange = (e) => {
    setState(e.target.value);
  };

  const handleLicenseTypeChange = (event, values) => {
    console.log("event: ", event, "values: ", values);
    setLicenseType(values);
  };

  const handleLicenseNumChange = (e) => {
    console.log("Number changed");
    setLicenseNum(e.target.value);
  };

  const handleCountryChange = (event, values) => {
    setStateOption(getStateOption(values));
    setCountry(values);
  };

  return (
    <Modal
      visible={open}
      title=" Add New License"
      // onOk={this.handleOk}
      onCancel={handleClose}
      footer={[
        <Button
          key="back"
          onClick={handleClose}
          className={classes.cancelButton}
          style={{ float: "left" }}
        >
          Close
        </Button>,
        <Button
          key="submit"
          type="primary"
          className={classes.footButton}
          onClick={handleAddLicense}
        >
          Add License
        </Button>,
      ]}
    >
      <div className={classes.cardContentContainer}>
        <form onChange={handleFormChange}>
          {!editMore ? (
            <>
              {otherStateInput ? (
                <TextField
                  id="standard-basic"
                  // value={licenseNum}
                  placeholder="Type any issuing body…"
                  style={{ width: "100%" }}
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
                  <MUIButton
                    className={classes.otherStateBtn}
                    onClick={() => {
                      setOtherStateInput(true);
                    }}
                  >
                    +<br />
                    other
                  </MUIButton>
                </div>
              )}

              <Autocomplete
                options={credential}
                getOptionLabel={(option) => (option ? option : "")}
                // defaultValue={top100Films[18]}
                value={getSelectedLicenseType()}
                onChange={handleLicenseTypeChange}
                style={{
                  width: "100%",
                  fontSize: "1rem",
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
                style={{ width: "100%" }}
                onChange={handleLicenseNumChange}
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <ThemeProvider theme={defaultMaterialTheme}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    id="date-picker-inline"
                    label="Expiration date"
                    value={expirationDate === "" ? new Date() : expirationDate}
                    autoOk
                    style={{
                      width: "100%",
                    }}
                    onChange={(date) => setExpirationDate(date)}
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
              <MUIButton
                className={classes.editMoreButton}
                onClick={() => setEditMore(true)}
              >
                <span style={{ flex: 3, fontSize: "1rem" }}>edit more</span>
                <FontAwesomeIcon
                  icon={faCaretDown}
                  style={{ color: "#BDBDBD" }}
                  size="2x"
                />
              </MUIButton>
            </>
          ) : (
            <>
              {otherStateInput ? (
                <TextField
                  id="standard-basic"
                  // value={licenseNum}
                  placeholder="Type any issuing body…"
                  style={{ width: "100%" }}
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
                  <MUIButton
                    className={classes.otherStateBtn}
                    onClick={() => {
                      setOtherStateInput(true);
                    }}
                  >
                    +<br />
                    other
                  </MUIButton>
                </div>
              )}
              <Autocomplete
                options={credential}
                getOptionLabel={(option) => (option ? option : "")}
                // defaultValue={top100Films[18]}
                value={getSelectedLicenseType()}
                onChange={handleLicenseTypeChange}
                style={{
                  width: "100%",
                  fontSize: "1rem",
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
                style={{ width: "100%" }}
                onChange={handleLicenseNumChange}
              />
              <Autocomplete
                options={countryArray}
                getOptionLabel={(option) => option}
                style={{ width: "100%" }}
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
                  className={classes.bottomDatePicker}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    id="date-picker-inline"
                    label="Original issue date"
                    value={originalDate === "" ? new Date() : originalDate}
                    autoOk
                    onChange={(date) => setOriginalDate(date)}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    InputLabelProps={{
                      className: classes.datePickerInputLabel,
                    }}
                    InputProps={{ className: classes.datePickerInput }}
                  />
              
                  <KeyboardDatePicker
                  className={classes.bottomDatePicker}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    id="date-picker-inline"
                    label="Expiration date"
                    value={expirationDate === "" ? new Date() : expirationDate}
                    autoOk
                    onChange={(date) => setExpirationDate(date)}
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
            </>
          )}
        </form>
      </div>
    </Modal>
  );
}

export default CredentialPopup;
