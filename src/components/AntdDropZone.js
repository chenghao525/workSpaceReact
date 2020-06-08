import React from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import "antd/dist/antd.css";

const { Dragger } = Upload;

const useStyles = makeStyles({
  uploadButton: {
    height: "3rem",
    width: "30%",
    borderRadius: "50px",
    fontWeight: "bold",
    fontSize: "1rem",
    color: "white",
    background: "linear-gradient(135deg,#3a8ffe 0,#9658fe 100%)",
    "&:hover": {
      boxShadow: "0 4px 25px rgba(0,0,0,.15)",
      transform: "translate3d(0,-2px,0)",
    },
  },
});

export default function AntdDragZone(props) {
  const classes = useStyles();
  const defaultProps = {
    name: "file",
    multiple: true,
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    beforeUpload(file,fileList) {
      props.onChange(file,fileList);
    },
    onRemove(file){
      props.onRemove(file.name);
      console.log("remove: ",file.name)
    }
  };

  return (
    <Dragger {...defaultProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Drag and drop files here</p>
      <p className="ant-upload-text">or</p>
      <button className={classes.uploadButton} type="button">
        Browse files
      </button>
    </Dragger>
  );
}
