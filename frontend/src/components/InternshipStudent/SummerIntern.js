import React, {useState} from 'react';
import './SummerIntern.css';
import {connectedUser} from "../../Service/auth.service";
import PFAModal from "../PFA/PFAModal";

function SummerIntern({data}) {
    const student_id = connectedUser()._id;
    const ROLE = connectedUser().role;


    const emptyData = {
        description: "",
        title: "",
        type: "SUMMER",
        createdBy: student_id,
        company:"",
        country:"",
        technologyId: [],
        univId: "",
    };

    return (

        (ROLE === "ALUMNI" && data?.length === 0) && (


                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                        {(ROLE === "STUDENT" || ROLE === "ALUMNI") && (
                            <PFAModal
                                add={true}
                                iconName={"pencil"}
                                data={emptyData}
                                student_id={student_id}
                            />
                        )}
                    </div>
        )
    );










}

export default SummerIntern;
