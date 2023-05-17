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
import { Card } from 'primereact/card';

import { Link } from "react-router-dom";
 
import SeeClub from "./SeeClub";
import EditClub from "./EditClub";
import { InputTextarea } from 'primereact/inputtextarea';
import {Toaster, toast} from "react-hot-toast"
import {blockClub, getAllClub, SignalerClub} from "../../Service/ClubService";
import moment from "moment/moment";
import ClassIcon from "@mui/icons-material/Class";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {connectedUser} from "../../Service/auth.service";
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import {useMutation, useQuery, useQueryClient} from "react-query";
import {GetMyPFE, togglePFE} from "../../Service/internshipService";
function HomeClub() {
  const Role = connectedUser().role;
  const user_id = connectedUser()._id;
  const [displayReportDialog, setDisplayReportDialog] = useState(false);
  const [report, setReport] = useState({ description: "", reason: "", ownerId: "" });
  const [selectedClubId, setSelectedClubId] = useState(null);
  const [displaySignalDialog, setDisplaySignalDialog] = useState(false);
  const [listSignal, setListSignal] = useState([]);
  const queryClient = useQueryClient();
  const reasonOptions = [
    { label: 'Discrimination', value: 'discrimination' },
    { label: 'Harassment', value: 'harassment' },
    { label: 'Unsafe activities', value: 'unsafe_activities' },
    { label: 'Misuse of funds', value: 'misuse_of_funds' },
    { label: 'Violation of university policies', value: 'violation_of_policies' },
  ];
  const { data, isLoading, error } = useQuery("getAllClub", getAllClub);
  const [clubs, setClubs] = useState(data);


  const submitReport = async (report) => {
    try {
      // Send the report to the server using your API function
      report.ownerId = user_id;
      await api.SignalerClub(selectedClubId,report);
      toast.success('Report submitted successfully');
      setDisplayReportDialog(false);
    } catch (e) {
      console.log(e);
      toast.error('Error submitting report');
    }
  };
  const submitBlock = useMutation(
      (id) => blockClub(id),
      {
        onSuccess: (data) =>
            toast.success('Club blocked successfully'),
        onError: (err) => toast.error('Error blocking club'),
        onSettled: () => queryClient.invalidateQueries("getAllClub"),
      }
  );

  const handleDelete = async (id) => {
    if (
      window.confirm("are you sure that you wanted to delete that Club record ")
    ) {
       
      const response = await api.deleteClub(id);
      if (response.status === 200) {
        toast.success("deleted successfully");



     // setClubs([]);
       await getAllClub();
      }

      window.location.reload();
    }
  };
    const setheader = (rowData) => {
        const listexist = rowData?.props?.value?.map((signal) => {
            return signal?.list_signals?.length > 0
        });

        if (listexist?.some(el => el) ) {
            return "Reports";
        }
    }
  const signalsdialog = (rowData) => {
    return (

      <>
        {(rowData?.list_signals?.length > 0) && (

            <Button
                label="List signals"
                severity="danger"
                outlined
                onClick={() => {
                  setDisplaySignalDialog(true);
                  setListSignal(rowData.list_signals);
                  setSelectedClubId(rowData._id);
                }}
            />


        )}
        {(rowData?.is_banned) && (
          <Button       label="Unblock"
                        severity="danger" outlined
                        onClick={() => { submitBlock.mutate(rowData._id) }} />

        )}

      </>
    );
  }

  const SignalDialog = ({ visible, onHide, signals }) => {
    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            header="Reports"
            footer={
                <>
                  <Button label="Ban" severity="danger" onClick={() => {
                    submitBlock.mutate(selectedClubId);
                    setDisplaySignalDialog(false);
                  }} />
                  <Button label="Close" onClick={onHide} />
                </>
            }
            style={{ width: '500px' }}
        >
          {signals.map((signal) => (
              <Card key={signal._id} title={signal.reason} style={{marginTop:"15px"}}>
                <div><strong>Description :</strong>{signal.description}</div>
                <div><strong>Owner :</strong>{signal.owner.firstname} {signal.owner.lastname}</div>
              </Card>
          ))}
        </Dialog>
    );
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
                onClick={() => handleDelete(rowData._id)}
            />
            </>
      )
      }
      {Role === "STUDENT"  && (
            <>
              <Button
                  label="Report"
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
  const header = (

      (Role=== "ADMIN") && (
          <div className="flex flex-wrap align-items-center justify-content-between gap-2" style={{display:"flex", justifyContent:'flex-end'}}>
            <Link to="/create" style={{ textDecoration: "none" }}>
              <Button variant="contained" size="large">
                Create
              </Button>
            </Link>
          </div>
          )
  );
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

        <DataTable value={data} tableStyle={{ minWidth: '50rem', marginTop: '10px' }} header={header}>
          <Column header="" headerStyle={{ width: '3rem' }}
                  body={(data, options) => options.rowIndex + 1}></Column>
          <Column field="name" header="Name"></Column>
          <Column field="dac" header="Foundation" body={(rowData) => moment(rowData.dac).format("DD-MM-YYYY")}></Column>
          <Column field="president.firstname" header="President Firstname "></Column>
          <Column field="president.lastname" header="President Lastname"></Column>
          <Column field="responsible.firstname" header="Responsible Firstname "></Column>
          <Column field="responsible.lastname" header="Responsible Lastname"></Column>
          {(Role === "ADMIN" ) && (
              <Column header={setheader} body={signalsdialog}></Column>
          )}
          <Column header="Actions" style={{display:"flex"}} body={actionBodyTemplate}></Column>
        </DataTable>
        <Dialog
            header="Report Club"
            style={{ width: '600px' }}
            visible={displayReportDialog}
            onHide={() => setDisplayReportDialog(false)}
            footer={reportDialogFooter}
        >
          <div className="p-fluid">

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
            <div className="p-field">
              <label htmlFor="description">Description</label>
              <InputTextarea
                  id="description"
                  value={report.description}
                  onChange={(e) =>
                      setReport({ ...report, description: e.target.value })
                  }
              />
            </div>
          </div>
        </Dialog>
        <SignalDialog
            visible={displaySignalDialog}
            onHide={() => setDisplaySignalDialog(false)}
            signals={listSignal}
        />
      </div>






  );
}

export default HomeClub;
