import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditableLabel from 'react-inline-editing';

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
    color:"textSecondary"
  },
});

function CertificationCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
      <EditableLabel text='California, USA'
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                inputWidth='300px'
                inputHeight='30px'
                inputMaxLength='100'
                labelFontWeight='bold'
                inputFontWeight='bold'
                labelClassName={classes.title}
                labelFontSize='2rem'
                inputFontSize='2rem'
                // onFocus={this._handleFocus}
                // onFocusOut={this._handleFocusOut}
            />
            <EditableLabel text='Medical Doctor (MD)'
                labelClassName='myLabelClass'
                inputClassName='myInputClass'
                inputWidth='300px'
                inputHeight='30px'
                inputMaxLength='100'
                labelFontWeight='bold'
                inputFontWeight='bold'
                labelClassName={{color:"red"}}
                labelFontSize='2rem'
                inputFontSize='2rem'
                // onFocus={this._handleFocus}
                // onFocusOut={this._handleFocusOut}
            />
        <Typography className={classes.pos} color="textSecondary">
          Medical Doctor (MD)
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          #MD-20494586342
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}

export default CertificationCard;
