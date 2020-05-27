import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import CertificationDisplayCard from "./CertificationDisplayCard";
import CertificationEditCard from "./CertificationEditCard";

export default function CertificationBox() {
  const [editing, setEditing] = React.useState(false);
  const [editingDone, setEditingDone] = React.useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleConfirm = () => {
    setEditing(false);
    setEditingDone(true);
  };

  return editing ? (
    <CertificationEditCard editing={editing} confirm={handleConfirm} />
  ) : (
    <CertificationDisplayCard editing={handleEdit} editingDone={editingDone} />
  );
}