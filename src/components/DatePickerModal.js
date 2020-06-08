import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Modal from "react-bootstrap/Modal";
import Dialog from "@material-ui/core/Dialog";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import "../styles/Certification.css";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  datePicker: {
    width: "30rem",
  },
}));

const defaultMaterialTheme = createMuiTheme({
  palette: {
		primary: {
			main: '#5894C3',
			light:  '#5894C3',
      dark: '#5894C3',
		},
		secondary: {
			main: '#CCE0FF',
    },
  },
    datePicker: {
      // selectColor: "#BE0F23",
      // color: palette.primary1Color,
      // textColor: palette.alternateTextColor,
      // calendarTextColor: palette.textColor,
      selectTextColor: "#BE0F23",
      // calendarYearBackgroundColor: palette.canvasColor,
      // headerColor: palette.pickerHeaderColor || palette.primary1Color,
    },
    overrides: {
      MuiPickersToolbarText:{
        toolbarTxt:{
          color:'#CCE0FF',
        }
      },
    }
});

export default function DatePickerModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [date, changeDate] = useState(new Date());

  React.useEffect(() => {
    setOpen(props.openModal);
  }, [props.openModal]);

  const handleClose = () => {
    props.closeModal();
  };

  React.useEffect(() => {
    console.log("newDate", date);
  }, [date]);

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="lg"
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={defaultMaterialTheme}>
            <DatePicker
              autoOk
              className="datePicker"
              variant="static"
              openTo="year"
              value={date}
              onChange={changeDate}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Dialog>
    </div>
  );
}
