import React, {useRef, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {Modal, Icon} from "semantic-ui-react";
import {
    createInternship,
    createSummerInternship,
    getuniv, updatePFA
} from "../../Service/internshipService";
import {InputText} from "primereact/inputtext";
import {MultiSelect} from "primereact/multiselect";
import {Button} from "primereact/button";
import * as helper from "../../Helpers/helper"
import {competenceList} from "../../Helpers/helper";

import {Dropdown} from 'primereact/dropdown';
import toast from "react-hot-toast";

export default function InternModal({data, student_id, add, type, iconName}) {
    // Define state variables for the form inputs
    const [description, setDescription] = useState(data?.description || '');
    const [title, setTitle] = useState(data?.title || '');
    const [company, setCompany] = useState(data?.company || '');
    const [country, setCountry] = useState(data?.country || '');
    const [selectedTechnologies, setSelectedTechnologies] = useState(data?.technologyId || []);

    // Define function to handle submit button click
    const saveSummerIntern = useMutation(({summerintern}) => createInternship(summerintern), {
        onSuccess: () => toast.success(type + " Internship  Created successfully !"),
        onError: (err) => toast.error(err.message),
        onSettled: () => {
            queryClient.invalidateQueries("internshipsByStudentIdAndType");
        },
    });

    const updateSummerIntern = useMutation(({summerintern}) => updatePFA(summerintern), {
        onSuccess: () => toast.success(type + " Internship  Updated successfully !"),
        onError: (err) => toast.error(err.message),
        onSettled: () => {
            queryClient.invalidateQueries("internshipsByStudentIdAndType");
        }
    });

    // Define function to handle technologies multi-select change
    const handleTechnologyChange = (selected) => {
        setSelectedTechnologies(selected);
    };
    const formRef = useRef(null);


    const queryClient = useQueryClient();

    const {data: currentUniv} = useQuery("currentUniv", getuniv);


    const handleSubmit = (e) => {
        e.preventDefault();

        switch (add) {
            case "addsummer":
                const newSummerIntern = {
                    title,
                    univId: currentUniv?._id,
                    technologyId: selectedTechnologies,
                    country,
                    company,
                    description,
                    type,
                    createdBy: student_id,
                    studentsId: student_id,
                };
                saveSummerIntern.mutate({summerintern: newSummerIntern});
                break;
            case "updatesummer":
                const updatedSummerIntern = {
                    _id: data._id,
                    title,
                    univId: currentUniv?._id,
                    technologyId: selectedTechnologies,
                    country,
                    company,
                    description,
                    type,
                    createdBy: student_id,
                    studentsId: student_id,
                };
                updateSummerIntern.mutate({summerintern: updatedSummerIntern});
                break;
            case "addpfe":
                const newPFEIntern = {
                    title,
                    univId: currentUniv?._id,
                    technologyId: selectedTechnologies,
                    country,
                    company,
                    description,
                    type,
                    createdBy: student_id,
                    studentsId: student_id,

                };
                saveSummerIntern.mutate({summerintern: newPFEIntern});
                break;
            case "updatepfe":
                const updatedPFEIntern = {
                    _id: data._id,
                    title,
                    univId: currentUniv?._id,
                    technologyId: selectedTechnologies,
                    country,
                    company,
                    description,
                    type,
                    createdBy: student_id,
                    studentsId: student_id,
                };
                updateSummerIntern.mutate({summerintern: updatedPFEIntern});
                break;

            default:
                break;
        }
    };


    return (
        <Modal
            trigger={
                <Icon
                    name={iconName}
                    color="blue"
                    // disabled={add? false : (teacher_id === data?.createdBy._id ? false : true)}
                    size={"big"}
                    circular
                    style={{cursor: "pointer"}}
                />
            }
        >
            <Modal.Header>
                {(() => {
                    switch (add) {
                        case "addsummer":
                            return "Add new Summer Internship";
                        case "updatesummer":
                            return "Update Summer Internship";
                        case "addpfe":
                            return "Add new PFE Internship";
                        case "updatepfe":
                            return "Update PFE Internship";
                        default:
                            return "";
                    }
                })()}
            </Modal.Header>
            <Modal.Content>

                <form onSubmit={handleSubmit} ref={formRef}>
                    <div className="form-field">
                        <label htmlFor="title">Title</label>
                        <InputText id="title" defaultValue={data?.title} value={title}
                                   onChange={(e) => setTitle(e.target.value)}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="description">Description</label>
                        <InputText id="description" defaultValue={data?.description} value={description}
                                   onChange={(e) => setDescription(e.target.value)}/>
                    </div>


                    <div className="form-field">
                        <label htmlFor="company">Company</label>
                        <InputText id="company" defaultValue={data?.company} value={company}
                                   onChange={(e) => setCompany(e.target.value)}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="country" className="form-label">
                            Country
                        </label>

                        <Dropdown
                            id="country"
                            defaultValue={data?.country}
                            value={country}
                            options={helper.countryOptions}
                            onChange={(event) => setCountry(event.value)}
                            placeholder="Select a country"
                            optionLabel="label"
                            optionValue="value"
                            className="form-input"
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="technologies">Technologies</label>
                        <MultiSelect
                            defaultValue={data?.technologyId}
                            value={selectedTechnologies}
                            options={competenceList}
                            onChange={(e) => handleTechnologyChange(e.value)}
                            optionLabel="text"
                            placeholder="Select your competences"
                        />
                    </div>

                    <Button type="submit" label="Submit" className="form-submit-button"/>
                </form>


            </Modal.Content>
        </Modal>
    );
}
