import {useQuery} from "react-query";
import {fetchValidatedResponsablePFA} from "../../Service/studentService";
import {Dimmer, Loader, Message} from "semantic-ui-react";
import {Toaster} from "react-hot-toast";
import PFAList from "../../components/PFA/PFAList";
import React from "react";
import {GetPFEforPick} from "../../Service/internshipService";
import ListPFE from "../../components/PFE/ListPFE";


export default function PickPFETeacher() {
    const { data, isLoading,error } = useQuery("GetPFEforPick", GetPFEforPick);
    console.log("GetPFEforPick",data)
    if (isLoading)
        return (
            <Dimmer active inverted>
                <Loader size="big">Loading...</Loader>
            </Dimmer>
        );
    if (error)
        return (
            <Message negative floating size="big" attached="top">
                <Message.Header>
                    {error?.response?.data?.message || error?.message}
                </Message.Header>

            </Message>
        )
    return (
        <>

            <Toaster />
            {data && <ListPFE data={data}/> }
        </>

    )
}