import {useQuery, useQueryClient} from "react-query";
import {getInternshipsByStudentId, getInternshipsByStudentIdAndType} from "../../Service/internshipService";
import {Dimmer, Loader, Message} from "semantic-ui-react";
import {Toaster} from "react-hot-toast";
import * as helper from "../../Helpers/helper";
import React, {useState} from "react";
import SummerIntern from "../../components/InternshipStudent/SummerIntern";

export default function InsertSummerIntern() {

    const queryClient = useQueryClient();
    // Define state variables for the form inputs
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [country, setCountry] = useState('');
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);

    const options = helper.competenceList.map((competence) => ({
        label: competence.text,
        value: competence.value,
    }));
    // Define function to handle submit button click
    const handleSubmit = (e) => {
        e.preventDefault();
    };


    // Define function to handle technologies multi-select change
    const handleTechnologyChange = (selected) => {
        setSelectedTechnologies(selected);
    };
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
    return (
        <>
            <Toaster />
            <SummerIntern data={data} />
        </>
    );
}