import React from 'react';
import MaterialTable from 'material-table';
import { AddBox, ArrowDownward, edit, DeleteOutline } from "@material-ui/icons";

export default function AdminCeManagement() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Title', field: 'title' },
      { title: 'Date', field: 'date', type:'date' },
      { title: 'Notes', field: 'notes' },
      {
        title: 'Approval Status',
        field:'approvalStatus',
        lookup: { 1: 'Approved', 0: 'Rejected' },
      },
    ],
    data: [
      { title: 'CE1', date: '08/22/2020', notes: "This CE is good", approvalStatus: 1 },
      { title: 'CE2', date: '08/22/2019', notes: "This CE is bad", approvalStatus: 1 },
      { title: 'CE3', date: '08/31/2018', notes: "This CE is bad", approvalStatus: 0 },
      { title: 'CE4', date: '05/12/2017', notes: "This CE is bad", approvalStatus: 1 },
      { title: 'CE5', date: '06/22/2019', notes: "This CE is bad", approvalStatus: 0 },
    ],
  });

  return (
    <MaterialTable
      title="Admin CE Management"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}
    />
  );
}

