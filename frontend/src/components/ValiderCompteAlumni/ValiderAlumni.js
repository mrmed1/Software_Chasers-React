import React, { useEffect, useState} from "react";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import toast, {Toaster} from "react-hot-toast";
import {GetAlumnisWaiting,GetAlumnisRejected,GetAlumnisAccepted, ValiderCompteAlumni} from "../../Service/AdminService"
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";

export default function ValiderAlumni() {

    const [alumniList, setAlumniList] = useState([]);
    const [alumniAcceptedList, setAlumniAcceptedList] = useState([]);
    const [alumniRejectedList, setRejectedAlumniList] = useState([]);
    const [selectedAlumni, setSelectedAlumni] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [showButton, setShowButton] = useState(true);

    useEffect(() => {
        setIsLoading(false);
        GetAlumnisWaiting().then(data => {
            setAlumniList(data);
        });
        GetAlumnisAccepted().then(data => {
            setAlumniAcceptedList(data);
        });
        GetAlumnisRejected().then(data => {
            setRejectedAlumniList(data);
        });
    }, []);
    async function handelConfirm(value) {
        const updatedAlumni = {...selectedAlumni, isValidate: value}; // Copie de l'objet Alumni sélectionné
        setSelectedAlumni(updatedAlumni); // Mise à jour de l'objet Alumni sélectionné
        await ValiderCompteAlumni(updatedAlumni);
        if (value === 1) {
            toast.success('Alumni Confirmed with succes !');
        }
        if (value === 2) {
            toast.error('Alumni Rejected with succes !');
        }
        try {
            setSelectedAlumni(null);
            const [updatedWaiting, updatedAccepted, updatedRejected] = await Promise.all([
                GetAlumnisWaiting(),
                GetAlumnisAccepted(),
                GetAlumnisRejected()]);
            setAlumniList(updatedWaiting);
            setAlumniAcceptedList(updatedAccepted);
            setRejectedAlumniList(updatedRejected);
        }catch (error){
            console.log(error);
        }

    }

    function showAlumniDetails(rowData) {
        setSelectedAlumni(rowData);
        setShowButton(true);

    }
    function showAlumniDetailsSansBouton(rowData) {
        setSelectedAlumni(rowData);
        setShowButton(false);
    }
    const actionBodyTemplate = (rowData) => {
        return (<>
            <Button icon="pi pi-eye" rounded outlined severity="primary"
                   onClick={() => showAlumniDetails(rowData)}
            />
        </>);
    }

        const actionBodyTemplateWithoutButton = (rowData) => {
            return (<>
                <Button icon="pi pi-eye" rounded outlined severity="primary"
                        onClick={() => showAlumniDetailsSansBouton(rowData)}
                />
            </>);

    };
    const actionBody = (type) => {
        let color = '';
        switch (type) {
            case 'waiting...':
                color = 'info';
                break;
            case 'Accepted':
                color = 'success';
                break;
            case 'Rejected':
                color = 'danger';
                break;

        }
        return (
            <Button  label={type}   severity={color} style={{ marginRight: '5px' ,pointerEvents : "none"}}  />

        );
    };

    return (<div className="card">
        <Toaster/>
        <h1 className="titre">List of Alumni</h1>
        <>
        {isLoading ?
            <p>Loading...</p>:
            <div className="datatable-container">
                <h3 style={{color :"#039BE5",fontSize:"Blod",marginTop:"50px"}}>List of alumni awaiting validation
                    <i className="pi pi-clock" style={{ marginLeft:"5px", fontSize: '1,9rem' , color:"#039BE5" }}></i>
                </h3>
                <DataTable value={alumniList} tableStyle={{ minWidth: '50rem',marginTop :'10px' }}>
                    <Column header="" headerStyle={{width: '3rem'}}
                            body={(data, options) => options.rowIndex + 1}></Column>
                    <Column field="firstname" header="FirstName"></Column>
                    <Column field="lastname" header="Last Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="promotion" header="Promotion"></Column>

                    <Column body={(rowData) => actionBody('Waiting...')}></Column>

                    <Column body={actionBodyTemplate}></Column>
                </DataTable>
                {/*  Accepted list*/}
                <h3 style={{color :"#43A047",fontSize:"Blod",marginTop:"50px"}}>
                    List of alumni Accepted
                    <i className="pi pi-check-circle" style={{ marginLeft:"5px", fontSize: '1,9rem' , color:"#43A047" }}></i>
                </h3>
                <DataTable value={alumniAcceptedList} tableStyle={{ minWidth: '50rem',marginTop :'10px' }} >
                    <Column header="" headerStyle={{width: '3rem'}}
                            body={(data, options) => options.rowIndex + 1}></Column>
                    <Column field="firstname" header="FirstName"></Column>
                    <Column field="lastname" header="Last Name"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="promotion" header="Promotion"></Column>

                    <Column body={(rowData) => actionBody('Accepted')}></Column>

                    <Column body={actionBodyTemplateWithoutButton}></Column>
                </DataTable>
                {/*  Rejected list*/}
                <h3 style={{color :"#C62828",fontSize:"Blod",marginTop:"50px"}}>List of alumni Rejected
                    <i className="pi pi-times-circle" style={{ marginLeft:"5px", fontSize: '1,9rem' , color:"#C62828" }}></i>
                </h3>
                    <DataTable value={alumniRejectedList} tableStyle={{ minWidth: '50rem',marginTop :'10px' }} >
                        <Column header="" headerStyle={{width: '3rem'}}
                                body={(data, options) => options.rowIndex + 1}></Column>
                        <Column field="firstname" header="FirstName"></Column>
                        <Column field="lastname" header="Last Name"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="promotion" header="Promotion"></Column>
                        <Column body={(rowData) => actionBody('Rejected')}></Column>
                        <Column body={actionBodyTemplateWithoutButton}></Column>
                    </DataTable>
                {/* dialog */}
                <Dialog  className="dialog-container" header="All Details" visible={selectedAlumni !== null} onHide={() => setSelectedAlumni(null)} >
                    {selectedAlumni && (
                        <>
                            <p><strong>First Name:</strong> {selectedAlumni.firstname}</p>
                            <p><strong>Last Name:</strong> {selectedAlumni.lastname}</p>
                            <p><strong>Email:</strong> {selectedAlumni.email}</p>
                            <p><strong>Phone:</strong> {selectedAlumni.phone}</p>
                            <p><strong>Level:</strong> {selectedAlumni.level}</p>
                            <p><strong>Class:</strong> {selectedAlumni.class}</p>
                            <p><strong>Date Of Birth:</strong> {selectedAlumni.dob}</p>
                            <p><strong>Promotion:</strong> {selectedAlumni.promotion}</p>
                            <p><strong>Date Of Graduation:</strong> {selectedAlumni.dog}</p>
                            <p><strong>Date Of First Hire:</strong> {selectedAlumni.doh}</p>
                            <p><strong>Login:</strong> {selectedAlumni.login}</p>
                            {showButton && (
                                <div className="p-dialog-footer">
                                    <Button  label="Confirmed" icon="pi pi-check" severity="success" outlined onClick={()=> handelConfirm(1)}/>
                                    <Button  label="Reject" icon="pi pi-times" severity="danger" outlined onClick={()=> handelConfirm(2)}/>
                                </div>
                            )}
                        </>
                    )}
                </Dialog>
                <style jsx>{`
                      .dialog-container .p-dialog-footer {
                            display: flex;
                            justify-content: flex-end;
                            align-items: center;
                            padding: 1rem;
                            gap: 1rem;
                          }
                        
                          .dialog-container .p-button {
                            flex-basis: 80%;
                            width: 250px;
                          }
                          
                          .titre{
                            text-align: center;
                            color: #1e88e5;
                            margin-bottom: 10px;
                          }
                        `} </style>
            </div>
        }
        </>
    </div>);
}