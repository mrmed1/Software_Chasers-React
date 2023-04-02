import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Card, Modal, Form, Dropdown, Icon, Button } from "semantic-ui-react";
import { competenceList } from "../../Helpers/helper";
import { addSkills } from "../../Service/studentService";
import "./Skills.css";
import { toast } from "react-hot-toast";
export default function Skills({ data, _id }) {
  const [SkillsList, setSkillsList] = useState(data);
  const queryClient = useQueryClient();

  
  const handleDropdownChange = (event, data) => {
    setSkillsList(data.value);
  };

  const { mutate, isLoading } = useMutation(
    ({ Skills, _id }) => addSkills(Skills, _id),
    {
      onSuccess: (data) => {
        toast.success('Skills Are  Added Successfully !')
      },
      onError: (err) => {
        console.log(err)
        toast.error("Skills already exist on the CV")
      },
      onSettled: () => {
        queryClient.invalidateQueries("cv");
        setSkillsList([]);
      },
    }
  );

  function hundlSubmit(e) {
    e.preventDefault();
    const newSkills = {
      Skills: SkillsList,
    };
    if(SkillsList.length===0){
     return toast.error("Skills are required to continue")
    }
    mutate({ Skills: newSkills, _id: _id });
  }
  return (
    <Card centered fluid>
      <Card.Content>
        {/* add Experience */}
        <Modal
          centered
          size="small"
          trigger={
            <Icon
              name="add"
              color="blue"
              style={{ float: "right", cursor: "pointer", marginLeft: "8px" }}
              size="big"
            />
          }
        >
          <Modal.Content style={{ textAlign: "center" }}>
            <Form onSubmit={hundlSubmit}>
              <Dropdown
                style={{ textAlign: "center" }}
                placeholder="Add more Skills Here"
                multiple
                floating
                search
                selection
                onChange={handleDropdownChange}
                options={competenceList}
                required
                
              />

              <br />
              <br />

              <Form.Checkbox label="I agree to the Terms and Conditions" />
              <Form.Button
                loading={isLoading}
                disabled={isLoading}
                color={"blue"}
              >
                Submit
              </Form.Button>
            </Form>
          </Modal.Content>
        </Modal>
        {/** Render Experiences !  */}

        <section className="section skills" id="skills">
          <h2 className="section__title">Skills</h2>
          <ul className="skills__list">
            {data.map((skill, key) => (
              <li key={key} className="skills__list-item">
                <Button color="blue" circular>{skill}</Button>
              </li>
            ))}
          </ul>
        </section>
      </Card.Content>
    </Card>
  );
}
