import {useQuery} from "react-query";
import {GetAllPFE, getInternshipsByStudentIdAndType} from "../../Service/internshipService";
import {Dimmer, Loader} from "semantic-ui-react";
import React from "react";
import ListPFE from "../../components/PFE/ListPFE";


export default function SeeListPFE() {
    const { data, isLoading, error } = useQuery('GetAllPFE', GetAllPFE);
    if (isLoading)
        return (
            <Dimmer active inverted>
                <Loader size="big">Loading...</Loader>
            </Dimmer>
        );

    console.log(data)
    return (
        <div>
            <h1 style={{color: "darkcyan"}}>List PFE</h1>
            <ListPFE data={data} />
        </div>
    )
}