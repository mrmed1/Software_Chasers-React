import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Form, Dropdown, Icon, Select } from "semantic-ui-react";
import { addEducation, updateEducation } from "../../Service/studentService";
import toast from "react-hot-toast";
import { clubList, competenceList } from "../../Helpers/helper";

export default function PFAModal({ data, teacher_id, add, iconName }) {
  const [title, setTitle] = useState(data?.title);
  const [studentsMembers, setStudentsMembers] = useState(data?.nbStudent);
  const [description, setDescription] = useState(data?.description);
  const [univId, setUnivId] = useState(data?.univId);
  const [technologyId, settechnologyId] = useState(data?.technologyId);

  const queryClient = useQueryClient();
  const { mutate, isLoading: isUpdating } = useMutation();
  // ({ Education, _id }) => addEducation(Education, _id),
  // {
  //   onSuccess: (data) => {
  //     toast.success("Education  Created successfully !");
  //   },
  //   onError: () => {
  //     toast.error("Oups somthing went wrong !");
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries("cv");
  //   },
  // }

  const UpdateEducationMutation = useMutation();
  // ({ Education, _id }) => updateEducation(Education, _id),
  // {
  //   onSuccess: () => toast.success("Education  Updated successfully !"),
  //   onError: (err) => toast.error(err.message),

  //   onSettled: () => {
  //     queryClient.invalidateQueries("cv");
  //   },
  // }

  const handleDropdownChange = (event, data) => {
    settechnologyId(data.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newData = {
      title:title,
      univId:univId,
      technologyId:technologyId,
      description:description,
      type :"PFA",
      studentsId:studentsMembers
    };
   

    if (add) {
      try {
        //  mutate({ Education: newData, _id: _id });
      } catch (err) {
        alert("Oups!");
      }
    } else {
      try {
        newData._id = data._id;
        newData.createdBy=teacher_id
        console.log("newdata",newData)
        //  UpdateEducationMutation.mutate({ Education: newData, _id: _id });
      } catch (error) {
        alert("Ouuuuuups  !");
      }
    }
  };
  return (
    <Modal
      trigger={
        <Icon
          name={iconName}
          color="blue"
          disabled={teacher_id !== data?.createdBy}
          circular
          style={{ float: "right", cursor: "pointer" }}
        />
      }
    >
      <Modal.Header>
        {add ? "Create new PFA internship" : `Update Your PFA  ${data?.title}`}{" "}
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSave}>
        <Form.Group widths="equal">
        <Form.Input
            label="Title"
            placeholder="Enter a Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            defaultValue={data?.title}
            required
        />
        

        <Form.Select
          fluid
        //  options={jobTypesList}
          label="Universal Year"
          placeholder="job Type"
      //   onChange={handleJobTypeChange}
          required
     //     value={jobType}
          defaultValue={data?.univId}
        />
         <Dropdown
             floating
              placeholder="Search Technologies"
              fluid
              multiple
              search
              selection
              value={technologyId}
              defaultValue={data.technologyId}
              onChange={handleDropdownChange}
               options={competenceList}
              required
            />
      </Form.Group>
      <Form.Input
            type="Number"
            label="Student Number"
            placeholder="Enter a Number of studebts"
            onChange={(e) => setStudentsMembers(e.target.value)}
            value={studentsMembers}
            defaultValue={data?.studentsId.length}
            required
        />
         
        
      <Form.TextArea
              label="Description "
              placeholder="Tell us more about The Internship ."
              onChange={(e) => setDescription(e.target.value)}
              required
              defaultValue={description}
            />
           
          <Form.Button
            //   loading={isUpdating}
            //   disabled={isUpdating}
            color={"blue"}
          >
            Submit
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
