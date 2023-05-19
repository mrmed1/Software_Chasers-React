import * as api from "../../Service/SouhailaTasksServer";
import toast, {Toaster} from "react-hot-toast";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import ClassIcon from '@mui/icons-material/Class';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {connectedUser} from "../../Service/auth.service";
import { RadioButton } from 'primereact/radiobutton';
import {useQuery, useQueryClient} from "react-query";
import {getOffreById} from "../../Service/SouhailaTasksServer";



export default function CrudOffres(){

    const user_id = connectedUser()._id;

    const [offerCONSEIL, setOfferCONSEIL] = useState([]);
    const [offerOPPORTUNITE, setOfferOPPORTUNITE] = useState([]);
    const [offerEMPLOI, setOfferEMPLOI] = useState([]);
    const [deleteOfferDialog, setDeleteOfferDialog] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [deletedOffer, setDeletedOffer] = useState(null);
    const [editedOffer, setEditedOffer] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const[newOffer, setNewOffer] = useState({
        title: '',
        description: '',
        owner: user_id,
        type: '',

    });

    const queryClient = useQueryClient();

    const { data, error } = useQuery('offrebyid', () => getOffreById(selectedOffer._id));

    const openEditDialog = (offer) => {
        setEditedOffer(offer);
        setIsEditDialogOpen(true);
    };
    const fetchData = async () => {
        try {
            setLoading(true);

            const offerConseil = await api.getAllOffresCONSEIL();
            setOfferCONSEIL(offerConseil);

            const offerOPPORTUNITE = await api.getAllOffresOPPORTUNITE();
            setOfferOPPORTUNITE(offerOPPORTUNITE);

            const offerEMPLOI = await api.getAllOffresEMPLOIOFFRE();
            setOfferEMPLOI(offerEMPLOI);

            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const openDialog = () => {
        setIsDialogOpen(true);
    };
    const addOffer = async (offer) => {
        try {
            if (newOffer.title === '' || newOffer.description === '' || newOffer.type === '') {
                toast.error('Please fill all fields!');
                return;
            }else {
                const res = await api.addOffre(offer);
                toast.success("Offer added successfully !");
                setIsDialogOpen(false);
                fetchData();
                return res;
            }

        } catch (e) {
            toast.error('Erreur !');
            console.log(e);
        }
    }
    const deleteOfferDialogFooter = (<>
        <Button label="Cancel" icon="pi pi-times" className="p-button-text"
                onClick={() => setDeleteOfferDialog(false)}/>
        <Button label="Delete" icon="pi pi-trash" className="p-button-text"
                onClick={() => deleteOffer(deletedOffer)} autoFocus/>
    </>);
    const deleteOffer = async (offer) => {
        console.log(offer);

        const res = await api.deleteOffre(offer._id).then(() =>
            toast.success("Offer deleted successfully !")
        )
            .catch((err) => toast.error('Erreur !')
        );
        fetchData();
        setDeleteOfferDialog(false);
        return res;


    };
    const updateOffer = async () => {
        try {
            const res = await api.updateOffre(editedOffer);
            toast.success('Offer updated successfully!');
            setIsEditDialogOpen(false);
            fetchData();
            return res;
        } catch (e) {
            toast.error('Error updating offer!');
            console.log(e);
        }
    };
    const actionBodyTemplate = (rowData) => {
            const buttonMargin = { marginRight: '10px' };

            return (
                <div >
                    <Button icon="pi pi-eye" rounded outlined severity="info" style={buttonMargin} onClick={() => showDemandeDetails(rowData)} />

                    <Button icon="pi pi-pencil" rounded outlined severity="success" style={buttonMargin} onClick={() => {
                        openEditDialog(rowData);
                    }} />

                    <Button icon="pi pi-trash" rounded outlined severity="danger" style={buttonMargin} onClick={() => {
                        setDeleteOfferDialog(true);
                        setDeletedOffer(rowData);
                    }} />
                </div>
            );
        };

    function showDemandeDetails(rowData) {
        setSelectedOffer(rowData);
    }

    return (
        <div>
            <Toaster />
            <h1 className="titre"> All Offer</h1>
            <>
                <div className="flex flex-wrap align-items-center justify-content-between gap-2" style={{display:"flex", justifyContent:'flex-end'}}>
                    <Button label="New Offer"
                            onClick={openDialog}
                    />
                </div>

                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="datatable-container">
                    <h3 style={{ color: "#039BE5", fontSize: "Blod", marginTop: "50px" }} >Advice Offer</h3>
                        <DataTable value={offerCONSEIL} tableStyle={{ minWidth: '50rem', marginTop: '10px' }} >
                        <Column header="" headerStyle={{ width: '3rem' }}
                                body={(data, options) => options.rowIndex + 1}></Column>
                        <Column field="title" header="Title"></Column>
                        <Column field="owner.firstname" header="Owner Name "></Column>
                        <Column field="owner.lastname" header="Owner Lastname"></Column>
                        <Column field="type" header="Type Offer"></Column>

                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>
                    <h3 style={{ color: "#039BE5", fontSize: "Blod", marginTop: "50px" }}>Offer Opportunity</h3>
                        <DataTable value={offerOPPORTUNITE} tableStyle={{ minWidth: '50rem', marginTop: '10px' }} >
                            <Column header="" headerStyle={{ width: '3rem' }}
                                    body={(data, options) => options.rowIndex + 1}></Column>
                            <Column field="title" header="Title"></Column>
                            <Column field="owner.firstname" header="Owner Name "></Column>
                            <Column field="owner.lastname" header="Owner Lastname"></Column>
                            <Column field="type" header="Type Offer"></Column>

                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>
                    <h3 style={{ color: "#039BE5", fontSize: "Blod", marginTop: "50px" }}>Job Offer </h3>
                        <DataTable value={offerEMPLOI} tableStyle={{ minWidth: '50rem', marginTop: '10px' }} >
                            <Column header="" headerStyle={{ width: '3rem' }}
                                    body={(data, options) => options.rowIndex + 1}></Column>
                            <Column field="title" header="Title"></Column>
                            <Column field="owner.firstname" header="Owner Name "></Column>
                            <Column field="owner.lastname" header="Owner Lastname"></Column>
                            <Column field="type" header="Type Offer"></Column>

                            <Column body={actionBodyTemplate}></Column>
                        </DataTable>

                        <Dialog className="dialog-container" position={"center"} style={{ width: '30vw',marginTop:'5vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }} visible={selectedOffer !== null} onHide={() => setSelectedOffer(null)}>
                            {selectedOffer && (
                                <>
                                    <h2 style={{ textAlign: 'center', color: '#039BE5', marginBottom: '11px'}}>New Offer</h2>
                                    <div>
                                        <h4 style={{color:'#00838F'}}> <ClassIcon/> Request Information :</h4>
                                    </div><br/>
                                    <div style={{ marginLeft: '15px'}}>
                                        <p><strong>Type of Request :</strong> {selectedOffer.type}</p>
                                        <p><strong>Title:</strong> {selectedOffer.title}</p>
                                        <p><strong>Description :</strong> {selectedOffer.description}</p>
                                    </div>
                                    <div style={{marginTop:'10px'}}>
                                        <h4 style={{color:'#00838F'}}> <AccountCircleIcon/> Owner Information :</h4>

                                    </div>
                                    <br/>
                                    <div style={{ marginLeft: '15px'}}>
                                        <p><strong>First Name:</strong> {selectedOffer.owner.firstname}</p>
                                        <p><strong>Last Name:</strong> {selectedOffer.owner.lastname}</p>
                                        <p><strong>Email:</strong> {selectedOffer.owner.email}</p>
                                        <p><strong>Phone:</strong> {selectedOffer.owner.phone}</p>
                                    </div>
                                </>
                            )}
                        </Dialog>


                        <Dialog
                            visible={isDialogOpen}
                            onHide={() => setIsDialogOpen(false)}
                            header={
                            <h2 style={{ textAlign: 'center', color: '#039BE5', marginBottom: '11px'}}>New Offer</h2>}

                            className="dialog"
                            footer={
                                <div className="dialog-footer">
                                    <Button
                                        label="Save"
                                        outlined
                                        severity="success"
                                        className="dialog-button"
                                        onClick={() => {addOffer(newOffer);}}
                                    />
                                    <Button
                                        label="Cancel"
                                        outlined
                                        severity="danger"
                                        className="dialog-button"
                                        onClick={() => setIsDialogOpen(false)}
                                    />

                                </div>
                            }
                        >
                         <form className="dialog-form">
                                <div className="form-row">
                                    <label htmlFor="title">Title:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="input-field"
                                        onChange={(e) =>
                                            setNewOffer({ ...newOffer, title: e.target.value })}
                                    />
                                </div>

                                <div className="form-row">
                                    <label htmlFor="description">Description:</label>
                                    <textarea
                                        id="description"
                                        className="textarea-field"
                                        onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                                    />
                                </div>

                                <div className="form-row">
                                    <label>Type of Offer:</label>
                                    <br/>
                                    <div className="radio-group">
                                        <RadioButton
                                            inputId="type1"
                                            name="type"
                                            value="CONSEIL"
                                            onChange={(e) => setNewOffer({ ...newOffer, type: e.target.value })}
                                            checked={newOffer.type === "CONSEIL"}
                                        />
                                        <label htmlFor="type1" className="radio-label">
                                            Conseil
                                        </label>

                                        <RadioButton
                                            inputId="type2"
                                            name="type"
                                            value="OPPORTUNITE"
                                            onChange={(e) => setNewOffer({ ...newOffer, type: e.target.value })}
                                            checked={newOffer.type === "OPPORTUNITE"}
                                        />
                                        <label htmlFor="type2" className="radio-label">
                                            Opportunity
                                        </label>

                                        <RadioButton
                                            inputId="type3"
                                            name="type"
                                            value="EMPLOIOFFRE"
                                            onChange={(e) => setNewOffer({ ...newOffer, type: e.target.value })}
                                            checked={newOffer.type === "EMPLOIOFFRE"}
                                        />
                                        <label htmlFor="type3" className="radio-label">
                                            Job
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </Dialog>
                        <Dialog
                            visible={isEditDialogOpen}
                            onHide={() => setIsEditDialogOpen(false)}
                            header={<h2 style={{ textAlign: 'center', color: '#039BE5', marginBottom: '11px' }}>Edit Offer</h2>}
                            className="dialog"
                            footer={
                                <div className="dialog-footer">
                                    <Button
                                        label="Update"
                                        outlined
                                        severity="success"
                                        className="dialog-button"
                                        onClick={() => updateOffer()}
                                    />
                                    <Button
                                        label="Cancel"
                                        outlined
                                        severity="danger"
                                        className="dialog-button"
                                        onClick={() => setIsEditDialogOpen(false)}
                                    />
                                </div>
                            }
                        >
                            <form className="dialog-form">
                                <div className="form-row">
                                    <label htmlFor="title">Title:</label>
                                    <input
                                        type="text"
                                        id="title"
                                        className="input-field"
                                        value={editedOffer?.title}
                                        onChange={(e) => setEditedOffer({ ...editedOffer, title: e.target.value })}
                                    />
                                </div>

                                <div className="form-row">
                                    <label htmlFor="description">Description:</label>
                                    <textarea
                                        id="description"
                                        className="textarea-field"
                                        value={editedOffer?.description}
                                        onChange={(e) => setEditedOffer({ ...editedOffer, description: e.target.value })}
                                    />
                                </div>

                                <div className="form-row">
                                    <label>Type of Offer:</label>
                                    <br />
                                    <div className="radio-group">
                                        <RadioButton
                                            inputId="type1"
                                            name="type"
                                            value="CONSEIL"
                                            onChange={(e) => setEditedOffer({ ...editedOffer, type: e.target.value })}
                                            checked={editedOffer?.type === 'CONSEIL'}
                                        />
                                        <label htmlFor="type1" className="radio-label">
                                            Conseil
                                        </label>

                                        <RadioButton
                                            inputId="type2"
                                            name="type"
                                            value="OPPORTUNITE"
                                            onChange={(e) => setEditedOffer({ ...editedOffer, type: e.target.value })}
                                            checked={editedOffer?.type === 'OPPORTUNITE'}
                                        />
                                        <label htmlFor="type2" className="radio-label">
                                            Opportunity
                                        </label>

                                        <RadioButton
                                            inputId="type3"
                                            name="type"
                                            value="EMPLOIOFFRE"
                                            onChange={(e) => setEditedOffer({ ...editedOffer, type: e.target.value })}
                                            checked={editedOffer?.type === 'EMPLOIOFFRE'}
                                        />
                                        <label htmlFor="type3" className="radio-label">
                                            Job
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </Dialog>
                        <Dialog visible={deleteOfferDialog} header="Confirmation" modal style={{width: '350px'}}
                                footer={deleteOfferDialogFooter} onHide={() => setDeleteOfferDialog(false)}>
                            <div className="p-d-flex p-ai-center">
                                <i className="pi pi-exclamation-triangle p-mr-3" style={{fontSize: '2rem'}}/>
                                <span>Are you sure you want to delete this Offer?</span>
                            </div>
                        </Dialog>
                        <style jsx>{`
                          .titre{
                            text-align: center;
                            color: #1e88e5;
                            margin-bottom: 10px;
                          }
                          .dialog {
                            width: 600px;
                          }

                          .dialog-footer {
                            display: flex;
                            justify-content: flex-end;
                            margin-top: 1.5rem;
                          }

                          .dialog-button {
                            margin-left: 0.5rem;
                          }

                          .dialog-form {
                            display: flex;
                            flex-direction: column;
                            gap: 1.5rem;
                          }

                          .form-row {
                            display: flex;
                            flex-direction: column;
                          }

                          .input-field,
                          .textarea-field {
                            width: 100%;
                            padding: 0.5rem;
                            border: 1px solid #ccc;
                            border-radius: 4px;
                          }

                          .radio-group {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 1rem;
                          }

                          .radio-label {
                            display: inline-block;
                            margin-right: 1rem;
                            font-weight: 500;
                          }

                        `} </style>
                    </div>
                )}
            </>
        </div>

    );
}
