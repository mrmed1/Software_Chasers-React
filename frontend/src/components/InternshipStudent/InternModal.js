import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Modal, Form, Dropdown, Icon } from "semantic-ui-react";
import toast from "react-hot-toast";
import { competenceList } from "../../Helpers/helper";
import {
    getuniv
} from "../../Service/internshipService";

export default function InternModal({ data, teacher_id, add, iconName }) {
   /* const [title, setTitle] = useState(data?.title);
    const [description, setDescription] = useState(data?.description);
    const [technologyId, settechnologyId] = useState(data?.technologyId);*/
    const formRef = useRef(null);



    const queryClient = useQueryClient();

    const { data: currentUniv } = useQuery("currentUniv", getuniv);


   /* const { mutate, isLoading } = useMutation(({ pfa }) => createPFA(pfa), {
        onSuccess: () => {
            toast.success("PFA  Created successfully !");
        },
        onError: (err) => {
            toast.error(err.response.data.error);
        },
        onSettled: () => {
            queryClient.invalidateQueries("PFAList");

        },
    });

    const UpdatePFAMutation = useMutation(({ pfa }) => updatePFA(pfa), {
        onSuccess: () => toast.success("PFA  Updated successfully !"),
        onError: (err) => toast.error(err.message),
        onSettled: () => {
            queryClient.invalidateQueries("PFAList");
        },
    });*/


  /*  const handleDropdownChange = (event, data) => {
        settechnologyId(data.value);
    };*/
    const handleSave = (e) => {
        e.preventDefault();
    }



   /* const handleSave = (e) => {
        e.preventDefault();
        const newData = {
            title: title,
            univId:currentUniv?._id ,
            technologyId: technologyId,
            description: description,
            type: "PFA",
            createdBy: teacher_id,
        };

        if (add) {
            try {
                if (currentUniv == null) {
                    return toast.error(
                        "You should wait untill the The admin add a University year"
                    );
                }
                console.log("STATES: ",newData)
                console.log("teacher_id: ",teacher_id)

                mutate({ pfa: newData });

            } catch (err) {
                console.log(err)

            }

        } else {
            try {
                newData._id = data._id;
                console.log("STATES: ",newData)
                console.log("newdata", newData);
                UpdatePFAMutation.mutate({ pfa: newData });
            } catch (error) {
                console.log(error)
            }
        }

    };*/
    return (
        <Modal
            trigger={
                <Icon
                    name={iconName}
                    color="blue"
                    // disabled={add? false : (teacher_id === data?.createdBy._id ? false : true)}
                    circular
                    size={add? "large" : ""}
                    style={{  cursor: "pointer"}}
                />
            }
        >
            <Modal.Header>
                {add ? "Create new PFA internship" : `Update Your PFA  ${data?.title}`}{" "}
            </Modal.Header>
            <Modal.Content>

                <form onSubmit={handleSubmit} ref={formRef}>
                    <div className="form-field">
                        <label htmlFor="title">Title</label>
                        <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="description">Description</label>
                        <InputText id="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>


                    <div className="form-field">
                        <label htmlFor="company">Company</label>
                        <InputText id="company" value={company} onChange={(e) => setCompany(e.target.value)}/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="country" className="form-label">
                            Country
                        </label>
                        <Dropdown
                            id="country"
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
                            id="technologies"
                            options={options}
                            value={selectedTechnologies}
                            onChange={handleTechnologyChange}
                            labelledBy={"Select technologies"}
                        />
                    </div>

                    <Button type="submit" label="Submit" className="form-submit-button"/>
                </form>


            </Modal.Content>
        </Modal>
    );
}
