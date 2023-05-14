import {useQuery} from "react-query";
import {fetchMyPFA} from "../../Service/EnseignantServices";
import {Dimmer, Loader, Message} from "semantic-ui-react";
import {Toaster} from "react-hot-toast";
import PFAList from "../../components/PFA/PFAList";
import React from "react";
import {GetMyPFE} from "../../Service/internshipService";
import ListPFE from "../../components/PFE/ListPFE";


export default function MyPFE()
{
const { data, isLoading, error } = useQuery("PFEList", GetMyPFE);

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
                {error?.response?.data?.message || error.message}
            </Message.Header>

        </Message>
    );
console.log(data)
return (
    <>
        <h1 style={{color: "darkcyan"}}>MY PFE</h1>
        <Toaster />
        <ListPFE data={data} />
    </>
);
}

