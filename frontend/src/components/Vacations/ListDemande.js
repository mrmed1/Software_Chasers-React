import { Toaster } from "react-hot-toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import {GetAllDemandeEXPERTCONTRACT, GetAllDemandeVacation} from "../../Service/SouhailaTasksServer";
import ClassIcon from '@mui/icons-material/Class';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function ListDemande() {
    const [isLoading, setIsLoading] = useState(true);
    const [listDemande, setListDemande] = useState([]);

    const [selectedDemande, setSelectedDemande] = useState(null);
    const dob = selectedDemande?.owner?.dob;
    const dateOfBirth = new Date(dob);
    const formattedDob = `${dateOfBirth.getDate()}/${dateOfBirth.getMonth() + 1}/${dateOfBirth.getFullYear()}`;
    const dog = selectedDemande?.owner?.dog;
    const dateOfGraduation = new Date(dog);
    const formattedDog = `${dateOfGraduation.getDate()}/${dateOfGraduation.getMonth() + 1}/${dateOfGraduation.getFullYear()}`;



    useEffect(() => {
        setIsLoading(true);
        GetAllDemandeVacation().then(data => {
            setListDemande(data);
            setIsLoading(false);
        });

    }, []);

    const actionBodyTemplate = (rowData) => {
        return (
            <Button icon="pi pi-eye" rounded outlined severity="primary"
                    onClick={() => showDemandeDetails(rowData)}
            />
        );
    };

    function showDemandeDetails(rowData) {
        setSelectedDemande(rowData);
    }

    return (
        <div>
            <Toaster />
            <h1 className="titre">All Request Vacation & EXPERT CONTRACT</h1>
            <>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="datatable-container">
                        <h3 style={{ color: "#039BE5", fontSize: "Blod", marginTop: "50px" }}>
                            List of Request Vacation
                            <ClassIcon />
                        </h3>
                        <DataTable value={listDemande} tableStyle={{ minWidth: '50rem', marginTop: '10px' }}>
                            <Column header="" headerStyle={{ width: '3rem' }}
                                    body={(data, options) => options.rowIndex + 1}></Column>
                            <Column field="lesson_name" header="Lesson Name"></Column>
                            <Column field="owner.firstname" header="Owner Name "></Column>
                            <Column field="owner.lastname" header="Owner Lastname"></Column>


                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>

                        {/* dialog */}
                        <Dialog className="dialog-container" position={"center"} style={{ width: '30vw',marginTop:'5vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} visible={selectedDemande !== null} onHide={() => setSelectedDemande(null)}>
                            {selectedDemande && (
                                <>
                                    <h2 style={{ textAlign: 'center', color: '#039BE5', marginBottom: '11px'}}>Request Information</h2>
                                    <div>
                                        <h4 style={{color:'#00838F'}}> <ClassIcon/> Request Information :</h4>
                                    </div><br/>
                                    <div style={{ marginLeft: '15px'}}>
                                    <p><strong>Type of Request :</strong> {selectedDemande.type}</p>
                                    <p><strong>Title:</strong> {selectedDemande.title}</p>
                                    <p><strong>Lesson Name:</strong> {selectedDemande.lesson_name}</p>
                                    <p><strong>Description :</strong> {selectedDemande.description}</p>
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <h4 style={{color:'#00838F'}}> <AccountCircleIcon/> Owner Information :</h4>

                                    </div>
                                    <br/>
                                    <div style={{ marginLeft: '15px'}}>
                                    <p><strong>First Name:</strong> {selectedDemande.owner.firstname}</p>
                                    <p><strong>Last Name:</strong> {selectedDemande.owner.lastname}</p>
                                    <p><strong>Email:</strong> {selectedDemande.owner.email}</p>
                                    <p><strong>Phone:</strong> {selectedDemande.owner.phone}</p>
                                    <p><strong>Date Of Birth:</strong> {formattedDob}</p>
                                    <p><strong>Promotion:</strong> {selectedDemande.owner.promotion}</p>
                                    <p><strong>Date Of Graduation:</strong> {formattedDog}</p>
                                    </div>
                                    </>
                            )}
                        </Dialog>
                        <style jsx>{`
                          .titre{
                            text-align: center;
                            color: #1e88e5;
                            margin-bottom: 10px;
                          }
                        `} </style>
                    </div>
                )}
            </>
        </div>
    );
}
