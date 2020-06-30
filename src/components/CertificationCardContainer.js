import React, { useEffect } from "react";
import CertificationDisplayCard from "./CertificationDisplayCard";
import CertificationEditCard from "./CertificationEditCard";
import CertificationRenewedCard from "./CertificationRenewedCard";

export default function CertificationBox(props) {
  const [editing, setEditing] = React.useState(false);
  const [editingDone, setEditingDone] = React.useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleConfirm = () => {
    setEditing(false);
    setEditingDone(true);
    props.saveEdit();
  };

  useEffect(()=>{
    console.log("Detail:::",props.licenseDetail)
  },[props.licenseDetail])

  return editing ? (
    <CertificationEditCard
      editing={editing}
      confirm={handleConfirm}
      licenseDetail={props.licenseDetail}
    />
  ) : props.licenseDetail.previousEndDate === null ? (
    <CertificationDisplayCard
      editing={handleEdit}
      editingDone={editingDone}
      licenseDetail={props.licenseDetail}
      refreshList={handleConfirm}
    />
  ) : (
    <CertificationRenewedCard
      editing={handleEdit}
      editingDone={editingDone}
      licenseDetail={props.licenseDetail}
      refreshList={handleConfirm}
    />
  );
}
