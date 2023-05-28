import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Card, Modal, Form, Dropdown, Icon } from "semantic-ui-react";
import { competenceList } from "../../Helpers/helper";
import { addSkills } from "../../Service/studentService";
import "./Skills.css";
import { Button, Confirm, Popup } from "semantic-ui-react";
import { toast } from "react-hot-toast";

export default function Skills({ data, _id, style }) {
  const [SkillsList, setSkillsList] = useState(data);

  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    ({ Skills, _id }) => addSkills(Skills, _id),
    {
      onSuccess: () => {
        toast.success("Skills Are  Added Successfully !");
      },
      onError: (err) => {
        console.log(err);
        toast.error("Skills already exist on the CV");
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
    if (SkillsList.length === 0) {
      return toast.error("Skills are required to continue");
    }
    mutate({ Skills: newSkills, _id: _id });
  }
  return (
    <Card centered fluid style={style.card}>
      <Card.Content>
        {/** Render Experiences !  */}

        <section className="section skills" id="skills">
          <h2 className="section__title" style={style.header}>
            Skills
          </h2>
          <ul className="skills__list">
            {data.map((skill, key) => (
              <li key={key} className="skills__list-item">
                <Popup
                  content=""
                  header={`${skill}`}
                  trigger={<Button color="blue" circular content={skill} />}
                />
              </li>
            ))}
          </ul>
        </section>
      </Card.Content>
    </Card>
  );
}
