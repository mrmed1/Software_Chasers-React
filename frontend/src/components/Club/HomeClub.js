import React, { Fragment, useEffect } from "react";
import * as api from "../../Service/ClubService";
import Table from '@mui/material/Table';
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
/*import "bootstrap/dist/css/bootstrap.min.css";*/
import { useState } from "react";
import {Button} from "primereact/button";

import { Link } from "react-router-dom";
 
import SeeClub from "./SeeClub";
import EditClub from "./EditClub";

import {Toaster, toast} from "react-hot-toast"
import {getAllClub, SignalerClub} from "../../Service/ClubService";
import moment from "moment/moment";
import ClassIcon from "@mui/icons-material/Class";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {connectedUser} from "../../Service/auth.service";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
function HomeClub() {
  const Role = connectedUser().role;
  const user_id = connectedUser()._id;
  const [clubs, setClubs] = useState([]);
  const [selectedEditEntity, setSelectedEditEntity] = useState({});
  const [displayReportDialog, setDisplayReportDialog] = useState(false);
  const [report, setReport] = useState({ description: "", reason: "", ownerId: "" });
  const [selectedClubId, setSelectedClubId] = useState(null);

  const reasonOptions = [
    { label: 'Discrimination', value: 'discrimination' },
    { label: 'Harassment', value: 'harassment' },
    { label: 'Unsafe activities', value: 'unsafe_activities' },
    { label: 'Misuse of funds', value: 'misuse_of_funds' },
    { label: 'Violation of university policies', value: 'violation_of_policies' },
  ];


  useEffect(() => {
    async function getAllClub() {
      try {
        const res = await api.getAllClub();
        setClubs(res);
      } catch (e) {
        console.log(e);
      }
    }
    getAllClub();
  }, []);

  const submitReport = async (report) => {
    try {
      // Send the report to the server using your API function
      console.log(selectedClubId);
      report.ownerId = user_id;
      await api.SignalerClub(selectedClubId,report);
      toast.success('Report submitted successfully');
      setDisplayReportDialog(false);
    } catch (e) {
      console.log(e);
      toast.error('Error submitting report');
    }
  };

  const handleEdit = (e) => {
    setSelectedEditEntity(e);
  };


  const handleDelete = async (id) => {
    if (
      window.confirm("are you sure that you wanted to delete that Club record ")
    ) {
       
      const response = await api.deleteClub(id);
      if (response.status === 200) {
        toast.success("deleted successfully");



      setClubs([]);
       await getAllClub();
      }

      window.location.reload();
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (<>
      <Toaster />
      {(Role === "ADMIN" || Role === "TEACHER"|| Role === "ALUMNI" ) && (
          <>
            <SeeClub data={rowData} />
            <EditClub data={rowData} />
            <Button
                icon="pi pi-trash"
                rounded
                outlined
                severity="danger"
                onClick={() => handleDelete(rowData)}
            />
            </>
      )
      }
      {Role === "STUDENT"  && (
            <>
              <Button
                  label="Signaler"
                  severity="danger"
                  onClick={() => {
                    setDisplayReportDialog(true)
                    setSelectedClubId(rowData._id)
                  }}
              />
            </>
        )}

      </>);



  };
  const header = (<div className="flex flex-wrap align-items-center justify-content-between gap-2" style={{display:"flex", justifyContent:'flex-end'}}>
    <Link to="/create" style={{ textDecoration: "none" }}>
      <Button variant="contained" size="large">
        Create
      </Button>
    </Link>
  </div>);
  const reportDialogFooter = (
      <>
        <Button
            label="Annuler"
            icon="pi pi-times"
            className="p-button-text"
            onClick={() => setDisplayReportDialog(false)}
        />
        <Button
            label="Signaler"
            icon="pi pi-check"
            className="p-button-text"
            onClick={() => submitReport(report)}
        />
      </>
  );
  return (
      <div className="datatable-container">
        <h2 style={{ color: "#039BE5", fontSize: "Blod", marginTop: "50px" }}>
          All Club
          <ClassIcon />
        </h2>

        <DataTable value={clubs} tableStyle={{ minWidth: '50rem', marginTop: '10px' }} header={header}>
          <Column header="" headerStyle={{ width: '3rem' }}
                  body={(data, options) => options.rowIndex + 1}></Column>
          <Column field="name" header="Name"></Column>
          <Column field="dac" header="Foundation" body={(rowData) => moment(rowData.dac).format("DD-MM-YYYY")}></Column>
          <Column field="president.firstname" header="President Firstname "></Column>
          <Column field="president.lastname" header="President Lastname"></Column>
          <Column field="responsible.firstname" header="Responsible Firstname "></Column>
          <Column field="responsible.lastname" header="Responsible Lastname"></Column>

          <Column body={actionBodyTemplate}></Column>

        </DataTable>
        <Dialog
            header="Report Club"
            visible={displayReportDialog}
            onHide={() => setDisplayReportDialog(false)}
            footer={reportDialogFooter}
        >
          <div className="p-fluid">
            <div className="p-field">
              <label htmlFor="description">Description</label>
              <InputText
                  id="description"
                  value={report.description}
                  onChange={(e) =>
                      setReport({ ...report, description: e.target.value })
                  }
              />
            </div>
            <div className="p-field">
              <label htmlFor="reason">Reason</label>
              <Dropdown
                  id="reason"
                  value={report.reason}
                  options={reasonOptions}
                  onChange={(e) =>
                      setReport({ ...report, reason: e.value })
                  }
                  placeholder="Select a reason"
              />
            </div>
          </div>
        </Dialog>
      </div>






  );
}

export default HomeClub;
