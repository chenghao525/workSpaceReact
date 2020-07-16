import React, { useState } from "react";
import { Modal, Button } from 'antd';
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core";
import DatePickerModal from "./DatePickerModal";
import "../styles/Certification.css";
import 'antd/dist/antd.css';

const useStyles = makeStyles((theme)=>({
    root: {
        minWidth: 275,
    },
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    modalFocused: {
        outline: "none",
    },
    renewButton:{
      width:"70%",
      height:"40px",
      color:"#fff",
      fontSize:"1rem",
      borderRadius:"5px",
      border:"none",
      minWidth:"48px",
      marginTop:"20px",
      backgroundColor:'#9AC2FF',
      "&:hover": {
        color:"#fff",
          backgroundColor: "#5894C3",
      },
    },
    editDateButton:{
      width:"70%",
      height:"40px",
        fontSize:"1rem",
        color:"#606060",
        border:"1px #606060 solid",
        borderRadius:"5px",
        marginTop:"28px",
        "&:hover": {
          color:"#5894C3",
          border:"1px #5894C3 solid",
        },
    },
    cardContentContainer:{
      textAlign:"center",
      height:"160px"
    }
}));

const defaultMaterialTheme = createMuiTheme({
    // spacing: 2,
});

function RenewalPopup(props) {
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
    };

    const handleEditBtn = () =>{
        props.openDateModal(false);
    }

    const handleRenewBtn = ()=>{
        props.openDateModal(true);
    }

    return (
        <>
            <Modal
                visible={open}
                title=" Add New License"
                // onOk={this.handleOk}
                onCancel={handleClose}
                footer={null}
            >
                <div className={classes.cardContentContainer}>
                <div>Are you renewing this credential or just editing the date?</div>
                    <Button className={classes.renewButton} onClick={handleRenewBtn}>I'm Renewing This Credential</Button>
                    <Button className={classes.editDateButton} onClick={handleEditBtn}>I'm Just Editing Current Due Date</Button>
                </div>
            </Modal>
        </>
    );
}

export default RenewalPopup;


