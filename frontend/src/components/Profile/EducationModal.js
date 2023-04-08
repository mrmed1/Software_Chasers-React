import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Form, Dropdown, Icon } from "semantic-ui-react";
import { clubList } from "../../Helpers/helper";
import { addEducation, updateEducation } from "../../Service/studentService";
import toast from "react-hot-toast";
export default function EducationModal({ data, add, _id, iconName }) {
  const [diploma, setDiploma] = useState(data.diploma);
  const [university, setUniversity] = useState(data.startDate);
  const [startDate, setStartDate] = useState(data.startDate);
  const [endDate, setEndDte] = useState(data.endDate);
  const [clubs, setClubs] = useState(data.clubs);

  const queryClient = useQueryClient();

  const { mutate, isLoading: isUpdating } = useMutation(
    ({ Education, _id }) => addEducation(Education, _id),
    {
      onSuccess: (data) => {
        toast.success("Education  Created successfully !");
      },
      onError: () => {
        toast.error("Oups somthing went wrong !");
      },
      onSettled: () => {
        queryClient.invalidateQueries("cv");
      },
    }
  );

  const UpdateEducationMutation = useMutation(
    ({ Education, _id }) => updateEducation(Education, _id),
    {
      onSuccess: () => toast.success("Education  Updated successfully !"),
      onError: (err) => toast.error(err.message),

      onSettled: () => {
        queryClient.invalidateQueries("cv");
      },
    }
  );

  const handleDropdownChange = (event, data) => {
    setClubs(data.value);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const newData = {
      diploma: diploma,
      university: university,
      startDate: startDate,
      endDate: endDate,
      clubs: clubs,
    };

    if (add) {
      try {
        mutate({ Education: newData, _id: _id });
      } catch (err) {
        alert("Oups!");
      }
    } else {
      try {
        newData._id = data._id;
        UpdateEducationMutation.mutate({ Education: newData, _id: _id });
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
          size="big"
          style={{ float: "right", cursor: "pointer", marginLeft: "8px" }}
        />
      }
    >
      <Modal.Header>
        {add
          ? "Create new Experience"
          : `Update Your Experience in ${data.university}`}{" "}
      </Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSave}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Diploma"
              placeholder="Diploma"
              onChange={(e) => setDiploma(e.target.value)}
              defaultValue={data.diploma}
              required
            />
            <Form.Input
              fluid
              label="University"
              placeholder="Enter School Name"
              onChange={(e) => setUniversity(e.target.value)}
              defaultValue={data.university}
              required
            />
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="start date "
              placeholder="start date"
              onChange={(e) => setStartDate(e.target.value)}
              defaultValue={data.startDate}
              type="date"
              required
            />
            <Form.Input
              fluid
              label="end date"
              placeholder="end date"
              onChange={(e) => setEndDte(e.target.value)}
              defaultValue={data.endDate}
              type="date"
              required
            />
            <Dropdown
              placeholder="clubs"
              fluid
              multiple
              search
              selection
              value={clubs}
              onChange={handleDropdownChange}
              options={clubList}
              required
            />
          </Form.Group>

          <Form.Checkbox label="I agree to the Terms and Conditions" />
          <Form.Button
            loading={isUpdating}
            disabled={isUpdating}
            color={"blue"}
          >
            Submit
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
