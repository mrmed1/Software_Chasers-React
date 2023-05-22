import {useQuery, useQueryClient} from "react-query";
import {getInternshipsByStudentIdAndType} from "../../Service/internshipService";
import {Dimmer, Loader, Message} from "semantic-ui-react";
import React from "react";
import {Toaster} from "react-hot-toast";
import SummerIntern from "../../components/InternshipStudent/SummerIntern";
import PFEIntern from "../../components/InternshipStudent/PFEIntern";


export default function InsertPFEIntern() {
    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery('internshipsByStudentIdAndType', () => getInternshipsByStudentIdAndType('PFE'));
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
    return (
        <>
            <Toaster />
            <h1>PFE Internship</h1>
            <PFEIntern intern={data} />
        </>
    )
}