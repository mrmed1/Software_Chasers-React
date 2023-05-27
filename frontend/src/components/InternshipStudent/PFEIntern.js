import {connectedUser} from "../../Service/auth.service";
import {useMutation, useQueryClient} from "react-query";
import {deleteInternship} from "../../Service/internshipService";
import toast from "react-hot-toast";
import InternModal from "./InternModal";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import React, {useState} from "react";
import {Icon} from "semantic-ui-react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

 export default function PFEIntern({intern}) {
    const student_id = connectedUser()._id;
    const ROLE = connectedUser().role;
    const queryClient = useQueryClient();
    const [internToDelete, setInternToDelete] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const emptyData = {
        description: "",
        title: "",
        type: "PFE",
        createdBy: student_id,
        company: "",
        country: "",
        technologyId: [],
        univId: "",
    };
     const havetacher = intern[0]?.teacherId || null;
    const deleteIntern = useMutation((id) => deleteInternship(id), {
        onSuccess: () => toast.success("Internship deleted successfully!"),
        onError: (err) => toast.error(err.message),
        onSettled: () => {
            queryClient.invalidateQueries("internshipsByStudentIdAndType");
        }
    });

    function deletehandle(id) {
        setInternToDelete(id);
        setShowConfirmDialog(true);
    }

    const confirmDelete = () => {
        deleteIntern.mutate(internToDelete);
        setShowConfirmDialog(false);
    };

    const cancelDelete = () => {
        setInternToDelete(null);
        setShowConfirmDialog(false);
    };

    return (

        ((ROLE === "ALUMNI" || ROLE === "STUDENT")) && ( intern.length === 0 ) && (


                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <InternModal
                        type={"PFE"}
                        iconName={"add"}
                        add={"addpfe"}
                        data={emptyData}
                        student_id={student_id}
                    />
                </div>


          ) ||

          ((ROLE === "ALUMNI" || ROLE === "STUDENT")) && ( intern.length !== 0 ) && (
            <>

                {intern.map((intern) => (
                    <Card title={intern?.title} subTitle={intern?.company} className="p-mb-3" style={{marginTop:"15px"}}>
                        <div className="p-grid p-fluid">
                            <div className="p-col-12 p-md-4" style={{marginTop:"10px"}}>
                                <b className="b_title">Description:</b> {intern?.description}
                            </div>
                            <div className="p-col-12 p-md-4" style={{marginTop: "10px"}}><b
                                className="b_title">Company:</b> {intern?.company}
                            </div>
                            <div className="p-col-12 p-md-4" style={{marginTop: "10px"}}><b
                                className="b_title">Country:</b> {intern?.country}
                            </div>
                            <div className="p-col-12 p-md-4" style={{marginTop: "10px"}}>
                                <b className="b_title">Created By:</b> {intern?.createdBy?.firstname} {intern?.createdBy?.lastname}
                            </div>
                            <div className="p-col-12 p-md-4" style={{marginTop:"10px"}}>
                                <b className="b_title">Technologies Used:</b> {intern?.technologyId?.join(", ")}
                            </div>
                            <br/>
                            <br/>
                            <br/>

                            {havetacher == null && (
                                <div className="p-col-6 p-md-4" style={{display:"flex" , gap:"20px", justifyContent:"center"}}>
                                    <InternModal
                                        type={"PFE"}
                                        iconName={"pencil"}
                                        add={"updatepfe"}
                                        data={intern}
                                        student_id={student_id}
                                    />

                                    <Icon
                                        onClick={() => deletehandle(intern._id)}
                                        name={"delete"}
                                        color="red"
                                        // disabled={add? false : (teacher_id === data?.createdBy._id ? false : true)}
                                        size={"big"}
                                        circular
                                        data-test="delete-intern"
                                        style={{  cursor: "pointer"}}
                                    />
                                </div>
                            )
                            }

                        </div>
                    </Card>
                ))}
                <Dialog
                    open={showConfirmDialog}
                    onClose={() => setShowConfirmDialog(false)}
                >
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this internship?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowConfirmDialog(false)}>Cancel</Button>
                        <Button data-test='deletepfebtn' onClick={() => confirmDelete(internToDelete)} color="error" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
            )


    );
}