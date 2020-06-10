import React from "react";
import CertificationDisplayCard from "./CertificationDisplayCard";
import CertificationEditCard from "./CertificationEditCard";

export default function CertificationBox(props) {
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
    <CertificationEditCard editing={editing} confirm={handleConfirm} licenseDetail={props.licenseDetail}/>
  ) : (
    <CertificationDisplayCard editing={handleEdit} editingDone={editingDone} licenseDetail={props.licenseDetail}/>
  );
}
