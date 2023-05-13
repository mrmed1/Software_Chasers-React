import React from "react";
import { Card, Icon } from "semantic-ui-react";

import ExperienceModal from "./ExperienceModal";
 

export default function Experience({ data, _id,role,style }) {
  

  const emptyExperience = {
    jobTitle: "",
    jobType: "",
    companyName: "",
    place: "",
    startDate: "",
    endDate: "",
    description: "",
    competences: [],
  };

 


  return (
    <Card centered fluid style={style.card}>
      <Card.Content>
        {/* add Experience */}

        {/** Render Experiences !  */}
        <Card.Header>
          <h1 style={style.header}>Experiences </h1>
        </Card.Header>
        <br />

        {data &&
          data.map((exp, key) => {
            return (
              <>
                <Card.Description key={key}>
                  <Card.Header>
                   
                
                    <h2 style={style.text2}>
                      <Icon name="point" color="blue" />
                      {exp?.jobTitle}
                      {"  "}, {"  "}
                      {"  "}
                      <strong style={{ color: "#1976D2" }}>
                        {exp?.companyName}
                      </strong>
                    </h2>
                  </Card.Header>
                  <Card.Meta style={{ marginLeft: "32px",color:style.text.color }}>
                    <Icon name="calendar" /> from {exp?.startDate} to{" "}
                    {exp?.endDate}
                  </Card.Meta>

                  <h4
                    style={{
                      marginTtop: "1em",
                      textAlign: "justify",
                      maxWidth: "820px",
                      color: style.text.color,
                      lineHeight: "1.4em",
                      wordSpacing: ".5em",
                      marginLeft: "32px",
                    }}
                  >
                    {exp?.description}
                  </h4>
                  <Card.Meta style={{ marginLeft: "32px" }}>
                    {exp.jobType && (
                      <h5 style={style.text2}>
                        Domain :{" "}
                        <strong style={{ color: "#1976D2" }}>
                          {" "}
                          {exp.jobType}
                        </strong>
                      </h5>
                    )}
                  </Card.Meta>

                  <Card.Meta style={{ marginLeft: "32px" }}>
                    <h5  style={style.text2}>
                      Competences :{" "}
                      <strong style={{ color: "#1976D2" }}>
                        {exp?.competences.join(", ")}
                      </strong>
                    </h5>
                  </Card.Meta>
                  <div></div>
                </Card.Description>
              </>
            );
          })}
      </Card.Content>
    </Card>
  );
}
