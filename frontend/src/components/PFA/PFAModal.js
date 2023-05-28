import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Modal, Form, Dropdown, Icon } from "semantic-ui-react";
import toast from "react-hot-toast";
import { competenceList } from "../../Helpers/helper";
import {
  getuniv,
  createPFA,
  updatePFA,
} from "../../Service/internshipService";

export default function PFAModal({ data, teacher_id, add, iconName }) {
  const [title, setTitle] = useState(data?.title);
  const [description, setDescription] = useState(data?.description);
  const [technologyId, settechnologyId] = useState(data?.technologyId);
  const formRef = useRef(null);



  const queryClient = useQueryClient();

  const { data: currentUniv } = useQuery("currentUniv", getuniv);


  const { mutate, isLoading } = useMutation(({ pfa }) => createPFA(pfa), {
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
  });


  const handleDropdownChange = (event, data) => {
    settechnologyId(data.value);
  };

  const handleSave = (e) => {
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

  };
  return (
    <Modal
      trigger={
        <Icon
          name={iconName}
          color="blue"
          disabled={add? false : (teacher_id === data?.createdBy?._id ? false : true)}
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
        <Form onSubmit={handleSave} ref={formRef}>
          <Form.Group widths="equal">
            <Form.Input
              label="Title"
              placeholder="Enter a Title"
              onChange={(e) => setTitle(e.target.value)}
            //  value={title}
              defaultValue={data?.title}
              required
            />

            
            <Dropdown
              floating
              placeholder="Search Technologies"
              fluid
              multiple
              search
              selection
         //     value={technologyId}
              defaultValue={data.technologyId}
              onChange={handleDropdownChange}
              options={competenceList}
              required
            />
          </Form.Group>
          

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
