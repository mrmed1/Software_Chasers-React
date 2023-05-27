import React, {useState} from 'react';
import './SummerIntern.css';
import {connectedUser} from "../../Service/auth.service";
import InternModal from "./InternModal";
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {useMutation, useQuery, useQueryClient} from "react-query";
import toast from "react-hot-toast";
import {deleteInternship} from "../../Service/internshipService";
import PFAModal from "../PFA/PFAModal";
import {Icon} from "semantic-ui-react";

function SummerIntern({intern}) {
    const student_id = connectedUser()._id;
    const ROLE = connectedUser().role;
    const queryClient = useQueryClient();
    console.log(intern)

    const emptyData = {
        description: "",
        title: "",
        type: "SUMMER",
        createdBy: student_id,
        company: "",
        country: "",
        technologyId: [],
        univId: "",
    };

const deleteIntern = useMutation((id) => deleteInternship(id), {
        onSuccess: () => toast.success("Internship deleted successfully !"),
        onError: (err) => toast.error(err.message),
        onSettled: () => {
            queryClient.invalidateQueries("internshipsByStudentIdAndType");
        }
})

    function deletehandle(id) {
    //    console.log(intern._id) // display 645e7857e3b7f9a4828d7300
        deleteIntern.mutate(id)
    }

    return (

        ((ROLE === "ALUMNI" || ROLE === "STUDENT")) &&  (
            <>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>

                <InternModal
                    type={"SUMMER"}
                    iconName={"add"}
                    add={"addsummer"}
                    data={emptyData}
                    student_id={student_id}
                />    </div>
                {intern.map((intern) => (
                    <Card  title={intern?.title} subTitle={intern?.company} className="p-mb-3" style={{marginTop:"15px"}}>
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
                            <div className="p-col-6 p-md-4" style={{display:"flex" , gap:"20px", justifyContent:"center"}}>
                                <InternModal

                                    type={"SUMMER"}
                                    iconName={"pencil"}
                                    add={"updatesummer"}
                                    data={intern}
                                    student_id={student_id}
                                />

                                <Icon
                                    data-test="delete-summerintern"
                                    onClick={() => deletehandle(intern._id)}
                                    name={"delete"}
                                    color="red"
                                    // disabled={add? false : (teacher_id === data?.createdBy._id ? false : true)}
                                    size={"big"}
                                    circular
                                    style={{  cursor: "pointer"}}
                                />
                            </div>

                        </div>
                    </Card>
                ))
                }

            </>

    )   );






}

export default SummerIntern;
