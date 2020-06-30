import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from '@material-ui/core/DialogActions';
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
  footButton:{
    color:"#5894C3"
  }
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
    overrides: {
      MuiPickersToolbarText:{
        toolbarTxt:{
          color:'#CCE0FF',
        }
      },
      MuiTypography:{
        body2:{
          fontSize:"1.2rem"
        },
        body1:{
          fontSize:"1.5rem"
        },
        caption:{
          fontSize:"1rem"
        },
        subtitle1:{
          fontSize:"1.4rem"
        }
      },

    }
});

export default function DatePickerModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(new Date());
  const [yearSelected, setYearSelected] = useState(false);
  const [autoOk, setAutoOk] = useState(false);

  React.useEffect(() => {
    setOpen(props.openModal);
  }, [props.openModal]);

  const handleClose = () => {
    props.closeModal();
  };

   const handleSubmit = () =>{
     console.log("Submit date: ",date);
     props.onSubmit(date);
     handleClose();
   };


  // React.useEffect(() => {
  //   console.log("newDate", date);
  // }, [date]);

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
              className={classes.datePicker}
              variant="static"
              openTo="year"
              value={date}
              // format="yyyy-MM-dd"
              onChange={date=>{setDate(date)}}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
        <DialogActions>
          <Button onClick={handleClose} className={classes.footButton}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className={classes.footButton} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
