import React, { useState } from "react";
// import Modal from "@material-ui/core/Modal";
// import { Button, Modal,ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ReactModal from "react-modal";
import { Modal, Button } from "react-bootstrap";
// import Modal from "react-bootstrap/Modal";
// import { Modal, Button } from 'antd';
// import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
import BootStrapButton from "react-bootstrap/Button";
import "../styles/Certification.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import "../styles/Certification.css";
import {
  DatePicker,
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
require("../images/calendar.png");

const useStyles = makeStyles((theme)=>({
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
    // display: "flex",
    // justifyContent:'center',
    // alignContent:'center',
    margin:"0 3rem",
    minHeight: "10rem",
    alignItems: "center",
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
    border:"none",
    fontSize: "0.8rem",
    color: "#5894C3",
    marginBottom: "10px",
  },
  stateAutoCom: {
    flex: 3,
    height: "3rem",
  },
  editMoreButton: {
    display: "flex",
    margin: "10px 0",
    width: "100%",
    fontSize: "0.5rem",
    border:"none",
    color: "#5894C3",
    backgroundColor: "#F2F2F2",
    height: "1.5rem",
    "&:hover":{
      color:"#5894C3",
      backgroundColor:"#BCBBBB"
    }
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalFocused: {
    outline: "none",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  footButton:{
    color:"#fff",
    fontSize:"1rem",
    border:"none",
    // minWidth:"3rem",
    // height:"3rem",
    backgroundColor:'#9AC2FF',
      "&:hover": {
        backgroundColor: "#5894C3",
      },
  }
}));

const defaultMaterialTheme = createMuiTheme({
  // spacing: 2,
});

function CredentialPopup(props) {
  const classes = useStyles();
  const [state, setState] = useState("California, USA")
  const [licenseNum, setLicenseNum] = useState("#MD-20494586342");
  const [licenseType, setLicenseType] = useState("Medical Doctor(MD)");
  const [otherState, setOtherState] = useState(false);
  const [editMore, setEditMore] = useState(false);
  const [date, changeDate] = useState(new Date());
  const [changeNotSaved, setChangeNotSaved] = useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(props.openModal);
  }, [props.openModal]);

  const handleClose = () => {
    props.closeModal();
    setEditMore(false);
    setOtherState(false);
  };

  const stateDataChanged = (data) => {
    console.log("location", data);
  };

  const licenseNumChange = (e) => {
    console.log("Number changed")
    setLicenseNum(e.target.value);
    setChangeNotSaved(true);
  };

  const licenseTypeChange = (e) => {
    setLicenseType(e.target.value);
  };

  const handleConfirm = (e) => {
    props.confirm();
  };

  const handleFormChange = () =>{
    console.log("Form change")
  }

  React.useEffect(() => {
    if (!changeNotSaved) return;
    window.addEventListener("beforeunload", (event)=>{
      event.returnValue = `You have unsaved changes!`;
    });
    // return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [changeNotSaved]);

  return (
    <Modal show={open}>
    <Modal.Header closeButton style={{backgroundColor:"#9AC2FF"}}>
      <h4 style={{color:"#FFF"}}>Add New License</h4>
      {/* Add New License */}
    </Modal.Header>
    <Modal.Body>
          <div className={classes.cardContentContainer}>
            <form className={classes.root} noValidate autoComplete="off">
              {otherState ? (
                <TextField
                id="standard-basic"
                // value={licenseNum}
                placeholder="Type any issuing body…"
                style={{ width: "100%", height: "3rem" }}
                onChange={licenseNumChange}
              />
              ) : (
                <div className={classes.stateContainer}>
                  <Autocomplete
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%", marginBottom: "8px" }}
                    className={classes.stateAutoCom}
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
                options={top100Films}
                getOptionLabel={option => option.title?option.title:option}
                // defaultValue={top100Films[18]}
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
                  fontSize: "1rem",
                  height: "3rem",
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={licenseTypeChange}
                    placeholder="Credential"
                    // inputProps={{
                    //   style: { fontSize: "1rem" },
                    // }}
                  />
                )}
              />
              <TextField
                id="standard-basic"
                placeholder="Credential Number"
                style={{ width: "100%", height: "3rem" }}
                onChange={licenseNumChange}
              />

              {editMore ? (
                <>
                  <Autocomplete
                    options={top100Films}
                    getOptionLabel={(option) => option.title}
                    style={{ width: "100%", height:'3rem' }}
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
                        id="date-picker-inline"
                        label="Original issue date"
                        value={date}
                        style={{ width: "100%",height:'3rem',marginBottom:"1rem"}}
                        onChange={(date) => changeDate(date)}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </>
              ) : (
                <Button
                  className={classes.editMoreButton}
                  onClick={() => setEditMore(true)}
                >
                  <span style={{ flex: 3,fontSize:'0.8rem'}}>edit more</span>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    style={{ color: "#BDBDBD" }}
                    size="2x"
                  />
                </Button>
              )}
              </form>
          </div>
          </Modal.Body>
        <Modal.Footer>
          <Button className={classes.footButton, "mr-auto"} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className={classes.footButton,"btn-primary","btn-add-license"} variant="primary" onClick={handleClose}>
            Add License
          </Button>
        </Modal.Footer>
      </Modal>
    // <Modal
    //       visible={open}
    //       title=" Add New License"
    //       // onOk={this.handleOk}
    //       onCancel={handleClose}
    //       footer={[
    //         <Button key="back" onClick={handleClose} style={{float:"left"}}>
    //           Close
    //         </Button>,
    //         <Button key="submit" type="primary" className={classes.footButton} onClick={handleClose}>
    //           Add License
    //         </Button>,
    //       ]}
    //     >
    //       <div className={classes.cardContentContainer}>
    //         <form className={classes.root} noValidate autoComplete="off">
    //           {otherState ? (
    //             <TextField
    //             id="standard-basic"
    //             // value={licenseNum}
    //             placeholder="Type any issuing body…"
    //             style={{ width: "100%", height: "3rem" }}
    //             onChange={licenseNumChange}
    //           />
    //           ) : (
    //             <div className={classes.stateContainer}>
    //               <Autocomplete
    //                 options={top100Films}
    //                 getOptionLabel={(option) => option.title}
    //                 style={{ width: "100%", marginBottom: "8px" }}
    //                 className={classes.stateAutoCom}
    //                 renderInput={(params) => (
    //                   <TextField
    //                     {...params}
    //                     placeholder="State"
    //                     // inputProps={{
    //                     //   style: { fontSize: "1rem" },
    //                     // }}
    //                   />
    //                 )}
    //               />
    //               <p
    //                 style={{
    //                   alignSelf: "center",
    //                   margin: "0 1rem",
    //                   color: "#757575",
    //                 }}
    //               >
    //                 OR
    //               </p>
    //               <Button
    //                 className={classes.otherStateBtn}
    //                 onClick={() => {
    //                   setOtherState(true);
    //                 }}
    //               >
    //                 +<br />
    //                 other
    //               </Button>
    //             </div>
    //           )}
    //           <Autocomplete
    //             options={top100Films}
    //             getOptionLabel={option => option.title?option.title:option}
    //             // defaultValue={top100Films[18]}
    //             //         getOptionSelected={(option, { multiple, value }) => {
    //             //    if (!multiple) {
    //             //     /*
    //             //      * PROPOSAL for single selection, be able to provide own logic.
    //             //      */
    //             //     return (option.title === value);
    //             //    }

    //             //    return false;
    //             // }}
    //             style={{
    //               width: "100%",
    //               fontSize: "1rem",
    //               height: "3rem",
    //             }}
    //             renderInput={(params) => (
    //               <TextField
    //                 {...params}
    //                 onChange={licenseTypeChange}
    //                 placeholder="Credential"
    //                 // inputProps={{
    //                 //   style: { fontSize: "1rem" },
    //                 // }}
    //               />
    //             )}
    //           />
    //           <TextField
    //             id="standard-basic"
    //             placeholder="Credential Number"
    //             style={{ width: "100%", height: "3rem" }}
    //             onChange={licenseNumChange}
    //           />

    //           {editMore ? (
    //             <>
    //               <Autocomplete
    //                 options={top100Films}
    //                 getOptionLabel={(option) => option.title}
    //                 style={{ width: "100%", height:'3rem' }}
    //                 className={classes.stateAutoCom}
    //                 renderInput={(params) => (
    //                   <TextField
    //                     {...params}
    //                     placeholder="Select Country"
    //                     // inputProps={{
    //                     //   style: { fontSize: "1rem" },
    //                     // }}
    //                   />
    //                 )}
    //               />
    //               <MuiPickersUtilsProvider utils={DateFnsUtils}>
    //                 <ThemeProvider theme={defaultMaterialTheme}>
    //                   <KeyboardDatePicker
    //                     disableToolbar
    //                     variant="inline"
    //                     format="MM/dd/yyyy"
    //                     id="date-picker-inline"
    //                     label="Original issue date"
    //                     value={date}
    //                     style={{ width: "100%",height:'3rem',marginBottom:"1rem"}}
    //                     onChange={(date) => changeDate(date)}
    //                     KeyboardButtonProps={{
    //                       "aria-label": "change date",
    //                     }}
    //                   />
    //                 </ThemeProvider>
    //               </MuiPickersUtilsProvider>
    //             </>
    //           ) : (
    //             <Button
    //               className={classes.editMoreButton}
    //               onClick={() => setEditMore(true)}
    //             >
    //               <span style={{ flex: 3,fontSize:'0.8rem',textTransform: 'uppercase', alignSelf:'center'}}>edit more</span>
    //               <FontAwesomeIcon
    //                 icon={faCaretDown}
    //                 style={{ color: "#BDBDBD" }}
    //                 size="2x"
    //               />
    //             </Button>
    //           )}
    //           </form>
    //       </div>
    //     </Modal>
  );
}

export default CredentialPopup;

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
  { title: "California, USA", year: 1954 },
];
