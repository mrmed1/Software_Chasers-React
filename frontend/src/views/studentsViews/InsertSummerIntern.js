import {useQuery, useQueryClient} from "react-query";
import {getInternshipsByStudentId, getInternshipsByStudentIdAndType} from "../../Service/internshipService";
import {Dimmer, Loader, Message} from "semantic-ui-react";
import {Toaster} from "react-hot-toast";
import PFAList from "../../components/PFA/PFAList";
import React from "react";
import SummerIntern from "../../components/InternshipStudent/SummerIntern";

export default function InsertSummerIntern() {

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery('internshipsByStudentIdAndType', () => getInternshipsByStudentIdAndType('SUMMER'));
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
            <Toaster />
            <h1>Summer Internship</h1>
            <SummerIntern intern={data} />
        </>
    );
}